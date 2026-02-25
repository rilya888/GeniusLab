/**
 * Admin auth API: login, me.
 */

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "dev-secret-change-in-production";

// Simple in-memory rate limit: IP -> { count, resetAt }
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function getClientIp(req: Request): string {
  return (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry) return false;
  if (now > entry.resetAt) {
    loginAttempts.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX;
}

function recordAttempt(ip: string): void {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count++;
  }
}

export function login(req: Request, res: Response): void {
  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many attempts" });
    return;
  }

  const password = (req.body?.password as string) || "";
  if (!ADMIN_PASSWORD) {
    res.status(500).json({ error: "Admin not configured" });
    return;
  }

  if (password !== ADMIN_PASSWORD) {
    recordAttempt(ip);
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = jwt.sign(
    { admin: true },
    ADMIN_SECRET,
    { expiresIn: "24h" }
  );

  res.json({ token });
}

export function me(req: Request, res: Response): void {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : (req as Request & { cookies?: { adminToken?: string } }).cookies?.adminToken;

  if (!token) {
    res.status(401).json({ ok: false });
    return;
  }

  try {
    jwt.verify(token, ADMIN_SECRET);
    res.json({ ok: true });
  } catch {
    res.status(401).json({ ok: false });
  }
}
