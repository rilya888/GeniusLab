# Отчёт о проделанной работе: 404 и локализация

**Дата:** 2026-02-25  
**План:** [PLAN_404_AND_LOCALIZATION.md](../PLAN_404_AND_LOCALIZATION.md)

---

## Проблема

При переключении языка (IT ↔ EN) на страницах сервисов (например, Riparazione iPhone) пользователь попадал на 404 вместо эквивалентной страницы на другом языке. Часть контента не переводилась.

---

## Выполненные изменения

### 1. routes.config.ts

- **IT_TO_EN_PATH:** добавлен маппинг для всех сервисных путей (`/servizi/iphone` → `/en/services/iphone`) и `/404` → `/en/404`
- **getServiceKeyFromPath:** нормализация slug — `decodeURIComponent`, `try/catch` для некорректного URL, удаление trailing slash (`\/+$`)
- **getLocalizedPath:** нормализация пути в начале функции (`const p = currentPath.replace(/\/+$/, "") || "/"`), добавлен `/en/404` в staticMap

### 2. routes.tsx

- Добавлены явные маршруты `{ path: "404", Component: NotFound }` перед `path: "*"` в обеих группах (root и en)
- URL `/404` и `/en/404` обрабатываются предсказуемо

### 3. GenericServicePage.tsx

- Редирект при отсутствии данных: `<Navigate to={getPath(locale, "notFound")} replace />` вместо `"/404"`
- Страница 404 отображается в текущей локали (IT или EN)

### 4. Legacy-страницы (it → dict)

Замена жёстко заданного `it` на `dict` из `useLocale()` в:
- MacBookService.tsx
- IPhoneService.tsx
- IPadService.tsx
- WatchService.tsx
- DataRecovery.tsx

### 5. Прочее

- **.gitignore:** добавлен `web/.vite/` для исключения кэша Vite из репозитория
- **PLAN_404_AND_LOCALIZATION.md:** создан файл плана в корне проекта

---

## Результат

- Fallback-контент для EN использует корректные пути (`/en/services/iphone` вместо `/en/servizi/iphone`)
- Переключение языка на страницах сервисов работает без 404
- Ссылки в Navigation и Services при locale=EN ведут на существующие маршруты
- Legacy-страницы готовы к локализации (используют `dict`)

---

## Коммит

```
fix: 404 on language switch, localization, explicit 404 routes

- routes.config: IT_TO_EN_PATH for service paths and /404
- getServiceKeyFromPath: slug normalization, decodeURIComponent, try/catch
- getLocalizedPath: path normalization (trailing slash)
- routes: explicit 404 routes before * (root and en)
- GenericServicePage: locale-aware 404 redirect via getPath
- Legacy pages: it -> dict (MacBookService, IPhoneService, etc.)
- Add PLAN_404_AND_LOCALIZATION.md, .gitignore web/.vite/
```

**Репозиторий:** https://github.com/rilya888/GeniusLab.git  
**Ветка:** main

---

## Рекомендуемая проверка

1. Переключение языка (IT↔EN) на страницах сервисов
2. Клики по сервисам в меню при locale=EN
3. Прямые URL `/404` и `/en/404`
