import { motion } from "motion/react";
import { Link } from "react-router";
import { useContent } from "../context/ContentContext";
import { getServiceIcon } from "../config/services.config";

export function Services() {
  const { services } = useContent();
  const { heading, subheading, items } = services;
  const sortedItems = [...items].sort((a, b) => a.order - b.order);

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
          {heading}
        </motion.h2>
        <motion.p
          className="text-xl font-light text-gray-400 text-center mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subheading}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sortedItems.map((item, index) => {
            const Icon = getServiceIcon(item.key);
            return (
              <Link key={item.key} to={item.path}>
                <motion.div
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="mb-6">
                    <Icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-light mb-3">{item.name}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
