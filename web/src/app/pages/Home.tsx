import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Contact } from "../components/Contact";
import { SEOHead } from "../components/SEOHead";
import { localBusinessJsonLd } from "../utils/jsonLd";
import { it } from "@/i18n/it";

export function Home() {
  const { title, description } = it.pages.home;
  return (
    <>
      <SEOHead
        title={title}
        description={description}
        canonical="/"
        jsonLd={localBusinessJsonLd()}
        keywords={it.pages.home.keywords}
      />
      <Hero />
      <Services />
      <Process />
      <Contact />
    </>
  );
}
