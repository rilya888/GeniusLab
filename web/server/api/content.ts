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
import { saveContentToGitHub, readContentFromGitHub } from "../lib/github-content.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONTENT_DIR = path.resolve(__dirname, "../data");

function getContentFilePath(lang: string): string {
  if (lang === "en") {
    return path.join(CONTENT_DIR, "content.en.json");
  }
  return path.join(CONTENT_DIR, "content.it.json");
}

const LEGACY_CONTENT_FILE =
  process.env.CONTENT_FILE ||
  path.resolve(__dirname, "../data/content.json");

const serviceItemSchema = z.object({
  key: z.string(),
  name: z.string(),
  description: z.string(),
  path: z.string(),
  order: z.number(),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const servicePageSchema = z.object({
  heroTitle: z.string(),
  heroSubtitle: z.string(),
  servicesSectionTitle: z.string(),
  problemsSectionTitle: z.string(),
  services: z.array(z.string()),
  problems: z.array(z.string()),
  metaDescription: z.string(),
  faq: z.array(faqItemSchema).optional().default([]),
  answerFirstIntro: z.string().optional().default(""),
  keywords: z.string().optional(),
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

function readContentLocal(lang: "it" | "en" = "it"): Content | null {
  const filePath = getContentFilePath(lang);
  const pathsToTry = fs.existsSync(filePath)
    ? [filePath]
    : [filePath, LEGACY_CONTENT_FILE];
  for (const p of pathsToTry) {
    try {
      if (fs.existsSync(p)) {
        const raw = fs.readFileSync(p, "utf-8");
        return JSON.parse(raw) as Content;
      }
    } catch {
      // try next
    }
  }
  return null;
}

/** Read content: from GitHub when configured, else from local file. */
async function readContent(lang: "it" | "en" = "it"): Promise<Content | null> {
  if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPO) {
    const fromGitHub = await readContentFromGitHub(lang);
    if (fromGitHub) return fromGitHub;
    console.warn("[Content] GitHub read failed, falling back to local");
  }
  return readContentLocal(lang);
}

function writeContentLocal(data: Content, lang: "it" | "en" = "it"): void {
  const filePath = getContentFilePath(lang);
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function saveContent(
  data: Content,
  message?: string,
  lang: "it" | "en" = "it"
): Promise<{ ok: boolean; error?: string }> {
  const useGitHub = !!(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
  console.log("[Content] saveContent", lang, useGitHub ? "→ GitHub" : "→ local");
  if (useGitHub) {
    const result = await saveContentToGitHub(data, message, lang);
    if (result.ok) {
      try {
        writeContentLocal(data, lang);
      } catch (err) {
        console.warn("[Content] Local write failed (GitHub save OK):", err instanceof Error ? err.message : err);
      }
    }
    return result;
  }
  try {
    writeContentLocal(data, lang);
    return { ok: true };
  } catch (err) {
    console.error("Local content write failed:", err);
    return { ok: false, error: "Failed to write content locally" };
  }
}

export async function getContent(req: Request, res: Response): Promise<void> {
  const section = req.query.section as string | undefined;
  const langParam = (req.query.lang as string) || "it";
  const lang = langParam === "en" ? "en" : "it";
  const content = await readContent(lang);

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

function getLangFromQuery(req: Request): "it" | "en" {
  const langParam = (req.query.lang as string) || "it";
  return langParam === "en" ? "en" : "it";
}

export async function putContent(req: Request, res: Response): Promise<void> {
  const body = req.body;
  const lang = getLangFromQuery(req);

  const parsed = contentSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  const result = await saveContent(parsed.data, "admin: update full content", lang);
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
  const lang = getLangFromQuery(req);
  const content = await readContent(lang);
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

  const result = await saveContent(content, "admin: update services", lang);
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
  const lang = getLangFromQuery(req);
  const content = await readContent(lang);
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

  const result = await saveContent(content, `admin: update servicePage ${key}`, lang);
  if (result.ok) {
    res.json({ ok: true });
    return;
  }
  const status = result.error?.includes("modified") ? 409 : 500;
  console.error("[Content] putContentServicePage failed:", result.error);
  res.status(status).json({ error: result.error || "Save failed" });
}
