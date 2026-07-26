import { Link } from "react-router";
import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { Services } from "../components/Services";
import { localBusinessJsonLd, webPageJsonLd, breadcrumbJsonLd } from "../utils/jsonLd";
import { useLocale } from "../context/LocaleContext";
import { getPath } from "../routes.config";

export function Servizi() {
  const { dict, locale } = useLocale();
  const { title, description, heading } = dict.pages.services;
  const path = getPath(locale, "servizi");
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={path}
        keywords={dict.pages.services.keywords}
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
      <div className="pt-16">
        <Services />
        <section className="px-6 py-16 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto text-center">
            <motion.p
              className="text-lg md:text-xl font-light text-gray-700 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {locale === "it"
                ? "Tutti i servizi partono da Viale Somalia 246 a Roma. Se hai un MacBook, iPhone, iPad, iMac o un problema dati, parti dalla pagina giusta e poi vai ai contatti."
                : "All services start from Viale Somalia 246 in Rome. If you need MacBook, iPhone, iPad, iMac or data support, start from the right page and then go to contacts."}
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to={getPath(locale, "contatti")}
                className="inline-flex items-center rounded-full border border-black px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
              >
                {locale === "it" ? "Vai ai contatti" : "Go to contacts"}
              </Link>
              <Link
                to={getPath(locale, "recensioni")}
                className="inline-flex items-center rounded-full border border-black px-5 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
              >
                {locale === "it" ? "Leggi le recensioni" : "Read reviews"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
