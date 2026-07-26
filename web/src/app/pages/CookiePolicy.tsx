import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { useLocale } from "../context/LocaleContext";
import { getPath } from "../routes.config";
import { breadcrumbJsonLd, webPageJsonLd } from "../utils/jsonLd";

export function CookiePolicy() {
  const { dict, locale } = useLocale();
  const { cookieTitle, cookieDescription, cookieBody } = dict.pages.policies;
  const path = getPath(locale, "cookiePolicy");
  return (
    <>
      <SEOHead
        title={cookieTitle}
        description={cookieDescription}
        canonical={path}
        jsonLd={[
          webPageJsonLd(cookieTitle, cookieDescription, path, locale),
          breadcrumbJsonLd([
            { name: "Genius Lab", path: getPath(locale, "home") },
            { name: dict.footer.cookie, path },
          ]),
        ]}
        locale={locale}
      />
      <div className="min-h-screen bg-white pt-16 px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            className="text-4xl font-light tracking-tight mb-8 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {dict.footer.cookie}
          </motion.h1>
          <motion.p
            className="mb-10 max-w-2xl text-sm uppercase tracking-[0.2em] text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {dict.pages.policies.cookieDescription}
          </motion.p>
          <motion.div
            className="prose prose-gray font-light text-gray-600 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {cookieBody.map((section, i) => (
              <section key={i}>
                <h2 className="text-xl font-light text-black mb-2">{section.title}</h2>
                <p>{section.text}</p>
              </section>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
