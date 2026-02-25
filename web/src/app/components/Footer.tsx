import { Link } from "react-router";
import { motion } from "motion/react";
import { siteConfig } from "@/config";
import { it } from "@/i18n/it";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="flex flex-col items-center justify-center space-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img src="/logo.png" alt={siteConfig.brand.name} className="h-12 w-auto" />
          <p className="text-gray-600 font-light text-center">
            {siteConfig.brand.name} - {siteConfig.brand.tagline}
          </p>
          <p className="text-gray-400 text-sm font-light">
            © {new Date().getFullYear()} {siteConfig.brand.name}. Tutti i diritti riservati.
          </p>
          <div className="flex gap-8 text-sm">
            <Link 
              to="/privacy-policy"
              className="text-gray-600 hover:text-black transition-colors font-light"
            >
              {it.footer.privacy}
            </Link>
            <Link 
              to="/cookie-policy"
              className="text-gray-600 hover:text-black transition-colors font-light"
            >
              {it.footer.cookie}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}