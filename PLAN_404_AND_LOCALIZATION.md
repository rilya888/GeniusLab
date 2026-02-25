# План устранения 404 и проверки локализации

## Диагностика 404

### Выявленные причины

1. **Неправильные пути в fallback-контенте для EN**  
   В `web/src/app/context/ContentContext.tsx` `getFallbackContent` использует `getPath(locale, keyToRouteKey[key])` для путей. `getPath` в `web/src/app/routes.config.ts` для сервисных маршрутов возвращает `/en/servizi/iphone` вместо `/en/services/iphone`, потому что в `IT_TO_EN_PATH` есть только топ-уровневые маршруты (`/servizi` → `/en/services`), а не полные пути сервисов.

2. **Проблема с trailing slash**  
   В `getServiceKeyFromPath` slug извлекается regex `(.+)$` — при пути `/en/services/iphone/` в slug попадёт `iphone/`, и `SLUG_TO_SERVICE_KEY["iphone/"]` будет `undefined`. Нужна нормализация.

3. **Редирект на 404 без учёта локали**  
   В `web/src/app/pages/GenericServicePage.tsx` при отсутствии данных используется `<Navigate to="/404" />`, что всегда ведёт на итальянскую версию.

---

## План исправления 404

### 1. Исправить `getPath` для сервисных маршрутов

**Файл:** `web/src/app/routes.config.ts`

Добавить в `IT_TO_EN_PATH` маппинг для всех сервисных путей и `/404`:

```ts
"/servizi/macbook": "/en/services/macbook",
"/servizi/iphone": "/en/services/iphone",
"/servizi/ipad": "/en/services/ipad",
"/servizi/watch": "/en/services/watch",
"/servizi/recupero-dati": "/en/services/data-recovery",
"/servizi/riparazione-imac": "/en/services/imac-repair",
"/servizi/display-macbook": "/en/services/display-macbook",
"/servizi/batteria-macbook": "/en/services/battery-macbook",
"/servizi/macbook-ssd": "/en/services/macbook-ssd",
"/servizi/flexgate-display-macbook": "/en/services/flexgate-display-macbook",
"/servizi/tastiera-macbook": "/en/services/keyboard-macbook",
"/servizi/software-assistenza": "/en/services/software-assistenza",
"/404": "/en/404",
```

### 2. Нормализовать slug в `getServiceKeyFromPath`

**Файл:** `web/src/app/routes.config.ts`

Добавить `decodeURIComponent`, `try/catch`, `\/+$` для trailing slash.

### 3. Явные маршруты 404 и локализованный редирект

**Файл:** `web/src/app/routes.tsx`

Добавить `{ path: "404", Component: NotFound }` перед `path: "*"` в обеих группах (root и en).

**Файл:** `web/src/app/pages/GenericServicePage.tsx`

Использовать `getPath(locale, "notFound")` вместо `"/404"`.

### 4. Нормализация пути в `getLocalizedPath`

**Файл:** `web/src/app/routes.config.ts`

В начале `getLocalizedPath` добавить: `const p = currentPath.replace(/\/+$/, "") || "/";` и использовать `p` вместо `currentPath`.

---

## Аудит локализации

### Legacy-страницы (it → dict)

Заменить `it` на `dict` в: MacBookService, IPhoneService, IPadService, WatchService, DataRecovery.

---

## Порядок выполнения

1. **routes.config.ts:** добавить маппинг сервисных путей и `/404` в `IT_TO_EN_PATH`; нормализовать slug в `getServiceKeyFromPath`; нормализовать путь в `getLocalizedPath`.
2. **routes.tsx:** добавить явные маршруты `{ path: "404", Component: NotFound }` перед `*`.
3. **GenericServicePage.tsx:** редирект на `getPath(locale, "notFound")`.
4. **Legacy-страницы:** заменить `it` на `dict` в MacBookService, IPhoneService, IPadService, WatchService, DataRecovery.
5. **Проверка:** переключение языка (IT↔EN) на страницах сервисов; клики по сервисам в EN; прямые URL `/404` и `/en/404`.
