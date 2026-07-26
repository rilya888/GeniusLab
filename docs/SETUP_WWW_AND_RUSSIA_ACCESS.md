# Настройка www.geniuslab.info и доступа из РФ

## 1. DNS: www.geniuslab.info (Cloudflare)

Railway уже создал домен `www.geniuslab.info`. Осталось добавить DNS-запись в Cloudflare:

1. Войдите в [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Выберите зону **geniuslab.info**
3. **DNS** → **Records** → **Add record**
4. Заполните:
   - **Type:** CNAME
   - **Name:** `www`
   - **Target:** `8ego5wd3.up.railway.app`
   - **Proxy status:** Proxied (оранжевое облако) или DNS only (серое) — см. раздел 2
5. **Save**

Распространение DNS может занять до 72 часов (обычно 5–15 минут).

---

## 2. Доступ из РФ: Cloudflare DNS-only

Сайт недоступен в РФ из‑за блокировки ECH (Cloudflare proxy). Решение — перевести трафик в режим **DNS only** (серое облако):

1. Cloudflare Dashboard → geniuslab.info → **DNS** → **Records**
2. Для записей `geniuslab.info` (apex) и `www`:
   - Нажмите на **оранжевое облако** → переключите в **DNS only** (серое облако)
3. Сохраните изменения

**Плюсы:** сайт будет открываться из РФ.  
**Минусы:** нет CDN и DDoS-защиты Cloudflare (Railway имеет свою защиту).

---

## 3. Проверка после настройки

```bash
# DNS
dig www.geniuslab.info +short
# Ожидается: IP или CNAME

# Редирект www → non-www
curl -sI https://www.geniuslab.info/
# Ожидается: 301 → https://geniuslab.info/

# Smoke
cd web && npm run smoke:prod
```

---

## 4. Railway (уже выполнено)

- [x] www.geniuslab.info добавлен в Railway
- [x] VITE_PUBLIC_GA4_ID задан (G-GYDPMQ4R49)
