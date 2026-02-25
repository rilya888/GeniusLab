# План реализации админ-панели Genius Lab

> Референсный документ для реализации. Комментарии в коде — на английском; планы — на русском.

## Текущее состояние

**Источники контента:**

- `web/src/i18n/it.ts` — `pages.services`: heading, subheading, links, descriptions, metaDescriptions, servicesSectionTitle, problemsSectionTitle
- `web/src/config/site.json` — brand, contacts, locations, hours
- Хардкод в компонентах: MacBookService, IPhoneService, IPadService, WatchService, DataRecovery — массивы services[], problems[], hero, секции «Why Choose Us», «Perché Scegliere» и т.д.
- `web/src/app/components/ServicePageTemplate.tsx` — 7 страниц (TastieraMacbook, DisplayMacbook и др.) получают данные через props

**Структура Servizi:**

1. **Сетка услуг** (`web/src/app/components/Services.tsx`): heading, subheading, карточки (links + descriptions). Количество услуг — редактируемое (добавление/удаление).
2. **Страницы услуг**: hero (title, subtitle), блок «Servizi di Riparazione» (services[]), блок «Problemi Comuni» (problems[]), CTA. **MVP:** только эти блоки. Позже: models[], situations[], «Why Choose Us».

---

## Архитектура (с учётом расширения)

- ContentProvider на фронте: при загрузке запрашивает `/api/content`, кэширует, fallback на `it.ts`
- Админка — отдельный роут `/admin`, защищённый
- API: GET /api/content (публичный), PUT /api/admin/content (auth)
- Хранилище: content.json (Railway Volume или Supabase для persistence)

---

## Этап 1: Схема контента и хранилище

### 1.1 Схема `content.json`

Файл: `web/server/data/content.json`

```json
{
  "services": {
    "heading": "Servizi",
    "subheading": "Riparazione MacBook, iMac, iPhone e recupero dati.",
    "items": [
      {
        "key": "macbook",
        "name": "Riparazione MacBook",
        "description": "Sostituzione schermo, batteria, tastiera e componenti.",
        "path": "/servizi/macbook",
        "order": 0
      }
    ]
  },
  "servicePages": {
    "macbook": {
      "heroTitle": "Riparazione MacBook Roma",
      "heroSubtitle": "Centro assistenza Apple...",
      "servicesSectionTitle": "Servizi di Riparazione MacBook",
      "problemsSectionTitle": "Problemi Comuni MacBook",
      "services": ["Sostituzione schermo MacBook", "..."],
      "problems": ["MacBook non si accende", "..."],
      "metaDescription": "Riparazione MacBook a Roma..."
    }
  }
}
```

**MVP — только базовые поля.** Позже: `models?`, `situations?`, `whyChooseUs?`.

**Иконки:** не в JSON. Файл `services.config.ts`: `key → LucideIcon`, `key → path`. Fallback Wrench.

### 1.2 Content API

- `GET /api/content` — весь content.json (публичный)
- `GET /api/content?section=services` — опционально по секциям
- `PUT /api/admin/content` — обновление (требует auth)

### 1.3 Валидация

- Zod-схема перед записью. Невалидный payload → 400.
- Опционально: backup `content.json.bak` перед перезаписью.

---

## Этап 2: Аутентификация

- `POST /api/admin/login` — body `{ password }`, сверка с `ADMIN_PASSWORD`
- Ответ: `{ token }` (JWT в httpOnly cookie или localStorage)
- `GET /api/admin/me` — проверка сессии
- Rate limiting: 5 попыток/мин на login
- `requireAuth` middleware для `/api/admin/*`

---

## Этап 3: ContentProvider

- `web/src/app/context/ContentContext.tsx`
- `fetch('/api/content')` при монтировании
- `useContent()` — content или fallback на `it.pages.services`

---

## Этап 4: UI админ-панели

**Структура:** `web/src/app/admin/`

- AdminLayout, AdminGuard, AdminLogin
- ServicesList — heading, subheading, items (add/remove)
- ServicePageEdit — hero, services[], problems[], section titles
- noindex для всех /admin страниц

**Роуты:** `/admin`, `/admin/login`, `/admin/services`, `/admin/services/:key`

---

## Этап 5: Динамические роуты

- Один роут `servizi/:slug` вместо 12 фиксированных
- GenericServicePage — данные из content по slug
- Sitemap из `content.services.items`
- Иконки: маппинг в коде, fallback Wrench

---

## Порядок реализации

| # | Задача |
|---|--------|
| 1 | content.json + начальные данные из it.ts |
| 2 | API GET /api/content |
| 3 | ContentProvider + useContent |
| 4 | Auth: login, requireAuth, rate limiting |
| 5 | API PUT /api/admin/content + Zod |
| 6 | AdminGuard, AdminLayout, AdminLogin |
| 7 | ServicesList editor |
| 8 | ServicePageEdit |
| 9 | Динамический servizi/:slug, GenericServicePage |
| 10 | Sitemap из content |
| 11 | Подключить Services.tsx и страницы к useContent |
| 12 | Деплой, env vars |

---

## Файлы

| Файл | Действие |
|------|----------|
| `web/server/data/content.json` | Создать |
| `web/server/api/content.ts` | Создать |
| `web/server/api/auth.ts` | Создать |
| `web/server/middleware/auth.ts` | Создать |
| `web/server/index.ts` | Добавить роуты API |
| `web/src/app/context/ContentContext.tsx` | Создать |
| `web/src/app/admin/*` | Создать |
| `web/src/app/routes.tsx` | Добавить /admin/*, servizi/:slug |
| `web/src/app/components/Services.tsx` | useContent |
| `web/src/app/config/services.config.ts` | key → icon, path |

---

## Хранение (Railway)

Файловая система эфемерна. Варианты: Railway Volume (`/app/data`), Supabase, GitHub. При использовании Volume: `CONTENT_FILE=/app/data/content.json`.

## GitHub storage (реализовано)

При наличии `GITHUB_TOKEN` и `GITHUB_REPO` сохранение из админки коммитит изменения в репозиторий. Подробности — в [docs/PLAN_GITHUB_CONTENT_STORAGE.md](PLAN_GITHUB_CONTENT_STORAGE.md).

**Логика:**
- `saveContent(data, message)` — единая точка сохранения; при GitHub — вызывает `saveContentToGitHub`, иначе — `writeContentLocal`
- В production при успешном сохранении в GitHub локальный файл не перезаписывается (fs может быть read-only)
- В dev — после успешного GitHub также пишем локально для консистентности
- 409 Conflict — API возвращает 409 с сообщением «Content was modified. Please refresh and try again.»

**Файлы:**
- `web/server/lib/github-content.ts` — модуль `saveContentToGitHub`
- `web/server/api/content.ts` — `saveContent()`, вызовы в putContent, putContentServices, putContentServicePage

## Env vars

- `ADMIN_PASSWORD` — пароль для входа в админку (обязательно в production)
- `ADMIN_SECRET` — секрет для JWT (по умолчанию = ADMIN_PASSWORD)
- `CONTENT_FILE` — путь к content.json (опционально)
- `GITHUB_TOKEN` — Personal Access Token с scope `repo` (для сохранения в GitHub)
- `GITHUB_REPO` — `owner/repo` (например `rilya888/GeniusLab`)
- `GITHUB_BRANCH` — ветка (default: `main`)
- `GITHUB_CONTENT_PATH` — путь к файлу (default: `web/server/data/content.json`)
