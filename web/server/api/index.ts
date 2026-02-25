/**
 * API router: content, admin auth.
 */

import { Router } from "express";
import { getContent, putContent, putContentServices, putContentServicePage } from "./content";
import { postTrack, getStats } from "./visits";
import { login, me } from "./auth";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Public
router.get("/content", getContent);
router.post("/track", postTrack);

// Admin auth (no auth required)
router.post("/admin/login", login);
router.get("/admin/me", me);

// Admin debug (auth required) - check if GitHub storage is configured
router.get("/admin/debug", requireAuth, (_req, res) => {
  const githubConfigured = !!(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
  res.json({ githubConfigured, repo: process.env.GITHUB_REPO || null });
});

// Admin content (auth required)
router.put("/admin/content", requireAuth, putContent);
router.get("/admin/stats", requireAuth, getStats);
router.put("/admin/content/services", requireAuth, putContentServices);
router.put("/admin/content/servicePages/:key", requireAuth, putContentServicePage);

export default router;
