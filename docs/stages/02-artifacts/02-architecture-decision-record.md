# Этап 02 — Architecture Decision Record (v1)

Дата: 2026-02-24.

## ADR-001: Runtime and Rendering
- **Decision:** Astro, SSG-first, selective islands only where needed.
- **Why:** mobile performance, SEO control, low runtime complexity.
- **Consequence:** контент и страницы должны быть максимально статичными; интерактивность точечная.

## ADR-002: Canonical domain and migration
- **Decision:** canonical domain = `geniuslab.it`.
- **Sources:** `avatech.info`, `assistenza-macbook.it`, `apple-assistenza.it`.
- **Consequence:** обязательный one-to-one 301 mapping для приоритетных URL; fallback policy для unmatched URL.

## ADR-003: URL strategy
- **Decision:** итальянские slug-конвенции, сервисы под `/servizi/*`.
- **Consequence:** legacy service URL вида `/service/*` маппятся на `/servizi/*`.

## ADR-004: Forms and lead flow
- **Decision:** email-first forms в v1 + базовый антиспам + логирование ошибок.
- **Consequence:** единый контракт полей и единый success сценарий для всех форм.

## ADR-005: Consent and analytics
- **Decision:** analytics events gated by consent status.
- **Consequence:** до consent запрещена загрузка non-essential аналитики.

## ADR-006: Source-of-truth configuration
- **Decision:** один централизованный конфиг для contacts/hours/requisites/social.
- **Consequence:** UI + schema + policy используют один и тот же источник.

## ADR-007: External widgets resilience
- **Decision:** Reviews/Maps должны иметь fail-safe render.
- **Consequence:** поломка стороннего embed не должна ломать layout и критичный UX.

## Open items (owner-dependent)
- Финальные реквизиты/контакты (placeholder пока допустим).
- Окончательный legal-safe wording по Apple.
- Финальный email endpoint для форм.
