# План: сохранение позиции скролла при смене языка

## Оптимальное решение

**Вариант:** определение «language switch» по путям (self-contained, без coupling).

ScrollToTop сам определяет, что навигация — это смена языка на ту же страницу, и в этом случае не вызывает `window.scrollTo`. Используется существующий `getLocalizedPath` из `routes.config.ts` как единый источник истины.

### Преимущества

- **Нет coupling:** ScrollToTop не зависит от LanguageSwitcher
- **Работает для любых сценариев:** переключатель, ссылки, редиректы, browser back/forward
- **Расширяемость:** при добавлении новых локалей достаточно обновить `getLocalizedPath`
- **Один источник истины:** логика путей только в `routes.config.ts`

### Будущие взаимодействия

| Компонент / сценарий | Поведение |
|----------------------|-----------|
| LanguageSwitcher | Сохраняет скролл — без изменений |
| Ссылки с `getLocalizedPath` в hreflang/SEO | Сохраняют скролл при переходе |
| Browser back/forward | Сохраняет скролл при возврате на ту же страницу в другой локали |
| Будущий auto-detect locale / redirect | Сохранит скролл без доработок |
| Добавление локали (de, fr) | Нужно расширить `isSamePageDifferentLocale` под новые локали |

---

## Детальный план реализации

### 1. Добавить `isSamePageDifferentLocale` в routes.config.ts

**Файл:** `web/src/app/routes.config.ts`

**Функция:** проверяет, что два пути — одна и та же страница в разных локалях.

```ts
/**
 * Returns true if both paths represent the same logical page in different locales.
 * Used to preserve scroll position on language switch.
 * Excludes admin paths — admin has no locale-equivalent, fallback would incorrectly match.
 */
export function isSamePageDifferentLocale(pathA: string, pathB: string): boolean {
  if (pathA === pathB) return false; // same path, not a switch
  const pA = pathA.replace(/\/+$/, "") || "/";
  const pB = pathB.replace(/\/+$/, "") || "/";
  if (pA.startsWith("/admin") || pB.startsWith("/admin")) return false;
  return getLocalizedPath(pA, "en") === pB || getLocalizedPath(pA, "it") === pB;
}
```

**Размещение:** после `getLocalizedPath`, перед `SITEMAP_PATHS`.

**Исключение admin:** `getLocalizedPath("/admin/services", "en")` возвращает `/en` (fallback). Без проверки переход admin → home ошибочно считался бы «language switch» и скролл не сбрасывался.

**Примечание:** при добавлении третьей локали (например, `de`) расширить проверку: `|| getLocalizedPath(pA, "de") === pB`. Либо вынести `const LOCALES = ["it", "en"]` и итерировать.

---

### 2. Обновить ScrollToTop

**Файл:** `web/src/app/components/ScrollToTop.tsx`

**Изменения:**

1. Импорт `isSamePageDifferentLocale` из `routes.config`.
2. `useRef` для хранения предыдущего `pathname`.
3. В `useEffect`: если `isSamePageDifferentLocale(prevPath, pathname)` — не скроллить.
4. В конце `useEffect` обновлять `prevPathRef.current = pathname`.

**Логика:**

```
if (hash) → scroll to element (unchanged)
else if (prevPathRef exists AND isSamePageDifferentLocale(prevPathRef.current, pathname)) → skip (preserve scroll)
else → window.scrollTo({ top: 0 })
finally → prevPathRef.current = pathname
```

**Обработка первого рендера:** при `prevPathRef.current === undefined` скролл выполняется (как при обычной загрузке страницы).

**Важно:** `prevPathRef.current = pathname` обновлять во всех ветках (включая preserve-scroll), иначе следующий переход будет использовать устаревшее значение.

---

### 3. Структура изменённого ScrollToTop

```tsx
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { isSamePageDifferentLocale } from "@/app/routes.config";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (
      prevPathRef.current !== undefined &&
      isSamePageDifferentLocale(prevPathRef.current, pathname)
    ) {
      // Same page, different locale — preserve scroll position
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    prevPathRef.current = pathname;
  }, [pathname, hash]);

  return null;
}
```

---

## Порядок выполнения

1. **routes.config.ts:** добавить и экспортировать `isSamePageDifferentLocale`.
2. **ScrollToTop.tsx:** импорт, `useRef`, обновлённая логика в `useEffect`.
3. **Проверка:** смена языка на странице сервиса при прокрутке вниз — скролл сохраняется; переход на другую страницу — скролл сбрасывается.

---

## Тестовые сценарии

| Сценарий | Ожидание |
|----------|----------|
| /servizi/iphone, скролл вниз → EN | Остаётся на том же месте |
| /en/services/iphone, скролл вниз → IT | Остаётся на том же месте |
| /servizi/iphone → клик «Contatti» | Скролл вверх |
| /servizi/iphone → EN → browser back | Остаётся на том же месте |
| Первая загрузка /servizi/iphone | Скролл вверх (как обычно) |
| /servizi/iphone#section → EN | Скролл сохраняется (hash пока не переносится) |
| /admin/services → переход на главную (/en) | Скролл вверх (admin не считается language switch) |
| Обновление страницы (F5) | Скролл вверх |

---

## Возможные доработки (вне текущего плана)

- **Hash при смене языка:** передавать hash в `getLocalizedPath` и в URL при переключении.
- **Search params:** `?foo=1` теряются при смене языка — при необходимости сохранять в `navigate(newPath + location.search)`.
- **Третья локаль:** расширить `isSamePageDifferentLocale` или вынести `const LOCALES = ["it", "en"] as const` и итерировать.
- **Scroll restoration API:** при необходимости — `history.scrollRestoration = "manual"` и явное сохранение/восстановление `scrollY`.

## Примечания

- **React Strict Mode:** в dev эффект может выполниться дважды; ref сбрасывается при remount — поведение корректно.
- **Комментарии в коде:** только на английском.
