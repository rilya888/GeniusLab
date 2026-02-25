# План: добавление AvaTech в Meta Description, Title и Keywords

## Цель

Пользователи, ищущие «AvaTech», должны находить сайт Genius Lab и понимать, что название сменилось. Для этого добавляется:

- **Meta Description** — суффикс «| ex AvaTech»
- **Page Title** — суффикс «| ex AvaTech» (видно в первой строке результата поиска)
- **Keywords** — добавление «AvaTech» в meta keywords

## Архитектура текущей системы

Все описания проходят через компонент `web/src/app/components/SEOHead.tsx`. Достаточно добавить суффикс в одном месте — он применится ко всем страницам.

### Исключения

- Страницы с `noindex` (404, AdminLogin) — суффикс и AvaTech не добавлять (они не индексируются). AdminLogin уже имеет `noindex` — изменений не требуется.

---

## Шаги реализации

### 1. Константа суффикса (единая точка конфигурации)

**Файл:** `web/src/config/site.json`

Добавить в `brand`:

```json
"legacyBrand": "AvaTech"
```

### 2. Изменение SEOHead

**Файл:** `web/src/app/components/SEOHead.tsx`

- Импортировать `siteConfig` из `@/config`
- Перед рендером формировать итоговые значения (для страниц без `noindex`):

```ts
// Append legacy brand for SEO (ex-AvaTech users find Genius Lab)
const legacyBrand = siteConfig.brand.legacyBrand;
const legacySuffix = legacyBrand ? ` | ex ${legacyBrand}` : "";
const skipLegacy = noindex;

const finalTitle = skipLegacy ? title : `${title}${legacySuffix}`;
const finalDescription = skipLegacy ? description : `${description}${legacySuffix}`;
const finalKeywords = keywords && legacyBrand && !skipLegacy
  ? (keywords.includes(legacyBrand) ? keywords : `${keywords}, ${legacyBrand}`)
  : keywords;
```

- Использовать:
  - `finalTitle` в `<title>`, `<meta property="og:title">`
  - `finalDescription` в `<meta name="description">`, `<meta property="og:description">`
  - `finalKeywords` в `<meta name="keywords">` (если передан)

- Комментарии в коде — на английском.

### 3. JSON-LD: LocalBusiness

**Файл:** `web/src/app/utils/jsonLd.ts`

В `localBusinessJsonLd` добавить `alternateName` для связи с прежним брендом:

```ts
alternateName: siteConfig.brand.legacyBrand ?? undefined,
```

### 4. index.html (опционально)

**Файл:** `web/index.html`

Для единообразия fallback title до загрузки React:

```html
<title>Genius Lab (ex AvaTech) | Assistenza Apple a Roma</title>
```

---

## Итоговый список изменений

| Файл | Действие |
|------|----------|
| `web/src/config/site.json` | Добавить `"legacyBrand": "AvaTech"` в `brand` |
| `web/src/app/components/SEOHead.tsx` | Добавить логику суффикса для title, description, keywords |
| `web/src/app/utils/jsonLd.ts` | Добавить `alternateName` в LocalBusiness schema |
| `web/src/app/components/Footer.tsx` | Видимое «(ex AvaTech)» в футере |
| `web/src/app/components/Navigation.tsx` | Видимое «(ex AvaTech)» в шапке рядом с логотипом |
| `web/index.html` | Fallback title с «(ex AvaTech)» в `<title>` |

---

## Перспектива на будущее

1. **Удаление суффикса:** достаточно убрать `legacyBrand` из site.json — суффикс перестанет добавляться.
2. **Новые страницы:** любая страница с SEOHead автоматически получит суффикс.
3. **Schema.org:** `alternateName` — стандартное поле для прежних названий, подходит для SEO.
