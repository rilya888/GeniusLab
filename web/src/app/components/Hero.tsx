import { Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { siteConfig } from "@/config";
import { useLocale } from "@/app/context/LocaleContext";

export function Hero() {
  const { dict } = useLocale();
  const { brand, contacts } = siteConfig;
  const phoneHref = `tel:${contacts.phonePrimary.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${contacts.whatsapp.replace(/\s/g, "").replace("+", "")}`;

  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6">
      <h1 className="sr-only">{brand.name} — {brand.tagline}</h1>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/logo.png"
            alt={brand.name}
            className="h-96 w-auto"
            fetchPriority="high"
            loading="eager"
          />
        </motion.div>
        <motion.p 
          className="text-xl md:text-2xl font-light text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {brand.tagline}
        </motion.p>
        <motion.div 
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a
            href={phoneHref}
            className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-light inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-track="cta_click_call"
            data-track-label="hero_call"
          >
            <Phone className="w-5 h-5" />
            {dict.nav.call}
          </motion.a>
          <motion.a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-light inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-track="cta_click_whatsapp"
            data-track-label="hero_whatsapp"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}