import { SEOHead } from "../components/SEOHead";
import { Contact } from "../components/Contact";
import { localBusinessJsonLd } from "../utils/jsonLd";
import { it } from "@/i18n/it";

export function Contatti() {
  const { title, description, keywords } = it.pages.contacts;
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical="/contatti"
        jsonLd={localBusinessJsonLd()}
        keywords={keywords}
      />
      <div className="pt-16">
        <Contact />
      </div>
    </>
  );
}
