/**
 * JSON-LD schemas for SEO: LocalBusiness, Service, etc.
 */

import { siteConfig } from "@/config";
import type { Locale } from "@/i18n/types";

const SITE_URL =
  (typeof import.meta !== "undefined" &&
    (import.meta as { env?: { VITE_PUBLIC_SITE_URL?: string } }).env
      ?.VITE_PUBLIC_SITE_URL) ||
  (typeof window !== "undefined" ? window.location.origin : "");

const base = SITE_URL.replace(/\/$/, "");

export function localBusinessJsonLd(locale?: Locale) {
  const [loc] = siteConfig.locations;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brand.name,
    description: siteConfig.brand.tagline,
    url: base,
    telephone: siteConfig.contacts.phonePrimary,
    email: siteConfig.contacts.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.street,
      addressLocality: loc.city,
      postalCode: loc.postalCode,
      addressCountry: "IT",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:30",
        closes: "13:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "15:00",
        closes: "19:00",
      },
    ],
  };
  if (locale) schema.inLanguage = locale === "en" ? "en" : "it";
  return schema;
}

export function serviceJsonLd(
  serviceName: string,
  description: string,
  path?: string,
  locale?: Locale
) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.brand.name,
    },
  };
  if (path) schema.url = base + path;
  if (locale) schema.inLanguage = locale === "en" ? "en" : "it";
  return schema;
}

/** BreadcrumbList JSON-LD for service pages: Home > Servizi > Service name */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(
      (item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: base + item.path,
      })
    ),
  };
}
