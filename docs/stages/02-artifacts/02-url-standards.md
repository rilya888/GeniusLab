# Этап 02 — URL Standards

## Core rules

1. Lowercase only.
2. Hyphen-separated words.
3. No trailing file extensions (`.html`, `.php`).
4. Итальянские slug'и для контентного консистенси.
5. Одна целевая страница на один intent (avoid near-duplicate routes).

## Service mapping convention

- Source: `/service/<legacy-slug>/`
- Target: `/servizi/<normalized-slug>`

Примеры:
- `/service/riparazione-macbook/` -> `/servizi/riparazione-macbook`
- `/service/data-recovery/` -> `/servizi/data-recovery`

## Legacy non-service pages

- `/contattaci/` -> `/contatti`
- `/avatech-chi-siamo/` -> `/chi-siamo`
- `/recensioni/` -> `/recensioni`

## Canonical policy

- Canonical всегда указывает на `https://geniuslab.it/<target-path>`.
- Все альтернативы (`index.html`, query duplicates, legacy aliases) редиректят 301.
