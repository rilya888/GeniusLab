# Этап 02 — Placeholder Source Spec

## Goal

Единый source-of-truth для временных и финальных данных:
- контакты
- часы
- реквизиты
- соцсети
- legal metadata

## Recommended structure

```json
{
  "brand": {
    "name": "Genius Lab",
    "canonicalDomain": "geniuslab.it"
  },
  "contacts": {
    "phones": ["+39 06 84385510", "+39 06 80074880"],
    "whatsapp": "+39 334 9867400",
    "email": "info@apple-assistenza.it"
  },
  "locations": [
    {"label": "Lab", "street": "Viale Somalia, 246", "city": "Roma", "postalCode": "00199"},
    {"label": "Store", "street": "Viale Somalia, 244-248", "city": "Roma", "postalCode": "00199"}
  ],
  "hours": {
    "weekdays": "09:30-13:30,15:00-19:00",
    "weekend": "closed"
  },
  "social": {
    "facebook": "PLACEHOLDER",
    "instagram": "PLACEHOLDER",
    "youtube": "PLACEHOLDER"
  },
  "legal": {
    "vat": "PLACEHOLDER",
    "companyName": "PLACEHOLDER",
    "registeredAddress": "PLACEHOLDER"
  }
}
```

## Rules

1. UI, schema.org и policy-страницы читают данные только из этого источника.
2. Изменения данных делаются централизованно и версионируются.
3. Перед cutover owner подтверждает финальные значения и снимает placeholders.
