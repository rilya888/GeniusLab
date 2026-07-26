import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Contact } from "../components/Contact";
import { SEOHead } from "../components/SEOHead";
import { motion } from "motion/react";
import { localBusinessJsonLd, faqJsonLd, webPageJsonLd } from "../utils/jsonLd";
import { useLocale } from "../context/LocaleContext";
import { getPath } from "../routes.config";

export function Home() {
  const { dict, locale } = useLocale();
  const { title, description, faq } = dict.pages.home;
  const homeFaq = faq ?? [];
  const homePath = getPath(locale, "home");
  const jsonLdItems = [
    localBusinessJsonLd(locale),
    webPageJsonLd(title, description, homePath, locale),
  ];
  const faqSchema = faqJsonLd(homeFaq, locale);
  if (faqSchema) jsonLdItems.push(faqSchema);

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={getPath(locale, "home")}
        jsonLd={jsonLdItems}
        keywords={dict.pages.home.keywords}
        locale={locale}
      />
      <Hero />
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed">
            {locale === "it"
              ? "Centro assistenza Apple a Roma, in Viale Somalia 246, con supporto per MacBook, iMac, iPhone, iPad, Apple Watch e recupero dati."
              : "Apple support center in Rome, at Viale Somalia 246, with support for MacBook, iMac, iPhone, iPad, Apple Watch and data recovery."}
          </p>
        </div>
      </section>
      <Services />
      <Process />
      {homeFaq.length > 0 && (
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-10 text-center text-black">
              {locale === "it" ? "Domande frequenti" : "Frequently asked questions"}
            </h2>
            <dl className="space-y-6">
              {homeFaq.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 bg-white rounded-lg shadow-sm"
                >
                  <dt className="font-medium text-lg text-black mb-2">{item.question}</dt>
                  <dd className="font-light text-gray-700">{item.answer}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </section>
      )}
      <Contact />
    </>
  );
}
