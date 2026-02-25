/**
 * Content context: fetches editable content from API, fallback to i18n.
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { it } from "@/i18n/it";

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

function getFallbackContent(): Content {
  const links = it.pages.services.links;
  const descriptions = it.pages.services.descriptions;
  const metaDescriptions = it.pages.services.metaDescriptions;

  const keyToPath: Record<string, string> = {
    macbook: "/servizi/macbook",
    iphone: "/servizi/iphone",
    ipad: "/servizi/ipad",
    watch: "/servizi/watch",
    imac: "/servizi/riparazione-imac",
    display: "/servizi/display-macbook",
    dataRecovery: "/servizi/recupero-dati",
    battery: "/servizi/batteria-macbook",
    ssd: "/servizi/macbook-ssd",
    flexgate: "/servizi/flexgate-display-macbook",
    keyboard: "/servizi/tastiera-macbook",
    software: "/servizi/software-assistenza",
  };

  const items: ServiceItem[] = Object.entries(links).map(([key], i) => ({
    key,
    name: links[key as keyof typeof links],
    description: descriptions[key as keyof typeof descriptions] ?? "",
    path: keyToPath[key] ?? `/servizi/${key}`,
    order: i,
  }));

  const servicePages: Record<string, ServicePageData> = {};
  for (const key of Object.keys(links)) {
    servicePages[key] = {
      heroTitle: links[key as keyof typeof links],
      heroSubtitle: it.pages.services.description,
      servicesSectionTitle: it.pages.services.servicesSectionTitle,
      problemsSectionTitle: it.pages.services.problemsSectionTitle,
      services: [],
      problems: [],
      metaDescription:
        metaDescriptions[key as keyof typeof metaDescriptions] ??
        it.pages.services.description,
    };
  }

  return {
    services: {
      heading: it.pages.services.heading,
      subheading: it.pages.services.subheading,
      items,
    },
    servicePages,
  };
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/content");
      if (res.ok) {
        const data = (await res.json()) as Content;
        setContent(data);
      } else {
        setContent(getFallbackContent());
      }
    } catch {
      setContent(getFallbackContent());
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

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
  const fallback = getFallbackContent();
  if (!ctx) return fallback;
  if (ctx.loading || !ctx.content) return fallback;
  return ctx.content;
}

export function useContentState(): ContentState {
  const ctx = useContext(ContentContext);
  const fallback = getFallbackContent();
  return (
    ctx ?? {
      content: fallback,
      loading: false,
      error: null,
      refetch: () => {},
    }
  );
}
