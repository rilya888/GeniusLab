# Этап 01 — KPI Baseline Sheet (initial)

Дата: 2026-02-24.

## KPI baseline status

| Метрика | Baseline | Источник | Комментарий |
|---|---|---|---|
| Organic clicks/impressions (local queries) | TBD | GSC (owner access required) | Нет доступа в рамках этапа 01 |
| Form submissions / calls / WhatsApp CTR | TBD | Analytics/CRM/call tracking | На source-доменах нет единого трекинга |
| CWV (LCP/INP/CLS) | Proxy only | Quick HTML scan | Нужны Lighthouse/field данные в 04/07 |
| Redirect readiness coverage | Partial | URL inventory | База URL есть, требуется расширение по full crawl |
| 404 ratio post-migration | N/A pre-launch | Hypercare monitoring | Считается после cutover |

## Технический proxy baseline (homepages)

| Домен | HTML size | Scripts | Stylesheets | Вывод |
|---|---:|---:|---:|---|
| avatech.info | 33,771 bytes | 2 | 1 | Легкая страница, вероятно лучший исходник по perf |
| assistenza-macbook.it | 115,304 bytes | 46 | 14 | Тяжелый WP фронт, риск CWV на mobile |
| apple-assistenza.it | 126,000 bytes | 51 | 47 | Очень тяжелый фронт + техошибки robots/sitemap |

## Baseline gaps to close in stage 02

1. Получить GSC baseline по 3 доменам (clicks, queries, top pages).
2. Подтвердить lead baseline (формы/звонки/WhatsApp) от owner.
3. Запустить полный crawl URL (включая глубинные страницы, где это доступно).
4. Зафиксировать список P1 с owner (текущий draft уже создан).
