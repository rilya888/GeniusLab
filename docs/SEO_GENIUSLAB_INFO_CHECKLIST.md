# Чеклист SEO для geniuslab.info

> Действия владельца и внешние настройки. Референс: [PLAN_SEO_GENIUSLAB_INFO.md](PLAN_SEO_GENIUSLAB_INFO.md)

## 1. Railway custom domain

- [ ] Добавить geniuslab.info в Railway: Settings → Domains
- [ ] Добавить www.geniuslab.info → redirect на geniuslab.info (non-www canonical)
- [ ] Настроить DNS: CNAME на значение, указанное Railway

## 2. Переменные окружения (Railway)

- [ ] `PUBLIC_SITE_URL` = `https://geniuslab.info`
- [ ] `VITE_PUBLIC_SITE_URL` = `https://geniuslab.info`
- [ ] Redeploy после смены env

## 3. Google Search Console

- [ ] Добавить свойство geniuslab.info
- [ ] Подтвердить владение
- [ ] Отправить sitemap: `https://geniuslab.info/sitemap.xml`

## 4. Bing Webmaster Tools

- [ ] Добавить geniuslab.info
- [ ] Подтвердить владение
- [ ] Отправить sitemap: `https://geniuslab.info/sitemap.xml`

## 5. Google Business Profile

- [ ] Создать или обновить профиль
- [ ] Синхронизировать NAP (Name, Address, Phone) с сайтом

## 6. GA4

- [ ] В свойстве GA4: Admin → Data Streams → Web stream
- [ ] URL: `https://geniuslab.info`

## 7. Валидация

- [ ] [Rich Results Test](https://search.google.com/test/rich-results) — проверка LocalBusiness, FAQPage

## 8. 301-редиректы (опционально)

При появлении доступа к avatech.info, assistenza-macbook.it, apple-assistenza.it:

- [ ] Применить правила из `docs/stages/07-artifacts/07-redirect-rules-nginx.conf`

## 9. Content freeze

- [ ] За 48 ч до cutover — не менять контент и SEO

## 10. Будущее: aggregateRating

При наличии Google Reviews — добавить в LocalBusiness schema (`web/src/app/utils/jsonLd.ts`, функция `localBusinessJsonLd`).
