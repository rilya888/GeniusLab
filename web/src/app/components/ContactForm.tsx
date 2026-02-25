/**
 * Contact form with Formspree. Requires consent checkbox before submit.
 */

import { useState } from "react";
import { motion } from "motion/react";
import { siteConfig } from "@/config";
import { useLocale } from "@/app/context/LocaleContext";
import { getPath } from "@/app/routes.config";
import { Link } from "react-router";

const formEndpoint =
  (typeof import.meta !== "undefined" &&
    (import.meta as { env?: { VITE_PUBLIC_FORM_ENDPOINT?: string } }).env
      ?.VITE_PUBLIC_FORM_ENDPOINT) ||
  siteConfig.forms.endpoint;

const hasValidEndpoint = formEndpoint && !formEndpoint.includes("your-form-id");

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { dict, locale } = useLocale();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent) {
      setStatus(dict.forms.consentRequired);
      return;
    }
    if (!hasValidEndpoint) {
      setStatus(dict.forms.missingEndpoint);
      return;
    }
    setStatus(dict.forms.sending);
    window.GeniusAnalytics?.track("form_submit_attempt", { formId: "contact-form" });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const res = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setStatus("");
      } else {
        setStatus(data.error || dict.forms.error);
      }
    } catch {
      setStatus(dict.forms.connectionError);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <p className="text-xl font-light text-gray-300">
          {dict.forms.success}
        </p>
      </div>
    );
  }

  return (
    <form
      id="contact-form"
      className="space-y-6"
      data-form
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-light mb-6">{dict.pages.contacts.formHeading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="name"
          required
          autoComplete="name"
          placeholder={dict.pages.contacts.formName}
          className="bg-transparent border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light"
        />
        <input
          type="text"
          name="phone_or_email"
          required
          autoComplete="email"
          placeholder={dict.pages.contacts.formContact}
          className="bg-transparent border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light"
        />
      </div>
      <select
        name="device"
        className="w-full bg-black border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light"
      >
        <option value="">{dict.forms.selectDevice}</option>
        <option value="iphone">iPhone</option>
        <option value="macbook">MacBook</option>
        <option value="ipad">iPad</option>
        <option value="watch">Apple Watch</option>
        <option value="other">{dict.forms.other}</option>
      </select>
      <textarea
        name="message"
        required
        rows={6}
        placeholder={dict.pages.contacts.formMessage}
        className="w-full bg-transparent border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light resize-none"
      />
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          name="consent_privacy"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span className="font-light text-gray-300">
          {dict.pages.contacts.formConsent}{" "}
          <Link to={getPath(locale, "privacyPolicy")} className="underline hover:text-white">
            {dict.footer.privacy}
          </Link>
        </span>
      </label>
      <motion.button
        type="submit"
        className="w-full bg-white text-black px-10 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-track="form_submit_click"
        data-track-label="contact_form_submit"
      >
        {dict.pages.contacts.formSubmit}
      </motion.button>
      {status && (
        <p className="text-gray-400 font-light text-sm" data-form-status>
          {status}
        </p>
      )}
      <input type="hidden" name="source_page" value="contact" />
      <input type="hidden" name="source_cta" value="form" />
    </form>
  );
}
