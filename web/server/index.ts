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
import { getRobotsTxt, getSitemapXml } from "./seo";
import { REDIRECTS } from "./redirects";
import apiRouter from "./api";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 5173;
const base = process.env.BASE || "/";

const app = express();
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
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://formspree.io https://www.google-analytics.com https://www.googletagmanager.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; frame-src https://www.google.com https://maps.google.com https://maps.googleapis.com; base-uri 'self'; form-action 'self' https://formspree.io"
  );
  next();
});

// 301 redirects
app.use((req, res, next) => {
  const normalized = req.path.replace(/\/$/, "") || "/";
  const entry = REDIRECTS.find(
    (r) => r.from === req.path || r.from === normalized
  );
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
