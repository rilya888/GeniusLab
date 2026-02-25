# DESIGN_SPEC.md

## Назначение

Единая дизайн-спецификация для реализации сайта Genius Lab в стиле Liquid Glass (в духе Apple UI) для этапов 03 (дизайн) и 04 (разработка).

## Дизайн-принципы

- Стиль: Liquid Glass, аккуратные прозрачные слои, мягкий blur, чистая типографика.
- Приоритет: mobile-first и высокая читаемость.
- Производительность: визуальные эффекты не должны ухудшать CWV.
- Доступность: контраст и фокус не ниже WCAG AA.

## Color Tokens

```css
:root {
  --color-bg-base: #f5f5f7;
  --color-bg-elevated: #ffffff;
  --color-text-primary: #111111;
  --color-text-secondary: #5f5f65;
  --color-border-soft: rgba(255, 255, 255, 0.35);
  --color-border-strong: rgba(255, 255, 255, 0.55);
  --color-shadow: rgba(17, 17, 17, 0.16);
  --color-overlay: rgba(255, 255, 255, 0.45);
  --color-glass-surface: rgba(255, 255, 255, 0.38);
  --color-glass-surface-strong: rgba(255, 255, 255, 0.55);
  --color-focus-ring: #111111;
  --color-success: #16794b;
  --color-error: #b3261e;
}
```

## Glass Tokens

```css
:root {
  --glass-blur-sm: 8px;
  --glass-blur-md: 14px;
  --glass-blur-lg: 20px;

  --glass-radius-sm: 12px;
  --glass-radius-md: 16px;
  --glass-radius-lg: 24px;

  --glass-shadow-sm: 0 4px 16px var(--color-shadow);
  --glass-shadow-md: 0 10px 28px var(--color-shadow);

  --glass-stroke: 1px solid var(--color-border-soft);
}
```

Правила:
- Основной UI: `--glass-blur-md`.
- Hero/feature cards: максимум `--glass-blur-lg`.
- Не использовать nested blur более 2 уровней.
- На слабых устройствах fallback: blur -> полупрозрачный solid.

## Typography Tokens

```css
:root {
  --font-family-base: -apple-system, "SF Pro Text", "SF Pro Display", "Inter", sans-serif;

  --font-size-12: 0.75rem;
  --font-size-14: 0.875rem;
  --font-size-16: 1rem;
  --font-size-20: 1.25rem;
  --font-size-28: 1.75rem;
  --font-size-40: 2.5rem;

  --line-height-tight: 1.2;
  --line-height-normal: 1.45;
  --line-height-relaxed: 1.6;

  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

Политика подключения:
- SF Pro используется как system stack (через `-apple-system`) без загрузки отдельных webfont-файлов.

## Spacing & Layout Tokens

```css
:root {
  --space-4: 4px;
  --space-8: 8px;
  --space-12: 12px;
  --space-16: 16px;
  --space-24: 24px;
  --space-32: 32px;
  --space-48: 48px;
  --space-64: 64px;

  --container-mobile: 100%;
  --container-tablet: 768px;
  --container-desktop: 1200px;
}
```

## Breakpoints

- Mobile: `320-767`
- Tablet: `768-1023`
- Desktop: `1024+`

## Iconography

- Набор иконок: **Lucide**.
- Stroke: единый визуальный стиль (обычно `1.75-2`).
- Не смешивать другие иконсеты в рамках v1.

## Component Spec (v1)

### Buttons

- Варианты: `primary`, `secondary`, `ghost`.
- Размеры: `sm`, `md`, `lg`.
- Состояния: `default`, `hover`, `focus-visible`, `active`, `disabled`.
- Touch target: минимум `44x44`.

### Glass Card

- Основа: `--color-glass-surface`, `--glass-stroke`, `--glass-shadow-sm`.
- Radius: `--glass-radius-md`.
- Padding: минимум `--space-16`.

### Forms

- Поля: label всегда видим.
- Состояния: `default`, `focus`, `error`, `success`, `disabled`.
- Один единый success-сценарий после отправки.
- Consent-блок обязателен.

### Reviews Block

- Только Google Reviews embed.
- Fallback: текстовое состояние “temporarily unavailable”, без внешней кнопки.

## Motion Spec

- Entrance: fade/slide (`opacity + transform`), `300-500ms`.
- Easing: `ease-out` / `cubic-bezier(0.22, 1, 0.36, 1)`.
- Micro-interactions: `120-200ms`.
- `prefers-reduced-motion: reduce`:
  - отключить параллакс и сложные переходы,
  - сократить duration до `0-100ms`.

## Accessibility Rules

- Контраст текста и интерактивных элементов: WCAG AA.
- Focus ring всегда видим.
- Кликабельные элементы >= `44x44`.
- На glass-слоях проверять контраст отдельно (не только на базовом фоне).

## Performance Rules

- Анимации только через `opacity/transform`.
- Избегать постоянных expensive repaint (особенно с blur).
- Ограничить число одновременно анимируемых glass-элементов.
- На mobile low-end использовать упрощенный визуальный режим.

## Data Placeholders (до финальных данных owner)

- Email форм
- Телефоны
- Реквизиты
- Соцсети (Facebook/Instagram/YouTube)

Источник правды: единый конфигурационный словарь/файл из этапа архитектуры.

## Handoff Checklist

- Figma: все P1 страницы (top 10) готовы.
- Токены: color/typography/spacing/glass экспортированы.
- Component states: зафиксированы и описаны.
- State matrix: normal/empty/loading/error/success.
- Motion rules + reduced-motion: зафиксированы.
- Контраст и focus: проверены.
- Dev handoff: спецификация привязана к компонентам и страницам.

## Связь с планом

- Общий план: `docs/PLAN.md`
- Этап дизайна: `docs/stages/03-design.md`
- Этап разработки: `docs/stages/04-development.md`
