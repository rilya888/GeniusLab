# Этап 5: Контент и SEO

[← К общему плану](../PLAN.md)

## Цель этапа

Подготовить качественный контент и оптимизировать сайт для поиска и локальной выдачи.

## Входные данные

- Рабочий фронтенд (этап 04)
- Отчёт аудита, бэклог по контенту (этап 01)
- Sitemap (этап 02)
- P1 migration map и P1 delivery report (top 10 URL)
- Дизайн-спецификация (`docs/DESIGN_SPEC.md`) и state matrix
- Canonical contacts/hours и placeholder source spec
- Legal pre-check list (формулировки по бренду Apple)

## Задачи

1. **Консолидация контента с 3 сайтов**
   - Выбрать лучший вариант текста для каждой целевой страницы
   - `assistenza-macbook.it`: использовать как основу структуры сервисных страниц
   - `apple-assistenza.it`: использовать релевантные блоки для Chi Siamo/Recensioni
   - `avatech.info`: использовать полезные дополнения по услугам
   - Приоритет публикации: сначала P1 top 10 страниц, затем остальные

2. **Редактирование текстов**
   - Устранение дублирования («irreparabile, troppo costoso» и т.п.)
   - Исправление ошибок (Spengilo → Spegnilo)
   - Уникализация блоков «Ricambi Originali», «Riparazioni Logic Board»
   - Сокращение длинных абзацев, разбиение на списки
   - Подготовка контента в словарях (locale `it`) для будущей мультиязычности
   - Удаление SEO-шума (переспам, спорные/неподтверждаемые claim'ы)
   - Проверка длины заголовков/абзацев под mobile-first и glass-layout ограничения

3. **Отдельные страницы под ключевые услуги**
   - MacBook (ремонт, display, батарея, SSD и т.д.)
   - iPhone / iPad
   - iMac
   - Data recovery
   - Flexgate, Tastiera и др.

4. **Meta tags, Open Graph**
   - Title, description для каждой страницы
   - OG-теги для соцсетей
   - Приоритетное покрытие P1 страниц в первой волне

5. **Schema.org**
   - LocalBusiness (адрес, телефон, часы, координаты)
   - Service — для страниц услуг
   - Решение для 2 точек (Lab/Store): один объект с `department` или два LocalBusiness
   - Синхронизация schema с canonical contacts/hours
   - Согласование полей schema с реальными блоками UI (чтобы избежать расхождений)

6. **Sitemap, robots.txt**
   - XML sitemap
   - robots.txt с правилами индексации

7. **Исправление расписания и контактов**
   - Единое расписание (Lun-Ven 9:30–13:30 / 15:00–19:00, Sab-Dom chiuso)
   - Каноничные телефоны и email по утверждённой таблице
   - Единое отображение адресов Lab/Store

8. **Local SEO**
   - Синхронизация с Google Business Profile
   - Проверка NAP (Name, Address, Phone) — единообразие на сайте и в профиле
   - Согласование блока Reviews: только Google Reviews без ручных текстовых отзывов

9. **SEO-подготовка к миграции**
   - Canonical на новых URL
   - Проверка отсутствия индексации служебных/дублирующих страниц
   - Чеклист для этапа Go/No-Go
   - Карта редиректов для 3 доменов
   - One-to-one маппинг старых URL на новые
   - Отдельный QA-набор для P1 top 10 (old URL -> new URL -> status -> canonical)
   - Content/SEO freeze за 48 часов до cutover (только критические правки по согласованию)

10. **Юридико-контентная валидация**
   - Проверка формулировок про ремонт техники Apple на соответствие legal-правилам
   - Удаление/переписывание спорных claim'ов до этапа 06
   - Согласование текстов consent рядом с формами

## Результаты

- **Финальные тексты** — все страницы с отредактированным контентом
- **SEO-разметка** — meta, OG, Schema.org
- **Sitemap** — актуальный XML sitemap
- **robots.txt** — настроен
- **P1 SEO pack** — meta/schema/canonical для top 10 страниц
- **Migration QA sheet** — таблица проверки one-to-one редиректов и canonical

## Связи с другими этапами

- **Legal Compliance** — Privacy Policy, Cookie Policy (тексты)
- **Запуск** — проверка индексации, Rich Snippets
- LocalBusiness schema поддерживает Google Reviews

## Критерии готовности

- [ ] Все тексты отредактированы и размещены
- [ ] P1 top 10 страницы закрыты в первой контентно-SEO волне
- [ ] Meta и Schema на всех страницах
- [ ] Sitemap сгенерирован
- [ ] NAP согласован с Google Business Profile
- [ ] Подготовлен SEO-чеклист миграции для этапа запуска
- [ ] Подготовлен one-to-one mapping для приоритетных URL трёх доменов
- [ ] Migration QA sheet для P1 заполнен и передан в этап 07
- [ ] Формулировки по бренду Apple очищены и согласованы с legal
- [ ] Freeze-пакет (48h) подготовлен и передан в этап запуска

## Артефакты этапа 05

- `docs/stages/05-artifacts/05-content-consolidation-map.csv`
- `docs/stages/05-artifacts/05-meta-template.csv`
- `docs/stages/05-artifacts/05-schema-plan.md`
- `docs/stages/05-artifacts/05-seo-migration-checklist.md`
