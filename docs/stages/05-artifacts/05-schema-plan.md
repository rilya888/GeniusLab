# Этап 05 — Schema Plan

## Primary schema objects

1. `LocalBusiness` (or parent + department model for Lab/Store)
2. `Service` for each `/servizi/*` page
3. `FAQPage` only where curated and non-spammy
4. `BreadcrumbList` on all content pages

## Consistency rules

- NAP data strictly from centralized config (`web/src/config/site.json` until final source is moved).
- UI contact block and schema fields must match exactly.
- No schema fields with placeholder values at production cutover.

## Open decision

`Lab + Store` representation:
- Option A: one `LocalBusiness` + `department`.
- Option B: two `LocalBusiness` entities with shared parent organization.

Recommendation: Option A for v1 simplicity.
