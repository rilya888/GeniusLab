# План: сохранение позиции скролла при смене языка

## Оптимальное решение

**Вариант:** определение «language switch» по путям (self-contained, без coupling).

ScrollToTop сам определяет, что навигация — это смена языка на ту же страницу, и в этом случае не вызывает `window.scrollTo`. Используется существующий `getLocalizedPath` из `routes.config.ts` как единый источник истины.

### Преимущества

- **Нет coupling:** ScrollToTop не зависит от LanguageSwitcher
- **Работает для любых сценариев:** переключатель, ссылки, редиректы, browser back/forward
- **Расширяемость:** при добавлении новых локалей достаточно обновить `getLocalizedPath`
- **Один источник истины:** логика путей только в `routes.config.ts`

---

## Детальный план реализации

### 1. Добавить `isSamePageDifferentLocale` в routes.config.ts

**Файл:** `web/src/app/routes.config.ts`

**Функция:** проверяет, что два пути — одна и та же страница в разных локалях. Исключает admin-пути.

**Размещение:** после `getLocalizedPath`, перед `SITEMAP_PATHS`.

### 2. Обновить ScrollToTop

**Файл:** `web/src/app/components/ScrollToTop.tsx`

**Изменения:** импорт `isSamePageDifferentLocale`, `useRef` для prevPath, логика preserve-scroll, обновление ref во всех ветках.

---

## Порядок выполнения

1. **routes.config.ts:** добавить и экспортировать `isSamePageDifferentLocale`.
2. **ScrollToTop.tsx:** импорт, `useRef`, обновлённая логика в `useEffect`.
3. **Проверка:** смена языка при прокрутке — скролл сохраняется; переход на другую страницу — скролл сбрасывается.

---

## Тестовые сценарии

| Сценарий | Ожидание |
|----------|----------|
| /servizi/iphone, скролл вниз → EN | Остаётся на том же месте |
| /en/services/iphone, скролл вниз → IT | Остаётся на том же месте |
| /servizi/iphone → клик «Contatti» | Скролл вверх |
| /servizi/iphone → EN → browser back | Остаётся на том же месте |
| Первая загрузка /servizi/iphone | Скролл вверх |
| /admin/services → переход на главную | Скролл вверх |
