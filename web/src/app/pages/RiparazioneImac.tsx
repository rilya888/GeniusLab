import { Monitor } from "lucide-react";
import { ServicePageTemplate } from "../components/ServicePageTemplate";

export function RiparazioneImac() {
  return (
    <ServicePageTemplate
      serviceKey="imac"
      path="/servizi/riparazione-imac"
      icon={Monitor}
      heroTitle="Riparazione iMac Roma"
      heroSubtitle="Centro assistenza specializzato in riparazione iMac, iMac Pro e iMac Studio a Roma"
      servicesSectionTitle="Servizi Riparazione iMac"
      problemsSectionTitle="Problemi Comuni iMac"
      services={[
        "Sostituzione display iMac",
        "Riparazione alimentazione",
        "Upgrade RAM e SSD",
        "Pulizia ventole e dissipatori",
        "Riparazione webcam e microfoni",
        "Sostituzione hard disk",
        "Risoluzione problemi software",
        "Recupero dati iMac",
      ]}
      problems={[
        "iMac non si accende",
        "Display nero o artefatti",
        "Surriscaldamento",
        "Rumore ventole",
        "iMac lento",
        "Problemi di rete",
      ]}
    />
  );
}
