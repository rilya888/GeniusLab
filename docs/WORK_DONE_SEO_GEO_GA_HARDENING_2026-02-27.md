# Отчёт о проделанной работе: SEO/GEO/GA hardening

**Дата:** 2026-02-27  
**Домен:** `geniuslab.info`

## Цель

Довести проект до production-ready состояния по SEO/GEO и зафиксировать аналитический контракт без поломки текущей работы сайта и GA.

## Выполнено

### 1. Canonical URL policy

- Реализована серверная каноникализация:
  - `http -> https`
  - `www.geniuslab.info -> geniuslab.info`
  - удаление trailing slash (кроме `/`)
- Вынесена в отдельный модуль `web/server/canonical.ts`

### 2. Release gate и CI guardrails

Добавлены и подключены автоматические проверки:

- `check:release-gate`
- `check:canonical-policy`
- `check:geo-consistency`
- `check:seo-content-quality`
- `check:intent-map-sync`
- `check:analytics-contract`

CI workflow обновлён (`.github/workflows/web-ci.yml`).

### 3. GEO / Local SEO

- `LocalBusiness` schema расширена под 2 точки (Lab/Store) через `department`
- Сохранена консистентность geo-данных
- UI контактов показывает обе локации

### 4. Контентный контроль (anti-cannibalization)

- Создана матрица интентов: `docs/SEO_INTENT_MATRIX_2026.md`
- Добавлен скрипт синхропроверки матрицы и `content.it/en.json`
- Добавлен quality-check мета и контента

### 5. Analytics contract

- Зафиксирован словарь событий: `docs/GA4_EVENT_DICTIONARY_2026.md`
- Добавлена автоматическая проверка контракта аналитики:
  - список baseline событий
  - consent gate
  - mapping `virtual_page_view -> page_view`
  - обязательные form event payload

### 6. Исправление ошибки счётчика (Tag Assistant)

- Исправлена CSP-проблема: добавлен `https://region1.google-analytics.com` в `connect-src`
- Обновлена проверка `check-headers.sh` для контроля этого домена

## Проверки

Локально подтверждено:

- `npm run check:analytics-contract` — OK
- `npm run check:intent-map-sync` — OK
- `npm run check:seo-content-quality` — OK
- `npm run check:geo-consistency` — OK
- `npm run check:canonical-policy` — OK
- `npm run check:release-gate` — OK

## Бекап

Создан snapshot: `backup/backup_web_2026-02-27_seo-geo-ga-hardening/`  
Описание: `backup/BACKUP_2026-02-27_SEO_GEO_GA_HARDENING.md`

## Примечание

Кодовая часть плана закрыта; остаются регулярные production-проверки (GA Realtime, Rich Results, Search Console, GBP/NAP consistency).
