/**
 * Visitor tracking API: POST /api/track, GET /api/admin/stats.
 * Stores visits in NDJSON file. Anonymous hash of IP+User-Agent, no cookies.
 * Rate limited: 60 requests/min per IP.
 */

import path from "node:path";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import type { Request, Response } from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const VISITS_FILE =
  process.env.VISITS_FILE ||
  path.resolve(__dirname, "../data/visits.ndjson");

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 60;

// In-memory rate limit: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export interface Visit {
  id: string;
  visitorHash: string;
  ts: string;
  path: string;
  referrer: string;
  device: "mobile" | "tablet" | "desktop";
}

export interface StatsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  byDevice: { mobile: number; tablet: number; desktop: number };
  byReferrer: Record<string, number>;
  byPath: Record<string, number>;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "0.0.0.0";
}

function parseDevice(userAgent: string): "mobile" | "tablet" | "desktop" {
  const ua = (userAgent || "").toLowerCase();
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) return "mobile";
  return "desktop";
}

function sanitizeReferrer(referrer: string): string {
  if (!referrer || typeof referrer !== "string") return "(direct)";
  const trimmed = referrer.trim();
  if (!trimmed) return "(direct)";
  try {
    const url = new URL(trimmed);
    return url.origin;
  } catch {
    return "(direct)";
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

function appendVisit(visit: Visit): void {
  const dir = path.dirname(VISITS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const line = JSON.stringify(visit) + "\n";
  fs.appendFileSync(VISITS_FILE, line, "utf-8");
}

function readVisits(): Visit[] {
  if (!fs.existsSync(VISITS_FILE)) return [];
  const raw = fs.readFileSync(VISITS_FILE, "utf-8");
  const visits: Visit[] = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const v = JSON.parse(trimmed) as Visit;
      if (v.id && v.ts && v.path) visits.push(v);
    } catch {
      // skip malformed lines
    }
  }
  return visits;
}

function aggregateStats(visits: Visit[]): StatsSummary {
  const byDevice = { mobile: 0, tablet: 0, desktop: 0 };
  const byReferrer: Record<string, number> = {};
  const byPath: Record<string, number> = {};
  const visitorHashes = new Set<string>();

  for (const v of visits) {
    visitorHashes.add(v.visitorHash);
    byDevice[v.device] = (byDevice[v.device] ?? 0) + 1;
    byReferrer[v.referrer] = (byReferrer[v.referrer] ?? 0) + 1;
    byPath[v.path] = (byPath[v.path] ?? 0) + 1;
  }

  const topReferrers = Object.entries(byReferrer)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  const topPaths = Object.entries(byPath)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  return {
    totalVisits: visits.length,
    uniqueVisitors: visitorHashes.size,
    byDevice,
    byReferrer: Object.fromEntries(topReferrers),
    byPath: Object.fromEntries(topPaths),
  };
}

export function postTrack(req: Request, res: Response): void {
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  const body = req.body as { path?: string; referrer?: string };
  const pagePath = typeof body?.path === "string" ? body.path : req.path || "/";
  if (pagePath.startsWith("/admin")) {
    res.status(204).end();
    return;
  }

  const userAgent = req.headers["user-agent"] || "";
  const referrer = sanitizeReferrer(body?.referrer ?? "");
  const device = parseDevice(userAgent);
  const visitorHash = crypto
    .createHash("sha256")
    .update(ip + userAgent)
    .digest("hex")
    .slice(0, 16);

  const visit: Visit = {
    id: crypto.randomUUID(),
    visitorHash,
    ts: new Date().toISOString(),
    path: pagePath,
    referrer,
    device,
  };

  try {
    appendVisit(visit);
  } catch (err) {
    console.error("[Visits] append failed:", err);
    res.status(500).json({ error: "Tracking failed" });
    return;
  }

  res.status(204).end();
}

export function getStats(req: Request, res: Response): void {
  const daysParam = req.query.days as string | undefined;
  const days = Math.min(90, Math.max(1, parseInt(daysParam || "30", 10) || 30));

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  const cutoffStr = cutoff.toISOString();

  let visits: Visit[];
  try {
    visits = readVisits();
  } catch (err) {
    console.error("[Visits] read failed:", err);
    res.status(500).json({ error: "Failed to read stats" });
    return;
  }

  const filtered = visits.filter((v) => v.ts >= cutoffStr);
  const stats = aggregateStats(filtered);

  res.json(stats);
}
