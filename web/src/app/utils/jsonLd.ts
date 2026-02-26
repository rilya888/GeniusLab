/**
 * JSON-LD schemas for SEO: LocalBusiness, Service, FAQPage, etc.
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
    ...(siteConfig.brand.legacyBrand && {
      alternateName: siteConfig.brand.legacyBrand,
    }),
    description: siteConfig.brand.tagline,
    url: base,
    image: base + "/logo.png",
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
  const locWithGeo = loc as { geo?: { latitude: number; longitude: number } };
  if (locWithGeo.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: locWithGeo.geo.latitude,
      longitude: locWithGeo.geo.longitude,
    };
  }
  if (locale) schema.inLanguage = locale === "en" ? "en" : "it";
  const social = siteConfig.social as { instagram?: string; tiktok?: string; facebook?: string } | undefined;
  if (social) {
    const sameAs = [social.instagram, social.tiktok, social.facebook].filter(Boolean);
    if (sameAs.length) schema.sameAs = sameAs;
  }
  return schema;
}

export function serviceJsonLd(
  serviceName: string,
  description: string,
  path?: string,
  locale?: Locale,
  serviceType?: string
) {
  const city = siteConfig.locations[0]?.city ?? "Roma";
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.brand.name,
    },
    areaServed: {
      "@type": "City",
      name: city,
      containedInPlace: { "@type": "Country", name: "Italy" },
    },
  };
  if (path) schema.url = base + path;
  if (serviceType) schema.serviceType = serviceType;
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

/** WebPage JSON-LD for pages like Recensioni, Chi-siamo. */
export function webPageJsonLd(
  name: string,
  description: string,
  path: string,
  locale?: Locale
) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: base + path,
  };
  if (locale) schema.inLanguage = locale === "en" ? "en" : "it";
  return schema;
}

/** FAQPage JSON-LD for pages with Q&A content. Reusable for Home, service pages, etc. */
export function faqJsonLd(
  items: { question: string; answer: string }[],
  locale?: Locale
) {
  if (!items.length) return null;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  if (locale) schema.inLanguage = locale === "en" ? "en" : "it";
  return schema;
}
