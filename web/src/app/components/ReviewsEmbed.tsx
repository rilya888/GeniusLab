import { it } from "@/i18n/it";

export function ReviewsEmbed() {
  return (
    <section className="rounded-lg overflow-hidden" data-embed-wrapper>
      <h2 className="text-2xl font-light mb-4">{it.pages.reviews.widgetHeading}</h2>
      <iframe
        title="Google Reviews"
        src="https://www.google.com/maps?output=embed"
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="border-0 w-full"
      />
      <p hidden data-embed-fallback>{it.pages.reviews.widgetFallback}</p>
    </section>
  );
}
