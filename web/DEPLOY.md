# Genius Lab Web — Deploy

## Pre-production checklist

- [ ] Canonical policy works in production: http->https, www->non-www, no trailing slash
- [ ] robots.txt, sitemap.xml, healthz work
- [ ] title/description/canonical on pages
- [ ] SEO content quality check passes (`npm run check:seo-content-quality`)
- [ ] Intent matrix sync check passes (`npm run check:intent-map-sync`)
- [ ] Analytics contract check passes (`npm run check:analytics-contract`)
- [ ] /404 has noindex
- [ ] JSON-LD valid
- [ ] Consent blocks analytics until accepted
- [ ] CSP does not block Formspree/GTM/Maps
- [ ] Form endpoint set in Railway (`VITE_PUBLIC_FORMSPREE_FORM_ID` or `VITE_PUBLIC_FORM_ENDPOINT`)
- [ ] GTM ID set in Railway (`VITE_PUBLIC_GTM_ID`) for events
- [ ] GA4 ID set in Railway (`VITE_PUBLIC_GA4_ID`) for direct gtag — enables Google tag verification
- [ ] `PUBLIC_SITE_URL` and `VITE_PUBLIC_SITE_URL` set to `https://geniuslab.info` (see `.env.example`)
- [ ] GEO consistency check passes (`npm run check:geo-consistency`)
- [ ] Run `npm run smoke` and `npm run check:headers`
- [ ] After cutover: `npm run check:postdeploy -- https://geniuslab.info`
- [ ] Canonical policy check passes in CI (`check:canonical-policy` on production-mode local server)

## Local

```bash
npm run dev          # Vite only
npm run dev:server   # Express + Vite
npm run preview      # Build + production server
```

## Production (Railway)

1. Set env: `NODE_ENV=production`, `PORT` (Railway sets), `PUBLIC_SITE_URL`, `VITE_PUBLIC_SITE_URL`, `VITE_PUBLIC_FORMSPREE_FORM_ID` or `VITE_PUBLIC_FORM_ENDPOINT` (for contact form), `VITE_PUBLIC_GTM_ID` (events), `VITE_PUBLIC_GA4_ID` (direct gtag for verification)
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
