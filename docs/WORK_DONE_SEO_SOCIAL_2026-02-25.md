# Отчёт о проделанной работе: SEO-улучшения и ссылки на соцсети

**Дата:** 2026-02-25  
**Проект:** Genius Lab (geniuslab.it)

---

## Цель

Улучшить SEO, производительность и добавить ссылки на Instagram, TikTok, Facebook. Реализовано по плану `PLAN_SEO_SOCIAL_2026`.

---

## Выполненные задачи

### 1. Ссылки на соцсети

- **site.json:** добавлена секция `social` (instagram, tiktok, facebook) и `ogImage`
- **SocialLinks.tsx:** новый компонент с иконками (lucide Instagram, Facebook; inline SVG для TikTok)
- **Footer, Contact:** интеграция SocialLinks (вариант `light` для тёмного фона Contact)
- **i18n:** footer.followUs, instagram, tiktok, facebook (it/en)
- **jsonLd:** sameAs в LocalBusiness для соцсетей

### 2. OG-изображение

- **og-image.png:** создано изображение 1200x630 (логотип + брендинг Genius Lab)
- **SEOHead:** использование siteConfig.ogImage, og:image:width/height для og-image
- **site.json:** ogImage: "/og-image.png"

### 3. SEO-исправления

- **robots.txt:** Disallow: /admin
- **seo.ts:** getPathsFromContent() читает content.it.json, fallback на content.json
- **routes.config:** маппинг riparazione-macbook → macbook (legacy URL)
- **Recensioni:** JSON-LD WebPage (webPageJsonLd)
- **jsonLd.ts:** webPageJsonLd(), sameAs в localBusinessJsonLd

### 4. Производительность

- **vite.config:** manualChunks (vendor, motion) — основной чанк ~251 KB вместо 601 KB
- **Hero:** fetchpriority="high", loading="eager" для LCP-лого
- **index.html:** preload /logo.png, theme-color

### 5. Технические доработки

- **index.html:** meta theme-color="#ffffff"

---

## Решения пользователя

- Рейтинг: не добавлять (нет данных Google Business)
- SocialLinks: в Footer и Contact
- og-image: создать
- URL соцсетей: плейсхолдеры, заменить при получении

---

## Файлы

**Созданы:** SocialLinks.tsx, og-image.png, webPageJsonLd()

**Изменены:** site.json, it.ts, en.ts, Footer.tsx, Contact.tsx, jsonLd.ts, SEOHead.tsx, seo.ts, routes.config.ts, Recensioni.tsx, vite.config.ts, Hero.tsx, index.html

---

## Проверка

```bash
npm run build    # OK
npm run check:seo
npm run check:headers
```
