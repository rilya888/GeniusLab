import { Search, Wrench, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useLocale } from "@/app/context/LocaleContext";

const stepKeys = [
  { icon: Search, number: "01", key: "diagnostica" as const },
  { icon: Wrench, number: "02", key: "riparazione" as const },
  { icon: CheckCircle, number: "03", key: "controllo" as const },
];

export function Process() {
  const { dict } = useLocale();
  const { heading, subheading, steps } = dict.pages.process;
  return (
    <section className="min-h-screen bg-white px-6 py-24">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-center text-black"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {heading}
        </motion.h2>
        <motion.p
          className="text-xl font-light text-gray-600 text-center mb-20 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subheading}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stepKeys.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="mb-6">
                <span className="text-8xl font-light text-gray-200 absolute -top-8 -left-2">
                  {step.number}
                </span>
                <step.icon className="w-12 h-12 text-black relative z-10 mt-8" />
              </div>
              <h3 className="text-2xl font-light mb-3 text-black">
                {steps[step.key]}
              </h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {steps[`${step.key}Desc` as keyof typeof steps]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}