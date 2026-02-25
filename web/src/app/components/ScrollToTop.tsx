import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { isSamePageDifferentLocale } from "@/app/routes.config";

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (
      prevPathRef.current !== undefined &&
      isSamePageDifferentLocale(prevPathRef.current, pathname)
    ) {
      // Same page, different locale — preserve scroll position
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    prevPathRef.current = pathname;
  }, [pathname, hash]);

  return null;
}
