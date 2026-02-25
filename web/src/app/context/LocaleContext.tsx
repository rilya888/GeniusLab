/**
 * Locale context: provides current language (it/en) and dictionary.
 * Locale is derived from URL path (/en → en, otherwise it).
 * Must be used inside RouterProvider (uses useLocation).
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "react-router";
import { it } from "@/i18n/it";
import { en } from "@/i18n/en";
import type { Locale, LocaleDict } from "@/i18n/types";

const STORAGE_KEY = "geniuslab-locale";

function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "it";
}

const dicts: Record<Locale, LocaleDict> = { it, en };

type LocaleState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  dict: LocaleDict;
  t: LocaleDict;
};

const LocaleContext = createContext<LocaleState | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const [locale, setLocaleState] = useState<Locale>(() =>
    getLocaleFromPath(pathname)
  );

  useEffect(() => {
    const newLocale = getLocaleFromPath(pathname);
    setLocaleState(newLocale);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
    setLocaleState(l);
  };

  const dict = dicts[locale];
  const value = useMemo<LocaleState>(
    () => ({ locale, setLocale, dict, t: dict }),
    [locale, dict]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleState {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}
