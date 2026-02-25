/**
 * SEO utilities: site URL, robots.txt, sitemap.xml
 */

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { SITEMAP_PATHS } from "../src/app/routes.config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_FILE =
  process.env.CONTENT_FILE ||
  path.resolve(__dirname, "data/content.json");

const DEFAULT_SITE_URL = "https://geniuslab-web-production.up.railway.app";

export function getSiteUrl(): string {
  const url = process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}

export function getRobotsTxt(): string {
  const base = getSiteUrl();
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
}

function getPriority(path: string): number {
  if (path === "/") return 0.9;
  if (["/servizi", "/contatti", "/chi-siamo", "/recensioni"].includes(path))
    return 0.8;
  if (path.startsWith("/servizi/")) return 0.7;
  return 0.5;
}

function getChangefreq(path: string): string {
  if (["/privacy-policy", "/cookie-policy"].includes(path)) return "monthly";
  return "weekly";
}

function getPathsFromContent(): string[] | null {
  try {
    const raw = fs.readFileSync(CONTENT_FILE, "utf-8");
    const data = JSON.parse(raw) as { services?: { items?: { path: string }[] } };
    const servicePaths = data.services?.items?.map((i) => i.path) ?? [];
    const staticPaths = [
      "/",
      "/servizi",
      "/contatti",
      "/chi-siamo",
      "/recensioni",
      "/privacy-policy",
      "/cookie-policy",
    ];
    return [...staticPaths, ...servicePaths];
  } catch {
    return null;
  }
}

export function getSitemapXml(): string {
  const base = getSiteUrl();
  const lastmod =
    process.env.SITEMAP_LASTMOD ?? new Date().toISOString().split("T")[0];

  const paths = getPathsFromContent() ?? SITEMAP_PATHS;

  const urls = paths
    .map(
      (p) => `  <url>
    <loc>${base}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getChangefreq(p)}</changefreq>
    <priority>${getPriority(p)}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
