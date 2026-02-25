import { Outlet } from "react-router";
import { MotionConfig } from "motion/react";
import { SkipLink } from "./components/SkipLink";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { ConsentBanner } from "./components/ConsentBanner";
import { SiteScripts } from "./components/SiteScripts";
import { VisitorBeacon } from "./components/VisitorBeacon";

export function Root() {
  return (
    <MotionConfig reducedMotion="user">
      <VisitorBeacon />
      <SiteScripts />
      <div className="relative">
        <SkipLink />
      </div>
      <ScrollToTop />
      <header>
        <Navigation />
      </header>
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <ConsentBanner />
    </MotionConfig>
  );
}