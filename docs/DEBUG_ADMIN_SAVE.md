# Отладка сохранения из админки

## Важно: задеплойте изменения

Логирование и debug-эндпоинт добавлены в коде, но ещё не в production. Нужно:

```bash
git add -A && git commit -m "chore: add admin save diagnostics" && git push
```

Railway подхватит деплой автоматически (если настроен GitHub).

## Что настроено

- Логи `[GitHub]` и `[Content]` в консоли сервера
- `GET /api/admin/debug` — проверка конфигурации (требует авторизацию)
- Улучшенная обработка ошибок на фронте (toast с текстом ошибки)

## Как получить логи Railway

```bash
cd "Projects/genius site"
npx railway service GeniusLab   # если не залинковано
npx railway logs -n 100         # последние 100 строк
```

Или в Dashboard: Project → GeniusLab → Deployments → Logs

## Что сделать перед сохранением

1. Запустить логи в режиме стрима:
   ```bash
   npx railway logs
   ```
2. В админке: войти, нажать Save
3. Дождаться появления логов в терминале
4. Скопировать вывод с `[GitHub]` и `[Content]` и скинуть

## Проверка debug API

После входа в админку (с токеном в cookie):

```bash
curl -H "Cookie: adminToken=<ваш_токен>" https://geniuslab-production.up.railway.app/api/admin/debug
```

Или в браузере: DevTools → Application → Cookies → скопировать adminToken, затем:

```bash
curl -H "Authorization: Bearer <токен>" https://geniuslab-production.up.railway.app/api/admin/debug
```

Ожидаемый ответ: `{"githubConfigured":true,"repo":"rilya888/GeniusLab"}`

## Когда скажете — посмотрю что не так

Пришлите:
1. Логи Railway (с `[GitHub]` / `[Content]` или ошибкой)
2. Или toast-сообщение из браузера при ошибке
3. Или ответ `GET /api/admin/debug`
