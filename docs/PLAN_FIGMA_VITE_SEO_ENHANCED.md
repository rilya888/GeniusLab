# Расширенный план реализации: Figma + Vite + SEO (Genius Lab)

> Рабочий документ для реализации. Комментарии в коде — на английском, план и процесс — на русском.

## 1) Цели и рамки

- Перенести сайт на Vite + React на базе дизайна `Apple Service Center Website`.
- Обеспечить индексируемый SSR-рендер для ключевых страниц.
- Сохранить и усилить SEO при миграции (без потери трафика из-за смены URL/архитектуры).
- Сохранить контентную основу из текущего `web/` (`site.json`, `i18n`, страницы).

**Ключевой результат:** после релиза поисковые боты получают полноценный HTML, корректные canonical/structured data, а старые URL правильно редиректятся на новые.

---

## 2) Принципы реализации

- **Single source of truth для роутов:** один модуль маршрутов для React Router + sitemap + internal links.
- **Каноникализация URL на уровне сервера:** единые правила домена/протокола/слеша/регистра.
- **Fail-safe SSR:** при сбое SSR — контролируемый fallback, без пустого HTML.
- **SEO-проверки в CI:** базовые регрессии ловятся до деплоя.
- **Постепенная миграция:** backup, redirect map, runbook и rollback до прод-релиза.

---

## 3) Архитектура

- Frontend: Vite + React + React Router + Tailwind.
- Server: Express (SSR + SEO endpoints + redirects + healthz + security headers).
- SEO слой:
  - `robots.txt`
  - `sitemap.xml`
  - canonical
  - meta/OG
  - JSON-LD
- Data:
  - `src/config/site.json`
  - `src/i18n/it.ts`
  - `src/app/routes.ts` (единый реестр маршрутов)

---

## 4) Этапы работ (с Definition of Done)

## Этап 1. Инициализация и перенос структуры

**Задачи**
- Подготовить backup текущего `web/`.
- Заменить `web/` на Vite + React основу.
- Перенести `site.json`, `i18n/it.ts`, базовые ассеты.
- Очистить лишние зависимости.

**DoD**
- `npm install` проходит без ошибок.
- `npm run dev` поднимает приложение.
- Контент `site.json` и `i18n` подключен и используется хотя бы на одной странице.

## Этап 2. SSR и backend-ядро

**Задачи**
- Поднять Express SSR (`server/index.js|ts`).
- Реализовать `/robots.txt`, `/sitemap.xml`, `/healthz`.
- Добавить `PUBLIC_SITE_URL` и валидацию env.
- Ввести `routes.ts` как источник маршрутов.

**DoD**
- `curl /healthz` => `200 ok`.
- `curl /robots.txt` возвращает корректный `Sitemap:`.
- `curl /sitemap.xml` содержит все индексируемые страницы.
- SSR-ответ содержит HTML контент страницы, а не пустой root.

## Этап 3. Head/Meta/Schema

**Задачи**
- Создать `SEOHead` (title, description, canonical, og, noindex, jsonLd).
- Подключить `SEOHead` ко всем страницам.
- Добавить JSON-LD для Home/Services/Contacts.

**DoD**
- У каждой индексируемой страницы есть уникальные `title`/`description`/`canonical`.
- `/404` имеет `noindex`.
- JSON-LD валиден (проверка через Rich Results Test вручную).

## Этап 4. Адаптация компонентов из Figma

**Задачи**
- Навигация, Hero, Services, Process, Contact, Footer, ScrollToTop, MapEmbed, ReviewsEmbed.
- Все данные подтягиваются из `site.json`/`i18n`, без захардкоженных контактов.

**DoD**
- Ключевые блоки соответствуют макету и данным конфигурации.
- На мобильном и десктопе нет layout breakage.

## Этап 5. Маршруты и страницы

**Задачи**
- Реализовать страницы: Home, Services list, 9 service detail, Contatti, Chi-siamo, Recensioni, Privacy, Cookie, 404.
- Шаблон `ServiceDetail` для унификации.

**DoD**
- Все маршруты открываются без 404/500.
- Ссылки в навигации и футере ведут на корректные URL.

## Этап 6. Формы, consent и аналитика

**Задачи**
- ContactForm (Formspree или аналог) + валидация.
- Consent banner + сохранение решения в localStorage.
- SiteScripts: GTM грузится только после согласия.

**DoD**
- Отправка формы работает.
- До consent аналитика не активируется.
- События `data-track`/`data-form` обрабатываются.

## Этап 7. Стили, анимации, accessibility

**Задачи**
- Tailwind tokens, адаптив, `prefers-reduced-motion`.
- Семантика (`main/nav/header/footer`), skip link, focus-visible.

**DoD**
- Нет критичных accessibility-блокеров (клавиатурная навигация, focus).
- Анимации отключаются при reduced motion.

## Этап 8. SEO hardening

**Задачи**
- Canonical на всех индексируемых страницах.
- `html lang="it"`.
- robots policy (в т.ч. служебные пути).
- BreadcrumbList для сервисных страниц (опционально, но желательно).

**DoD**
- Каноникал на странице совпадает с финальным URL.
- Служебные страницы исключены из индексации.

## Этап 9. Сборка, деплой, безопасность

**Задачи**
- Build client+server.
- Dockerfile multi-stage.
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP.
- Railway deploy + health check.

**DoD**
- Прод-приложение стартует и проходит health check.
- CSP не ломает Formspree/GTM/Maps.

## Этап 10. Тестирование и запуск

**Задачи**
- Route smoke, Lighthouse, мобильная вёрстка, формы/consent.
- GSC/Bing: отправка sitemap после релиза.

**DoD**
- Релизный чеклист закрыт.
- Нет критичных 5xx/JS ошибок после запуска.

---

## 5) Обязательные дополнения к исходному плану

## 5.1 Redirect map (301)

Создать таблицу миграции `old_url -> new_url` и реализовать серверные `301`.

Минимальный формат:

| old_url | new_url | type |
|---|---|---|
| /old-path | /servizi/new-path | 301 |

Правила:
- Без chain redirects (только один шаг).
- Все legacy URL покрыты до релиза.

## 5.2 Единая каноникализация URL

На уровне сервера:
- `http -> https` (если за прокси, учитывать `x-forwarded-proto`).
- `www -> non-www` (или наоборот, выбрать одно и зафиксировать).
- trailing slash policy (например, без завершающего `/`, кроме root).
- lowercase policy для путей (если применимо).

## 5.3 SSR fallback strategy

Если SSR падает:
- логируем ошибку (с route/request id),
- возвращаем контролируемый HTML fallback,
- не отдаём пустой контейнер.

## 5.4 Observability

- Логи SSR-ошибок и ошибок рендеринга.
- Базовые метрики: 5xx count, response time p95.
- Алерт при росте 5xx (на уровне платформы/мониторинга).

## 5.5 SEO regression checks (CI)

Автопроверки в pipeline:
- `/robots.txt` доступен и содержит sitemap URL.
- `/sitemap.xml` валидный XML и содержит ключевые маршруты.
- canonical на ключевых страницах присутствует и абсолютный.
- `/404` содержит `noindex`.

---

## 6) Performance budget

Зафиксировать цели:
- LCP <= 2.5s (mobile, p75)
- CLS <= 0.1
- INP <= 200ms
- JS initial (gzip) <= 220KB (цель)

Если превышение — блокер к релизу или отдельный fast-follow с owner/сроком.

---

## 7) Стратегия изображений

- Hero/ключевые изображения в `webp`/`avif`.
- `srcset/sizes` для responsive.
- Lazy loading для ниже первого экрана.
- Preload только для реально критичного изображения.

---

## 8) Release runbook (обязательно)

1. Freeze контента/роутов перед релизом.
2. Backup текущего `web/` и конфигов.
3. Проверка env (`PUBLIC_SITE_URL`, form endpoint, GTM).
4. Деплой на staging, затем smoke.
5. Проверка SSR/robots/sitemap/canonical/form/consent.
6. Прод-деплой.
7. Post-deploy smoke + мониторинг 30-60 минут.
8. Отправка sitemap в GSC/Bing.

---

## 9) Rollback план

Условия rollback:
- массовые 5xx,
- критичный SEO дефект (невалидный robots/sitemap/canonical),
- неработающие ключевые формы.

Действия:
1. Вернуть предыдущий стабильный релиз.
2. Проверить healthz и ключевые страницы.
3. Зафиксировать причину и corrective actions.

---

## 10) Структура файлов (целевая)

```text
web/
├── server/
│   └── index.ts                # Express SSR + redirects + SEO routes
├── src/
│   ├── app/
│   │   ├── routes.ts           # source of truth маршрутов
│   │   └── router.tsx
│   ├── components/
│   │   └── SEOHead.tsx
│   ├── config/
│   │   └── site.json
│   ├── i18n/
│   │   └── it.ts
│   ├── pages/
│   └── server/
│       ├── seo.ts              # robots/sitemap/canonical utils
│       └── redirects.ts        # redirect map
└── public/
```

---

## 11) Чеклист перед production

- [ ] Все legacy URL покрыты 301 mapping.
- [ ] Канонический домен и URL policy зафиксированы и применены.
- [ ] `robots.txt`, `sitemap.xml`, `healthz` работают.
- [ ] На страницах есть корректные title/description/canonical.
- [ ] `/404` имеет `noindex`.
- [ ] JSON-LD валиден на ключевых страницах.
- [ ] Consent блокирует аналитику до согласия.
- [ ] CSP не блокирует необходимые интеграции.
- [ ] Lighthouse/ручные проверки пройдены на mobile+desktop.
- [ ] Runbook и rollback проверены командой.

---

## 12) Открытые решения (заполнить до реализации)

- Канонический домен: `____________________`
- Политика trailing slash: `____________________`
- Набор legacy URL для 301: `____________________`
- Формат SSR fallback страницы: `____________________`
- Целевые лимиты performance для блокирующего релиза: `____________________`
- План мультиязычности (если нужен в ближайших релизах): `____________________`
