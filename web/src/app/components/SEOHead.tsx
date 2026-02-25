/**
 * SEO meta tags and JSON-LD. Use in each page for unique title/description/canonical.
 */

import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router";
import { getLocalizedPath } from "@/app/routes.config";
import { siteConfig } from "@/config";
import type { Locale } from "@/i18n/types";

function getSiteUrl(): string {
  if (typeof import.meta !== "undefined") {
    const url = (import.meta as { env?: { VITE_PUBLIC_SITE_URL?: string } })
      .env?.VITE_PUBLIC_SITE_URL;
    if (url) return url;
  }
  if (typeof window !== "undefined") return window.location.origin;
  return "";
}

const SITE_URL = getSiteUrl();

export type SEOHeadProps = {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
  ogImage?: string;
  keywords?: string;
  locale?: Locale;
};

export function SEOHead({
  title,
  description,
  canonical,
  noindex = false,
  jsonLd,
  ogImage = "/logo.png",
  keywords,
  locale,
}: SEOHeadProps) {
  const { pathname } = useLocation();

  // Append legacy brand for SEO (ex-AvaTech users find Genius Lab)
  const legacyBrand = siteConfig.brand.legacyBrand;
  const legacySuffix = legacyBrand ? ` | ex ${legacyBrand}` : "";
  const skipLegacy = noindex;

  const finalTitle = skipLegacy ? title : `${title}${legacySuffix}`;
  const finalDescription = skipLegacy ? description : `${description}${legacySuffix}`;
  const finalKeywords =
    keywords && legacyBrand && !skipLegacy
      ? keywords.includes(legacyBrand)
        ? keywords
        : `${keywords}, ${legacyBrand}`
      : keywords;

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL.replace(/\/$/, "")}${canonical === "/" ? "" : canonical}`
    : undefined;

  const ogLocale = locale === "en" ? "en_US" : "it_IT";
  const base = SITE_URL.replace(/\/$/, "");
  const currentPath = pathname || canonical || "/";
  const altIt = base + getLocalizedPath(currentPath, "it");
  const altEn = base + getLocalizedPath(currentPath, "en");

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {locale && !noindex && (
        <>
          <link rel="alternate" hrefLang="it" href={altIt} />
          <link rel="alternate" hrefLang="en" href={altEn} />
          <link rel="alternate" hrefLang="x-default" href={altIt} />
        </>
      )}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && (
        <meta property="og:url" content={canonicalUrl} />
      )}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={ogLocale} />
      {locale && (
        <meta property="og:locale:alternate" content={locale === "it" ? "en_US" : "it_IT"} />
      )}
      {ogImage && (
        <meta property="og:image" content={ogImage.startsWith("http") ? ogImage : `${SITE_URL.replace(/\/$/, "")}${ogImage}`} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {ogImage && (
        <meta name="twitter:image" content={ogImage.startsWith("http") ? ogImage : `${SITE_URL.replace(/\/$/, "")}${ogImage}`} />
      )}
      {finalKeywords && <meta name="keywords" content={finalKeywords} />}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(jsonLd)
              ? { "@context": "https://schema.org", "@graph": jsonLd }
              : jsonLd
          )}
        </script>
      )}
    </Helmet>
  );
}
