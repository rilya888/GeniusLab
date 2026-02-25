# Этап 7: Soft-launch, запуск и миграция доменов

[← К общему плану](../PLAN.md)

## Цель этапа

Провести soft-launch, выполнить Go/No-Go, безопасно мигрировать 3 текущих домена на новый канонический домен geniuslab.it и передать проект в постзапусковую стабилизацию.

## Входные данные

- Рабочий сайт с Legal Compliance (этап 06)
- Карта 301 редиректов (этап 02)
- SEO-чеклист миграции и sitemap (этап 05)
- Документ архитектуры — хостинг, DNS
- Черновик rollback-runbook

## Задачи

1. **Soft-launch (7–14 дней)**
   - Развёртывание на тестовом домене/preview
   - Проверка ключевых пользовательских сценариев в реалистичном окружении
   - Проверка отправки форм в реальных условиях (email deliverability)

2. **QA**
   - Функциональность: формы, ссылки, навигация
   - Кроссбраузерность (Chrome, Safari, Firefox, Edge)
   - Мобильные устройства (iOS, Android)
   - Cookie banner, формы с consent

3. **Производительность**
   - Lighthouse (Performance, Accessibility, Best Practices, SEO)
   - Core Web Vitals (LCP, INP, CLS)
   - Исправление критичных замечаний

4. **Go/No-Go перед cutover**
   - Проверка обязательного чеклиста: legal, SEO, QA, формы, мониторинг
   - Проверка release gate: финальные реквизиты/телефоны/email предоставлены owner
   - Проверка freeze-режима: за последние 48 часов не было несогласованных контент/SEO изменений
   - Подтверждение окна cutover: ночью по Риму (CET/CEST)
   - DRI и финальное решение: owner проекта
   - Явное решение: запуск или перенос cutover

5. **Деплой**
   - Развёртывание на Railway (geniuslab.it)
   - Проверка HTTPS, сертификаты

6. **Миграция домена**
   - Перед началом cutover подтверждён content/SEO freeze (48h)
   - Окно переключения: ночное окно по Риму (рекомендуемо 00:00-03:00 CET/CEST)
   - Настройка DNS для geniuslab.it
   - Настройка 301 редиректов:
     - avatech.info → geniuslab.it
     - assistenza-macbook.it → geniuslab.it
     - apple-assistenza.it → geniuslab.it
   - Проверка one-to-one маппинга URL по карте редиректов
   - Мониторинг индексации после переключения
   - Финальное подтверждение завершения cutover: owner проекта

7. **Аналитика и мониторинг**
   - Google Analytics (с учётом consent)
   - Search Console для geniuslab.it
   - Search Console для 3 старых доменов (мониторинг миграции)
   - Оповещения об ошибках и деградации форм (email + Telegram)

8. **Rollback готовность**
   - Финализация rollback-runbook
   - Критерии отката и ответственные
   - DRI по rollback decision: owner проекта
   - Тест процедуры отката (по возможности)

## Результаты

- **Рабочий сайт на geniuslab.it**
- **301 редиректы** — 3 старых домена перенаправляют на geniuslab.it
- **Отчёт soft-launch** — баги, риски, решение Go/No-Go
- **Отчёт по метрикам** — Lighthouse, Core Web Vitals
- **Runbook запуска и rollback** — инструкции для команды

## Связи с другими этапами

- Вход в этап 8 (Hypercare): постзапусковая стабилизация и оптимизация

## Критерии готовности

- [ ] Soft-launch завершён, критичные баги закрыты
- [ ] Решение Go/No-Go зафиксировано
- [ ] QA пройден, критические баги исправлены
- [ ] Lighthouse: Performance, Accessibility, SEO в приемлемых пределах
- [ ] Сайт доступен на geniuslab.it
- [ ] Редиректы 3 доменов на geniuslab.it работают
- [ ] One-to-one mapping выполнен для приоритетных URL
- [ ] Release gate по реквизитам/телефонам/email закрыт
- [ ] Content/SEO freeze (48h) соблюдён до cutover
- [ ] Cutover выполнен в ночном окне по Риму
- [ ] DRI owner зафиксирован в Go/No-Go и rollback
- [ ] Аналитика и Search Console настроены
- [ ] Runbook запуска и rollback подготовлен

## Артефакты этапа 07

- `docs/stages/07-artifacts/07-go-no-go-checklist.md`
- `docs/stages/07-artifacts/07-cutover-smoke-test.csv`
- `docs/stages/07-artifacts/07-rollback-decision-log-template.md`
- `docs/stages/07-artifacts/07-redirect-rules-nginx.conf`
- `docs/stages/07-artifacts/07-railway-deploy-checklist.md`
- `docs/stages/07-artifacts/07-env-matrix.md`
- `docs/stages/07-artifacts/07-cutover-command-sheet.md`
- `docs/stages/07-artifacts/07-deployment-report-2026-02-24.md`
- `docs/stages/07-artifacts/07-owner-actions-required.md`
