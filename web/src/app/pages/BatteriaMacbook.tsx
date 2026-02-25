import { Battery } from "lucide-react";
import { ServicePageTemplate } from "../components/ServicePageTemplate";

export function BatteriaMacbook() {
  return (
    <ServicePageTemplate
      serviceKey="battery"
      path="/servizi/batteria-macbook"
      icon={Battery}
      heroTitle="Batteria MacBook Roma"
      heroSubtitle="Sostituzione batteria MacBook con garanzia. Diagnostica gratuita."
      servicesSectionTitle="Servizi Batteria MacBook"
      problemsSectionTitle="Problemi Batteria MacBook"
      services={[
        "Sostituzione batteria MacBook Pro",
        "Sostituzione batteria MacBook Air",
        "Calibrazione batteria",
        "Diagnostica stato batteria",
        "Batterie originali Apple",
      ]}
      problems={[
        "Batteria che si scarica veloce",
        "MacBook non carica",
        "Service Battery",
        "Batteria gonfiata",
        "Autonomia ridotta",
      ]}
    />
  );
}
