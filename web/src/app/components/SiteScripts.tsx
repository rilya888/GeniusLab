/**
 * Analytics (GTM) loaded on page load with Consent Mode. Tag is always present for verification;
 * data collection is gated by consent. Handles data-track and form tracking.
 */

import { useEffect } from "react";

const CONSENT_KEY = "genius_consent_v1";
const gtmId =
  (typeof import.meta !== "undefined" &&
    (import.meta as { env?: { VITE_PUBLIC_GTM_ID?: string } }).env?.VITE_PUBLIC_GTM_ID?.trim()) ||
  "";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    GeniusAnalytics?: {
      track: (eventName: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export function SiteScripts() {
  useEffect(() => {
    let gtmLoaded = false;

    const getConsent = (): { analytics: boolean } | null => {
      try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (!stored) return null;
        const parsed = JSON.parse(stored);
        if (typeof parsed?.analytics !== "boolean") return null;
        return parsed;
      } catch {
        return null;
      }
    };

    const pushConsentUpdate = (granted: boolean) => {
      const state = {
        analytics_storage: granted ? "granted" : "denied",
        ad_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
      };
      window.gtag?.("consent", "update", state);
      // Custom event so GTM can fire GA4 tag when consent is granted (tag won't re-fire on All Pages)
      window.dataLayer?.push({ event: "consent_update", ...state });
    };

    const loadGTM = () => {
      if (gtmLoaded || !gtmId) return;
      gtmLoaded = true;

      // Do not overwrite gtag if already set by direct snippet in index.html
      window.dataLayer = window.dataLayer || [];
      if (!window.gtag) {
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer?.push(args);
        };
        // Consent default is set by gtag snippet in index.html; only set here when no snippet
        window.gtag("consent", "default", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        });
      }

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
      script.onerror = () => {
        gtmLoaded = false;
      };
      document.head.appendChild(script);
    };

    window.dataLayer = window.dataLayer || [];
    window.GeniusAnalytics = {
      track(eventName: string, payload: Record<string, unknown> = {}) {
        const consent = getConsent();
        if (!consent?.analytics) return;
        window.dataLayer?.push({
          event: eventName,
          page: window.location.pathname,
          ...payload,
          ts: Date.now(),
        });
      },
    };

    // Load GTM on page load (tag detectable for verification); Consent Mode blocks data until accepted
    if (gtmId) loadGTM();

    const onConsent = (e: CustomEvent<{ analytics: boolean }>) => {
      pushConsentUpdate(e.detail.analytics);
    };
    window.addEventListener("consent-updated", onConsent as EventListener);

    // If user already had consent, update immediately
    if (getConsent()?.analytics) pushConsentUpdate(true);

    // Event delegation: captures data-track on dynamically rendered elements (SPA navigation)
    const handleTrack = (e: Event) => {
      const target = (e.target as HTMLElement).closest("[data-track]");
      if (!target) return;
      const eventName = target.getAttribute("data-track") || "";
      const label = target.getAttribute("data-track-label") || target.textContent?.trim() || "";
      window.GeniusAnalytics?.track(eventName, { label });
    };
    document.addEventListener("click", handleTrack);

    return () => {
      window.removeEventListener("consent-updated", onConsent as EventListener);
      document.removeEventListener("click", handleTrack);
    };
  }, []);

  return null;
}
