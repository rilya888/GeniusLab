import { SEOHead } from "../components/SEOHead";
import { Contact } from "../components/Contact";
import { breadcrumbJsonLd, localBusinessJsonLd } from "../utils/jsonLd";
import { useLocale } from "../context/LocaleContext";
import { getPath } from "../routes.config";

export function Contatti() {
  const { dict, locale } = useLocale();
  const { title, description, keywords } = dict.pages.contacts;
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={getPath(locale, "contatti")}
        jsonLd={[
          localBusinessJsonLd(locale),
          breadcrumbJsonLd([
            { name: "Genius Lab", path: getPath(locale, "home") },
            { name: dict.nav.contacts, path: getPath(locale, "contatti") },
          ]),
        ]}
        keywords={keywords}
        locale={locale}
      />
      <div className="pt-16">
        <Contact />
      </div>
    </>
  );
}
