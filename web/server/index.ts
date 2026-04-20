/**
 * Express server: static files, healthz, robots.txt, sitemap.xml, 301 redirects.
 * In production: serves built client from dist/. SPA mode (HTML shell).
 */

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import sirv from "sirv";
import { getRobotsTxt, getSitemapXml, getSiteUrl } from "./seo";
import { REDIRECTS } from "./redirects";
import { getCanonicalRedirect } from "./canonical";
import { getLocalizedPath } from "../src/app/routes.config";
import apiRouter from "./api";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 5173;
const base = process.env.BASE || "/";

const app = express();
app.set("trust proxy", true);
app.use(compression());
app.use(cookieParser());
app.use(express.json());

// Security headers (CSP allows Formspree, GTM, Google Maps)
app.use((_req, res, next) => {
  res.set("X-Frame-Options", "DENY");
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.set("Permissions-Policy", "geolocation=(), microphone=(), camera=()");
  res.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://formspree.io https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; frame-src https://www.google.com https://maps.google.com https://maps.googleapis.com; base-uri 'self'; form-action 'self' https://formspree.io"
  );
  next();
});

// Canonical URL policy in production:
// 1) http -> https
// 2) www.geniuslab.info -> geniuslab.info
// 3) remove trailing slash (except root)
app.use((req, res, next) => {
  const hostHeader = req.headers.host || "";
  const forwardedProto =
    typeof req.headers["x-forwarded-proto"] === "string"
      ? req.headers["x-forwarded-proto"]
      : undefined;
  const target = getCanonicalRedirect({
    hostHeader,
    forwardedProto,
    fallbackProto: req.protocol,
    path: req.path || "/",
    url: req.url || req.path || "/",
  });
  if (!target) return next();
  return res.redirect(301, target);
});

// Canonical + hreflang headers for HTML responses (helps indexing without JS rendering)
app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  const accept = String(req.headers.accept || "");
  if (!accept.includes("text/html")) return next();
  if (req.path.startsWith("/api")) return next();
  if (req.path === "/robots.txt" || req.path === "/sitemap.xml" || req.path === "/healthz") {
    return next();
  }

  const base = getSiteUrl();
  const normalizedPath = req.path.length > 1 ? req.path.replace(/\/+$/, "") : "/";
  const canonicalUrl = `${base}${normalizedPath === "/" ? "/" : normalizedPath}`;

  const links: string[] = [`<${canonicalUrl}>; rel="canonical"`];

  if (!normalizedPath.startsWith("/admin")) {
    const itPath = getLocalizedPath(normalizedPath, "it");
    const enPath = getLocalizedPath(normalizedPath, "en");
    links.push(`<${base}${itPath === "/" ? "/" : itPath}>; rel="alternate"; hreflang="it"`);
    links.push(`<${base}${enPath === "/" ? "/en" : enPath}>; rel="alternate"; hreflang="en"`);
    links.push(`<${base}${itPath === "/" ? "/" : itPath}>; rel="alternate"; hreflang="x-default"`);
  }

  res.set("Link", links.join(", "));
  res.set("X-Robots-Tag", "all");
  next();
});

// 301 redirects: /en/servizi/* -> /en/services/*, exact matches from REDIRECTS
app.use((req, res, next) => {
  const p = req.path.replace(/\/$/, "") || "/";
  if (p.startsWith("/en/servizi")) {
    return res.redirect(301, p.replace("/en/servizi", "/en/services"));
  }
  const entry = REDIRECTS.find((r) => r.from === req.path || r.from === p);
  if (entry) {
    return res.redirect(entry.status, entry.to);
  }
  next();
});

// SEO routes
app.get("/healthz", (_req, res) => {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.set("Cache-Control", "no-store");
  res.send("ok\n");
});

app.get("/robots.txt", (_req, res) => {
  res.set("Content-Type", "text/plain; charset=utf-8");
  res.send(getRobotsTxt());
});

app.get("/sitemap.xml", (_req, res) => {
  res.set("Content-Type", "application/xml; charset=utf-8");
  res.send(getSitemapXml());
});

app.use("/api", apiRouter);

if (isProduction) {
  const distPath = path.resolve(__dirname, "../dist");
  if (!fs.existsSync(distPath)) {
    console.error("dist/ not found. Run: npm run build");
    process.exit(1);
  }
  app.use(base, sirv(distPath, { extensions: [] }));
  app.get("/{*path}", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
  app.get("/{*splat}", async (req, res) => {
    const url = req.originalUrl;
    try {
      let template = await fs.promises.readFile(
        path.resolve(__dirname, "../index.html"),
        "utf-8"
      );
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set("Content-Type", "text/html").send(template);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      console.error(e);
      res.status(500).end((e as Error).message);
    }
  });
}

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
