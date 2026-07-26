import { Link } from "react-router";
import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { useLocale } from "../context/LocaleContext";
import { getPath } from "../routes.config";
import { localBusinessJsonLd, webPageJsonLd, breadcrumbJsonLd } from "../utils/jsonLd";

export function ChiSiamo() {
  const { dict, locale } = useLocale();
  const { title, description, heading, intro, values, timeline, timelineTitle } =
    dict.pages.about;
  const path = getPath(locale, "chiSiamo");
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={path}
        keywords={dict.pages.about.keywords}
        locale={locale}
        jsonLd={[
          localBusinessJsonLd(locale),
          webPageJsonLd(heading, description, path, locale),
          breadcrumbJsonLd([
            { name: "Genius Lab", path: getPath(locale, "home") },
            { name: heading, path },
          ]),
        ]}
      />
      <div className="min-h-screen bg-white pt-16 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-light tracking-tight mb-8 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {heading}
          </motion.h1>
          <motion.p
            className="text-xl font-light text-gray-600 leading-relaxed mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {intro}
          </motion.p>

          <div className="mb-16 rounded-2xl border border-gray-200 bg-gray-50 p-6">
            <p className="text-gray-700 font-light leading-relaxed">
              {locale === "it"
                ? "Lavoriamo da Roma, in Viale Somalia 246, con supporto diretto per MacBook, iPhone, iPad, iMac e recupero dati. La priorità è una diagnosi chiara prima di qualsiasi intervento."
                : "We work from Rome, at Viale Somalia 246, with direct support for MacBook, iPhone, iPad, iMac and data recovery. The priority is a clear diagnosis before any repair starts."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={getPath(locale, "contatti")}
                className="inline-flex items-center rounded-full border border-black px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
              >
                {locale === "it" ? "Contatti" : "Contacts"}
              </Link>
              <Link
                to={getPath(locale, "recensioni")}
                className="inline-flex items-center rounded-full border border-black px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
              >
                {locale === "it" ? "Recensioni" : "Reviews"}
              </Link>
            </div>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {values.map((item, i) => (
              <div
                key={item.title}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-light text-black mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="p-6 bg-gray-50 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-light text-black mb-6">
              {timelineTitle}
            </h2>
            <div className="space-y-6">
              {timeline.map((step, i) => (
                <div key={step.title}>
                  <h3 className="text-lg font-light text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 font-light leading-relaxed">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
