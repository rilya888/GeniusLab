# Этап 04 — Development Progress (2026-02-24)

## Выполнено

- Подготовлен офлайн-каркас проекта в `web/` под Astro-архитектуру.
- Реализованы базовые P1-страницы и layout-компоненты.
- Добавлен централизованный конфиг placeholder-данных (`web/src/config/site.json`).
- Зафиксирован базовый global style с mobile-first подходом и glass surface.
- Добавлены SEO-базовые meta/canonical и JSON-LD точка для страницы контактов.
- Реализован consent banner и client-side consent gating для analytics events.
- Добавлены event hooks для CTA и форм по контракту (`data-track` + `form_submit_*`).
- Реализованы fallback-блоки для Reviews/Maps при недоступности embed.
- Добавлены `privacy-policy`, `cookie-policy`, кастомная `404`.
- Добавлены production env-шаблоны: `web/.env.example` (`PUBLIC_FORM_ENDPOINT`, `PUBLIC_GTM_ID`).
- Добавлен автоматический smoke-check сборки: `npm run check:dist` (`web/scripts/check-dist.sh`).
- Добавлены post-deploy smoke scripts: `npm run check:postdeploy` и `npm run check:redirects`.
- Добавлен health endpoint `/healthz` и проверка security headers (`npm run check:headers`).
- UI-строки вынесены в словарь `web/src/i18n/it.ts` (базовая i18n-ready структура).

## Ограничение среды

Инициализация `npm create astro` была недоступна из-за сети (`ENOTFOUND registry.npmjs.org`), поэтому каркас был создан вручную.

Статус на 2026-02-24:
- `npm install` выполнен успешно.
- `npm run build` проходит с `ASTRO_TELEMETRY_DISABLED=1` (иначе Astro пытается писать telemetry config вне workspace).

## Следующие шаги

1. Заменить placeholder `PUBLIC_FORM_ENDPOINT` на production endpoint.
2. (Опционально) задать `PUBLIC_GTM_ID` после решения по аналитике v1.
3. На финальном cutover переключить `PUBLIC_SITE_URL` на `https://geniuslab.it` и выполнить redeploy + smoke.
4. Включить и проверить внешние 301 редиректы со старых доменов.
