import { Outlet } from "react-router";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";

export function Root() {
  return (
    <>
      <ScrollToTop />
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}