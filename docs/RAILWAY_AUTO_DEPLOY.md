# Railway Auto-Deploy из GitHub

## Настройка (один раз)

### 1. Получить Railway Token

1. Откройте https://railway.app
2. Выберите проект Genius Lab
3. **Settings** → **Tokens** → **Generate Project Token**
4. Скопируйте токен

### 2. Добавить секрет в GitHub

1. Репозиторий https://github.com/rilya888/GeniusLab
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. Name: `RAILWAY_TOKEN`
5. Value: вставьте скопированный токен

### 3. Готово

При каждом `git push` в ветку `main` (с изменениями в `web/`, `docs/` или workflow) GitHub Actions автоматически задеплоит на Railway.

## Проверка

- **Actions** вкладка в GitHub — статус workflow
- Railway Dashboard — новый deployment после push
