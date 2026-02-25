/**
 * Reusable template for service pages. Reduces duplication across 12+ service routes.
 */

import { LucideIcon, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { SEOHead } from "./SEOHead";
import { serviceJsonLd, breadcrumbJsonLd } from "../utils/jsonLd";
import { siteConfig } from "@/config";
import { it } from "@/i18n/it";

export type ServicePageTemplateProps = {
  serviceKey: keyof typeof it.pages.services.links;
  path: string;
  icon: LucideIcon;
  heroTitle: string;
  heroSubtitle: string;
  services: string[];
  problems: string[];
  servicesSectionTitle?: string;
  problemsSectionTitle?: string;
};

export function ServicePageTemplate({
  serviceKey,
  path,
  icon: Icon,
  heroTitle,
  heroSubtitle,
  services,
  problems,
  servicesSectionTitle = it.pages.services.servicesSectionTitle,
  problemsSectionTitle = it.pages.services.problemsSectionTitle,
}: ServicePageTemplateProps) {
  const serviceName = it.pages.services.links[serviceKey];
  const desc =
    it.pages.services.metaDescriptions[serviceKey] ??
    it.pages.services.description;
  const phoneHref = `tel:${siteConfig.contacts.phonePrimary.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${siteConfig.contacts.whatsapp.replace(/\s/g, "").replace("+", "")}`;

  return (
    <div className="min-h-screen bg-white pt-16">
      <SEOHead
        title={`${serviceName} | Genius Lab`}
        description={desc}
        canonical={path}
        keywords={it.pages.services.keywords}
        jsonLd={[
          serviceJsonLd(serviceName, desc, path),
          breadcrumbJsonLd([
            { name: it.pages.home.title.split(" | ")[0], path: "/" },
            { name: it.pages.services.heading, path: "/servizi" },
            { name: serviceName, path },
          ]),
        ]}
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
            {heroTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
          >
            {heroSubtitle}
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
            >
              <Phone className="w-5 h-5" />
              {it.nav.call}
            </motion.a>
            <motion.a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            {servicesSectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {services.map((service, index) => (
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
            {problemsSectionTitle}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problems.map((problem, index) => (
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

      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6"
          >
            {it.pages.services.ctaHelp}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/contatti"
              className="bg-white text-black px-10 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light"
            >
              {it.pages.services.ctaContact}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
