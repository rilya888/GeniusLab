# Content Release Workflow (SEO/GEO-safe)

## Цель

Стандартизировать выпуск контентных изменений без регрессий SEO, GEO и аналитики.

## Этапы workflow

1. **Draft**
   - Автор готовит текст/обновление в контентной модели.
   - Для новой страницы обязательно указать `primary intent` и `secondary intent`.

2. **SEO review**
   - Проверка соответствия `SEO_INTENT_MATRIX_2026.md`.
   - Проверка title/description/canonical и отсутствия каннибализации.
   - Проверка schema consistency (NAP, service intent, FAQ).

3. **Legal/brand review (если применимо)**
   - Проверка формулировок по бренду и claim'ам.
   - Проверка консистентности брендинга и дисклеймеров.

4. **Pre-release checks**
   - `npm run check:seo-content-quality`
   - `npm run check:intent-map-sync`
   - `npm run check:geo-consistency`
   - `npm run check:release-gate`

5. **Publish (weekly release train)**
   - Контентные SEO-критичные изменения публикуются пакетно.
   - Hotfix допускается только при инцидентах High/Critical.

6. **Post-release validation**
   - Проверка production smoke.
   - Проверка GA Realtime (page_view + CTA + form events).
   - Короткий verification report.

## Правила для новых URL

1. До добавления URL обновить `docs/SEO_INTENT_MATRIX_2026.md`.
2. Для сервисных страниц:
   - IT path начинается с `/servizi/`,
   - EN path начинается с `/en/services/`.
3. У новой страницы должны быть:
   - уникальный intent,
   - уникальный metaDescription,
   - обоснование why-not-cannibalized.

## Минимальный release template

```md
Release:
Date:

Content changes:
- ...

Intent changes:
- ...

Checks:
- check:seo-content-quality: pass/fail
- check:intent-map-sync: pass/fail
- check:geo-consistency: pass/fail
- check:release-gate: pass/fail

Post-release notes:
- ...
```

