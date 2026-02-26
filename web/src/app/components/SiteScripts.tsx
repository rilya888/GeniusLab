/**
 * Analytics (GTM) loaded only after consent. Handles data-track and form tracking.
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
    GeniusAnalytics?: {
      track: (eventName: string, payload?: Record<string, unknown>) => void;
    };
  }
}

export function SiteScripts() {
  useEffect(() => {
    let analyticsLoaded = false;

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

    const loadGTM = () => {
      if (analyticsLoaded || !gtmId) return;
      analyticsLoaded = true;
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
      script.onerror = () => {
        analyticsLoaded = false;
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

    if (getConsent()?.analytics && gtmId) loadGTM();

    const onConsent = (e: CustomEvent<{ analytics: boolean }>) => {
      if (e.detail.analytics && gtmId) loadGTM();
    };
    window.addEventListener("consent-updated", onConsent as EventListener);

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
