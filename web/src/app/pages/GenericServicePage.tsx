/**
 * Generic service page: renders from content by slug.
 * Replaces 12 individual service page components when content is available.
 */

import { Link, Navigate, useLocation } from "react-router";
import { Phone, MessageCircle, CheckCircle, MapPin, ShieldCheck, Clock3, Star } from "lucide-react";
import { motion } from "motion/react";
import { SEOHead } from "../components/SEOHead";
import { serviceJsonLd, breadcrumbJsonLd, faqJsonLd, localBusinessJsonLd } from "../utils/jsonLd";
import { siteConfig } from "@/config";
import { useContent } from "../context/ContentContext";
import { useLocale } from "../context/LocaleContext";
import { getServiceIcon } from "../config/services.config";
import { getPath, getServiceKeyFromPath } from "../routes.config";

export function GenericServicePage() {
  const location = useLocation();
  const content = useContent();
  const { dict, locale } = useLocale();
  const path = location.pathname;

  const serviceKey = getServiceKeyFromPath(path);
  const serviceItem = serviceKey
    ? content.services.items.find((item) => item.key === serviceKey)
    : undefined;
  const pageData = serviceItem
    ? content.servicePages[serviceItem.key]
    : undefined;

  if (!serviceItem || !pageData) {
    return <Navigate to={getPath(locale, "notFound")} replace />;
  }

  const Icon = getServiceIcon(serviceItem.key);
  const phoneHref = `tel:${siteConfig.contacts.phonePrimary.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${siteConfig.contacts.whatsapp.replace(/\s/g, "").replace("+", "")}`;

  const faq = pageData.faq ?? [];
  const relatedServiceKeysMap: Partial<Record<string, string[]>> = {
    macbook: ["display", "battery", "keyboard", "ssd", "dataRecovery"],
    display: ["macbook", "battery", "keyboard", "ssd"],
    battery: ["macbook", "display", "ssd"],
    ssd: ["macbook", "dataRecovery", "battery"],
    keyboard: ["macbook", "display", "battery"],
    flexgate: ["display", "macbook", "dataRecovery"],
    imac: ["dataRecovery", "ssd", "macbook"],
    dataRecovery: ["macbook", "imac", "ssd"],
    iphone: ["ipad", "watch", "dataRecovery"],
    ipad: ["iphone", "watch", "dataRecovery"],
    watch: ["iphone", "ipad"],
  };
  const relatedServiceKeys = relatedServiceKeysMap[serviceItem.key] ?? [];
  const relatedServices = relatedServiceKeys
    .map((key) => content.services.items.find((item) => item.key === key))
    .filter((item): item is (typeof content.services.items)[number] => Boolean(item));
  const serviceTypeMap: Record<string, string> = {
    macbook: "MacBook repair",
    iphone: "iPhone repair",
    ipad: "iPad repair",
    watch: "Apple Watch repair",
    imac: "iMac repair",
    display: "MacBook display replacement",
    dataRecovery: "Data recovery",
    battery: "MacBook battery replacement",
    ssd: "MacBook SSD upgrade",
    flexgate: "Flexgate display repair",
    keyboard: "MacBook keyboard replacement",
    software: "macOS software support",
  };
  const serviceType = serviceTypeMap[serviceItem.key];

  const jsonLdItems = [
    localBusinessJsonLd(locale),
    serviceJsonLd(serviceItem.name, pageData.metaDescription, path, locale, serviceType),
    breadcrumbJsonLd([
      { name: "Genius Lab", path: getPath(locale, "home") },
      { name: content.services.heading, path: getPath(locale, "servizi") },
      { name: serviceItem.name, path },
    ]),
  ];
  const faqSchema = faqJsonLd(faq, locale);
  if (faqSchema) jsonLdItems.push(faqSchema);

  return (
    <div className="min-h-screen bg-white pt-16">
      <SEOHead
        title={`${serviceItem.name} | Genius Lab`}
        description={pageData.metaDescription}
        canonical={path}
        keywords={(pageData.keywords?.trim()) ? pageData.keywords : dict.pages.services.keywords}
        locale={locale}
        jsonLd={jsonLdItems}
      />
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Icon className="w-20 h-20" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            {pageData.heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
          >
            {pageData.heroSubtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href={phoneHref}
              className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-track="cta_click_call"
              data-track-label="generic_service_call"
            >
              <Phone className="w-5 h-5" />
              {dict.nav.call}
            </motion.a>
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-track="cta_click_whatsapp"
              data-track-label="generic_service_whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>

      {pageData.answerFirstIntro && (
        <section className="px-6 py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg md:text-xl font-light text-black leading-relaxed"
            >
              {pageData.answerFirstIntro}
            </motion.p>
          </div>
        </section>
      )}

      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            {locale === "it" ? "Perché scegliere Genius Lab" : "Why choose Genius Lab"}
          </motion.h2>
          <p className="max-w-3xl mx-auto text-center text-lg md:text-xl font-light text-gray-700 mb-12">
            {locale === "it"
              ? "Diagnosi chiara, indirizzo fisico a Roma, garanzia sul lavoro e un canale diretto per contattarci senza passaggi inutili."
              : "Clear diagnostics, a physical location in Rome, warranty on the work and a direct line to contact us without extra steps."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: locale === "it" ? "Sede a Roma" : "Rome location",
                text:
                  locale === "it"
                    ? `${siteConfig.locations[0]?.street}, ${siteConfig.locations[0]?.postalCode} ${siteConfig.locations[0]?.city}`
                    : `${siteConfig.locations[0]?.street}, ${siteConfig.locations[0]?.postalCode} ${siteConfig.locations[0]?.city}`,
              },
              {
                icon: Clock3,
                title: locale === "it" ? "Tempi chiari" : "Clear timing",
                text:
                  locale === "it"
                    ? "Ricevi una valutazione iniziale e un preventivo prima dell'intervento."
                    : "You get an initial assessment and a quote before any repair starts.",
              },
              {
                icon: ShieldCheck,
                title: locale === "it" ? "Garanzia" : "Warranty",
                text:
                  locale === "it"
                    ? "Interventi tracciati e garanzia sul lavoro svolto secondo le condizioni del servizio."
                    : "Tracked repairs and warranty on the work performed according to service terms.",
              },
              {
                icon: Star,
                title: locale === "it" ? "Supporto diretto" : "Direct support",
                text:
                  locale === "it"
                    ? "Contatti telefonici e WhatsApp, più collegamenti rapidi alla pagina contatti e recensioni."
                    : "Phone and WhatsApp contacts, plus quick links to the contacts and reviews pages.",
              },
            ].map((item, index) => {
              const CardIcon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="p-6 rounded-2xl border border-gray-200 bg-gray-50"
                >
                  <CardIcon className="w-8 h-8 text-black mb-4" />
                  <h3 className="text-xl font-medium text-black mb-2">{item.title}</h3>
                  <p className="text-gray-700 font-light leading-relaxed">{item.text}</p>
                </motion.div>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to={getPath(locale, "contatti")}
              className="inline-flex items-center rounded-full border border-black px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
            >
              {locale === "it" ? "Vai ai contatti" : "Go to contacts"}
            </Link>
            <Link
              to={getPath(locale, "recensioni")}
              className="inline-flex items-center rounded-full border border-black px-6 py-3 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
            >
              {locale === "it" ? "Leggi le recensioni" : "Read reviews"}
            </Link>
          </div>
        </div>
      </section>

      {relatedServices.length > 0 && (
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
            >
              {locale === "it" ? "Servizi correlati" : "Related services"}
            </motion.h2>
            <p className="max-w-3xl mx-auto text-center text-lg font-light text-gray-700 mb-10">
              {locale === "it"
                ? "Se il problema tocca piu componenti, questi collegamenti aiutano a coprire il resto del percorso di riparazione."
                : "If the issue affects multiple components, these links cover the rest of the repair path."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {relatedServices.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    className="block rounded-2xl border border-gray-200 bg-white p-5 hover:border-black hover:shadow-sm transition-all"
                  >
                    <div className="text-lg font-medium text-black mb-1">{item.name}</div>
                    <div className="text-sm font-light text-gray-600">{item.description}</div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            {pageData.servicesSectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {pageData.services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                <span className="font-light text-lg text-black">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
          >
            {pageData.problemsSectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-6 bg-white/10 rounded-lg backdrop-blur-sm"
              >
                <p className="font-light text-lg">{problem}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {faq.length > 0 && (
        <section className="px-6 py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-light tracking-tight mb-10 text-center text-black"
            >
              {locale === "it" ? "Domande frequenti" : "Frequently asked questions"}
            </motion.h2>
            <dl className="space-y-6">
              {faq.map((item, index) => (
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

      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6"
          >
            {dict.pages.services.ctaHelp}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to={getPath(locale, "contatti")}
              className="bg-white text-black px-10 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light"
            >
              {dict.pages.services.ctaContact}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
