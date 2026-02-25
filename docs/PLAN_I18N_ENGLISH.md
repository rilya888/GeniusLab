# План: Английский язык и переключатель языков

> Референсный документ для реализации. Комментарии в коде — на английском; планы — на русском.

## Архитектурные решения

### URL-структура

- **Итальянский (по умолчанию):** `/`, `/servizi`, `/contatti`, `/chi-siamo`, `/recensioni`, `/privacy-policy`, `/cookie-policy`
- **Английский:** `/en`, `/en/services`, `/en/contacts`, `/en/about`, `/en/reviews`, `/en/privacy-policy`, `/en/cookie-policy`

Используется префикс `/en` для английского — удобно для SEO и hreflang.

### Источники текста

| Тип | Итальянский | Английский |
|-----|-------------|------------|
| UI (nav, footer, формы, consent) | `i18n/it.ts` | `i18n/en.ts` |
| Редактируемый контент (Servizi, страницы услуг) | `content.it.json` | `content.en.json` |
| Конфиг (телефоны, адреса) | `site.json` | общий |

### Связи компонентов

- LocaleContext → определяет locale из URL, даёт dict
- ContentContext → получает locale, fetch /api/content?lang=
- Компоненты → useLocale().dict, useContent()

---

## Порядок реализации

| # | Задача |
|---|--------|
| 1 | Создать `i18n/en.ts`, `i18n/types.ts` |
| 2 | Создать `LocaleContext`, `useLocale`, подключить |
| 3 | Обновить роуты: добавить `/en/*`, `LocaleLayout` |
| 4 | Обновить `routes.config`: маппинг путей, `getLocalizedPath` |
| 5 | Content API: `?lang=`, `content.it.json`, `content.en.json` |
| 6 | ContentContext: приём `locale`, fallback по языку |
| 7 | Компонент `LanguageSwitcher`, вставить в Navigation |
| 8 | Заменить `it` на `dict` во всех компонентах |
| 9 | SEOHead: `locale`, hreflang |
| 10 | Sitemap: пути для it и en, hreflang |
| 11 | Редиректы: /en/servizi → /en/services и т.п. |
| 12 | Админка: переключатель языка, API с `?lang=` |
| 13 | HTML lang attribute, JSON-LD inLanguage |
| 14 | Privacy/Cookie: полноценные юридические тексты (IT + EN) |

---

## Решения (подтверждено)

1. **Privacy и Cookie Policy:** Полноценные юридические тексты для Италии (итальянский), английский — перевод.
2. **Редиректы:** 301 с `/en/servizi` → `/en/services`, `/en/contatti` → `/en/contacts` и т.п.
3. **Маппинг путей:** Английские пути (`/about`, `data-recovery`, `contacts`, `services`) для `/en`.

---

## Файлы

| Файл | Действие |
|------|----------|
| `web/src/i18n/en.ts` | Создать |
| `web/src/i18n/types.ts` | Создать |
| `web/src/app/context/LocaleContext.tsx` | Создать |
| `web/src/app/components/LanguageSwitcher.tsx` | Создать |
| `web/src/app/routes.tsx` | Добавить `/en/*` |
| `web/src/app/routes.config.ts` | Маппинг путей, `getLocalizedPath` |
| `web/server/api/content.ts` | Параметр `lang`, чтение `content.{lang}.json` |
| `web/server/data/content.it.json` | Переименовать из content.json |
| `web/server/data/content.en.json` | Создать |
| `web/server/redirects.ts` | Редиректы /en/* |
| `web/server/seo.ts` | Sitemap для it и en |

Полный план: [.cursor/plans/english_+_language_switcher_15d4b36d.plan.md](../.cursor/plans/english_+_language_switcher_15d4b36d.plan.md)
