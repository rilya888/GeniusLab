import { HardDrive } from "lucide-react";
import { ServicePageTemplate } from "../components/ServicePageTemplate";

export function MacbookSsd() {
  return (
    <ServicePageTemplate
      serviceKey="ssd"
      path="/servizi/macbook-ssd"
      icon={HardDrive}
      heroTitle="MacBook SSD Roma"
      heroSubtitle="Upgrade SSD MacBook e trasferimento dati. Più spazio, più velocità."
      servicesSectionTitle="Servizi SSD MacBook"
      problemsSectionTitle="Problemi SSD MacBook"
      services={[
        "Upgrade SSD MacBook",
        "Trasferimento dati",
        "Sostituzione SSD danneggiato",
        "Clone disco su nuovo SSD",
        "SSD NVMe compatibili",
      ]}
      problems={[
        "Spazio insufficiente",
        "SSD lento",
        "Errore disco",
        "MacBook non vede SSD",
        "File corrotti",
      ]}
    />
  );
}
