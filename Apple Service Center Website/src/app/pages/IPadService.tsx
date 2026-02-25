import { Tablet, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export function IPadService() {
  const services = [
    "Sostituzione schermo iPad",
    "Cambio batteria iPad",
    "Riparazione connettore di ricarica",
    "Sostituzione vetro touch screen",
    "Riparazione pulsante Home",
    "Sostituzione fotocamera iPad",
    "Riparazione altoparlanti",
    "Problemi WiFi e Bluetooth",
    "Aggiornamento software iPadOS",
    "Riparazione danni da liquidi"
  ];

  const models = [
    "iPad Pro 12.9\" (tutti i modelli)",
    "iPad Pro 11\" (tutti i modelli)",
    "iPad Air (tutti i modelli)",
    "iPad (tutti i modelli)",
    "iPad Mini (tutti i modelli)"
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Tablet className="w-20 h-20" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            Riparazione iPad Roma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
          >
            Centro assistenza iPad a Roma - Riparazione schermo, batteria e componenti per tutti i modelli di iPad
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
            Servizi di Riparazione iPad
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            GeniusLab è specializzato nella riparazione iPad a Roma. Offriamo servizi professionali per iPad Pro, iPad Air, iPad Mini con ricambi originali e garanzia.
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

      {/* Screen Repair Focus */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
          >
            Sostituzione Schermo iPad Roma
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Schermo iPad rotto o vetro incrinato? La riparazione schermo iPad è una delle nostre specialità. Utilizziamo vetri e display di alta qualità per tutti i modelli di iPad.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4">Diagnosi Gratuita</h3>
              <p className="font-light text-gray-300 leading-relaxed">
                Valutiamo gratuitamente il danno al tuo iPad e ti forniamo un preventivo trasparente.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4">Riparazione Professionale</h3>
              <p className="font-light text-gray-300 leading-relaxed">
                I nostri tecnici specializzati riparano il tuo iPad con la massima cura e precisione.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4">Qualità Garantita</h3>
              <p className="font-light text-gray-300 leading-relaxed">
                Componenti di qualità e garanzia su tutte le riparazioni iPad effettuate.
              </p>
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
            Modelli iPad Supportati
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Ripariamo tutti i modelli di iPad: iPad Pro, iPad Air, iPad standard e iPad Mini
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white rounded-lg text-center"
              >
                <p className="font-light text-lg text-black">{model}</p>
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
            Problemi Comuni iPad
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Il tuo iPad presenta uno di questi problemi? GeniusLab può aiutarti
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Schermo Non Risponde</h3>
              <p className="font-light text-gray-600">
                Touch screen iPad non funzionante o che risponde in modo intermittente
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Problemi di Ricarica</h3>
              <p className="font-light text-gray-600">
                iPad non si ricarica o ricarica lentamente, connettore difettoso
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Batteria Scarica</h3>
              <p className="font-light text-gray-600">
                La batteria dell'iPad si scarica rapidamente o non mantiene la carica
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">WiFi Problematico</h3>
              <p className="font-light text-gray-600">
                Connessione WiFi instabile, iPad non si connette alla rete
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Audio Difettoso</h3>
              <p className="font-light text-gray-600">
                Altoparlanti iPad non funzionanti o audio distorto
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="p-6 bg-gray-50 rounded-lg"
            >
              <h3 className="text-xl font-light mb-3 text-black">Pulsante Home</h3>
              <p className="font-light text-gray-600">
                Pulsante Home non risponde o funziona in modo intermittente
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
            Assistenza iPad Professionale a Roma
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-300 mb-8"
          >
            Affidati a GeniusLab per la riparazione del tuo iPad
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
