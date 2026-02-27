# Weekly OPS Checklist (SEO + GA + GEO)

## Цель

Еженедельный регламент для раннего обнаружения регрессий и управления качеством релизов.

## Периодичность

1. 1 раз в неделю (фиксированный день и время).
2. Длительность: 30-45 минут.

## Входные данные

1. Production URL: `https://geniuslab.info`
2. Последний релизный changelog.
3. Доступ к GA4, Google Search Console и Google Business Profile.

## Чеклист

### 1) Технический SEO

1. `robots.txt` доступен, корректный `Sitemap`.
2. `sitemap.xml` валиден и содержит ожидаемый набор URL.
3. Проверка canonical/hreflang на ключевых страницах.
4. Проверка 404/500 тренда (нет аномального роста).

### 2) Analytics (GA4)

1. Realtime: есть активные пользователи и `page_view`.
2. События CTA: `cta_click_call`, `cta_click_whatsapp`, `cta_click_contact`.
3. События форм: `form_submit_attempt`, `form_submit_success`, `form_submit_fail`.
4. Проверка consent сценариев (accept/reject/returning user) на smoke-уровне.

### 3) GEO / Local

1. NAP на сайте = NAP в GBP.
2. LocalBusiness/Service schema на ключевых страницах без критических ошибок.
3. Контент ключевых локальных страниц не конфликтует по формулировкам.

### 4) Release readiness

1. Все SEO-критичные задачи текущей недели имеют rollback-план.
2. Нет незакрытых критичных инцидентов перед релизом.

## Выходные артефакты (каждую неделю)

1. Краткий weekly status:
   - что проверено,
   - что сломано/риски,
   - что будет исправлено и когда.
2. Список action items с владельцем и дедлайном.

## Шаблон weekly log

```md
Date:
Release window:

SEO checks:
- robots:
- sitemap:
- canonical/hreflang:
- 404/500 trend:

GA4 checks:
- page_view:
- CTA events:
- form events:
- consent checks:

GEO checks:
- NAP consistency:
- schema status:

Incidents/Risks:
- ...

Actions:
1) ... (owner, ETA)
2) ... (owner, ETA)
```

