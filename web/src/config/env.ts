/**
 * Client-side env vars. VITE_ prefix required for Vite exposure.
 * Used by ContactForm, SEOHead, SiteScripts.
 */
export const env = {
  formEndpoint: (() => {
    const url = import.meta.env.VITE_PUBLIC_FORM_ENDPOINT?.trim();
    const id = import.meta.env.VITE_PUBLIC_FORMSPREE_FORM_ID?.trim();
    return url || (id ? `https://formspree.io/f/${id}` : undefined);
  })(),
  siteUrl: import.meta.env.VITE_PUBLIC_SITE_URL?.trim(),
  gtmId: import.meta.env.VITE_PUBLIC_GTM_ID?.trim(),
  ga4Id: import.meta.env.VITE_PUBLIC_GA4_ID?.trim(),
} as const;
