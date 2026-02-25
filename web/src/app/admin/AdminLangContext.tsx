/**
 * Admin language context: allows switching content lang (it/en) in admin.
 * Used by ContentProvider when path starts with /admin.
 */

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import { useLocation } from "react-router";
import type { Locale } from "@/i18n/types";

type AdminLangState = {
  adminLang: Locale;
  setAdminLang: (l: Locale) => void;
  isAdmin: boolean;
};

const AdminLangContext = createContext<AdminLangState | null>(null);

export function AdminLangProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");
  const [adminLang, setAdminLang] = useState<Locale>("it");

  const value = useMemo<AdminLangState>(
    () => ({ adminLang, setAdminLang, isAdmin }),
    [adminLang, isAdmin]
  );

  return (
    <AdminLangContext.Provider value={value}>{children}</AdminLangContext.Provider>
  );
}

export function useAdminLang(): AdminLangState | null {
  return useContext(AdminLangContext);
}
