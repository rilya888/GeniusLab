import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Contact } from "../components/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <div id="contatti">
        <Contact />
      </div>
    </>
  );
}
