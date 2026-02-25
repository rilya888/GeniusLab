import { Apple } from "lucide-react";
import { motion } from "motion/react";

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
          <Apple className="w-8 h-8 text-black" />
          <p className="text-gray-600 font-light text-center">
            GeniusLab - Centro Assistenza Autorizzato Apple
          </p>
          <p className="text-gray-400 text-sm font-light">
            © 2026 GeniusLab. Tutti i diritti riservati.
          </p>
          <div className="flex gap-8 text-sm">
            <motion.a 
              href="#" 
              className="text-gray-600 hover:text-black transition-colors font-light"
              whileHover={{ scale: 1.1 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-600 hover:text-black transition-colors font-light"
              whileHover={{ scale: 1.1 }}
            >
              Termini di Servizio
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-600 hover:text-black transition-colors font-light"
              whileHover={{ scale: 1.1 }}
            >
              Garanzia
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}