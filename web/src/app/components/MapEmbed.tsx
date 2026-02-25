import { useLocale } from "@/app/context/LocaleContext";
import { siteConfig } from "@/config";

const MAP_URL =
  "https://maps.google.com/maps?q=Viale%20Somalia%20246%20Roma&t=&z=15&ie=UTF8&iwloc=&output=embed";

export function MapEmbed() {
  const { dict } = useLocale();
  const [loc] = siteConfig.locations;
  const fallbackText = `${dict.pages.contacts.mapHeading}. ${loc.street}, ${loc.postalCode} ${loc.city}.`;

  return (
    <section className="rounded-lg overflow-hidden" data-embed-wrapper>
      <h2 className="text-2xl font-light mb-4">{dict.pages.contacts.mapHeading}</h2>
      <iframe
        title="Mappa sede"
        src={MAP_URL}
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0 w-full"
      />
      <p hidden data-embed-fallback>
        {dict.pages.contacts.mapUnavailable} {fallbackText}
      </p>
    </section>
  );
}
