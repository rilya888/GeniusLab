/**
 * Single source of truth for routes.
 * Used by: sitemap.xml, internal links, redirects.
 * React Router config is in routes.tsx.
 */

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
