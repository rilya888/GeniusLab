/**
 * Skip to main content link for keyboard users. Visible on focus.
 */

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="absolute -top-96 left-4 z-[100] px-4 py-2 bg-black text-white rounded-lg transition-all duration-150 focus:top-4 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
    >
      Salta al contenuto principale
    </a>
  );
}
