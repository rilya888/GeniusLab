import { SEOHead } from "../components/SEOHead";
import { Services } from "../components/Services";
import { useLocale } from "../context/LocaleContext";
import { getPath } from "../routes.config";

export function Servizi() {
  const { dict, locale } = useLocale();
  const { title, description } = dict.pages.services;
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={getPath(locale, "servizi")}
        keywords={dict.pages.services.keywords}
        locale={locale}
      />
      <div className="pt-16">
        <Services />
      </div>
    </>
  );
}
