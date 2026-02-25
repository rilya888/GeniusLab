import { Link } from "react-router";
import { SEOHead } from "../components/SEOHead";
import { it } from "@/i18n/it";

export function NotFound() {
  const { title, description, heading, body, cta } = it.pages.notFound;
  return (
    <div className="min-h-screen bg-white pt-16 flex items-center justify-center px-6">
      <SEOHead title={title} description={description} noindex />
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-light text-black mb-4">{heading}</h1>
        <p className="text-gray-600 mb-8">{body}</p>
        <Link
          to="/"
          className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
