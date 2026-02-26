# План интеграции Formspree

## Текущее состояние

Форма уже использует Formspree. Endpoint берётся из:

1. `VITE_PUBLIC_FORM_ENDPOINT` (env) — приоритет
2. `siteConfig.forms.endpoint` (site.json) — fallback

Валидация: `hasValidEndpoint` проверяет отсутствие `"your-form-id"` в URL.

**Проблема:** пользователь создал аккаунт и получил form ID. Нужно добавить переменные на сервер (Railway) и обеспечить работу без правки кода.

**Важно:** в `web/src/config/site.json` сейчас `"endpoint":"https://formspree.io/f/your-form-id"` — placeholder. `hasValidEndpoint` отклонит его. Для production **обязательно** задать env в Railway; иначе форма покажет `dict.forms.missingEndpoint`.

---

## Изменения в коде

### 1. Поддержка Form ID (альтернатива полному URL)

**Файл:** `web/src/app/components/ContactForm.tsx`

Добавить поддержку `VITE_PUBLIC_FORMSPREE_FORM_ID`: если задан только ID, собирать URL `https://formspree.io/f/${formId}`.

**Приоритет:** `VITE_PUBLIC_FORM_ENDPOINT` > `VITE_PUBLIC_FORMSPREE_FORM_ID` > `site.json`.

### 2. Модуль env-констант

**Файл:** `web/src/config/env.ts` (новый)

Централизовать доступ к env:

```ts
export const env = {
  formEndpoint: (() => {
    const url = import.meta.env.VITE_PUBLIC_FORM_ENDPOINT?.trim();
    const id = import.meta.env.VITE_PUBLIC_FORMSPREE_FORM_ID?.trim();
    return url || (id ? `https://formspree.io/f/${id}` : undefined);
  })(),
  siteUrl: import.meta.env.VITE_PUBLIC_SITE_URL?.trim(),
  gtmId: import.meta.env.VITE_PUBLIC_GTM_ID?.trim(),
} as const;
```

ContactForm: `env.formEndpoint ?? siteConfig.forms.endpoint`.

### 3. Типизация env

**Файл:** `web/src/vite-env.d.ts` (новый)

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_FORM_ENDPOINT?: string;
  readonly VITE_PUBLIC_FORMSPREE_FORM_ID?: string;
  readonly VITE_PUBLIC_SITE_URL?: string;
  readonly VITE_PUBLIC_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

### 4. Dockerfile: build-time env

**Файл:** `Dockerfile` (в корне)

**Место:** в build stage, между `COPY web/ .` и `RUN npm run build`.

```dockerfile
ARG VITE_PUBLIC_FORM_ENDPOINT
ARG VITE_PUBLIC_FORMSPREE_FORM_ID
ARG VITE_PUBLIC_SITE_URL
ENV VITE_PUBLIC_FORM_ENDPOINT=$VITE_PUBLIC_FORM_ENDPOINT
ENV VITE_PUBLIC_FORMSPREE_FORM_ID=$VITE_PUBLIC_FORMSPREE_FORM_ID
ENV VITE_PUBLIC_SITE_URL=$VITE_PUBLIC_SITE_URL
```

---

## Переменные на сервере (Railway)

| Переменная                      | Описание                               | Пример                            |
| ------------------------------- | -------------------------------------- | --------------------------------- |
| `VITE_PUBLIC_FORMSPREE_FORM_ID` | Form ID из Formspree (предпочтительно) | `xyzabc12`                        |
| `VITE_PUBLIC_FORM_ENDPOINT`     | Полный URL (альтернатива)              | `https://formspree.io/f/xyzabc12` |

Достаточно задать одну из них. Приоритет у полного URL.

**Где взять Form ID:** Formspree Dashboard → форма → URL вида `https://formspree.io/f/xyzabc12` → ID = `xyzabc12`.

---

## Документация

- **web/.env.example** — добавить `VITE_PUBLIC_FORMSPREE_FORM_ID`
- **web/docs/FORMSPREE.md** — раздел «Railway», приоритет переменных
- **web/DEPLOY.md** — Production: form endpoint переменные

---

## Порядок выполнения

1. Добавить `vite-env.d.ts` с типами env
2. Добавить `env.ts` (formEndpoint с поддержкой FORM_ID и FORM_ENDPOINT)
3. Обновить ContactForm: `env.formEndpoint ?? siteConfig.forms.endpoint`
4. Обновить Dockerfile: ARG/ENV для build-time
5. Обновить `.env.example`, FORMSPREE.md, DEPLOY.md

---

## Troubleshooting

**Если форма не работает после деплоя:**

1. DevTools → Network: проверить URL POST, статус ответа
2. Formspree Dashboard: форма существует, email подтверждён
3. Railway: переменные заданы до build, выполнен **Redeploy** (не Restart)
