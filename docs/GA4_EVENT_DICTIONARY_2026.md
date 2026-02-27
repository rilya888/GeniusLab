# GA4 Event Dictionary (2026)

## Цель

Зафиксировать контракт аналитики, чтобы релизы не ломали сбор данных и структуру событий.

## Принципы

1. События добавляются backward-compatible.
2. Удаление события возможно только после migration window.
3. Consent-mode обязателен: до согласия аналитические события не отправляются.

## События GA4 (обязательный baseline)

| Event | Trigger | Required params | Source |
|---|---|---|---|
| `page_view` | Первичная загрузка после consent / SPA-навигация | `page_path`, `page_title` | `SiteScripts`, `AnalyticsPageTracker` |
| `form_submit_click` | Клик по submit кнопке формы | `label` | `ContactForm` + delegation |
| `form_submit_attempt` | Начало submit после валидации consent/endpoint | `formId` | `ContactForm` |
| `form_submit_success` | Успешная отправка формы | `formId` | `ContactForm` |
| `form_submit_fail` | Ошибка отправки формы | `formId` | `ContactForm` |
| `cta_click_call` | Клик по call CTA | `label` | `data-track` + delegation |
| `cta_click_whatsapp` | Клик по WhatsApp CTA | `label` | `data-track` + delegation |
| `cta_click_contact` | Клик по contact CTA | `label` | `data-track` + delegation |

## Внутренние события (dataLayer / orchestration)

| Event | Назначение |
|---|---|
| `virtual_page_view` | Внутреннее SPA-событие, маппится в GA4 `page_view` |
| `consent_update` | Сигнал GTM/Consent Mode при смене согласия |

## Контракт payload

1. Для `virtual_page_view`: `page_path`, `page_title`.
2. Для form submit событий: `formId`.
3. Для CTA событий: `label`.
4. Для dataLayer event envelope: `event`, `page`, `ts`, payload.

## Источники истины в коде

1. `web/src/app/components/SiteScripts.tsx`:
   - `GA4_EVENTS`,
   - consent gate,
   - mapping `virtual_page_view` -> `page_view`.
2. `web/src/app/components/AnalyticsPageTracker.tsx`:
   - SPA route tracking.
3. `web/src/app/components/ContactForm.tsx`:
   - form submit event lifecycle.

## CI guardrails

1. `npm run check:analytics-contract` — должен проходить в каждом PR.
2. Изменение списка событий требует обновления этого документа.
3. Изменение consent-логики требует отдельного тест-плана в PR.

