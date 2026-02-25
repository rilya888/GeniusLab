# Genius Lab Web — Deploy

## Pre-production checklist

- [ ] Legacy URL covered by 301 (see `server/redirects.ts`)
- [ ] robots.txt, sitemap.xml, healthz work
- [ ] title/description/canonical on pages
- [ ] /404 has noindex
- [ ] JSON-LD valid
- [ ] Consent blocks analytics until accepted
- [ ] CSP does not block Formspree/GTM/Maps
- [ ] Run `npm run smoke` and `npm run check:headers`

## Local

```bash
npm run dev          # Vite only
npm run dev:server   # Express + Vite
npm run preview      # Build + production server
```

## Production (Railway)

1. Set env: `NODE_ENV=production`, `PORT` (Railway sets), `PUBLIC_SITE_URL`, `VITE_PUBLIC_SITE_URL`
2. Dockerfile: build + run Express
3. Health check: `GET /healthz` → 200

## Smoke tests

```bash
npm run smoke              # localhost:5173
npm run smoke:prod         # Railway URL
npm run check:headers      # Security headers
npm run check:seo          # robots, sitemap
```

## Rollback

Revert to previous release. Verify `GET /healthz` returns 200.
