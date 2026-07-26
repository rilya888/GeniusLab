# Отчёт о проделанной работе: Счётчик посетителей

**Дата:** 2026-02-25  
**Проект:** Genius Lab (geniuslab.it)

---

## Цель

Реализовать простой счётчик посетителей без согласия (анонимный хеш IP+User-Agent, без cookies) для понимания ранжирования сайта. Статистика отображается в админке. Позже — подключение Google Analytics.

---

## Выполненные задачи

### 1. Backend: Track API

- **Файл:** `web/server/api/visits.ts`
- **Endpoint:** `POST /api/track` (публичный)
- **Body:** `{ path, referrer }` от клиента
- **Сервер добавляет:** `ts`, `visitorHash` (sha256 IP+UA), `device`, `id`
- **Referrer:** сохраняется только origin; пустой → `"(direct)"`
- **Rate limiting:** 60 запросов/мин на IP (in-memory)
- **Хранение:** NDJSON (append-only), путь через `VISITS_FILE`

### 2. Backend: Stats API

- **Endpoint:** `GET /api/admin/stats` (требует auth)
- **Query:** `?days=7|30` (по умолчанию 30)
- **Ответ:** `totalVisits`, `uniqueVisitors`, `byDevice`, `byReferrer`, `byPath` (top 20)

### 3. Client: VisitorBeacon

- **Файл:** `web/src/app/components/VisitorBeacon.tsx`
- Отправка `navigator.sendBeacon` при каждой смене маршрута (SPA)
- Body: `{ path, referrer }`
- Не отправляет для путей `/admin`
- Подключён в `Root.tsx`

### 4. Admin: страница статистики

- **Файл:** `web/src/app/admin/pages/AdminStats.tsx`
- Карточки: Visite totali, Visitatori unici
- Таблицы: Dispositivi, Fonti (referrer), Pagine più visitate
- Селектор периода: 7 / 30 giorni
- UX: loading, error, empty state
- Роут: `/admin/stats`
- Пункт меню «Statistiche» в AdminLayout

### 5. Политика конфиденциальности

- Добавлена секция «Analisi base visite» / «Basic visit analytics» в `privacyBody` (i18n it.ts, en.ts)
- Описание: анонимные данные, без cookies, легитимный интерес (ст. 6.1.f GDPR)

### 6. Прочее

- `.gitignore` — добавлено `web/server/data/visits.ndjson`
- `docs/PLAN_VISITOR_COUNTER.md` — план реализации

---

## Текущий поток данных

```
Visitor → Root (SPA) → VisitorBeacon (on route change)
    → POST /api/track { path, referrer }
    → Server: hash(IP+UA), parse device, append to visits.ndjson

Admin → GET /api/admin/stats?days=30 (auth)
    → Server: read NDJSON, filter by date, aggregate
    → Response: totalVisits, uniqueVisitors, byDevice, byReferrer, byPath
```

---

## Переменные окружения (Railway)

| Переменная   | Назначение                                      |
|--------------|--------------------------------------------------|
| `VISITS_FILE`| Путь к NDJSON (default: `server/data/visits.ndjson`). Для Volume: `/app/data/visits.ndjson` |

---

## Persistence (Railway Volume)

Файловая система Railway эфемерна. Для сохранения статистики между redeploy:

1. Создать Volume (⌘K → Create volume)
2. Mount path: `/app/data`
3. Переменная: `VISITS_FILE=/app/data/visits.ndjson`

---

## Резервная копия

- **Папка:** `backup/backup_web_2026-02-25_visitor-counter/`
- **Описание:** `backup/BACKUP_2026-02-25_VISITOR_COUNTER.md`

---

## Проверка работы

1. Открыть публичную страницу сайта
2. Перейти в админку → Statistiche
3. Убедиться, что появились данные (Visite totali, Visitatori unici)
4. Проверить таблицы Referrers, Devices, Top pages
