/**
 * Cookie consent banner. Accept/Reject stored in localStorage.
 * Analytics (GTM) loads only after Accept.
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { it } from "@/i18n/it";

const CONSENT_KEY = "genius_consent_v1";

function getConsent(): { analytics: boolean } | null {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (typeof parsed?.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

function setConsent(analytics: boolean) {
  const value = { analytics, updatedAt: new Date().toISOString() };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  return value;
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  const handleAccept = () => {
    setConsent(true);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("consent-updated", { detail: { analytics: true } }));
  };

  const handleReject = () => {
    setConsent(false);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("consent-updated", { detail: { analytics: false } }));
  };

  if (!visible) return null;

  return (
    <motion.section
      id="consent-banner"
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 text-white px-6 py-4 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-light text-sm sm:text-base">{it.consent.text}</p>
        <div className="flex gap-4 flex-shrink-0">
          <button
            type="button"
            className="bg-white text-black px-6 py-2 rounded-full font-light hover:bg-gray-200 transition-colors"
            data-consent-action="accept"
            onClick={handleAccept}
          >
            {it.consent.accept}
          </button>
          <button
            type="button"
            className="border border-white px-6 py-2 rounded-full font-light hover:bg-white/10 transition-colors"
            data-consent-action="reject"
            onClick={handleReject}
          >
            {it.consent.reject}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
