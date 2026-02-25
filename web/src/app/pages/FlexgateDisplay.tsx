import { Monitor } from "lucide-react";
import { ServicePageTemplate } from "../components/ServicePageTemplate";

export function FlexgateDisplay() {
  return (
    <ServicePageTemplate
      serviceKey="flexgate"
      path="/servizi/flexgate-display-macbook"
      icon={Monitor}
      heroTitle="Flexgate Display MacBook Roma"
      heroSubtitle="Riparazione cavi display e problema Flexgate su MacBook Pro 2016-2019"
      servicesSectionTitle="Servizi Flexgate"
      problemsSectionTitle="Sintomi Flexgate"
      services={[
        "Riparazione cavi display",
        "Sostituzione flex cable",
        "Display stage light",
        "MacBook Pro 13\" e 15\"",
        "Modelli 2016-2019",
      ]}
      problems={[
        "Stage light display",
        "Display che si spegne",
        "Linee verticali",
        "Flickering ad angoli",
        "Display nero aprendo coperchio",
      ]}
    />
  );
}
