/**
 * 301 redirect map. Add legacy URLs when migrating from Astro.
 * Rules: no chain redirects; all legacy URLs covered.
 */

export type RedirectEntry = {
  from: string;
  to: string;
  status: 301 | 302;
};

export const REDIRECTS: RedirectEntry[] = [
  // Example: { from: "/old-path", to: "/new-path", status: 301 },
];
