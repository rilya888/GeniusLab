import { useLocale } from "@/app/context/LocaleContext";
import { siteConfig } from "@/config";

export function ReviewsEmbed() {
  const { dict } = useLocale();
  const [loc] = siteConfig.locations;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteConfig.brand.name} ${loc.street} ${loc.city}`)}`;
  return (
    <section className="rounded-lg overflow-hidden" data-embed-wrapper>
      <h2 className="text-2xl font-light mb-4">{dict.pages.reviews.widgetHeading}</h2>
      <iframe
        title="Google Reviews"
        src="https://www.google.com/maps?output=embed"
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0 w-full"
      />
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-black px-4 py-2 text-sm font-medium text-black hover:bg-black hover:text-white transition-colors"
        >
          {dict.pages.reviews.heading === "Recensioni" ? "Apri su Google Maps" : "Open in Google Maps"}
        </a>
      </div>
      <p hidden data-embed-fallback>{dict.pages.reviews.widgetFallback}</p>
    </section>
  );
}
