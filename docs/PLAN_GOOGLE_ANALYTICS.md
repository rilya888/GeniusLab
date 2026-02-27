# План подключения Google Analytics

## Реализовано (код)

- [x] AnalyticsPageTracker — SPA page view tracking
- [x] form_submit_success / form_submit_fail в ContactForm
- [x] data-track на CTA (Hero, ServicePageTemplate, GenericServicePage, MacBookService, IPhoneService, IPadService, WatchService, DataRecovery, Navigation)
- [x] Event delegation для data-track в SiteScripts
- [x] DEPLOY.md обновлён (VITE_PUBLIC_GTM_ID)
- [x] Прямой gtag.js в index.html (Vite plugin) — для прохождения проверки Google «Tag not detected»

**Осталось:** настройка GA4/GTM в интерфейсе Google, установка `VITE_PUBLIC_GTM_ID` и `VITE_PUBLIC_GA4_ID` в .env и Railway.

---

## Текущее состояние

Проект уже подготовлен под аналитику через GTM:

- `web/src/app/components/SiteScripts.tsx` — загружает GTM только после consent
- `web/src/app/components/ConsentBanner.tsx` — баннер согласия
- `web/src/app/components/VisitorBeacon.tsx` — анонимная аналитика без consent (собственный API)
- `web/src/app/components/ContactForm.tsx` — события `form_submit_attempt`, `form_submit_click`
- CSP в `web/server/index.ts` — уже разрешает `googletagmanager.com`, `google-analytics.com`

## Часть 1: Настройка в Google (вне кода)

### 1.1 Создать свойство GA4

1. [analytics.google.com](https://analytics.google.com) → Admin → Create Property
2. Тип: Web, URL: `https://geniuslab.it` (или ваш домен)
3. В свойстве: **Admin** → **Data Streams** → **Add stream** → **Web**
4. Stream URL: ваш домен, включить **Enhanced measurement**
5. Скопировать **Measurement ID** (формат `G-XXXXXXXXXX`)

**Настройки GA4 (Admin → Data Settings):**

- **Data retention**: 14 months (или 2 — для строгого GDPR)
- **IP anonymization**: включена по умолчанию в GA4

### 1.2 Создать контейнер GTM

1. [tagmanager.google.com](https://tagmanager.google.com) → Create Account/Container
2. Target platform: Web
3. Скопировать **Container ID** (формат `GTM-XXXXXXX`)

### 1.3 Настроить GA4 тег в GTM

1. **Tags** → New → Tag Configuration → **Google Analytics: GA4 Configuration**
2. Measurement ID: вставить `G-XXXXXXXXXX`
3. **Triggers:** добавить **два** триггера:
   - **All Pages** (для первой загрузки, когда consent уже есть)
   - **Custom Event** с именем `consent_update` (чтобы тег сработал, когда пользователь нажимает «Принять»)
4. **Важно:** снять галочку «Send a page view event when this configuration loads» — page_view идёт через virtual_page_view
5. **Consent Mode:** включить «Enable consent mode» — данные не собираются до согласия
6. Сохранить тег

**Создать триггер consent_update:** Triggers → New → Custom Event → Event name: `consent_update`

### Проверка и устранение неполадок

**«Tag not detected»:**
- Установите `VITE_PUBLIC_GA4_ID=G-GYDPMQ4R49` в .env и Railway — прямой gtag.js инжектится в HTML.
- В GTM отключите тег **Google Tag** (дублирование); GA4 Event тег — Measurement ID напрямую.

**«Не собирает данные»:**
1. При проверке **нажмите «Принять»** в баннере cookie — без согласия данные не отправляются (GDPR).
2. GA4 загружается через прямой gtag в HTML (не через GTM). События идут в GA4 напрямую из `GeniusAnalytics.track`.
3. В GA4: **Reports → Realtime** (не обычные Reports — они обновляются с задержкой 24–48 ч).
4. См. [docs/PLAN_GA4_ANALYTICS_FIX.md](PLAN_GA4_ANALYTICS_FIX.md) и [docs/ANALYTICS_ARCHITECTURE.md](ANALYTICS_ARCHITECTURE.md).

### 1.4 Настроить виртуальные page_view для SPA

**1.4.1 Data Layer Variables**

1. **Variables** → New → **Data Layer Variable**
2. Data Layer Variable Name: `page_path` → Save
3. Повторить для `page_title` → Save

**1.4.2 Custom Event trigger**

1. **Triggers** → New → **Custom Event**
2. Event name: `virtual_page_view` (точно так, как в коде)
3. Сохранить триггер

**1.4.3 GA4 Event тег**

1. **Tags** → New → Tag Configuration → **Google Analytics: GA4 Event**
2. Select Configuration Tag: выбрать GA4 Configuration из п. 1.3
3. Event Name: `page_view`
4. Event Parameters: `page_path` = `{{page_path}}`, `page_title` = `{{page_title}}`
5. Trigger: выбранный Custom Event триггер
6. Сохранить и **Publish** контейнер

## Часть 2: Изменения в коде

### 2.1 Переменные окружения

Файл: `web/.env`

```bash
VITE_PUBLIC_GTM_ID=GTM-XXXXXXX
VITE_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

- **VITE_PUBLIC_GA4_ID** — Measurement ID; при задании встраивает прямой gtag.js в HTML (прохождение проверки Google)
- **VITE_PUBLIC_GTM_ID** — Container ID для событий (virtual_page_view, form_submit, cta_click)

**Важно:** `VITE_` переменные встраиваются в бандл при **сборке**. После добавления в Railway → Variables нужен **Redeploy**.

### 2.2 SPA page view tracking

Создать `AnalyticsPageTracker.tsx` — пушит `virtual_page_view` в dataLayer при mount и при каждом изменении pathname. Исключить `/admin` пути.

### 2.3 События форм

Добавить в ContactForm: `form_submit_success` при успехе, `form_submit_fail` при ошибке.

### 2.4 CTA‑события

Добавить `data-track` на все `tel:` и `wa.me` ссылки: Hero, ServicePageTemplate, GenericServicePage, MacBookService, IPhoneService, IPadService, WatchService, DataRecovery, Navigation (ссылка Контакты).

### 2.5 Event delegation для data-track

Заменить querySelectorAll на event delegation в SiteScripts — один listener на document.

## Чек-лист выполнения

| #   | Задача                                                             | Файлы |
| --- | ------------------------------------------------------------------ | ----- |
| 1   | Создать GA4 property + Web Data Stream, получить Measurement ID    | —     |
| 2   | Создать GTM container, получить Container ID                       | —     |
| 3   | Добавить GA4 Configuration тег (All Pages, без auto page_view)     | —     |
| 4   | Создать Data Layer Variables: page_path, page_title                | —     |
| 5   | Добавить Custom Event trigger (virtual_page_view) + GA4 Event тег   | —     |
| 6   | Опубликовать GTM                                                   | —     |
| 7   | Установить VITE_PUBLIC_GTM_ID в .env и Railway, Redeploy           | web/  |
| 8   | Создать AnalyticsPageTracker, подключить в Root                    | web/  |
| 9   | Добавить form_submit_success/fail в ContactForm                   | web/  |
| 10  | Добавить data-track на CTA                                         | web/  |
| 11  | Обновить DEPLOY.md: чек-лист VITE_PUBLIC_GTM_ID                    | web/  |
| 12  | Event delegation для data-track в SiteScripts                      | web/  |
