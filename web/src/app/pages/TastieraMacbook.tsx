import { Keyboard } from "lucide-react";
import { ServicePageTemplate } from "../components/ServicePageTemplate";

export function TastieraMacbook() {
  return (
    <ServicePageTemplate
      serviceKey="keyboard"
      path="/servizi/tastiera-macbook"
      icon={Keyboard}
      heroTitle="Tastiera MacBook Roma"
      heroSubtitle="Sostituzione tastiera Butterfly e Magic Keyboard. Programma Apple per tastiere difettose."
      servicesSectionTitle="Servizi Tastiera MacBook"
      problemsSectionTitle="Problemi Tastiera MacBook"
      services={[
        "Sostituzione tastiera completa",
        "Tastiera Butterfly",
        "Magic Keyboard",
        "Riparazione tasti singoli",
        "Programma Apple tastiere",
      ]}
      problems={[
        "Tasti che si ripetono",
        "Tasti che non rispondono",
        "Tastiera danneggiata da liquidi",
        "Tasti incollati",
        "Backlight non funziona",
      ]}
    />
  );
}
