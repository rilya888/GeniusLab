import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Contact } from "../components/Contact";
import { SEOHead } from "../components/SEOHead";
import { localBusinessJsonLd } from "../utils/jsonLd";
import { useLocale } from "../context/LocaleContext";
import { getPath } from "../routes.config";

export function Home() {
  const { dict, locale } = useLocale();
  const { title, description } = dict.pages.home;
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical={getPath(locale, "home")}
        jsonLd={localBusinessJsonLd(locale)}
        keywords={dict.pages.home.keywords}
        locale={locale}
      />
      <Hero />
      <Services />
      <Process />
      <Contact />
    </>
  );
}
