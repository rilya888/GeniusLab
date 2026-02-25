import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { siteConfig } from "@/config";
import { useLocale } from "@/app/context/LocaleContext";
import { useContent } from "@/app/context/ContentContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { dict, locale } = useLocale();
  const content = useContent();
  const services = content.services.items
    .slice(0, 9)
    .map((item) => ({ name: item.name, path: item.path }));

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt={siteConfig.brand.name} className="h-10 w-auto" />
            <span className="font-light text-xl text-black">
              {siteConfig.brand.name}
              {siteConfig.brand.legacyBrand && (
                <span className="text-gray-500 font-normal text-base ml-1">
                  (ex {siteConfig.brand.legacyBrand})
                </span>
              )}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-gray-600 hover:text-black font-light transition-colors">
                {dict.nav.services}
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white shadow-lg rounded-lg py-4 px-6 min-w-[200px]">
                  <Link
                    to={locale === "it" ? "/servizi" : "/en/services"}
                    className="block py-2 text-gray-600 hover:text-black font-light transition-colors whitespace-nowrap border-b border-gray-100 mb-2"
                  >
                    {dict.pages.services.allServices}
                  </Link>
                  {services.map((service) => (
                    <Link
                      key={service.path}
                      to={service.path}
                      className="block py-2 text-gray-600 hover:text-black font-light transition-colors whitespace-nowrap"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to={locale === "it" ? "/contatti" : "/en/contacts"} className="text-gray-600 hover:text-black font-light transition-colors">
              {dict.nav.contacts}
            </Link>
            <Link to={locale === "it" ? "/chi-siamo" : "/en/about"} className="text-gray-600 hover:text-black font-light transition-colors">
              {dict.nav.about}
            </Link>
            <Link to={locale === "it" ? "/recensioni" : "/en/reviews"} className="text-gray-600 hover:text-black font-light transition-colors">
              {dict.nav.reviews}
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="space-y-2">
              <Link
                to={locale === "it" ? "/servizi" : "/en/services"}
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {dict.pages.services.allServices}
              </Link>
              <p className="text-gray-400 font-light text-sm px-4 mb-2">{dict.nav.services}</p>
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
              <Link
                to={locale === "it" ? "/contatti" : "/en/contacts"}
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {dict.nav.contacts}
              </Link>
              <Link
                to={locale === "it" ? "/chi-siamo" : "/en/about"}
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {dict.nav.about}
              </Link>
              <Link
                to={locale === "it" ? "/recensioni" : "/en/reviews"}
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {dict.nav.reviews}
              </Link>
              <div className="px-4 pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
