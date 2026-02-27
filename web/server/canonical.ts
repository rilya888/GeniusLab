export function isLocalHost(host: string): boolean {
  return host === "localhost" || host.startsWith("localhost:") || host === "127.0.0.1" || host.startsWith("127.0.0.1:");
}

export function normalizeForwardedProto(forwardedProto: string | undefined, fallback: string): string {
  if (!forwardedProto) return fallback.toLowerCase();
  return forwardedProto.split(",")[0]?.trim().toLowerCase() || fallback.toLowerCase();
}

type CanonicalRedirectInput = {
  hostHeader: string;
  forwardedProto?: string;
  fallbackProto: string;
  path: string;
  url: string;
};

export function getCanonicalRedirect(input: CanonicalRedirectInput): string | null {
  const hostHeader = (input.hostHeader || "").toLowerCase();
  if (!hostHeader || isLocalHost(hostHeader)) return null;

  const proto = normalizeForwardedProto(input.forwardedProto, input.fallbackProto);
  const hostNoPort = hostHeader.split(":")[0] || hostHeader;
  let canonicalHost = hostNoPort;

  if (hostNoPort === "www.geniuslab.info") canonicalHost = "geniuslab.info";

  const path = input.path || "/";
  const shouldTrimSlash = path.length > 1 && path.endsWith("/");
  const canonicalPath = shouldTrimSlash ? path.replace(/\/+$/, "") : path;
  const query = input.url.includes("?") ? input.url.slice(input.url.indexOf("?")) : "";

  const shouldRedirect =
    proto !== "https" ||
    canonicalHost !== hostNoPort ||
    canonicalPath !== path;

  if (!shouldRedirect) return null;
  return `https://${canonicalHost}${canonicalPath}${query}`;
}

