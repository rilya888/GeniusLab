# Release Policy (SEO/GEO/GA-safe)

## Цель

Выпускать SEO-критичные изменения без регрессий сайта и аналитики.

## Основные правила

1. SEO-критичные изменения публикуются пакетно 1 раз в неделю.
2. Hotfix допускается вне графика только при High/Critical инцидентах.
3. Нельзя смешивать в одном релизе крупные изменения:
   - роутинг,
   - schema refactor,
   - analytics refactor
   без расширенного QA и явного одобрения владельца релиза.

## Release gate (обязательный)

Перед релизом:
1. `check:seo`
2. `check:headers`
3. smoke ключевых страниц
4. ручной GA sanity-check:
   - page_view,
   - CTA события,
   - события формы.

После релиза:
1. postdeploy smoke.
2. Проверка GA4 Realtime.
3. Краткий verification report.

## Non-breaking analytics policy

1. Не удалять текущие события без migration window.
2. Новые параметры добавлять backward-compatible.
3. Consent-логика не изменяется без отдельного тест-плана.

## Release notes минимального формата

```md
Release date:
Scope:

SEO changes:
GEO changes:
Analytics changes:

Risk level:
Rollback plan:

Verification:
- release-gate:
- postdeploy smoke:
- GA realtime:
```

