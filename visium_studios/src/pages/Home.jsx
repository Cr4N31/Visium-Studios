import { useLayoutEffect, useRef } from "react";

import Hero from "../components/home/Hero";
import CapabilitiesMarquee from "../shared/CapabilitiesMarquee";
import FeaturedWork from "../components/home/FeaturedWork";
import Studio from "../components/home/Studio";
import StudioNotes from "../components/home/StudioNotes";
import FinalCta from "../components/home/FinalCta";
import Services from "../components/home/Services";
import About from "../components/home/About";
import HowWeWork from "../components/home/HowWeWork";

function Home({ onThemeChange }) {
  const themeRef = useRef(null);

  useLayoutEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return undefined;

    const updateTheme = () => {
      const isInverted = hero.getBoundingClientRect().bottom <= 0;

      const nextTheme = !isInverted;
      if (themeRef.current !== nextTheme) {
        themeRef.current = nextTheme;
        onThemeChange(nextTheme);
      }
    };

    let frameId = 0;
    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateTheme();
      });
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frameId);

      themeRef.current = false;
      onThemeChange(false);
    };
  }, [onThemeChange]);

  return (
    <main className="home-page">
      <Hero />
      <div className="relative z-10 bg-[#0B0B0B]">
        <div className="flex flex-col gap-12 py-8">
          <About />
          <Services />
          <div id="work-preview">
            <FeaturedWork />
          </div>
          <div id="studio-preview">
            <Studio />
          </div>
          <HowWeWork />
          <div id="studio-notes">
            <StudioNotes />
          </div>

          <div id="final-cta">
            <FinalCta />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
