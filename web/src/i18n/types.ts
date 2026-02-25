/**
 * Shared types for i18n dictionaries.
 * Ensures it and en have identical structure.
 */

import type { it } from "./it";

export type LocaleDict = typeof it;
export type Locale = "it" | "en";
