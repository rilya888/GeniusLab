# Этап 01 — Prioritized Backlog for Stage 02

## P0 (must before architecture sign-off)

1. Закрыть canonical contacts/hours: единый финальный набор телефонов, адресов, расписания.
2. Зафиксировать целевые URL-конвенции для `/servizi/*` и mapping для P1 top 10.
3. Сформировать технический подход к обработке legacy-URL без прямого аналога.
4. Определить legal-safe copy framework для Apple-related формулировок.
5. Спроектировать source-of-truth конфиг для контактов/requisites/social placeholders.

## P1 (high priority in architecture)

1. Подготовить полную redirect map (не только P1).
2. Зафиксировать event contract: CTA click, form success/fail, consent gating.
3. Определить решение форм (Formspree/Netlify/custom backend) с антиспам-стратегией.
4. Описать fallback-поведение для Reviews/Maps (не ломать страницу при сбое виджета).
5. Подготовить каркас runbook + rollback критерии на уровне архитектуры.

## P2 (follow-up)

1. Подготовить резерв IA под будущий блог (`/blog`) без релизного включения.
2. Подготовить i18n dictionary layout (IT now, EN/RU later).
3. Согласовать baseline visual regression strategy для P1 (mobile + desktop).
