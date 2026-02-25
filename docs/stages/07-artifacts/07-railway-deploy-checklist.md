# Этап 07 — Railway Deploy Checklist

## Service setup

- [ ] Railway service создан под сайт `geniuslab.it`
- [ ] Root Directory сервиса установлен в `web/`
- [ ] Dockerfile detected (`web/Dockerfile`)
- [ ] Port = `8080`

## Required env

- [ ] `PUBLIC_FORM_ENDPOINT` задан и валиден
- [ ] `PUBLIC_GTM_ID` задан (или пустой по решению owner)

## Build & run validation

- [ ] Build проходит без ошибок
- [ ] `/`, `/contatti`, `/servizi`, `/recensioni` отдают 200
- [ ] `/robots.txt` и `/sitemap.xml` доступны
- [ ] Headers присутствуют (X-Frame-Options, Referrer-Policy, X-Content-Type-Options)

## Domain cutover prep

- [ ] Домен `geniuslab.it` привязан к Railway сервису
- [ ] TLS активен
- [ ] Nginx redirect rules для 3 старых доменов готовы
- [ ] Go/No-Go checklist закрыт
