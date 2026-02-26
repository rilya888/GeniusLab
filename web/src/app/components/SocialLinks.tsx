/**
 * Social media links (Instagram, TikTok, Facebook).
 * Renders only non-empty URLs. Used in Footer and Contact sections.
 */

import { Instagram, Facebook } from "lucide-react";
import { useLocale } from "@/app/context/LocaleContext";

/** TikTok icon - inline SVG (not in lucide) */
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export type SocialLinks = {
  instagram?: string;
  tiktok?: string;
  facebook?: string;
};

type SocialLinksProps = {
  links: SocialLinks;
  className?: string;
  iconSize?: number;
  /** Use "light" for dark backgrounds (e.g. Contact section) */
  variant?: "default" | "light";
};

export function SocialLinks({ links, className = "", iconSize = 24, variant = "default" }: SocialLinksProps) {
  const { dict } = useLocale();
  const items = [
    { key: "instagram" as const, url: links.instagram?.trim(), label: dict.footer.instagram },
    { key: "tiktok" as const, url: links.tiktok?.trim(), label: dict.footer.tiktok },
    { key: "facebook" as const, url: links.facebook?.trim(), label: dict.footer.facebook },
  ].filter((item): item is typeof item & { url: string } => !!item.url);

  if (items.length === 0) return null;

  const iconClass = "w-6 h-6";
  return (
    <nav aria-label={dict.footer.followUs} className={className}>
      <div className="flex items-center justify-center gap-4">
        {items.map(({ key, url, label }) => (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={variant === "light" ? "text-gray-400 hover:text-white transition-colors" : "text-gray-600 hover:text-black transition-colors"}
            aria-label={label}
          >
            {key === "tiktok" ? (
              <TikTokIcon className={iconClass} />
            ) : key === "instagram" ? (
              <Instagram className={iconClass} size={iconSize} />
            ) : (
              <Facebook className={iconClass} size={iconSize} />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
