import { HardDrive, CheckCircle, Phone, MessageCircle, Shield, Clock, Database } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

export function DataRecovery() {
  const services = [
    "Recupero dati da iPhone",
    "Recupero dati da MacBook",
    "Recupero dati da iPad",
    "Recupero dati da SSD danneggiati",
    "Recupero dati da hard disk",
    "Recupero dati da dispositivi danneggiati dall'acqua",
    "Recupero foto e video",
    "Recupero documenti e file",
    "Backup completo dispositivi Apple",
    "Trasferimento dati tra dispositivi"
  ];

  const situations = [
    {
      title: "Dispositivo Non si Accende",
      description: "iPhone, iPad o MacBook che non si accendono più - possiamo recuperare i tuoi dati"
    },
    {
      title: "Danni da Liquidi",
      description: "Dispositivi Apple danneggiati da acqua o altri liquidi - recupero dati professionale"
    },
    {
      title: "Schermo Rotto",
      description: "Display completamente danneggiato che impedisce l'accesso - recuperiamo i tuoi file"
    },
    {
      title: "Cancellazione Accidentale",
      description: "Foto, video o documenti cancellati per errore - possiamo tentare il recupero"
    },
    {
      title: "Problemi Software",
      description: "Sistema operativo corrotto o problemi di avvio - recupero dati garantito"
    },
    {
      title: "SSD/HDD Danneggiato",
      description: "Unità di archiviazione difettosa su MacBook - specializzati in recupero dati SSD"
    }
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
            <HardDrive className="w-20 h-20" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light tracking-tight mb-6"
          >
            Recupero Dati Roma
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl font-light text-gray-300 mb-8"
          >
            Servizio professionale di recupero dati da iPhone, iPad, MacBook a Roma - Salviamo i tuoi file preziosi
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
            Servizi di Recupero Dati
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            GeniusLab è specializzato nel recupero dati da dispositivi Apple a Roma. Utilizziamo tecnologie avanzate e procedure professionali per recuperare foto, video, documenti e altri file preziosi.
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

      {/* Why Choose Us */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-16 text-center"
          >
            Perché Scegliere GeniusLab per il Recupero Dati
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <Shield className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-light mb-4">Massima Riservatezza</h3>
              <p className="font-light text-gray-300 leading-relaxed">
                I tuoi dati sono trattati con la massima privacy e sicurezza. Procedure certificate per la protezione delle informazioni personali.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <Database className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-light mb-4">Tecnologia Avanzata</h3>
              <p className="font-light text-gray-300 leading-relaxed">
                Utilizziamo strumenti professionali e tecniche avanzate per il recupero dati da dispositivi Apple anche gravemente danneggiati.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="flex justify-center mb-6">
                <Clock className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-light mb-4">Valutazione Gratuita</h3>
              <p className="font-light text-gray-300 leading-relaxed">
                Diagnostica gratuita del dispositivo. Ti forniamo un preventivo dettagliato prima di procedere con il recupero dati.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Situations Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            Situazioni di Recupero Dati
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Recuperiamo i tuoi dati in qualsiasi situazione, anche dai dispositivi più danneggiati
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {situations.map((situation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-light mb-3 text-black">{situation.title}</h3>
                <p className="font-light text-gray-600">{situation.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center text-black"
          >
            Processo di Recupero Dati
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 text-center mb-16 max-w-3xl mx-auto"
          >
            Un processo trasparente e professionale in 4 semplici passaggi
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-light text-gray-200 mb-4">01</div>
              <h3 className="text-2xl font-light mb-3 text-black">Diagnostica</h3>
              <p className="font-light text-gray-600">
                Analisi gratuita del dispositivo per valutare la possibilità di recupero
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-6xl font-light text-gray-200 mb-4">02</div>
              <h3 className="text-2xl font-light mb-3 text-black">Preventivo</h3>
              <p className="font-light text-gray-600">
                Ti forniamo un preventivo dettagliato e trasparente del servizio
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-6xl font-light text-gray-200 mb-4">03</div>
              <h3 className="text-2xl font-light mb-3 text-black">Recupero</h3>
              <p className="font-light text-gray-600">
                Procediamo con il recupero dati utilizzando tecnologie avanzate
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl font-light text-gray-200 mb-4">04</div>
              <h3 className="text-2xl font-light mb-3 text-black">Consegna</h3>
              <p className="font-light text-gray-600">
                Ti restituiamo i tuoi dati su supporto sicuro di tua scelta
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data Types */}
      <section className="px-6 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light tracking-tight mb-6 text-center"
          >
            Tipi di Dati Recuperabili
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-300 text-center mb-16 max-w-3xl mx-auto"
          >
            Recuperiamo qualsiasi tipo di file dai tuoi dispositivi Apple
          </motion.p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              "Foto e immagini",
              "Video e filmati",
              "Documenti Word/Excel",
              "PDF e presentazioni",
              "Email e messaggi",
              "Contatti rubrica",
              "Note e promemoria",
              "Musica e audio",
              "App e dati app",
              "Cronologia chat",
              "Segnalibri Safari",
              "Dati iCloud"
            ].map((dataType, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-white/10 rounded-lg backdrop-blur-sm text-center"
              >
                <p className="font-light">{dataType}</p>
              </motion.div>
            ))}
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
            Hai Perso Dati Importanti?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl font-light text-gray-600 mb-8"
          >
            Non arrenderti! Contatta GeniusLab per una valutazione gratuita del recupero dati a Roma
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
              Contattaci Subito
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
