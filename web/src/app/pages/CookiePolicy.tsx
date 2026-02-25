import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { it } from "@/i18n/it";

export function CookiePolicy() {
  const { cookieTitle, cookieDescription } = it.pages.policies;
  return (
    <>
      <SEOHead
        title={cookieTitle}
        description={cookieDescription}
        canonical="/cookie-policy"
      />
      <div className="min-h-screen bg-white pt-16 px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl font-light tracking-tight mb-8 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {it.footer.cookie}
          </motion.h1>
          <motion.div
            className="prose prose-gray font-light text-gray-600 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>Cookie tecnici sempre attivi. Analytics solo dopo consenso esplicito.</p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
