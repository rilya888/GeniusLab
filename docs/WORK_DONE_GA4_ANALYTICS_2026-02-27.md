# Отчёт о проделанной работе: GA4 Analytics

**Дата:** 2026-02-27  
**План:** [PLAN_GA4_ANALYTICS_FIX.md](PLAN_GA4_ANALYTICS_FIX.md)  
**Бэкап:** `backup/backup_web_2026-02-27_ga4-analytics/`

---

## Задача

Исправить отсутствие данных в Google Analytics 4. Tag Assistant показывал теги (GTM, GA4), но в GA4 Realtime данные не отображались. Причины: `page_view` не отправлялся при согласии пользователя; `virtual_page_view` и события форм/CTA шли только в dataLayer, GTM не пересылал их в GA4.

---

## Выполненные изменения

### 1. SiteScripts.tsx — pushConsentUpdate

- Добавлен параметр `options?: { sendPageView?: boolean }`
- `page_view` отправляется только при клике «Принять» (`sendPageView: true`), не при начальной синхронизации
- Устранено дублирование `page_view` для возвращающих посетителей

### 2. SiteScripts.tsx — GeniusAnalytics.track

- Добавлена отправка в GA4 через `gtag("event", ...)` для событий:
  - `virtual_page_view` → `page_view` (SPA-навигация)
  - `form_submit_attempt`, `form_submit_success`, `form_submit_fail`, `form_submit_click`
  - `cta_click_call`, `cta_click_whatsapp`, `cta_click_contact`
- dataLayer по-прежнему получает все события (для GTM)

### 3. index.html

- Заменён захардкоженный блок gtag на placeholder `<!-- GA4_GTAG_SNIPPET -->`
- Инжект сниппета выполняется Vite-плагином при сборке

### 4. vite.config.ts — ga4GtagPlugin

- Fallback `G-GYDPMQ4R49` при отсутствии `VITE_PUBLIC_GA4_ID`
- Плагин всегда инжектирует gtag (ранее возвращал identity при пустом env)

### 5. .env.example

- Добавлен пример `VITE_PUBLIC_GA4_ID=G-GYDPMQ4R49`

### 6. Документация

- **docs/ANALYTICS_ARCHITECTURE.md** — схема потока данных, роли компонентов, события, env
- **docs/PLAN_GA4_ANALYTICS_FIX.md** — план исправления
- **docs/PLAN_GOOGLE_ANALYTICS.md** — обновлён раздел troubleshooting

---

## Результат

- GA4 Realtime отображает активных пользователей и page views
- События CTA и форм попадают в GA4
- Consent Mode сохранён (данные только после «Принять»)
- Конфигурация через env (`VITE_PUBLIC_GA4_ID`)

---

## Коммит

```
2834004 fix(analytics): GA4 data collection — page_view on consent, gtag events, env-based config
```
