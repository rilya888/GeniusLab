import { Laptop, CheckCircle, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export function MacBookService() {
  const services = [
    "Sostituzione schermo MacBook",
    "Riparazione tastiera MacBook",
    "Cambio batteria MacBook",
    "Riparazione trackpad",
    "Upgrade SSD e RAM",
    "Pulizia sistema di raffreddamento",
    "Riparazione connettori di ricarica",
    "Diagnostica hardware completa",
    "Risoluzione problemi software macOS",
    "Recupero dati da MacBook danneggiati"
  ];

  const problems = [
    "MacBook non si accende",
    "Schermo rotto o danneggiato",
    "Batteria che si scarica rapidamente",
    "Surriscaldamento MacBook",
    "Tastiera non funzionante",
    "MacBook lento o bloccato",
    "Problemi di ricarica",
    "Danni causati da liquidi"
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
            <Laptop className="w-20 h-20" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            Riparazione MacBook Roma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
          >
            Centro assistenza Apple autorizzato specializzato in riparazione MacBook Pro, MacBook Air a Roma
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
            Servizi di Riparazione MacBook
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            GeniusLab è il tuo centro assistenza MacBook di fiducia a Roma. Offriamo riparazioni professionali per tutti i modelli di MacBook con ricambi originali Apple e garanzia sul lavoro svolto.
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

      {/* Problems Section */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
          >
            Problemi Comuni MacBook
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Risolviamo ogni problema del tuo MacBook a Roma. I nostri tecnici certificati Apple hanno esperienza con tutti i modelli di MacBook Pro e MacBook Air.
          </motion.p>

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

      {/* Why Choose Us */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center text-black"
          >
            Perché Scegliere GeniusLab per la Riparazione MacBook a Roma
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4 text-black">Tecnici Certificati</h3>
              <p className="font-light text-gray-600 leading-relaxed">
                I nostri tecnici sono certificati Apple e hanno anni di esperienza nella riparazione MacBook di tutti i modelli.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <h3 className="text-2xl font-light mb-4 text-black">Ricambi Originali</h3>
              <p className="font-light text-gray-600 leading-relaxed">
                Utilizziamo solo ricambi originali Apple per garantire la massima qualità e compatibilità con il tuo MacBook.
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
                Tutte le riparazioni MacBook sono coperte da garanzia. La tua soddisfazione è la nostra priorità.
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
            Il Tuo MacBook Ha Bisogno di Assistenza?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-300 mb-8"
          >
            Contatta GeniusLab oggi stesso per una diagnostica gratuita del tuo MacBook a Roma
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
