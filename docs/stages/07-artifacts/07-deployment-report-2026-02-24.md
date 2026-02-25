# Этап 07 — Deployment Report (2026-02-24)

## Summary

- Railway project created: `geniuslab-it`
- Service created: `geniuslab-web`
- Initial Deployment ID: `1b64d6bc-cc3c-420c-b7a7-d7d5fd6a59ac`
- Current Deployment ID: `221373ce-a4b3-48de-9428-83f483b223cf`
- Latest Deployment ID: `dd522cb2-67b8-40ee-8526-d7d28647ac71`
- Latest Health/Security Deployment ID: `6b3fe602-522a-4ed9-8f44-263298e8b104`
- Latest i18n/Dictionary Deployment ID: `6d901b0f-5d19-49e7-8c48-5d92185cad77`
- Deployment status: `SUCCESS`
- Service domain: `https://geniuslab-web-production.up.railway.app`
- Custom domain (created in Railway): `https://geniuslab.it`

## Build details

- Deploy source: `web/` path-as-root
- Build method: Dockerfile (`web/Dockerfile`)
- Runtime: nginx on port `8080`

## Smoke results

Executed:
- `npm run check:postdeploy -- https://geniuslab-web-production.up.railway.app`

Result:
- Homepage 200
- `/contatti` 200
- `/recensioni` 200
- `/servizi/riparazione-macbook` 200
- `robots.txt` and `sitemap.xml` available
- canonical and robots pattern checks passed
- services index includes extended v1 set (`batteria-macbook`, `macbook-ssd`, `flexgate-display-macbook`, `tastiera-macbook`, `software-assistenza`)
- `/healthz` endpoint responds `200` with body `ok`
- security header check passed (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`)

## Open items before canonical cutover

0. Pre-domain mode active: canonical/robots/sitemap currently target Railway URL.
1. Create DNS record at registrar:
   - `CNAME @ -> 4n5yrk8v.up.railway.app`
2. Wait DNS propagation and re-run smoke-check on `https://geniuslab.it`.
3. At cutover moment, set `PUBLIC_SITE_URL=https://geniuslab.it` and redeploy.
4. Replace placeholder `PUBLIC_FORM_ENDPOINT` with real production endpoint.
5. Configure `PUBLIC_GTM_ID` if analytics enabled in v1.
6. Apply external 301 rules for `avatech.info`, `assistenza-macbook.it`, `apple-assistenza.it`.
