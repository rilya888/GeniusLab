/**
 * Auth middleware for admin API routes.
 * Verifies JWT from Authorization header or cookie.
 */

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ADMIN_SECRET = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "dev-secret-change-in-production";

export interface AuthPayload {
  admin: boolean;
  iat?: number;
  exp?: number;
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const cookies = (req as Request & { cookies?: { adminToken?: string } }).cookies;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : cookies?.adminToken;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, ADMIN_SECRET) as AuthPayload;
    if (!decoded.admin) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    (req as Request & { admin?: boolean }).admin = true;
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}
