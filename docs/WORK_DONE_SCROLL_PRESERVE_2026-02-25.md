# Отчёт о проделанной работе: сохранение скролла при смене языка

**Дата:** 2026-02-25  
**План:** [PLAN_SCROLL_PRESERVE_ON_LANGUAGE_SWITCH.md](../PLAN_SCROLL_PRESERVE_ON_LANGUAGE_SWITCH.md)

---

## Задача

При смене языка (IT ↔ EN) на странице пользователь терял позицию скролла — страница перерисовывалась с прокруткой в начало.

---

## Решение

ScrollToTop определяет, что навигация — это смена языка на ту же страницу (по путям), и в этом случае не вызывает `window.scrollTo`. Используется `getLocalizedPath` из `routes.config.ts`.

---

## Выполненные изменения

### 1. routes.config.ts

Добавлена функция `isSamePageDifferentLocale(pathA, pathB)`:
- Проверяет, что оба пути — одна и та же страница в разных локалях
- Исключает `pathA === pathB` (одинаковый путь)
- Исключает пути, начинающиеся с `/admin` (fallback дал бы ложное совпадение)
- Использует `getLocalizedPath` для сравнения

### 2. ScrollToTop.tsx

- `useRef` для хранения предыдущего `pathname`
- При `isSamePageDifferentLocale(prevPath, pathname)` — не скроллить (сохранить позицию)
- При `hash` — скролл к элементу (без изменений)
- В остальных случаях — `window.scrollTo({ top: 0 })`
- `prevPathRef` обновляется во всех ветках

---

## Результат

- Смена языка на странице сервиса при прокрутке вниз — скролл сохраняется
- Переход на другую страницу — скролл сбрасывается
- Browser back/forward — скролл сохраняется при возврате на ту же страницу в другой локали
- Admin → home — скролл сбрасывается

---

## Коммит

```
feat: preserve scroll position on language switch

- routes.config: add isSamePageDifferentLocale (excludes admin paths)
- ScrollToTop: skip scroll-to-top when same page, different locale
- Add PLAN_SCROLL_PRESERVE_ON_LANGUAGE_SWITCH.md
```

**Репозиторий:** https://github.com/rilya888/GeniusLab.git  
**Ветка:** main
