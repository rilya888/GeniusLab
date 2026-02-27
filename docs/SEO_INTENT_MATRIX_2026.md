# SEO Intent Matrix (2026)

## Цель

Зафиксировать intent-распределение страниц, чтобы избежать каннибализации и упростить масштабирование контента.

## Правила anti-cannibalization

1. Один URL = один primary intent.
2. Новая сервисная страница создается только если intent отличается от существующих.
3. Для близких intent используется parent/child структура (общая страница + уточняющий раздел), а не дублирующая страница.
4. Title/description для ключевых страниц не должны быть дубликатами.
5. Для каждой сервисной страницы обязателен уникальный `metaDescription`.

## Core matrix (IT)

| URL | Primary intent | Secondary intent | Notes |
|---|---|---|---|
| `/` | assistenza apple roma | riparazione apple roma | Брендовая и входная локальная страница |
| `/servizi` | servizi riparazione apple roma | centro assistenza apple roma | Каталог сервисов, не конкурирует с детальными страницами |
| `/contatti` | contatti assistenza apple roma | telefono assistenza apple roma | Конверсионный intent |
| `/chi-siamo` | laboratorio apple roma | centro assistenza indipendente roma | Trust/entity intent |
| `/recensioni` | recensioni assistenza apple roma | reputazione genius lab | Trust/proof intent |
| `/servizi/macbook` | riparazione macbook roma | dove riparare macbook roma | Флагманский коммерческий intent |
| `/servizi/iphone` | riparazione iphone roma | assistenza iphone roma | Device-specific intent |
| `/servizi/ipad` | riparazione ipad roma | assistenza ipad roma | Device-specific intent |
| `/servizi/watch` | riparazione apple watch roma | assistenza watch roma | Device-specific intent |
| `/servizi/riparazione-imac` | riparazione imac roma | assistenza imac roma | Device-specific intent |
| `/servizi/display-macbook` | sostituzione display macbook roma | schermo macbook roma | Component intent |
| `/servizi/recupero-dati` | recupero dati roma | data recovery roma | Recovery intent |
| `/servizi/batteria-macbook` | sostituzione batteria macbook roma | batteria macbook roma | Component intent |
| `/servizi/macbook-ssd` | upgrade ssd macbook roma | sostituzione ssd macbook roma | Upgrade intent |
| `/servizi/flexgate-display-macbook` | riparazione flexgate roma | cavo display macbook roma | Symptom-specific intent |
| `/servizi/tastiera-macbook` | sostituzione tastiera macbook roma | tastiera macbook non funziona | Component/symptom intent |
| `/servizi/software-assistenza` | assistenza software mac roma | reinstallazione macos roma | Software intent |

## Core matrix (EN)

| URL | Primary intent | Secondary intent |
|---|---|---|
| `/en` | apple support rome | apple repair rome |
| `/en/services` | apple repair services rome | macbook iphone ipad repair rome |
| `/en/contacts` | apple repair contacts rome | phone whatsapp apple support rome |
| `/en/about` | apple repair lab rome | independent apple support rome |
| `/en/reviews` | apple repair reviews rome | genius lab reputation |
| `/en/services/macbook` | macbook repair rome | where to repair macbook rome |
| `/en/services/iphone` | iphone repair rome | iphone support rome |
| `/en/services/ipad` | ipad repair rome | ipad support rome |
| `/en/services/watch` | apple watch repair rome | watch support rome |
| `/en/services/imac-repair` | imac repair rome | imac support rome |
| `/en/services/display-macbook` | macbook display replacement rome | macbook screen repair rome |
| `/en/services/data-recovery` | data recovery rome | recover lost data rome |
| `/en/services/battery-macbook` | macbook battery replacement rome | macbook battery repair rome |
| `/en/services/macbook-ssd` | macbook ssd upgrade rome | macbook storage upgrade rome |
| `/en/services/flexgate-display-macbook` | flexgate repair rome | macbook display cable repair rome |
| `/en/services/keyboard-macbook` | macbook keyboard replacement rome | macbook keys not working rome |
| `/en/services/software-assistenza` | mac software support rome | macos reinstall rome |

## Release-check requirements

1. Изменение service key/path/metaDescription проходит `check:seo-content-quality`.
2. Перед weekly release обновляется этот документ при добавлении/удалении URL.
3. Для новых страниц в PR указывается:
   - primary intent,
   - why-not-cannibalized explanation.

