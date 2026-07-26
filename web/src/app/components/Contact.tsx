import { MapPin, Phone, Mail, Clock, Star } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/config";
import { useLocale } from "@/app/context/LocaleContext";
import { MapEmbed } from "./MapEmbed";
import { ContactForm } from "./ContactForm";
import { SocialLinks } from "./SocialLinks";

export function Contact() {
  const { dict, locale } = useLocale();
  const addresses = siteConfig.locations.map(
    (loc) => `${loc.label}: ${loc.street}, ${loc.postalCode} ${loc.city}`
  );
  const [primaryLoc] = siteConfig.locations;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.brand.name} ${primaryLoc.street} ${primaryLoc.city}`)}`;
  const contactReviewHref = locale === "it" ? "/recensioni" : "/en/reviews";

  const contactInfo = [
    {
      icon: MapPin,
      title: dict.pages.contacts.address,
      details: addresses,
    },
    {
      icon: Phone,
      title: dict.pages.contacts.phone,
      details: [
        siteConfig.contacts.phonePrimary,
        siteConfig.contacts.phoneSecondary,
      ].filter(Boolean),
    },
    {
      icon: Mail,
      title: dict.pages.contacts.email,
      details: [siteConfig.contacts.email],
    },
    {
      icon: Clock,
      title: dict.pages.contacts.hours,
      details: [siteConfig.hours],
    },
  ];

  return (
    <section id="contatti" className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {dict.pages.contacts.heading}
        </motion.h2>
        <motion.p
          className="text-xl font-light text-gray-400 text-center mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {dict.pages.contacts.subtext}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-6">
                <info.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-light mb-4">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-400 font-light">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="max-w-5xl mx-auto mb-20 rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <a
              href={`tel:${siteConfig.contacts.phonePrimary.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-black px-5 py-4 text-center text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              <Phone className="w-4 h-4" />
              {dict.nav.call}
            </a>
            <a
              href={`https://wa.me/${siteConfig.contacts.whatsapp.replace(/\s/g, "").replace("+", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-black px-5 py-4 text-center text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-black px-5 py-4 text-center text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              <MapPin className="w-4 h-4" />
              {dict.pages.contacts.mapHeading}
            </a>
            <a
              href={contactReviewHref}
              className="flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-black px-5 py-4 text-center text-sm font-medium text-white hover:bg-white hover:text-black transition-colors"
            >
              <Star className="w-4 h-4" />
              {dict.nav.reviews}
            </a>
          </div>
        </motion.div>

        {siteConfig.social && (
          <motion.div
            className="flex justify-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <SocialLinks links={siteConfig.social} variant="light" />
          </motion.div>
        )}

        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <MapEmbed />
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
