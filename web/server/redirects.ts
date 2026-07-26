/**
 * 301 redirect map. Add legacy URLs when migrating from Astro.
 * Rules: no chain redirects; all legacy URLs covered.
 * Includes /en/* Italian-path redirects to English paths.
 */

export type RedirectEntry = {
  from: string;
  to: string;
  status: 301 | 302;
};

export const REDIRECTS: RedirectEntry[] = [
  { from: "/service/riparazione-macbook", to: "/servizi/riparazione-macbook", status: 301 },
  { from: "/service/data-recovery", to: "/servizi/data-recovery", status: 301 },
  { from: "/service/display-macbook", to: "/servizi/display-macbook", status: 301 },
  { from: "/service/riparazione-imac", to: "/servizi/riparazione-imac", status: 301 },
  { from: "/service/software-assistenza", to: "/servizi/software-assistenza", status: 301 },
  { from: "/service/tastiera-macbook", to: "/servizi/tastiera-macbook", status: 301 },
  { from: "/service/macbook-ssd", to: "/servizi/macbook-ssd", status: 301 },
  { from: "/service/flexgate-display-macbook", to: "/servizi/flexgate-display-macbook", status: 301 },
  { from: "/service/batteria-macbook", to: "/servizi/batteria-macbook", status: 301 },
  { from: "/assistenza", to: "/servizi", status: 301 },
  { from: "/contattaci", to: "/contatti", status: 301 },
  { from: "/avatech-chi-siamo", to: "/chi-siamo", status: 301 },
  { from: "/servizi/macbook", to: "/servizi/riparazione-macbook", status: 301 },
  { from: "/riparazione-ima", to: "/servizi/riparazione-imac", status: 301 },
  { from: "/riparazione-macbook-2", to: "/servizi/riparazione-macbook", status: 301 },
  { from: "/support-help-faq", to: "/contatti", status: 301 },
  { from: "/supporto", to: "/contatti", status: 301 },
  { from: "/en/servizi", to: "/en/services", status: 301 },
  { from: "/en/contatti", to: "/en/contacts", status: 301 },
  { from: "/en/chi-siamo", to: "/en/about", status: 301 },
  { from: "/en/recensioni", to: "/en/reviews", status: 301 },
];
