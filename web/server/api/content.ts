/**
 * Content API: GET /api/content, PUT /api/admin/content.
 * Reads/writes content.json. Validates with Zod on write.
 */

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import type { Request, Response } from "express";
import { z } from "zod";

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

function writeContent(data: Content): void {
  const dir = path.dirname(CONTENT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(data, null, 2), "utf-8");
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

export function putContent(req: Request, res: Response): void {
  const body = req.body;

  const parsed = contentSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.flatten() });
    return;
  }

  try {
    const backupPath = CONTENT_FILE + ".bak";
    const existing = readContent();
    if (existing) {
      fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2), "utf-8");
    }

    writeContent(parsed.data);
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Write failed" });
  }
}

export function putContentServices(req: Request, res: Response): void {
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

  try {
    const backupPath = CONTENT_FILE + ".bak";
    const existing = readContent();
    if (existing) {
      fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2), "utf-8");
    }
    writeContent(content);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Write failed" });
  }
}

export function putContentServicePage(req: Request, res: Response): void {
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

  try {
    const backupPath = CONTENT_FILE + ".bak";
    const existing = readContent();
    if (existing) {
      fs.writeFileSync(backupPath, JSON.stringify(existing, null, 2), "utf-8");
    }
    writeContent(content);
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Write failed" });
  }
}
