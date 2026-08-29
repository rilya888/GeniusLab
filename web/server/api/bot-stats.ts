import crypto from "node:crypto";
import type { RequestHandler } from "express";
import type { StatsSummary } from "./visits";

const MAX_WINDOW_MS = 26 * 60 * 60 * 1000;

export interface BotStatsDependencies {
  token: string;
  loadStats(startAt: number, endAt: number): StatsSummary;
  logError(message: string): void;
}

function digest(value: string): Buffer {
  return crypto.createHash("sha256").update(value).digest();
}

function isAuthorized(header: string | undefined, expectedToken: string): boolean {
  if (!expectedToken || !header?.startsWith("Bearer ")) return false;
  const suppliedToken = header.slice("Bearer ".length);
  if (!suppliedToken) return false;
  return crypto.timingSafeEqual(digest(suppliedToken), digest(expectedToken));
}

function parseEpoch(value: unknown): number | null {
  if (typeof value !== "string" || !/^\d+$/.test(value)) return null;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : null;
}

export function createBotStatsHandler(dependencies: BotStatsDependencies): RequestHandler {
  return (req, res) => {
    res.set("Cache-Control", "no-store");
    if (!isAuthorized(req.headers.authorization, dependencies.token)) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const startAt = parseEpoch(req.query.startAt);
    const endAt = parseEpoch(req.query.endAt);
    if (startAt === null || endAt === null || startAt >= endAt || endAt - startAt > MAX_WINDOW_MS) {
      res.status(400).json({ error: "Invalid report window" });
      return;
    }
    try {
      res.json(dependencies.loadStats(startAt, endAt));
    } catch {
      dependencies.logError("[BotStats] visit storage read failed");
      res.status(500).json({ error: "Failed to read stats" });
    }
  };
}
