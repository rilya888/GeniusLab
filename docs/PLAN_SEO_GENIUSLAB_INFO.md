# План SEO-улучшений для geniuslab.info

> Референсный документ для реализации. См. также [SEO_GENIUSLAB_INFO_CHECKLIST.md](SEO_GENIUSLAB_INFO_CHECKLIST.md) — действия владельца.

## Контекст

Канонический домен: **geniuslab.info** (вместо geniuslab.it). Все изменения должны учитывать:

- Единый источник истины для URL (env + fallback)
- Расширяемость для будущих доменов/локалей
- Комментарии в коде — только на английском
- Русский — только в планах и описаниях

---

## Часть 1: Canonical URL и домен geniuslab.info

### 1.1 Централизованный fallback URL

**Файл:** `web/server/seo.ts` — `DEFAULT_SITE_URL = "https://geniuslab.info"`

**Файл:** `web/.env.example` — `PUBLIC_SITE_URL` и `VITE_PUBLIC_SITE_URL` → geniuslab.info

### 1.2 Обновление документации и скриптов

| Файл | Изменение |
|------|-----------|
| docs/stages/02-artifacts/02-p1-migration-map.csv | geniuslab.it → geniuslab.info |
| docs/stages/07-artifacts/07-redirect-rules-nginx.conf | geniuslab.it → geniuslab.info |
| docs/stages/07-artifacts/07-cutover-command-sheet.md | curl примеры |
| docs/stages/07-artifacts/07-owner-actions-required.md | env примеры |
| web/package.json | smoke:prod, check:postdeploy |
| docs/PLAN_GOOGLE_ANALYTICS.md | geniuslab.it → geniuslab.info в примерах |

---

## Часть 2: www → non-www (canonical)

Canonical — geniuslab.info (без www). www.geniuslab.info → 301 → geniuslab.info.

**Реализация:** Railway Dashboard → Domains → redirect www на primary. Или Cloudflare Page Rules.

---

## Часть 3: 301-редиректы (источники — вне скоупа)

Доступа к avatech.info, assistenza-macbook.it, apple-assistenza.it нет. Обновить nginx.conf и migration map на geniuslab.info — для будущего использования.

---

## Часть 4: Railway и env

- Custom domain: geniuslab.info, www.geniuslab.info
- Variables: `PUBLIC_SITE_URL`, `VITE_PUBLIC_SITE_URL` = `https://geniuslab.info`
- Redeploy после смены env

---

## Часть 5: Опциональный Prerender (Phase 2)

При проблемах индексации SPA — vite-plugin-prerender. Пока не реализуем.

---

## Часть 6: Дополнительные SEO-проверки

- **check-seo.sh:** проверка, что sitemap `<loc>` начинается с BASE_URL
- **check:postdeploy:** alias для postdeploy-smoke.sh

---

## Часть 7: Alt-теги

Аудит выполнен — Hero, Footer, Navigation, ImageWithFallback имеют alt. Дополнительных действий не требуется.

---

## Часть 8: Документ для владельца

Создать `docs/SEO_GENIUSLAB_INFO_CHECKLIST.md` — чеклист внешних действий (GSC, Bing, GBP, GA4, Rich Results и т.д.).

---

## Файлы для изменения (сводка)

| # | Файл | Тип изменения |
|---|------|----------------|
| 1 | web/server/seo.ts | DEFAULT_SITE_URL → geniuslab.info |
| 2 | web/.env.example | PUBLIC_SITE_URL, VITE_PUBLIC_SITE_URL |
| 3 | docs/stages/07-artifacts/07-redirect-rules-nginx.conf | geniuslab.it → geniuslab.info |
| 4 | docs/stages/02-artifacts/02-p1-migration-map.csv | target URL → geniuslab.info |
| 5 | docs/stages/07-artifacts/07-cutover-command-sheet.md | curl примеры |
| 6 | docs/stages/07-artifacts/07-owner-actions-required.md | env примеры |
| 7 | web/package.json | smoke:prod, check:postdeploy |
| 8 | web/DEPLOY.md | checklist |
| 9 | docs/SEO_GENIUSLAB_INFO_CHECKLIST.md | Новый файл |
| 10 | docs/PLAN_GOOGLE_ANALYTICS.md | geniuslab.it → geniuslab.info |
| 11 | web/scripts/check-seo.sh | Проверка sitemap base URL |
