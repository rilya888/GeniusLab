import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { ReviewsEmbed } from "../components/ReviewsEmbed";
import { webPageJsonLd, localBusinessJsonLd, breadcrumbJsonLd } from "../utils/jsonLd";
import { useLocale } from "../context/LocaleContext";
import { Link } from "react-router";
import { getPath } from "../routes.config";

export function Recensioni() {
  const { dict, locale } = useLocale();
  const { title, description, heading, intro, checkpoints, fallbackText, checkpointsTitle, fallbackTitle } =
    dict.pages.reviews;
  const path = getPath(locale, "recensioni");
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={path}
        keywords={dict.pages.reviews.keywords}
        locale={locale}
        jsonLd={[
          localBusinessJsonLd(locale),
          webPageJsonLd(heading, description, path, locale),
          breadcrumbJsonLd([
            { name: "Genius Lab", path: getPath(locale, "home") },
            { name: dict.nav.reviews, path },
          ]),
        ]}
      />
      <div className="min-h-screen bg-white pt-16 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {heading}
          </motion.h1>
          <motion.p
            className="text-xl font-light text-gray-600 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {intro}
          </motion.p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Genius%20Lab%20Viale%20Somalia%20246%20Roma"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full border border-black px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
            >
              {locale === "it" ? "Apri in Google Maps" : "Open in Google Maps"}
            </a>
            <Link
              to={getPath(locale, "contatti")}
              className="inline-flex items-center rounded-full border border-black px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
            >
              {locale === "it" ? "Vai ai contatti" : "Go to contacts"}
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-light text-black mb-4">
                {checkpointsTitle}
              </h3>
              <ul className="list-disc list-inside text-gray-600 font-light space-y-2">
                {checkpoints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-light text-black mb-4">
                {fallbackTitle}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {fallbackText}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ReviewsEmbed />
          </motion.div>
        </div>
      </div>
    </>
  );
}
