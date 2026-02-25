/**
 * Content context: fetches editable content from API, fallback to i18n.
 * Uses locale from LocaleContext for API and fallback.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { it } from "@/i18n/it";
import { en } from "@/i18n/en";
import type { Locale } from "@/i18n/types";
import { getPath, ROUTES } from "@/app/routes.config";
import { useLocale } from "./LocaleContext";
import { useAdminLang } from "../admin/AdminLangContext";

export type ServiceItem = {
  key: string;
  name: string;
  description: string;
  path: string;
  order: number;
};

export type ServicePageData = {
  heroTitle: string;
  heroSubtitle: string;
  servicesSectionTitle: string;
  problemsSectionTitle: string;
  services: string[];
  problems: string[];
  metaDescription: string;
  faq?: { question: string; answer: string }[];
  answerFirstIntro?: string;
  keywords?: string;
};

export type Content = {
  services: {
    heading: string;
    subheading: string;
    items: ServiceItem[];
  };
  servicePages: Record<string, ServicePageData>;
};

type ContentState = {
  content: Content | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

const ContentContext = createContext<ContentState | null>(null);

const keyToRouteKey: Record<string, keyof typeof ROUTES> = {
  macbook: "serviziMacbook",
  iphone: "serviziIphone",
  ipad: "serviziIpad",
  watch: "serviziWatch",
  imac: "serviziRiparazioneImac",
  display: "serviziDisplayMacbook",
  dataRecovery: "serviziRecuperoDati",
  battery: "serviziBatteriaMacbook",
  ssd: "serviziMacbookSsd",
  flexgate: "serviziFlexgateDisplay",
  keyboard: "serviziTastieraMacbook",
  software: "serviziSoftwareAssistenza",
};

function getFallbackContent(locale: Locale): Content {
  const dict = locale === "it" ? it : en;
  const links = dict.pages.services.links;
  const descriptions = dict.pages.services.descriptions;
  const metaDescriptions = dict.pages.services.metaDescriptions;

  const items: ServiceItem[] = Object.entries(links).map(([key], i) => ({
    key,
    name: links[key as keyof typeof links],
    description: descriptions[key as keyof typeof descriptions] ?? "",
    path: keyToRouteKey[key] ? getPath(locale, keyToRouteKey[key]) : (locale === "it" ? `/servizi/${key}` : `/en/services/${key}`),
    order: i,
  }));

  const servicePages: Record<string, ServicePageData> = {};
  for (const key of Object.keys(links)) {
    servicePages[key] = {
      heroTitle: links[key as keyof typeof links],
      heroSubtitle: dict.pages.services.subheading,
      servicesSectionTitle: dict.pages.services.servicesSectionTitle,
      problemsSectionTitle: dict.pages.services.problemsSectionTitle,
      services: [],
      problems: [],
      metaDescription:
        metaDescriptions[key as keyof typeof metaDescriptions] ??
        dict.pages.services.description,
      faq: [],
      answerFirstIntro: "",
    };
  }

  return {
    services: {
      heading: dict.pages.services.heading,
      subheading: dict.pages.services.subheading,
      items,
    },
    servicePages,
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();
  const adminLang = useAdminLang();
  const effectiveLang = adminLang?.isAdmin ? adminLang.adminLang : locale;
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/content?lang=${effectiveLang}`);
      if (res.ok) {
        const data = (await res.json()) as Content;
        setContent(data);
      } else {
        setContent(getFallbackContent(effectiveLang));
      }
    } catch {
      setContent(getFallbackContent(effectiveLang));
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [effectiveLang]);

  const value: ContentState = {
    content,
    loading,
    error,
    refetch: fetchContent,
  };

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent(): Content {
  const ctx = useContext(ContentContext);
  const { locale } = useLocale();
  const fallback = getFallbackContent(locale);
  if (!ctx) return fallback;
  if (ctx.loading || !ctx.content) return fallback;
  return ctx.content;
}

export function useContentState(): ContentState {
  const ctx = useContext(ContentContext);
  const { locale } = useLocale();
  const adminLang = useAdminLang();
  const effectiveLang = adminLang?.isAdmin ? adminLang.adminLang : locale;
  const fallback = getFallbackContent(effectiveLang);
  return (
    ctx ?? {
      content: fallback,
      loading: false,
      error: null,
      refetch: () => {},
    }
  );
}
