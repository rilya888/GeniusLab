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
- [ ] Form endpoint set in server `.env` (`VITE_PUBLIC_FORMSPREE_FORM_ID` or `VITE_PUBLIC_FORM_ENDPOINT`)
- [ ] GTM ID set in server `.env` (`VITE_PUBLIC_GTM_ID`) for events
- [ ] GA4 ID set in server `.env` (`VITE_PUBLIC_GA4_ID`) for direct gtag — enables Google tag verification
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

## Production (self-hosted, Docker Compose + Cloudflare Tunnel)

The site runs as a Docker container on a private server, exposed publicly through a Cloudflare Tunnel (no inbound ports opened). Deploy directory layout:

```
/srv/geniuslab/
├── .env             # production env vars, chmod 600 (see .env.example)
├── compose.yaml     # builds ./src/web, publishes 127.0.0.1:8080 only
├── data/            # persisted volume (visits.ndjson)
└── src/             # git clone of this repo
```

Required env (`.env`, not committed): `NODE_ENV=production`, `PORT=8080`, `PUBLIC_SITE_URL`, `VITE_PUBLIC_SITE_URL`, `VITE_PUBLIC_FORMSPREE_FORM_ID` or `VITE_PUBLIC_FORM_ENDPOINT`, `VITE_PUBLIC_GTM_ID`, `VITE_PUBLIC_GA4_ID`, `ADMIN_PASSWORD`, `ADMIN_SECRET`, `GITHUB_TOKEN`/`GITHUB_REPO`/`GITHUB_BRANCH` (admin content saving).

Deploy a new version:

```bash
cd /srv/geniuslab/src && git pull --ff-only
cd /srv/geniuslab && docker compose up -d --build
```

Health check: `GET /healthz` → `ok`. Container restarts automatically (`restart: unless-stopped`) after reboot/crash; `cloudflared` runs as a systemd service and starts on boot.

## Smoke tests

```bash
npm run smoke              # localhost:5173
npm run smoke:prod         # https://geniuslab.info
npm run check:headers      # Security headers
npm run check:seo          # robots, sitemap
```

## Rollback

```bash
cd /srv/geniuslab/src && git checkout <previous-commit-or-tag>
cd /srv/geniuslab && docker compose up -d --build
```

Verify `GET /healthz` returns 200 after rollback.
