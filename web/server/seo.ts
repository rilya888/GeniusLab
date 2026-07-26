/**
 * SEO utilities: site URL, robots.txt, sitemap.xml
 */

import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { SITEMAP_PATHS, getLocalizedPath } from "../src/app/routes.config";
import { getServiceKeyFromPath } from "../src/app/routes.config";
import { siteConfig } from "../src/config";
import { it as itDict } from "../src/i18n/it";
import { en as enDict } from "../src/i18n/en";
import type { Locale } from "../src/i18n/types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.resolve(__dirname, "data");
const CONTENT_FILE =
  process.env.CONTENT_FILE ||
  path.resolve(CONTENT_DIR, "content.json");

const DEFAULT_SITE_URL = "https://geniuslab.info";
type LocaleContent = {
  services?: {
    items?: { key: string; name: string; description: string; path: string }[];
  };
  servicePages?: Record<
    string,
    {
      heroTitle?: string;
      metaDescription?: string;
      keywords?: string;
      faq?: { question: string; answer: string }[];
    }
  >;
};

function loadLocaleContent(filename: string): LocaleContent {
  const filePath = path.resolve(__dirname, "data", filename);
  try {
    if (!fs.existsSync(filePath)) return {};
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as LocaleContent;
  } catch {
    return {};
  }
}

const CONTENT_BY_LOCALE: Record<Locale, LocaleContent> = {
  it: loadLocaleContent("content.it.json"),
  en: loadLocaleContent("content.en.json"),
};

export function getSiteUrl(): string {
  const url = process.env.PUBLIC_SITE_URL || DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}

function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "it";
}

function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

function getLegacySuffix() {
  const legacyBrand = siteConfig.brand.legacyBrand ?? "AvaTech";
  return legacyBrand ? ` | ex ${legacyBrand}` : "";
}

function getLocaleDict(locale: Locale) {
  return locale === "en" ? enDict : itDict;
}

function getLocalizedTitle(title: string): string {
  return `${title}${getLegacySuffix()}`;
}

function getLocalizedDescription(description: string): string {
  return `${description}${getLegacySuffix()}`;
}

function getLocalizedKeywords(keywords?: string): string | undefined {
  const legacyBrand = siteConfig.brand.legacyBrand ?? "AvaTech";
  if (!keywords) return legacyBrand || undefined;
  return keywords.includes(legacyBrand) ? keywords : `${keywords}, ${legacyBrand}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildLocalBusinessJsonLd(locale: Locale) {
  const [primaryLoc, ...otherLocations] = siteConfig.locations as Array<
    (typeof siteConfig.locations)[number] & { geo?: { latitude: number; longitude: number } }
  >;
  const loc = primaryLoc ?? {
    label: "Lab",
    street: "",
    city: "Roma",
    postalCode: "",
  };
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brand.name,
    ...(siteConfig.brand.legacyBrand && {
      alternateName: siteConfig.brand.legacyBrand,
    }),
    description: siteConfig.brand.tagline,
    url: getSiteUrl(),
    image: `${getSiteUrl()}/logo.png`,
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
  if (primaryLoc?.geo) {
    schema.geo = {
      "@type": "GeoCoordinates",
      latitude: primaryLoc.geo.latitude,
      longitude: primaryLoc.geo.longitude,
    };
  }
  if (otherLocations.length > 0) {
    schema.department = otherLocations.map((item) => ({
      "@type": "LocalBusiness",
      name: `${siteConfig.brand.name} ${item.label}`.trim(),
      address: {
        "@type": "PostalAddress",
        streetAddress: item.street,
        addressLocality: item.city,
        postalCode: item.postalCode,
        addressCountry: "IT",
      },
      ...(item.geo && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: item.geo.latitude,
          longitude: item.geo.longitude,
        },
      }),
    }));
  }
  schema.inLanguage = locale === "en" ? "en" : "it";
  const social = siteConfig.social as
    | { instagram?: string; tiktok?: string; facebook?: string }
    | undefined;
  if (social) {
    const sameAs = [social.instagram, social.tiktok, social.facebook].filter(Boolean);
    if (sameAs.length) schema.sameAs = sameAs;
  }
  return schema;
}

function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${getSiteUrl()}${item.path}`,
    })),
  };
}

function buildWebPageJsonLd(
  name: string,
  description: string,
  pathName: string,
  locale: Locale
) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${getSiteUrl()}${pathName}`,
    inLanguage: locale === "en" ? "en" : "it",
  };
}

function buildServiceJsonLd(
  serviceName: string,
  description: string,
  pathName: string,
  locale: Locale,
  serviceType?: string
) {
  return {
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
      name: siteConfig.locations[0]?.city ?? "Roma",
      containedInPlace: { "@type": "Country", name: "Italy" },
    },
    url: `${getSiteUrl()}${pathName}`,
    ...(serviceType ? { serviceType } : {}),
    inLanguage: locale === "en" ? "en" : "it",
  };
}

function buildFaqJsonLd(items: { question: string; answer: string }[], locale: Locale) {
  if (!items.length) return null;
  return {
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
    inLanguage: locale === "en" ? "en" : "it",
  };
}

type HeadData = {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath: string;
  locale: Locale;
  noindex?: boolean;
  jsonLd?: Array<Record<string, unknown> | null>;
};

export function getHeadData(pathname: string): HeadData {
  const normalizedPath = normalizePath(pathname);
  const locale = getLocaleFromPath(normalizedPath);
  const dict = getLocaleDict(locale);
  const content = CONTENT_BY_LOCALE[locale];
  const serviceKey = getServiceKeyFromPath(normalizedPath);

  if (serviceKey) {
    const page = content.servicePages?.[serviceKey];
    const item = content.services?.items?.find((entry) => entry.key === serviceKey);
    const title = getLocalizedTitle(page?.heroTitle ?? item?.name ?? dict.pages.services.title);
    const description = getLocalizedDescription(
      page?.metaDescription ?? item?.description ?? dict.pages.services.description
    );
    const keywords = getLocalizedKeywords(page?.keywords);
    const serviceName = item?.name ?? page?.heroTitle ?? title;
    const faq = buildFaqJsonLd(page?.faq ?? [], locale);

    return {
      title,
      description,
      keywords,
      canonicalPath: normalizedPath,
      locale,
      jsonLd: [
        buildLocalBusinessJsonLd(locale),
        buildServiceJsonLd(serviceName, description, normalizedPath, locale, item?.name ?? serviceName),
        buildBreadcrumbJsonLd([
          { name: siteConfig.brand.name, path: getLocalizedPath("/", locale) },
          { name: dict.pages.services.heading, path: getLocalizedPath("/servizi", locale) },
          { name: serviceName, path: normalizedPath },
        ]),
        faq,
      ].filter(Boolean) as Array<Record<string, unknown>>,
    };
  }

  if (normalizedPath === "/" || normalizedPath === "/en") {
    const title = getLocalizedTitle(dict.pages.home.title);
    const description = getLocalizedDescription(dict.pages.home.description);
    return {
      title,
      description,
      keywords: getLocalizedKeywords(dict.pages.home.keywords),
      canonicalPath: normalizedPath,
      locale,
      jsonLd: [
        buildLocalBusinessJsonLd(locale),
        buildWebPageJsonLd(title, description, normalizedPath, locale),
      ],
    };
  }

  if (normalizedPath === "/servizi" || normalizedPath === "/en/services") {
    const title = getLocalizedTitle(dict.pages.services.title);
    const description = getLocalizedDescription(dict.pages.services.description);
    return {
      title,
      description,
      keywords: getLocalizedKeywords(dict.pages.services.keywords),
      canonicalPath: normalizedPath,
      locale,
      jsonLd: [
        buildLocalBusinessJsonLd(locale),
        buildWebPageJsonLd(title, description, normalizedPath, locale),
        buildBreadcrumbJsonLd([
          { name: siteConfig.brand.name, path: getLocalizedPath("/", locale) },
          { name: dict.pages.services.heading, path: normalizedPath },
        ]),
      ],
    };
  }

  if (normalizedPath === "/contatti" || normalizedPath === "/en/contacts") {
    const title = getLocalizedTitle(dict.pages.contacts.title);
    const description = getLocalizedDescription(dict.pages.contacts.description);
    return {
      title,
      description,
      keywords: getLocalizedKeywords(dict.pages.contacts.keywords),
      canonicalPath: normalizedPath,
      locale,
      jsonLd: [
        buildLocalBusinessJsonLd(locale),
        buildWebPageJsonLd(title, description, normalizedPath, locale),
        buildBreadcrumbJsonLd([
          { name: siteConfig.brand.name, path: getLocalizedPath("/", locale) },
          { name: dict.pages.contacts.heading, path: normalizedPath },
        ]),
      ],
    };
  }

  if (normalizedPath === "/chi-siamo" || normalizedPath === "/en/about") {
    const title = getLocalizedTitle(dict.pages.about.title);
    const description = getLocalizedDescription(dict.pages.about.description);
    return {
      title,
      description,
      keywords: getLocalizedKeywords(dict.pages.about.keywords),
      canonicalPath: normalizedPath,
      locale,
      jsonLd: [
        buildLocalBusinessJsonLd(locale),
        buildWebPageJsonLd(title, description, normalizedPath, locale),
        buildBreadcrumbJsonLd([
          { name: siteConfig.brand.name, path: getLocalizedPath("/", locale) },
          { name: dict.pages.about.heading, path: normalizedPath },
        ]),
      ],
    };
  }

  if (normalizedPath === "/recensioni" || normalizedPath === "/en/reviews") {
    const title = getLocalizedTitle(dict.pages.reviews.title);
    const description = getLocalizedDescription(dict.pages.reviews.description);
    return {
      title,
      description,
      keywords: getLocalizedKeywords(dict.pages.reviews.keywords),
      canonicalPath: normalizedPath,
      locale,
      jsonLd: [
        buildLocalBusinessJsonLd(locale),
        buildWebPageJsonLd(title, description, normalizedPath, locale),
        buildBreadcrumbJsonLd([
          { name: siteConfig.brand.name, path: getLocalizedPath("/", locale) },
          { name: dict.pages.reviews.heading, path: normalizedPath },
        ]),
      ],
    };
  }

  if (
    normalizedPath === "/privacy-policy" ||
    normalizedPath === "/en/privacy-policy" ||
    normalizedPath === "/cookie-policy" ||
    normalizedPath === "/en/cookie-policy"
  ) {
    const isCookie = normalizedPath.includes("cookie");
    const title = getLocalizedTitle(
      isCookie ? dict.pages.policies.cookieTitle : dict.pages.policies.privacyTitle
    );
    const description = getLocalizedDescription(
      isCookie ? dict.pages.policies.cookieDescription : dict.pages.policies.privacyDescription
    );
    const label = isCookie ? dict.footer.cookie : dict.footer.privacy;
    return {
      title,
      description,
      keywords: undefined,
      canonicalPath: normalizedPath,
      locale,
      jsonLd: [
        buildWebPageJsonLd(title, description, normalizedPath, locale),
        buildBreadcrumbJsonLd([
          { name: siteConfig.brand.name, path: getLocalizedPath("/", locale) },
          { name: label, path: normalizedPath },
        ]),
      ],
    };
  }

  if (normalizedPath === "/404" || normalizedPath === "/en/404") {
    const title = dict.pages.notFound.title;
    const description = dict.pages.notFound.description;
    return {
      title,
      description,
      canonicalPath: normalizedPath,
      locale,
      noindex: true,
      jsonLd: [buildWebPageJsonLd(title, description, normalizedPath, locale)],
    };
  }

  const title = getLocalizedTitle(dict.pages.home.title);
  const description = getLocalizedDescription(dict.pages.home.description);
  return {
    title,
    description,
    keywords: getLocalizedKeywords(dict.pages.home.keywords),
    canonicalPath: normalizedPath,
    locale,
    jsonLd: [
      buildLocalBusinessJsonLd(locale),
      buildWebPageJsonLd(title, description, normalizedPath, locale),
    ],
  };
}

export function buildHeadHtml(pathname: string): string {
  const head = getHeadData(pathname);
  const base = getSiteUrl();
  const canonicalUrl = `${base}${head.canonicalPath === "/" ? "/" : head.canonicalPath}`;
  const links: string[] = [`<${canonicalUrl}>; rel="canonical"`];
  if (!head.canonicalPath.startsWith("/admin")) {
    const itPath = getLocalizedPath(head.canonicalPath, "it");
    const enPath = getLocalizedPath(head.canonicalPath, "en");
    links.push(`<${base}${itPath === "/" ? "/" : itPath}>; rel="alternate"; hreflang="it"`);
    links.push(`<${base}${enPath === "/en" ? "/en" : enPath}>; rel="alternate"; hreflang="en"`);
    links.push(`<${base}${itPath === "/" ? "/" : itPath}>; rel="alternate"; hreflang="x-default"`);
  }
  const jsonLd = head.jsonLd?.filter(Boolean);
  const script =
    jsonLd && jsonLd.length
      ? `<script type="application/ld+json">${JSON.stringify(
          jsonLd.length === 1 ? jsonLd[0] : { "@context": "https://schema.org", "@graph": jsonLd }
        )}</script>`
      : "";
  const robots = head.noindex ? `<meta name="robots" content="noindex, nofollow" />` : "";

  return [
    `<title>${escapeHtml(head.title)}</title>`,
    `<meta name="description" content="${escapeHtml(head.description)}" />`,
    head.keywords ? `<meta name="keywords" content="${escapeHtml(head.keywords)}" />` : "",
    `<link rel="canonical" href="${escapeHtml(canonicalUrl)}" />`,
    `<link rel="alternate" hreflang="it" href="${escapeHtml(`${base}${getLocalizedPath(head.canonicalPath, "it")}`)}" />`,
    `<link rel="alternate" hreflang="en" href="${escapeHtml(`${base}${getLocalizedPath(head.canonicalPath, "en")}`)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(`${base}${getLocalizedPath(head.canonicalPath, "it")}`)}" />`,
    robots,
    `<meta property="og:url" content="${escapeHtml(canonicalUrl)}" />`,
    `<meta property="og:title" content="${escapeHtml(head.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(head.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${head.locale === "en" ? "en_US" : "it_IT"}" />`,
    script,
  ]
    .filter(Boolean)
    .join("\n");
}

export function getRobotsTxt(): string {
  const base = getSiteUrl();
  return `User-agent: *
Allow: /
Disallow: /admin

Sitemap: ${base}/sitemap.xml
`;
}

function getPriority(p: string): number {
  if (p === "/" || p === "/en") return 0.9;
  if (["/servizi", "/contatti", "/chi-siamo", "/recensioni", "/en/services", "/en/contacts", "/en/about", "/en/reviews"].includes(p))
    return 0.8;
  if (p.startsWith("/servizi/") || p.startsWith("/en/services/")) return 0.7;
  return 0.5;
}

function getChangefreq(p: string): string {
  if (["/privacy-policy", "/cookie-policy", "/en/privacy-policy", "/en/cookie-policy"].includes(p)) return "monthly";
  return "weekly";
}

function getPathsFromContent(): string[] | null {
  const pathsToTry = [
    path.join(CONTENT_DIR, "content.it.json"),
    CONTENT_FILE,
  ];
  for (const filePath of pathsToTry) {
    try {
      if (!fs.existsSync(filePath)) continue;
      const raw = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(raw) as { services?: { items?: { path: string }[] } };
      const servicePaths = data.services?.items?.map((i) => i.path) ?? [];
      const staticPaths = [
        "/",
        "/servizi",
        "/contatti",
        "/chi-siamo",
        "/recensioni",
        "/privacy-policy",
        "/cookie-policy",
      ];
      return [...staticPaths, ...servicePaths];
    } catch {
      continue;
    }
  }
  return null;
}

export function getSitemapXml(): string {
  const base = getSiteUrl();
  const lastmod =
    process.env.SITEMAP_LASTMOD ?? new Date().toISOString().split("T")[0];

  const itPaths = getPathsFromContent() ?? SITEMAP_PATHS;

  const urls = itPaths
    .map(
      (p) => {
        const loc = base + p;
        const altEn = base + getLocalizedPath(p, "en");
        const altIt = base + getLocalizedPath(p, "it");
        return `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="it" href="${altIt}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${altEn}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${altIt}"/>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${getChangefreq(p)}</changefreq>
    <priority>${getPriority(p)}</priority>
  </url>`;
      }
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;
}
