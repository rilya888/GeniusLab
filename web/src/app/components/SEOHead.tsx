/**
 * SEO meta tags and JSON-LD. Use in each page for unique title/description/canonical.
 */

import { Helmet } from "react-helmet-async";

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
};

export function SEOHead({
  title,
  description,
  canonical,
  noindex = false,
  jsonLd,
  ogImage = "/logo.png",
  keywords,
}: SEOHeadProps) {
  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL.replace(/\/$/, "")}${canonical === "/" ? "" : canonical}`
    : undefined;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && (
        <meta property="og:url" content={canonicalUrl} />
      )}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="it_IT" />
      {ogImage && (
        <meta property="og:image" content={ogImage.startsWith("http") ? ogImage : `${SITE_URL.replace(/\/$/, "")}${ogImage}`} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      {ogImage && (
        <meta name="twitter:image" content={ogImage.startsWith("http") ? ogImage : `${SITE_URL.replace(/\/$/, "")}${ogImage}`} />
      )}
      {keywords && <meta name="keywords" content={keywords} />}
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
