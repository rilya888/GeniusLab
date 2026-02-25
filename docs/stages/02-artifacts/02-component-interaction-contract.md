# Этап 02 — Component Interaction Contract

## Scope

Контракт определяет взаимодействие `CTA -> Forms -> Consent -> Analytics -> Fallback`.

## Components

- `HeaderCTA` (call, whatsapp, contact)
- `ServiceCardCTA`
- `ContactForm`
- `AppointmentForm`
- `ConsentBanner`
- `ReviewsWidget`
- `MapWidget`

## Event contract (normalized names)

- `cta_click_call`
- `cta_click_whatsapp`
- `cta_click_contact`
- `form_submit_attempt`
- `form_submit_success`
- `form_submit_fail`
- `reviews_widget_loaded`
- `reviews_widget_fallback`
- `map_widget_loaded`
- `map_widget_fallback`

## Consent gating rules

1. До `consent.analytics = true` запрещены analytics события кроме strictly-necessary telemetry.
2. `form_submit_*` в аналитике отправляется только после consent; при отсутствии consent логирование ошибок формы остается внутренним (server/app logs).
3. UI должен работать полноценно даже при полном reject non-essential cookies.

## Form contract

Минимальные поля:
- `name` (required)
- `phone_or_email` (required)
- `message` (required)
- `consent_privacy` (required boolean)
- `source_page` (hidden)
- `source_cta` (hidden)

Success behavior:
- единый success message для всех форм;
- повторная отправка предотвращается на коротком интервале (anti-spam).

## External widget resilience

- При сбое `ReviewsWidget` показывать локальный fallback-блок `temporarily unavailable`.
- При сбое `MapWidget` показывать адрес + ссылки звонка/WhatsApp/text directions.
- Сбой виджета не должен ломать layout или блокировать form/CTA.
