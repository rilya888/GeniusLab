# Этап 01 — Audit Report (2026-02-24)

## Scope

Проверены 3 домена:
- https://www.avatech.info/
- https://www.assistenza-macbook.it/
- https://www.apple-assistenza.it/

Цель: собрать baseline по контенту, SEO, техническому состоянию, контактным данным и рискам миграции в `geniuslab.it`.

## Executive Summary

- `avatech.info` уже выглядит как обновленный сайт под бренд Genius Lab (статический, компактный).
- `assistenza-macbook.it` содержит широкую сервисную структуру (WordPress), но контентно и технически более тяжелый.
- `apple-assistenza.it` частично доступен, но критические техточки для SEO-миграции сломаны: `robots.txt` и sitemap endpoint'ы отдают error.
- Есть повторяемые текстовые блоки и конфликт по графику работы между страницами.
- Зафиксирован высокий риск юридических формулировок вокруг Apple-брендинга и заявлений о сертификации.

## Domain Health (snapshot)

| Домен | HTTP homepage | robots/sitemap | CMS/tech признаки | Вывод |
|---|---:|---|---|---|
| avatech.info | 200 | robots ok, sitemap ok | IIS + ASP.NET, статический HTML | Низкий техриск, малый URL-пул |
| assistenza-macbook.it | 200 | robots ok, sitemap ok | WordPress (AIOSEO, wp-json) | Средний техриск, большой URL-пул |
| apple-assistenza.it | 200 | robots 500, sitemap endpoints error payload | WordPress (Yoast/Elementor) | Высокий техриск миграции/индексации |

## Content Audit Findings

### 1) Дубли и повторяемые паттерны

Повторяется на нескольких доменах:
- формула `irreparabile, troppo costoso`
- блоки про `ripariamo direttamente le schede logiche`
- формула `Spengilo` (орфографически лучше `Spegnilo`)

### 2) Конфликтующие данные по часам

Обнаружены разные формулировки:
- `Lunedì - Venerdì 9:30 - 13:30 / 15:00 - 19:00, Sabato - Domenica chiuso`
- `Siamo aperti dal Lunedì al Sabato ... 15.00-19.30`

Это критично для NAP/Local SEO и для пользовательского доверия.

### 3) Контентные риски

- Много длинных SEO-абзацев, низкая сканируемость на mobile.
- Встречаются агрессивные claim'ы и формулировки, требующие legal-фильтра перед переносом.

## Technical Baseline (homepage quick scan)

| URL | HTML bytes | `<script>` count | stylesheets | images |
|---|---:|---:|---:|---:|
| https://www.avatech.info/ | 33,771 | 2 | 1 | n/a |
| https://www.assistenza-macbook.it/ | 115,304 | 46 | 14 | 18 |
| https://www.apple-assistenza.it/ | 126,000 | 51 | 47 | 4 |

Примечание: это экспресс-срез, не Lighthouse. Нужен полный CWV baseline в этапе 04/07.

## SEO Audit Findings

- `avatech.info` имеет короткий sitemap (4 URL) и понятные canonical.
- `assistenza-macbook.it` имеет расширенный sitemap index и сервисные URL (`/service/*`) — хорошая база для IA и one-to-one mapping.
- `apple-assistenza.it` имеет доступные страницы, но поломанные sitemap/robots мешают штатному audit crawler-проходу и повышают риск потерь при миграции.

## Migration Readiness (Stage 01)

- Источники для миграции подтверждены: 3 домена.
- Минимальный URL inventory собран.
- P1-пул (top 10 кандидатов) сформирован по критичности для лидов/навигации.
- Обязательные pre-migration риски зафиксированы:
  - конфликт часов/контактов;
  - поломка robots/sitemap на одном из доменов;
  - дублируемые и юридически чувствительные формулировки.

## Critical Risks

1. **R1: inconsistent contacts/hours (High)**
- Влияет на UX, GBP/NAP, schema consistency.

2. **R2: apple-assistenza robots/sitemap errors (High)**
- Влияет на полноту инвентаризации URL и последующую SEO-миграцию.

3. **R3: legal wording around Apple affiliation/certification (High)**
- Требует обязательного legal sign-off до публикации финальных текстов.

4. **R4: heavy WP frontends on source domains (Medium)**
- Риск неверного копирования legacy-структур в новый сайт вместо целевой упрощенной IA.

## Stage 01 Exit Status

Статус этапа 01 по доступным данным: **Completed with open owner inputs**.

Что готово:
- аудит 3 доменов (контент/SEO/техника);
- URL inventory и P1-кандидаты;
- legal pre-check список;
- baseline KPI-сетка;
- backlog для этапа 02.

Что требует owner на следующих шагах:
- финальное утверждение canonical contacts/hours;
- подтверждение юридически допустимых формулировок (Apple-related);
- подтверждение приоритета P1, если нужно изменить top 10.
