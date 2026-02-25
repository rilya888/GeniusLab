/**
 * Sends anonymous visit beacon to /api/track on each route change.
 * No cookies, no consent required. Used for basic site analytics.
 */

import { useEffect } from "react";
import { useLocation } from "react-router";

export function VisitorBeacon() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const body = JSON.stringify({
      path: pathname || "/",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        "/api/track",
        new Blob([body], { type: "application/json" })
      );
    } else {
      fetch("/api/track", {
        method: "POST",
        body,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  }, [pathname]);

  return null;
}
