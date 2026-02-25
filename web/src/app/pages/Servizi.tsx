import { SEOHead } from "../components/SEOHead";
import { Services } from "../components/Services";
import { it } from "@/i18n/it";

export function Servizi() {
  const { title, description, heading } = it.pages.services;
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical="/servizi"
        keywords={it.pages.services.keywords}
      />
      <div className="pt-16">
        <Services />
      </div>
    </>
  );
}
