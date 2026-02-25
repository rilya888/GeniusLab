/**
 * API router: content, admin auth.
 */

import { Router } from "express";
import { getContent, putContent, putContentServices, putContentServicePage } from "./content";
import { login, me } from "./auth";
import { requireAuth } from "../middleware/auth";

const router = Router();

// Public
router.get("/content", getContent);

// Admin auth (no auth required)
router.post("/admin/login", login);
router.get("/admin/me", me);

// Admin content (auth required)
router.put("/admin/content", requireAuth, putContent);
router.put("/admin/content/services", requireAuth, putContentServices);
router.put("/admin/content/servicePages/:key", requireAuth, putContentServicePage);

export default router;
