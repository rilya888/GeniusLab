# План улучшения SEO Genius Lab

> Документ для реализации. Комментарии в коде — на английском; планы — на русском.

## Архитектура для мультиязычности

- Структура `i18n/it.ts` — словарь для итальянского
- Все новые тексты — только в словарях, не хардкод в компонентах
- `SEOHead` и `jsonLd` — принимать `locale` (сейчас `it_IT`)

---

## Порядок реализации

1. Скрытый H1, og:image, keywords, Twitter Card в SEOHead
2. Preconnect в index.html
3. JSON-LD: LocalBusiness (Contatti, часы, addressCountry), Service (url, уникальное описание), BreadcrumbList
4. metaDescriptions для услуг в i18n + использование в ServicePageTemplate
5. Хардкод в ServicePageTemplate → i18n
6. Sitemap: lastmod, changefreq, priority
7. Тексты Chi-siamo и Recensioni в i18n + рендер в компонентах
8. Документ FORMSPREE.md
9. Prerender (опционально)

---

## 1. Скрытый H1 на главной

**Файл:** `web/src/app/components/Hero.tsx`

```tsx
<h1 className="sr-only">{brand.name} — {brand.tagline}</h1>
```

---

## 2. og:image и Twitter Card

**Файл:** `web/src/app/components/SEOHead.tsx`

- Проп `ogImage?: string` (по умолчанию `/logo.png`)
- Проп `keywords?: string`
- `twitter:card`, `twitter:image`

---

## 3. Preconnect

**Файл:** `web/index.html`

```html
<link rel="preconnect" href="https://www.googletagmanager.com" />
<link rel="preconnect" href="https://formspree.io" />
<link rel="preconnect" href="https://maps.googleapis.com" />
```

---

## 4. JSON-LD

**Файл:** `web/src/app/utils/jsonLd.ts`

- LocalBusiness: `openingHoursSpecification` — два слота (9:30–13:30, 15:00–19:00)
- LocalBusiness: `addressCountry: "IT"`
- Service: параметр `path`, `url: base + path`
- `breadcrumbJsonLd(items)`

**Contatti.tsx:** `jsonLd={localBusinessJsonLd()}`

---

## 5. Sitemap

**Файл:** `web/server/seo.ts`

- `SitemapEntry`: path, priority, changefreq
- `lastmod` — ISO date

---

## 6. i18n расширения

**Файл:** `web/src/i18n/it.ts`

- `pages.about`: intro, values[], timeline[]
- `pages.reviews`: checkpoints[], fallbackText
- `pages.services`: metaDescriptions{}, servicesSectionTitle, problemsSectionTitle, ctaHelp, ctaContact
- `keywords` по страницам

---

## 7. Компоненты

- **ChiSiamo.tsx:** рендер values, timeline из i18n
- **Recensioni.tsx:** рендер checkpoints из i18n
- **ServicePageTemplate.tsx:** metaDescriptions, breadcrumbJsonLd, убрать хардкод

---

## 8. FORMSPREE.md

Документ: что такое Formspree, как настроить endpoint в site.json.

---

## Файлы для изменения

| Файл | Изменения |
|------|-----------|
| Hero.tsx | Скрытый H1 |
| SEOHead.tsx | ogImage, keywords, twitter |
| index.html | preconnect |
| jsonLd.ts | openingHours, addressCountry, service url, breadcrumbJsonLd |
| Contatti.tsx | jsonLd |
| ServicePageTemplate.tsx | serviceJsonLd path, breadcrumbJsonLd, metaDescriptions, i18n |
| seo.ts | Sitemap lastmod, changefreq, priority |
| it.ts | about, reviews, services (metaDescriptions, titles), keywords |
| ChiSiamo.tsx | values, timeline |
| Recensioni.tsx | checkpoints |
| docs/FORMSPREE.md | Новый |
