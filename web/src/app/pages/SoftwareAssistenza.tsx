import { Wrench } from "lucide-react";
import { ServicePageTemplate } from "../components/ServicePageTemplate";

export function SoftwareAssistenza() {
  return (
    <ServicePageTemplate
      serviceKey="software"
      path="/servizi/software-assistenza"
      icon={Wrench}
      heroTitle="Assistenza Software Apple Roma"
      heroSubtitle="Diagnostica, reinstallazione macOS, ottimizzazione e risoluzione problemi software"
      servicesSectionTitle="Servizi Software"
      problemsSectionTitle="Problemi Software Comuni"
      services={[
        "Reinstallazione macOS",
        "Diagnostica software",
        "Rimozione virus e malware",
        "Recupero password",
        "Ottimizzazione sistema",
        "Aggiornamento macOS",
        "Backup e migrazione dati",
      ]}
      problems={[
        "Mac lento",
        "Errore di avvio",
        "Schermata blu",
        "App che si chiudono",
        "Problemi di rete",
        "Disco pieno",
      ]}
    />
  );
}
