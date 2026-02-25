import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { useState } from "react";
import { siteConfig } from "@/config";
import { it } from "@/i18n/it";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const services = [
    { name: it.pages.services.links.macbook, path: "/servizi/macbook" },
    { name: it.pages.services.links.iphone, path: "/servizi/iphone" },
    { name: it.pages.services.links.ipad, path: "/servizi/ipad" },
    { name: it.pages.services.links.watch, path: "/servizi/watch" },
    { name: it.pages.services.links.dataRecovery, path: "/servizi/recupero-dati" },
    { name: it.pages.services.links.imac, path: "/servizi/riparazione-imac" },
    { name: it.pages.services.links.display, path: "/servizi/display-macbook" },
    { name: it.pages.services.links.battery, path: "/servizi/batteria-macbook" },
    { name: it.pages.services.links.keyboard, path: "/servizi/tastiera-macbook" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt={siteConfig.brand.name} className="h-10 w-auto" />
            <span className="font-light text-xl text-black">{siteConfig.brand.name}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-gray-600 hover:text-black font-light transition-colors">
                {it.nav.services}
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-white shadow-lg rounded-lg py-4 px-6 min-w-[200px]">
                  <Link
                    to="/servizi"
                    className="block py-2 text-gray-600 hover:text-black font-light transition-colors whitespace-nowrap border-b border-gray-100 mb-2"
                  >
                    Tutti i servizi
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
            <Link to="/contatti" className="text-gray-600 hover:text-black font-light transition-colors">
              {it.nav.contacts}
            </Link>
            <Link to="/chi-siamo" className="text-gray-600 hover:text-black font-light transition-colors">
              {it.nav.about}
            </Link>
            <Link to="/recensioni" className="text-gray-600 hover:text-black font-light transition-colors">
              {it.nav.reviews}
            </Link>
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
                to="/servizi"
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Tutti i servizi
              </Link>
              <p className="text-gray-400 font-light text-sm px-4 mb-2">{it.nav.services}</p>
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
                to="/contatti"
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {it.nav.contacts}
              </Link>
              <Link
                to="/chi-siamo"
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {it.nav.about}
              </Link>
              <Link
                to="/recensioni"
                className="block py-2 px-4 text-gray-600 hover:text-black font-light transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {it.nav.reviews}
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
