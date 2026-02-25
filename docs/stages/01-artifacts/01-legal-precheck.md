# Этап 01 — Legal Pre-check (Apple-related wording)

Дата: 2026-02-24.

## High-risk wording patterns (to review in stage 06)

1. Формулировки, потенциально создающие впечатление официальной аффилиации с Apple.
2. Частое использование claim'ов `certificato/certificata` без явного контекста и подтверждения.
3. Агрессивные коммерческие сравнения/обещания, требующие доказуемости.
4. Повторяемые блоки с формулировками, которые могут восприниматься как вводящие в заблуждение.

## Concrete patterns found

- `Centro Assistenza Certificato Apple`
- `Garanzia Ufficiale Apple` (в сочетании с описанием услуг вне официального канала)
- `ripariamo direttamente le schede logiche dichiarate morte, irreparabili`
- `l'importo ... più basso che potrete mai trovare sul mercato`

## Recommended pre-legal actions

1. Вынести единый neutral disclaimer о неаффилированности с Apple (если применимо).
2. Удалить/смягчить абсолютные claim'ы (`mai`, `qualsiasi`, `irreparabile` и т.п.).
3. Развести официальную гарантию производителя и гарантию собственных работ.
4. Проверить consistency формулировок в UI, metadata, schema.

## Gate

До legal sign-off (этап 06) не переносить risky-copy в финальный production-контент.
