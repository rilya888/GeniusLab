import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { ReviewsEmbed } from "../components/ReviewsEmbed";
import { webPageJsonLd } from "../utils/jsonLd";
import { useLocale } from "../context/LocaleContext";
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
        jsonLd={webPageJsonLd(heading, description, path, locale)}
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
