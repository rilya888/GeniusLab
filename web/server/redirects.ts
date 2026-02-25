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
  { from: "/en/servizi", to: "/en/services", status: 301 },
  { from: "/en/contatti", to: "/en/contacts", status: 301 },
  { from: "/en/chi-siamo", to: "/en/about", status: 301 },
  { from: "/en/recensioni", to: "/en/reviews", status: 301 },
];
