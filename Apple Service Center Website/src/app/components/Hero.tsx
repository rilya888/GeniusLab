import { Apple, Phone, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Apple className="w-24 h-24 text-black" />
        </motion.div>
        <motion.h1 
          className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          GeniusLab
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl font-light text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Centro assistenza autorizzato per tutti i tuoi dispositivi Apple
        </motion.p>
        <motion.div 
          className="flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.a 
            href="tel:+390612345678"
            className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-light inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-5 h-5" />
            Chiamaci
          </motion.a>
          <motion.a 
            href="https://wa.me/390612345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-colors text-lg font-light inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}