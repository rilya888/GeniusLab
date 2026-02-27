# Статус выполнения плана (2026-02-27)

## Что доведено до 100% в кодовой базе

1. Canonical policy:
   - `http -> https`
   - `www.geniuslab.info -> geniuslab.info`
   - trailing slash normalization
2. Release gate и CI-guardrails:
   - `check:release-gate`
   - `check:canonical-policy`
   - `check:geo-consistency`
   - `check:seo-content-quality`
   - `check:intent-map-sync`
   - `check:analytics-contract`
3. GEO/Local SEO:
   - LocalBusiness schema расширена под 2 точки (Lab/Store)
   - UI контактов синхронизирован с 2 адресами
4. SEO anti-cannibalization:
   - зафиксирована intent matrix
   - внедрены автоматические проверки синхронизации матрицы и контента
5. Analytics contract:
   - зафиксирован словарь GA4-событий
   - CI-проверка контракта событий
6. CSP fix для GA4:
   - добавлен `https://region1.google-analytics.com` в `connect-src`
   - проверка в `check:headers`

## Production-ready verification (вне кода, выполнить на домене)

1. Прогнать на `https://geniuslab.info`:
   - `check:postdeploy`
   - `check:headers`
   - `check:seo`
2. Проверить в Tag Assistant/GA4 Realtime:
   - исчезновение CSP-ошибки `region1.google-analytics.com/g/collect`
   - получение `page_view`, `cta_click_*`, `form_submit_*` после consent
3. Проверить Rich Results Test для ключевых страниц:
   - `/`
   - `/contatti`
   - `/servizi/macbook`

## Результат

Кодовая часть плана закрыта: guardrails, SEO/GEO/analytics-contract и CSP-фикс реализованы.
Остаются только production-подтверждения на живом домене.

