/**
 * Language switcher: IT | EN buttons.
 * Navigates to equivalent page in selected language.
 */

import { useNavigate, useLocation } from "react-router";
import { useLocale } from "@/app/context/LocaleContext";
import { getLocalizedPath } from "@/app/routes.config";
import { Button } from "./ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSwitch = (newLocale: "it" | "en") => {
    if (newLocale === locale) return;
    setLocale(newLocale);
    const newPath = getLocalizedPath(location.pathname, newLocale);
    navigate(newPath);
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant={locale === "it" ? "default" : "ghost"}
        size="sm"
        className="min-w-[2rem]"
        onClick={() => handleSwitch("it")}
      >
        IT
      </Button>
      <Button
        variant={locale === "en" ? "default" : "ghost"}
        size="sm"
        className="min-w-[2rem]"
        onClick={() => handleSwitch("en")}
      >
        EN
      </Button>
    </div>
  );
}
