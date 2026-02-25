import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { it } from "@/i18n/it";

export function ChiSiamo() {
  const { title, description, heading, intro, values, timeline, timelineTitle } =
    it.pages.about;
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical="/chi-siamo"
        keywords={it.pages.about.keywords}
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
