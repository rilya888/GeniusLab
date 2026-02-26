/**
 * Pushes virtual page_view to dataLayer for SPA route changes.
 * GA4 receives via GTM custom trigger. Excludes /admin paths to avoid polluting analytics.
 */

import { useEffect } from "react";
import { useLocation } from "react-router";

export function AnalyticsPageTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    window.GeniusAnalytics?.track("virtual_page_view", {
      page_path: pathname || "/",
      page_title: typeof document !== "undefined" ? document.title : "",
    });
  }, [pathname]);

  return null;
}
