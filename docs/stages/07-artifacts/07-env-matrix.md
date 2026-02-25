# Этап 07 — Env Matrix

## Build/runtime env (web)

| Variable | Required | Example | Notes |
|---|---|---|---|
| `PUBLIC_SITE_URL` | Yes | `https://geniuslab-web-production.up.railway.app` | Базовый URL для canonical/robots/sitemap |
| `PUBLIC_FORM_ENDPOINT` | Yes | `https://formspree.io/f/abc123xy` | Используется в action форм |
| `PUBLIC_GTM_ID` | No | `GTM-XXXXXXX` | Грузится только после consent |

## Secrets policy

- Публичные переменные (`PUBLIC_*`) можно хранить в Railway Variables.
- Секреты backend (если появятся позже) не использовать в фронтенд-бандле.
