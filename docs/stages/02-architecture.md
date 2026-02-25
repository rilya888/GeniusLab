# Этап 2: Архитектура и инфраструктура

[← К общему плану](../PLAN.md)

## Цель этапа

Выбрать технологический стек и спроектировать структуру проекта для единого сайта geniuslab.it, включая мультидоменную миграцию и формы.

## Входные данные

- Отчёт аудита (этап 01)
- Документ требований
- Приоритизированный бэклог
- P1 список URL (top 10 для миграции)
- Canonical contacts/hours
- Legal pre-check list (формулировки по бренду Apple)

## Задачи

1. **Выбор стека**
   - Выбор: **Astro** (SSG-first) как основной стек v1
   - Обоснование: высокий приоритет mobile производительности, SEO и минималистичного UI
   - Резерв: при росте динамики — точечные islands/интеграции без смены базовой архитектуры

2. **Структура страниц и навигации (Information Architecture)**
   - Sitemap: главная, услуги (отдельные страницы), контакты, Recensioni, Chi Siamo
   - Навигация, хлебные крошки
   - URL-конвенции: единый стиль slug'ов (`/servizi/...`) и правила именования
   - Явная привязка P1 URL к целевым страницам новой IA

3. **Схема компонентов и переиспользование**
   - Header, Footer, CTA, карточки услуг, формы
   - Резерв под будущее: CRM
   - Схема словарей/ключей для i18n (релиз IT, готовность к EN/RU)
   - Контракт взаимодействия компонентов: CTA -> формы -> analytics events -> legal consent
   - Единый источник placeholder-данных (контакты/legal/соцсети) для всех страниц

4. **Инфраструктура**
   - Хостинг: **Railway**
   - CDN, HTTPS/SSL
   - CI/CD (GitHub Actions и т.п.)

5. **Стратегия миграции домена**
   - Источники: avatech.info, assistenza-macbook.it, apple-assistenza.it
   - Назначение: geniuslab.it
   - Карта one-to-one 301 редиректов (старые URL → релевантные новые)
   - План DNS cutover, проверка доступности домена geniuslab.it
   - Резервный подход для URL без прямого аналога
   - Отдельный приоритетный контур миграции для P1 (top 10) и их QA-проверка

6. **Формы**
   - Доставка заявок на email
   - Варианты: Formspree, Netlify Forms, собственный backend
   - Базовая антиспам-стратегия (honeypot/captcha/rate limit)
   - Архитектура конфигурации placeholders: email/телефоны/реквизиты из аудита
   - Единый формат событий для аналитики (submit success/fail, CTA click)
   - Один сценарий успешной отправки (единое success-message для всех форм)

7. **Google Reviews**
   - Только Google Reviews (без ручного переноса текстовых отзывов)
   - Контракт интеграции: graceful fallback при недоступности виджета
   - Fallback без внешних кнопок/ссылок

8. **Безопасность и эксплуатация**
   - Политика security headers (CSP, HSTS и др.)
   - Каркас runbook/rollback для запуска
   - Базовый performance budget для анимаций и внешних виджетов
   - Правила хранения секретов и env-переменных (формы, аналитика)
   - Канал оповещений: email + Telegram

9. **Архитектурные ограничения под будущие этапы**
   - Совместимость IA с SEO/redirect mapping и schema.org
   - Совместимость компонентов с design tokens и mobile-first breakpoints
   - Совместимость с legal-требованиями (consent gate перед аналитикой)
   - Release gate: финальные реквизиты и телефоны должны быть получены до production cutover

## Результаты

- **Документ архитектуры** — стек, обоснование решений
- **Sitemap** — структура страниц и URL
- **Карта редиректов** — таблица для 3 доменов → geniuslab.it
- **P1 migration map** — отдельный список top 10 URL с финальными целями
- **Структура папок проекта** — репозиторий, модули
- **I18N-стратегия** — словари, ключи, правила локализации
- **URL-стандарты** — правила маршрутов и slug'ов
- **Component interaction contract** — как формы/CTA/analytics/legal связаны между собой
- **Placeholder source spec** — где и как хранятся временные контакты/legal/соцсети

## Связи с другими этапами

- **Дизайн** — следует структуре страниц и компонентов
- **Разработка** — реализует выбранный стек и структуру
- **Legal Compliance** — учитывает сбор данных в формах (GDPR)

## Критерии готовности

- [ ] Стек выбран и обоснован
- [ ] Sitemap утверждён
- [ ] Карта редиректов составлена
- [ ] One-to-one mapping покрывает приоритетные URL трёх доменов
- [ ] P1 migration map (top 10) согласован
- [ ] Решение по формам зафиксировано
- [ ] Домен geniuslab.it проверен на доступность
- [ ] I18N-подход и антиспам-стратегия зафиксированы
- [ ] Контракты взаимодействия компонентов зафиксированы
- [ ] Зафиксированы Railway deployment и каналы оповещений (email + Telegram)
- [ ] Зафиксирован release gate по финальным реквизитам/телефонам

## Артефакты этапа 02

- `docs/stages/02-artifacts/02-architecture-decision-record.md`
- `docs/stages/02-artifacts/02-sitemap-ia.md`
- `docs/stages/02-artifacts/02-url-standards.md`
- `docs/stages/02-artifacts/02-redirect-map.csv`
- `docs/stages/02-artifacts/02-p1-migration-map.csv`
- `docs/stages/02-artifacts/02-component-interaction-contract.md`
- `docs/stages/02-artifacts/02-placeholder-source-spec.md`
- `docs/stages/02-artifacts/02-runbook-outline.md`
