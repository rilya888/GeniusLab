# Этап 07 — Cutover Command Sheet

## Local preflight

```bash
cd web
ASTRO_TELEMETRY_DISABLED=1 npm run build
npm run check:dist
```

## Post-deploy smoke (replace domain)

```bash
curl -I https://geniuslab.it/
curl -I https://geniuslab.it/contatti
curl -I https://geniuslab.it/servizi/riparazione-macbook
curl -sS https://geniuslab.it/robots.txt
curl -sS https://geniuslab.it/sitemap.xml | head -n 20
```

Alternative:

```bash
cd web
npm run check:postdeploy -- https://geniuslab.it
```

## Redirect smoke for source domains

```bash
curl -I https://www.avatech.info/contatti.html
curl -I https://www.assistenza-macbook.it/service/data-recovery/
curl -I https://www.apple-assistenza.it/recensioni/
```

Expected: `301` to matching `https://geniuslab.it/...` targets.

Alternative:

```bash
cd web
npm run check:redirects
```
