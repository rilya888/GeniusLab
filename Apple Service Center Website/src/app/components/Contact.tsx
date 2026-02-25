import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "motion/react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Indirizzo",
    details: ["Via Innovazione 123", "00100 Roma, Italia"]
  },
  {
    icon: Phone,
    title: "Telefono",
    details: ["+39 06 1234 5678"]
  },
  {
    icon: Mail,
    title: "Email",
    details: ["assistenza@geniuslab.it"]
  },
  {
    icon: Clock,
    title: "Orari",
    details: ["Lun - Ven: 9:00 - 19:00", "Sab - Dom: 10:00 - 18:00"]
  }
];

export function Contact() {
  return (
    <section className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Contattaci
        </motion.h2>
        <motion.p 
          className="text-xl font-light text-gray-400 text-center mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Vieni a trovarci o contattaci per qualsiasi domanda
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
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nome"
                className="bg-transparent border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light"
              />
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light"
              />
            </div>
            <input
              type="tel"
              placeholder="Telefono"
              className="w-full bg-transparent border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light"
            />
            <select className="w-full bg-black border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light">
              <option value="">Seleziona Dispositivo</option>
              <option value="iphone">iPhone</option>
              <option value="macbook">MacBook</option>
              <option value="ipad">iPad</option>
              <option value="watch">Apple Watch</option>
              <option value="other">Altro</option>
            </select>
            <textarea
              placeholder="Descrivi il problema"
              rows={6}
              className="w-full bg-transparent border border-gray-700 px-6 py-4 rounded-lg focus:outline-none focus:border-white transition-colors font-light resize-none"
            />
            <motion.button 
              type="submit"
              className="w-full bg-white text-black px-10 py-4 rounded-full hover:bg-gray-200 transition-colors text-lg font-light"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Invia Richiesta
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}