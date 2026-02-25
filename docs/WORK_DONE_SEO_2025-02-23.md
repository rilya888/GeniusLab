# Отчёт о проделанной работе: SEO Genius Lab

**Дата:** 23 февраля 2025  
**Проект:** Genius Lab — сайт Apple-сервиса в Риме  
**Стек:** Vite + React, Express, Tailwind, Railway

---

## Выполненные задачи

### 1. Скрытый H1 на главной

**Файл:** `web/src/app/components/Hero.tsx`

Добавлен семантический H1 для SEO, скрытый визуально (`sr-only`):

```tsx
<h1 className="sr-only">{brand.name} — {brand.tagline}</h1>
```

### 2. og:image, keywords, Twitter Card

**Файл:** `web/src/app/components/SEOHead.tsx`

- Проп `ogImage` (по умолчанию `/logo.png`)
- Проп `keywords` для meta keywords
- `twitter:card` (summary_large_image)
- `twitter:image` для превью в Twitter/X

### 3. Preconnect

**Файл:** `web/index.html`

Добавлены preconnect для ускорения загрузки:
- `https://www.googletagmanager.com`
- `https://formspree.io`
- `https://maps.googleapis.com`

### 4. JSON-LD

**Файл:** `web/src/app/utils/jsonLd.ts`

- **LocalBusiness:** часы работы 9:30–13:30 и 15:00–19:00, `addressCountry: "IT"`
- **Service:** параметр `path`, `url: base + path` для страниц услуг
- **breadcrumbJsonLd():** BreadcrumbList для навигации

**Contatti:** подключён `localBusinessJsonLd()` и keywords.

### 5. Sitemap

**Файл:** `web/server/seo.ts`

- `lastmod` — дата последнего изменения
- `changefreq` — weekly/monthly по типу страницы
- `priority` — 0.9 для главной, 0.8 для основных страниц, 0.7 для услуг

### 6. i18n расширения

**Файл:** `web/src/i18n/it.ts`

- **about:** intro, values[], timeline[], timelineTitle, keywords
- **reviews:** checkpoints[], fallbackText, checkpointsTitle, fallbackTitle, keywords
- **services:** metaDescriptions{}, servicesSectionTitle, problemsSectionTitle, ctaHelp, ctaContact, keywords

### 7. Компоненты

- **ChiSiamo.tsx:** рендер values, timeline из i18n
- **Recensioni.tsx:** рендер checkpoints, fallbackText из i18n
- **ServicePageTemplate.tsx:** metaDescriptions, breadcrumbJsonLd, serviceJsonLd с path, хардкод заменён на i18n

### 8. Документация

**Файл:** `web/docs/FORMSPREE.md`

Описание Formspree: что это, как настроить endpoint в site.json, переменные окружения.

---

## Не выполнено (опционально)

- **Prerender** — vite-plugin-prerender для улучшения индексации SPA
- **Параметр locale** — SEOHead и jsonLd пока не принимают locale (сейчас it_IT захардкожен)

---

## Деплой

Изменения развёрнуты на Railway:

```bash
cd "Projects/genius site" && railway up
```

---

## Бекап

Создан бекап после деплоя: `backup/backup_web_2025-02-23_seo-improvements/`

Описание: `backup/BACKUP_2025-02-23_SEO.md`
