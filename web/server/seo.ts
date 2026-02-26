/**
 * SEO utilities: site URL, robots.txt, sitemap.xml
 */

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { SITEMAP_PATHS, getLocalizedPath } from "../src/app/routes.config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "data");
const CONTENT_FILE =
  process.env.CONTENT_FILE ||
  path.resolve(CONTENT_DIR, "content.json");

const DEFAULT_SITE_URL = "https://geniuslab-web-production.up.railway.app";

export function getSiteUrl(): string {
  const url = process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}

export function getRobotsTxt(): string {
  const base = getSiteUrl();
  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${base}/sitemap.xml
`;
}

function getPriority(p: string): number {
  if (p === "/" || p === "/en") return 0.9;
  if (["/servizi", "/contatti", "/chi-siamo", "/recensioni", "/en/services", "/en/contacts", "/en/about", "/en/reviews"].includes(p))
    return 0.8;
  if (p.startsWith("/servizi/") || p.startsWith("/en/services/")) return 0.7;
  return 0.5;
}

function getChangefreq(p: string): string {
  if (["/privacy-policy", "/cookie-policy", "/en/privacy-policy", "/en/cookie-policy"].includes(p)) return "monthly";
  return "weekly";
}

function getPathsFromContent(): string[] | null {
  const pathsToTry = [
    path.join(CONTENT_DIR, "content.it.json"),
    CONTENT_FILE,
  ];
  for (const filePath of pathsToTry) {
    try {
      if (!fs.existsSync(filePath)) continue;
      const raw = fs.readFileSync(filePath, "utf-8");
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
      continue;
    }
  }
  return null;
}

export function getSitemapXml(): string {
  const base = getSiteUrl();
  const lastmod =
    process.env.SITEMAP_LASTMOD ?? new Date().toISOString().split("T")[0];

  const itPaths = getPathsFromContent() ?? SITEMAP_PATHS;

  const urls = itPaths
    .map(
      (p) => {
        const loc = base + p;
        const altEn = base + getLocalizedPath(p, "en");
        const altIt = base + getLocalizedPath(p, "it");
        return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="it" href="${altIt}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${altEn}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${altIt}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getChangefreq(p)}</changefreq>
    <priority>${getPriority(p)}</priority>
  </url>`;
      }
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
