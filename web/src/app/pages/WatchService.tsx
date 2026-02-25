import { Watch, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { SEOHead } from "../components/SEOHead";
import { serviceJsonLd, breadcrumbJsonLd } from "../utils/jsonLd";
import { it } from "@/i18n/it";

export function WatchService() {
  const services = [
    "Sostituzione schermo Apple Watch",
    "Cambio batteria Apple Watch",
    "Riparazione cinturino e meccanismi",
    "Sostituzione vetro protettivo",
    "Riparazione sensori",
    "Problemi di ricarica",
    "Aggiornamento watchOS",
    "Riparazione corona digitale",
    "Sincronizzazione con iPhone",
    "Riparazione danni da acqua"
  ];

  const models = [
    "Apple Watch Ultra 2",
    "Apple Watch Ultra",
    "Apple Watch Series 9",
    "Apple Watch Series 8",
    "Apple Watch Series 7",
    "Apple Watch Series 6",
    "Apple Watch Series 5",
    "Apple Watch Series 4",
    "Apple Watch SE (2023)",
    "Apple Watch SE (2020)",
    "Modelli precedenti"
  ];

  const serviceName = it.pages.services.links.watch;
  const desc =
    it.pages.services.metaDescriptions.watch ??
    it.pages.services.description;
  return (
    <div className="min-h-screen bg-white pt-16">
      <SEOHead
        title={`${serviceName} | Genius Lab`}
        description={desc}
        canonical="/servizi/watch"
        keywords={it.pages.services.keywords}
        jsonLd={[
          serviceJsonLd(serviceName, desc, "/servizi/watch"),
          breadcrumbJsonLd([
            { name: "Genius Lab", path: "/" },
            { name: it.pages.services.heading, path: "/servizi" },
            { name: serviceName, path: "/servizi/watch" },
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
            <Watch className="w-20 h-20" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            Riparazione Apple Watch Roma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
          >
            Centro assistenza Apple Watch a Roma - Riparazione schermo, batteria e componenti per tutti i modelli
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
            Servizi di Riparazione Apple Watch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            GeniusLab offre riparazioni professionali per Apple Watch a Roma. Tecnici specializzati per Apple Watch Ultra, Series e SE con ricambi di qualità.
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

      {/* Screen & Battery Section */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
          >
            Schermo e Batteria Apple Watch
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-light mb-6">Sostituzione Schermo</h3>
              <p className="font-light text-gray-300 mb-6 leading-relaxed">
                Schermo Apple Watch rotto o graffiato? Sostituiamo il display del tuo Apple Watch con componenti di alta qualità, mantenendo tutte le funzionalità originali compreso il touch screen e la luminosità.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Display di qualità premium</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Funzionalità touch preservate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Impermeabilità ripristinata</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-light mb-6">Sostituzione Batteria</h3>
              <p className="font-light text-gray-300 mb-6 leading-relaxed">
                Batteria Apple Watch che si scarica rapidamente? Sostituiamo la batteria del tuo Apple Watch con batterie certificate, ripristinando l'autonomia originale del dispositivo.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Batterie certificate di alta qualità</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Ripristino autonomia originale</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span className="font-light">Test completi post-riparazione</span>
                </li>
              </ul>
            </motion.div>
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
            Modelli Apple Watch Supportati
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Ripariamo tutti i modelli di Apple Watch: Ultra, Series e SE
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-white rounded-lg text-center"
              >
                <p className="font-light text-black">{model}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Problems */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            Problemi Comuni Apple Watch
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Non si Ricarica</h3>
              <p className="font-light text-gray-600">
                Apple Watch non si ricarica o ricarica in modo intermittente
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Schermo Non Risponde</h3>
              <p className="font-light text-gray-600">
                Display touch che non funziona o risponde in modo errato
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Problemi di Connessione</h3>
              <p className="font-light text-gray-600">
                Difficoltà di sincronizzazione con iPhone o connessione GPS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Sensori Difettosi</h3>
              <p className="font-light text-gray-600">
                Problemi con cardiofrequenzimetro o altri sensori di salute
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Corona Digitale</h3>
              <p className="font-light text-gray-600">
                Corona digitale bloccata o che non ruota correttamente
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Danni da Liquidi</h3>
              <p className="font-light text-gray-600">
                Apple Watch esposto a liquidi oltre la resistenza standard
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6"
          >
            Riparazione Apple Watch Professionale a Roma
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-300 mb-8"
          >
            Affidati a GeniusLab per la riparazione del tuo Apple Watch
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/#contatti"
              className="bg-white text-black px-10 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light"
            >
              Contattaci
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
