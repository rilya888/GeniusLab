# Отчёт о проделанной работе: Admin Content — чтение из GitHub

**Дата:** 2026-02-25  
**Проект:** Genius Lab (geniuslab.it)

---

## Проблема

Изменения в админ-панели не сохранялись стабильно:
- Первое сохранение срабатывало, затем контент возвращался к прежнему
- При redeploy или нескольких инстансах локальная запись в файл не обеспечивала консистентность

## Причина

1. **Эфемерная ФС:** Railway контейнеры не сохраняют локальные файлы между redeploy
2. **Несколько инстансов:** Запись в локальный файл на одном инстансе не видна другим
3. **Redeploy:** Новый контейнер получает контент из образа (build-time), а не из последнего сохранения

## Решение

Читать контент **из GitHub при каждом запросе**, когда заданы `GITHUB_TOKEN` и `GITHUB_REPO`. GitHub — единый источник правды для всех инстансов.

---

## Выполненные задачи

### 1. readContentFromGitHub()

**Файл:** `web/server/lib/github-content.ts`

- Новая функция: загрузка `content.it.json` / `content.en.json` через GitHub Contents API
- GET `/repos/{owner}/{repo}/contents/{path}?ref={branch}`
- Декодирование base64, парсинг JSON
- Возвращает `null` при 404 или ошибке

### 2. Асинхронное чтение контента

**Файл:** `web/server/api/content.ts`

- `readContentLocal()` — синхронное чтение из файла (без изменений)
- `readContent()` — асинхронная: при GITHUB_TOKEN → `readContentFromGitHub()`, иначе → `readContentLocal()`
- Fallback на локальный файл при сбое GitHub

### 3. Обновление API-обработчиков

- `getContent` — async, вызывает `await readContent(lang)`
- `putContentServices` — `await readContent(lang)` для получения текущего контента
- `putContentServicePage` — аналогично

### 4. Локальная запись после save

Сохранена запись в локальный файл после успешного `saveContentToGitHub` — для кэша на текущем инстансе (опционально).

---

## Текущий поток данных

```
GET /api/content
    → GITHUB_TOKEN && GITHUB_REPO?
        → да: readContentFromGitHub() → GitHub API
        → нет или ошибка: readContentLocal() → файл из образа

PUT /api/admin/content/*
    → saveContentToGitHub() → GitHub API (commit)
    → writeContentLocal() (кэш)
```

---

## Результат

- Изменения в админке сохраняются в GitHub и сразу видны при refetch
- Работает при нескольких инстансах Railway
- Контент переживает redeploy
- Fallback на локальный файл при недоступности GitHub

---

## Резервная копия

- **Папка:** `backup/backup_web_2026-02-25_admin-content-github-read/`
- **Описание:** `backup/BACKUP_2026-02-25_ADMIN_CONTENT_GITHUB_READ.md`
