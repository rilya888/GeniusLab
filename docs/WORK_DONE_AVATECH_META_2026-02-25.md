# Отчёт о проделанной работе: AvaTech в SEO и интерфейсе

**Дата:** 2026-02-25  
**План:** [PLAN_AVATECH_META.md](PLAN_AVATECH_META.md)

---

## Задача

Сервис ранее назывался AvaTech, сейчас — Genius Lab. Нужно добавить упоминание AvaTech, чтобы пользователи, ищущие «AvaTech», находили сайт и понимали смену названия.

---

## Решение

Централизованное добавление «ex AvaTech» через SEOHead и конфиг. Видимое отображение в шапке и футере.

---

## Выполненные изменения

### 1. site.json
- Добавлено `"legacyBrand": "AvaTech"` в `brand`

### 2. SEOHead.tsx
- Суффикс « | ex AvaTech» к title, meta description, og:description
- Добавление AvaTech в meta keywords (если не дублируется)
- Fallback `legacyBrand ?? "AvaTech"`
- Исключение: страницы с `noindex` (404, Admin)

### 3. jsonLd.ts
- `alternateName` в LocalBusiness schema для связи Genius Lab ↔ AvaTech

### 4. Navigation.tsx
- Видимое «(ex AvaTech)» рядом с логотипом в шапке

### 5. Footer.tsx
- Видимое «(ex AvaTech)» в строке бренда и копирайте

### 6. index.html
- Fallback title: «Genius Lab (ex AvaTech) | Assistenza Apple a Roma»

### 7. ServicePageEdit.tsx (админка)
- Подсказка под полем Meta Description: суффикс добавляется автоматически, вручную не вводить

---

## Результат

- **Meta description:** на всех страницах автоматически «... | ex AvaTech»
- **Title:** «... | ex AvaTech»
- **Keywords:** AvaTech добавлен
- **Шапка/футер:** видимое «Genius Lab (ex AvaTech)»
- **JSON-LD:** alternateName для поисковиков
- **Админка:** подсказка о автоматическом суффиксе

---

## Коммиты

1. `feat(seo): add ex AvaTech to meta description, title and keywords`
2. `feat(seo): add visible ex AvaTech in header, footer and index.html`

**Репозиторий:** https://github.com/rilya888/GeniusLab.git  
**Ветка:** main
