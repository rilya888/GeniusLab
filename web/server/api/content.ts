/**
 * Content API: GET /api/content, PUT /api/admin/content.
 * Reads/writes content.json. Validates with Zod on write.
 * When GITHUB_TOKEN is set, saves to GitHub repo instead of local file.
 */

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { Request, Response } from "express";
import { z } from "zod";
import { saveContentToGitHub } from "../lib/github-content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONTENT_FILE =
  process.env.CONTENT_FILE ||
  path.resolve(__dirname, "../data/content.json");

const serviceItemSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
  path: z.string(),
  order: z.number(),
});

const servicePageSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  servicesSectionTitle: z.string(),
  problemsSectionTitle: z.string(),
  services: z.array(z.string()),
  problems: z.array(z.string()),
  metaDescription: z.string(),
});

const contentSchema = z.object({
  services: z.object({
    heading: z.string(),
    subheading: z.string(),
    items: z.array(serviceItemSchema),
  }),
  servicePages: z.record(servicePageSchema),
});

export type Content = z.infer<typeof contentSchema>;

function readContent(): Content | null {
  try {
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    return JSON.parse(raw) as Content;
  } catch {
    return null;
  }
}

function writeContentLocal(data: Content): void {
  const dir = path.dirname(CONTENT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function saveContent(
  data: Content,
  message?: string
): Promise<{ ok: boolean; error?: string }> {
  const useGitHub = !!(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
  console.log("[Content] saveContent", useGitHub ? "→ GitHub" : "→ local");
  if (useGitHub) {
    const result = await saveContentToGitHub(data, message);
    console.log("[Content] GitHub result:", result.ok ? "OK" : result.error);
    if (result.ok && process.env.NODE_ENV !== "production") {
      try {
        writeContentLocal(data);
      } catch {
        // dev only; ignore if fs is read-only
      }
    }
    return result;
  }
  try {
    writeContentLocal(data);
    return { ok: true };
  } catch (err) {
    console.error("Local content write failed:", err);
    return { ok: false, error: "Failed to write content locally" };
  }
}

export function getContent(req: Request, res: Response): void {
  const section = req.query.section as string | undefined;
  const content = readContent();

  if (!content) {
    res.status(404).json({ error: "Content not found" });
    return;
  }

  if (section === "services") {
    res.json({ services: content.services });
    return;
  }

  res.json(content);
}

export async function putContent(req: Request, res: Response): Promise<void> {
  const body = req.body;

  const parsed = contentSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const result = await saveContent(parsed.data, "admin: update full content");
  if (result.ok) {
    res.json({ ok: true });
    return;
  }
  const status = result.error?.includes("modified") ? 409 : 500;
  console.error("[Content] putContent failed:", result.error);
  res.status(status).json({ error: result.error || "Save failed" });
}

export async function putContentServices(req: Request, res: Response): Promise<void> {
  const body = req.body;
  const content = readContent();
  if (!content) {
    res.status(404).json({ error: "Content not found" });
    return;
  }

  const parsed = z.object({
    heading: z.string(),
    subheading: z.string(),
    items: z.array(serviceItemSchema),
  }).safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }
  content.services = parsed.data;

  const result = await saveContent(content, "admin: update services");
  if (result.ok) {
    res.json({ ok: true });
    return;
  }
  const status = result.error?.includes("modified") ? 409 : 500;
  console.error("[Content] putContentServices failed:", result.error);
  res.status(status).json({ error: result.error || "Save failed" });
}

export async function putContentServicePage(req: Request, res: Response): Promise<void> {
  const key = (req.params as { key: string }).key;
  const body = req.body;
  const content = readContent();
  if (!content) {
    res.status(404).json({ error: "Content not found" });
    return;
  }

  if (!content.servicePages[key]) {
    res.status(400).json({ error: "Invalid service key" });
    return;
  }

  const parsed = servicePageSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }
  content.servicePages[key] = parsed.data;

  const result = await saveContent(content, `admin: update servicePage ${key}`);
  if (result.ok) {
    res.json({ ok: true });
    return;
  }
  const status = result.error?.includes("modified") ? 409 : 500;
  console.error("[Content] putContentServicePage failed:", result.error);
  res.status(status).json({ error: result.error || "Save failed" });
}
