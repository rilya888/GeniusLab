import { Monitor } from "lucide-react";
import { ServicePageTemplate } from "../components/ServicePageTemplate";

export function DisplayMacbook() {
  return (
    <ServicePageTemplate
      serviceKey="display"
      path="/servizi/display-macbook"
      icon={Monitor}
      heroTitle="Display MacBook Roma"
      heroSubtitle="Sostituzione display MacBook Pro e MacBook Air con ricambi originali Apple"
      servicesSectionTitle="Servizi Display MacBook"
      problemsSectionTitle="Problemi Display MacBook"
      services={[
        "Sostituzione schermo MacBook",
        "Riparazione vetro display",
        "Sostituzione LCD",
        "Riparazione backlight",
        "Display Retina MacBook Pro",
        "Display MacBook Air M1/M2",
      ]}
      problems={[
        "Schermo rotto",
        "Display nero",
        "Linee sullo schermo",
        "Flickering",
        "Touch Bar non funzionante",
      ]}
    />
  );
}
