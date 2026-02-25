import { Smartphone, Tablet, Laptop, Watch, HardDrive, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const services = [
  {
    icon: Smartphone,
    title: "Riparazione iPhone",
    description: "Sostituzione schermo, batteria, fotocamera e molto altro",
    link: "/servizi/iphone"
  },
  {
    icon: Laptop,
    title: "Assistenza MacBook",
    description: "Diagnostica hardware, sostituzione componenti, aggiornamenti",
    link: "/servizi/macbook"
  },
  {
    icon: Tablet,
    title: "Riparazione iPad",
    description: "Riparazione display, problemi di ricarica, troubleshooting software",
    link: "/servizi/ipad"
  },
  {
    icon: Watch,
    title: "Apple Watch",
    description: "Sostituzione batteria, riparazione schermo, problemi di connettività",
    link: "/servizi/watch"
  },
  {
    icon: HardDrive,
    title: "Recupero Dati",
    description: "Servizi professionali di backup e recupero dati",
    link: "/servizi/recupero-dati"
  },
  {
    icon: Wrench,
    title: "Diagnostica",
    description: "Diagnostica completa del dispositivo e consulenze",
    link: "/#contatti"
  }
];

export function Services() {
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
          I Nostri Servizi
        </motion.h2>
        <motion.p 
          className="text-xl font-light text-gray-400 text-center mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tecnici certificati con ricambi originali Apple
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <Link
              key={index}
              to={service.link}
            >
              <motion.div 
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-6">
                  <service.icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-light mb-3">{service.title}</h3>
                <p className="text-gray-400 font-light leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}