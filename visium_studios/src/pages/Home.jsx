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

// Hero → VisiumApproach already follow the guideline, so the original
// #visium-approach threshold stays first, same 0.82 trigger as before.
// Everything after is new: walk each id in scroll order and keep whichever
// zone's top we've most recently crossed — same single global flip as
// before, just with five more waypoints instead of one.
const ZONES = [
  { id: "visium-approach", theme: "white" }, // 03 — unchanged from before
  { id: "work-preview", theme: "black" }, // 04
  { id: "visium-standard", theme: "white" }, // 05
  { id: "studio-preview", theme: "black" }, // 06
  { id: "studio-notes", theme: "white" }, // 07
  { id: "final-cta", theme: "black" }, // 08
];

function Home({ onThemeChange }) {
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const contact = document.querySelector("#contact");
      const home = document.querySelector(".home-page");
      if (!contact || !home) return;

      const triggerLine = window.innerHeight * 0.82;

      let currentTheme = "black";
      for (const zone of ZONES) {
        const el = document.querySelector(`#${zone.id}`);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= triggerLine) {
          currentTheme = zone.theme;
        }
      }

      const contactHasEnded =
        contact.getBoundingClientRect().bottom <= window.innerHeight * 0.9;
      const nextValue = contactHasEnded ? false : currentTheme === "white";

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
