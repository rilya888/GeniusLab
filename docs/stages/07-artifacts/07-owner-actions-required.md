# Этап 07 — Owner Actions Required

## 1) DNS at registrar (required)

Create DNS record for root domain:

- Type: `CNAME`
- Name: `@`
- Value: `4n5yrk8v.up.railway.app`

After propagation, run:

```bash
cd web
npm run check:postdeploy -- https://geniuslab.it
```

Pre-domain mode:
- Сайт сейчас официально работает на `https://geniuslab-web-production.up.railway.app`.
- `PUBLIC_SITE_URL` установлен под Railway URL.

## 2) Form endpoint (required)

Set production form endpoint in Railway variables:

- `PUBLIC_FORM_ENDPOINT=https://formspree.io/f/<real-id>` (or custom endpoint)
- Current value in Railway: placeholder (`https://formspree.io/f/your-form-id`)

Redeploy after setting:

```bash
~/.npm-global/bin/railway up web --path-as-root --service geniuslab-web --ci
```

## 3) Canonical URL on Railway (required for pre-domain phase)

Set in Railway variables:

- `PUBLIC_SITE_URL=https://geniuslab-web-production.up.railway.app`

At final domain cutover change to:
- `PUBLIC_SITE_URL=https://geniuslab.it`

## 4) Optional analytics

If GTM is used in v1, set:

- `PUBLIC_GTM_ID=GTM-XXXXXXX`

Consent gating is already implemented in client scripts.
