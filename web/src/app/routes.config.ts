/**
 * Single source of truth for routes.
 * Used by: sitemap.xml, internal links, redirects.
 * React Router config is in routes.tsx.
 */

import type { Locale } from "@/i18n/types";

/** Italian path -> English path mapping for static routes */
const IT_TO_EN_PATH: Record<string, string> = {
  "/": "/en",
  "/servizi": "/en/services",
  "/contatti": "/en/contacts",
  "/chi-siamo": "/en/about",
  "/recensioni": "/en/reviews",
  "/privacy-policy": "/en/privacy-policy",
  "/cookie-policy": "/en/cookie-policy",
  "/404": "/en/404",
  // Service pages
  "/servizi/macbook": "/en/services/macbook",
  "/servizi/iphone": "/en/services/iphone",
  "/servizi/ipad": "/en/services/ipad",
  "/servizi/watch": "/en/services/watch",
  "/servizi/recupero-dati": "/en/services/data-recovery",
  "/servizi/riparazione-imac": "/en/services/imac-repair",
  "/servizi/display-macbook": "/en/services/display-macbook",
  "/servizi/batteria-macbook": "/en/services/battery-macbook",
  "/servizi/macbook-ssd": "/en/services/macbook-ssd",
  "/servizi/flexgate-display-macbook": "/en/services/flexgate-display-macbook",
  "/servizi/tastiera-macbook": "/en/services/keyboard-macbook",
  "/servizi/software-assistenza": "/en/services/software-assistenza",
};

/** Italian slug -> English slug for service pages */
const IT_TO_EN_SLUG: Record<string, string> = {
  macbook: "macbook",
  iphone: "iphone",
  ipad: "ipad",
  watch: "watch",
  "recupero-dati": "data-recovery",
  "riparazione-imac": "imac-repair",
  "display-macbook": "display-macbook",
  "batteria-macbook": "battery-macbook",
  "macbook-ssd": "macbook-ssd",
  "flexgate-display-macbook": "flexgate-display-macbook",
  "tastiera-macbook": "keyboard-macbook",
  "software-assistenza": "software-assistenza",
};

const EN_TO_IT_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(IT_TO_EN_SLUG).map(([it, en]) => [en, it])
);

/** Slug (from URL) -> content item key. Works for both IT and EN slugs. */
export const SLUG_TO_SERVICE_KEY: Record<string, string> = {
  macbook: "macbook",
  iphone: "iphone",
  ipad: "ipad",
  watch: "watch",
  "riparazione-imac": "imac",
  "imac-repair": "imac",
  "display-macbook": "display",
  "recupero-dati": "dataRecovery",
  "data-recovery": "dataRecovery",
  "batteria-macbook": "battery",
  "battery-macbook": "battery",
  "macbook-ssd": "ssd",
  "flexgate-display-macbook": "flexgate",
  "tastiera-macbook": "keyboard",
  "keyboard-macbook": "keyboard",
  "software-assistenza": "software",
};

/** Get service key from path (e.g. /servizi/iphone or /en/services/iphone). */
export function getServiceKeyFromPath(path: string): string | null {
  const m = path.match(/^\/(?:servizi|en\/services)\/(.+)$/);
  if (!m) return null;
  let slug: string;
  try {
    slug = decodeURIComponent(m[1]).replace(/\/+$/, "").trim();
  } catch {
    slug = m[1].replace(/\/+$/, "").trim();
  }
  return SLUG_TO_SERVICE_KEY[slug] ?? null;
}

export const ROUTES = {
  home: "/",
  servizi: "/servizi",
  serviziMacbook: "/servizi/macbook",
  serviziIphone: "/servizi/iphone",
  serviziIpad: "/servizi/ipad",
  serviziWatch: "/servizi/watch",
  serviziRecuperoDati: "/servizi/recupero-dati",
  serviziRiparazioneMacbook: "/servizi/riparazione-macbook",
  serviziRiparazioneImac: "/servizi/riparazione-imac",
  serviziDisplayMacbook: "/servizi/display-macbook",
  serviziBatteriaMacbook: "/servizi/batteria-macbook",
  serviziMacbookSsd: "/servizi/macbook-ssd",
  serviziFlexgateDisplay: "/servizi/flexgate-display-macbook",
  serviziTastieraMacbook: "/servizi/tastiera-macbook",
  serviziSoftwareAssistenza: "/servizi/software-assistenza",
  contatti: "/contatti",
  chiSiamo: "/chi-siamo",
  recensioni: "/recensioni",
  privacyPolicy: "/privacy-policy",
  cookiePolicy: "/cookie-policy",
  notFound: "/404",
} as const;

/** Get path for given locale and route key (e.g. "servizi" -> /servizi or /en/services) */
export function getPath(locale: Locale, routeKey: keyof typeof ROUTES): string {
  const itPath = ROUTES[routeKey];
  if (locale === "it") return itPath;
  return IT_TO_EN_PATH[itPath] ?? `/en${itPath}`;
}

/** Get localized path for language switch. Preserves current page. */
export function getLocalizedPath(currentPath: string, newLocale: Locale): string {
  const p = currentPath.replace(/\/+$/, "") || "/";
  if (newLocale === "it") {
    // English -> Italian
    if (p === "/en") return "/";
    if (p.startsWith("/en/")) {
      const itPath = Object.entries(IT_TO_EN_PATH).find(
        ([_, en]) => en === p
      )?.[0];
      if (itPath) return itPath;
      // Service page: /en/services/slug
      const servicesMatch = p.match(/^\/en\/services\/(.+)$/);
      if (servicesMatch) {
        const enSlug = servicesMatch[1].replace(/\/+$/, "").trim();
        const itSlug = EN_TO_IT_SLUG[enSlug] ?? enSlug;
        return `/servizi/${itSlug}`;
      }
      // Static: /en/contacts -> /contatti
      const staticMap: Record<string, string> = {
        "/en": "/",
        "/en/services": "/servizi",
        "/en/contacts": "/contatti",
        "/en/about": "/chi-siamo",
        "/en/reviews": "/recensioni",
        "/en/privacy-policy": "/privacy-policy",
        "/en/cookie-policy": "/cookie-policy",
        "/en/404": "/404",
      };
      return staticMap[p] ?? "/";
    }
    return "/";
  } else {
    // Italian -> English
    if (p === "/") return "/en";
    const enPath = IT_TO_EN_PATH[p];
    if (enPath) return enPath;
    const servicesMatch = p.match(/^\/servizi\/(.+)$/);
    if (servicesMatch) {
      const itSlug = servicesMatch[1].replace(/\/+$/, "").trim();
      const enSlug = IT_TO_EN_SLUG[itSlug] ?? itSlug;
      return `/en/services/${enSlug}`;
    }
    return "/en";
  }
}

/** Paths to include in sitemap (public, indexable pages). */
export const SITEMAP_PATHS: string[] = [
  ROUTES.home,
  ROUTES.servizi,
  ROUTES.serviziMacbook,
  ROUTES.serviziIphone,
  ROUTES.serviziIpad,
  ROUTES.serviziWatch,
  ROUTES.serviziRecuperoDati,
  ROUTES.serviziRiparazioneMacbook,
  ROUTES.serviziRiparazioneImac,
  ROUTES.serviziDisplayMacbook,
  ROUTES.serviziBatteriaMacbook,
  ROUTES.serviziMacbookSsd,
  ROUTES.serviziFlexgateDisplay,
  ROUTES.serviziTastieraMacbook,
  ROUTES.serviziSoftwareAssistenza,
  ROUTES.contatti,
  ROUTES.recensioni,
  ROUTES.chiSiamo,
  ROUTES.privacyPolicy,
  ROUTES.cookiePolicy,
];
