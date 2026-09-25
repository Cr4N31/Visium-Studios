import { useEffect, useState } from "react";

import Hero from "../components/home/Hero";
import CapabilitiesMarquee from "../shared/CapabilitiesMarquee";
import VisiumApproach from "../components/home/VisiumApproach";
import FeaturedWork from "../components/home/FeaturedWork";
import VisiumStandard from "../components/home/VisiumStandard";
import Studio from "../components/home/Studio";
import StudioNotes from "../components/home/StudioNotes";
import FinalCta from "../components/home/FinalCta";
import ClientsCarousel from "../context/ClientsCarousel";
import ContactSection from "../components/home/ContactSection";
import StackedHero from "../shared/StackedHero";

function Home({ onThemeChange }) {
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const approach = document.querySelector("#visium-approach");
      const contact = document.querySelector("#contact");

      if (!approach || !contact) return;

      // Hero starts black.
      // Once VisiumApproach reaches 82% of the viewport,
      // switch to white and keep it white.
      const triggerLine = window.innerHeight * 0.82;

      const approachReached =
        approach.getBoundingClientRect().top <= triggerLine;

      // Once Contact has essentially finished,
      // return to the normal black theme.
      const contactHasEnded =
        contact.getBoundingClientRect().bottom <= window.innerHeight * 0.9;

      const nextValue = contactHasEnded ? false : approachReached;

      setIsInverted(nextValue);
      onThemeChange(nextValue);
    };

    updateTheme();

    window.addEventListener("scroll", updateTheme, { passive: true });
    window.addEventListener("resize", updateTheme);

    return () => {
      window.removeEventListener("scroll", updateTheme);
      window.removeEventListener("resize", updateTheme);

      onThemeChange(false);
    };
  }, [onThemeChange]);

  return (
    <main className={`home-page${isInverted ? " home-page--inverted" : ""}`}>
      <StackedHero>
        <Hero />
      </StackedHero>

      <div className="relative z-10 bg-black rounded-t-[32px]">
        <div className="flex flex-col gap-12 py-8">
          <CapabilitiesMarquee />

          <VisiumApproach />

          <div id="work-preview">
            <FeaturedWork />
          </div>

          <div id="visium-standard">
            <VisiumStandard />
          </div>

          <div id="studio-preview">
            <Studio />
          </div>

          <div id="studio-notes">
            <StudioNotes />
          </div>

          <div id="final-cta">
            <FinalCta />
          </div>

          <ClientsCarousel />

          <ContactSection />
        </div>
      </div>
    </main>
  );
}

export default Home;
