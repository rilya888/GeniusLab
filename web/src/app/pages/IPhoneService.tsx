import { Smartphone, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { SEOHead } from "../components/SEOHead";
import { serviceJsonLd, breadcrumbJsonLd } from "../utils/jsonLd";
import { useLocale } from "@/app/context/LocaleContext";

export function IPhoneService() {
  const { dict } = useLocale();
  const services = [
    "Sostituzione schermo iPhone",
    "Cambio batteria iPhone",
    "Riparazione fotocamera iPhone",
    "Sostituzione vetro posteriore",
    "Riparazione pulsanti e tasti",
    "Sostituzione altoparlanti",
    "Riparazione connettore di ricarica",
    "Face ID e Touch ID",
    "Riparazione danni da acqua",
    "Sblocco iPhone"
  ];

  const models = [
    "iPhone 15 Pro Max",
    "iPhone 15 Pro",
    "iPhone 15 Plus",
    "iPhone 15",
    "iPhone 14 Pro Max",
    "iPhone 14 Pro",
    "iPhone 14 Plus",
    "iPhone 14",
    "iPhone 13 Pro Max",
    "iPhone 13 Pro",
    "iPhone 13",
    "iPhone 12 Pro Max",
    "iPhone 12 Pro",
    "iPhone 12",
    "iPhone 11 Pro Max",
    "iPhone 11",
    "iPhone XS Max",
    "iPhone XR",
    "iPhone X",
    "iPhone 8 Plus",
    "iPhone 8",
    "E modelli precedenti"
  ];

  const serviceName = dict.pages.services.links.iphone;
  const desc =
    dict.pages.services.metaDescriptions.iphone ??
    dict.pages.services.description;
  return (
    <div className="min-h-screen bg-white pt-16">
      <SEOHead
        title={`${serviceName} | Genius Lab`}
        description={desc}
        canonical="/servizi/iphone"
        keywords={dict.pages.services.keywords}
        jsonLd={[
          serviceJsonLd(serviceName, desc, "/servizi/iphone"),
          breadcrumbJsonLd([
            { name: "Genius Lab", path: "/" },
            { name: dict.pages.services.heading, path: "/servizi" },
            { name: serviceName, path: "/servizi/iphone" },
          ]),
        ]}
      />
      {/* Hero Section */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Smartphone className="w-20 h-20" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            Riparazione iPhone Roma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
          >
            Centro assistenza iPhone autorizzato a Roma - Riparazione schermo, batteria e altro per tutti i modelli
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <motion.a
              href="tel:+390612345678"
              className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-track="cta_click_call"
              data-track-label="iphone_service_call"
            >
              <Phone className="w-5 h-5" />
              Chiamaci Ora
            </motion.a>
            <motion.a
              href="https://wa.me/390612345678"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light inline-flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-track="cta_click_whatsapp"
              data-track-label="iphone_service_whatsapp"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            Servizi di Riparazione iPhone a Roma
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            GeniusLab offre servizi completi di riparazione iPhone a Roma. Riparazioni rapide, ricambi originali Apple e tecnici certificati per tutti i modelli di iPhone.
          </motion.p>

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

      {/* Models Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            Modelli iPhone Supportati
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Ripariamo tutti i modelli di iPhone, dai più recenti ai modelli precedenti
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                className="p-4 bg-white rounded-lg text-center"
              >
                <p className="font-light text-black">{model}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen Repair Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            Sostituzione Schermo iPhone Roma
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Schermo iPhone rotto o danneggiato? GeniusLab offre servizio di sostituzione schermo iPhone rapido a Roma con display originali Apple. Riparazione schermo iPhone in giornata per la maggior parte dei modelli.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4 text-black">Riparazione Rapida</h3>
              <p className="font-light text-gray-600 leading-relaxed">
                Nella maggior parte dei casi, sostituiamo lo schermo del tuo iPhone in giornata.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4 text-black">Display Originali</h3>
              <p className="font-light text-gray-600 leading-relaxed">
                Utilizziamo solo display originali Apple per garantire qualità e funzionalità perfette.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4 text-black">Garanzia</h3>
              <p className="font-light text-gray-600 leading-relaxed">
                Tutte le sostituzioni schermo sono coperte da garanzia completa.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Battery Section */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
          >
            Sostituzione Batteria iPhone
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Batteria iPhone scarica rapidamente? GeniusLab sostituisce la batteria del tuo iPhone con batterie originali Apple. Servizio di cambio batteria iPhone a Roma con garanzia.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light mb-4">Segnali che la batteria necessita sostituzione:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Il telefono si spegne improvvisamente</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">La batteria si scarica molto velocemente</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">L'iPhone si surriscalda</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Notifica di "Stato batteria degradato"</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="text-2xl font-light mb-4">Vantaggi del nostro servizio:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Batterie originali Apple certificate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Sostituzione rapida in giornata</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Garanzia sulla batteria e sul lavoro</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Prezzi trasparenti e competitivi</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-black"
          >
            Riparazione iPhone Professionale a Roma
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 mb-8"
          >
            Porta il tuo iPhone da GeniusLab per una riparazione professionale e affidabile
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/#contatti"
              className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-light"
            >
              Contattaci
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
