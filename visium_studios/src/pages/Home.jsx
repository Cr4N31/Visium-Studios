import { useLayoutEffect, useRef } from "react";

import Hero from "../components/home/Hero";
import CapabilitiesMarquee from "../shared/CapabilitiesMarquee";
import VisiumApproach from "../components/home/VisiumApproach";
import FeaturedWork from "../components/home/FeaturedWork";
import VisiumStandard from "../components/home/VisiumStandard";
import Studio from "../components/home/Studio";
import StudioNotes from "../components/home/StudioNotes";
import FinalCta from "../components/home/FinalCta";
import Services from "../components/home/Services";
import About from "../components/home/About";

function Home({ onThemeChange }) {
  const themeRef = useRef(null);

  useLayoutEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return undefined;

    const updateTheme = () => {
      const scrollProgress = Math.min(
        1,
        Math.max(
          0,
          -hero.getBoundingClientRect().top / (hero.offsetHeight * 0.75),
        ),
      );
      const progress =
        scrollProgress * scrollProgress * (3 - 2 * scrollProgress);

      document.documentElement.style.setProperty(
        "--home-inversion",
        `${progress * 100}%`,
      );
      const nextTheme = progress < 0.5;
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

      document.documentElement.style.setProperty("--home-inversion", "0%");
      themeRef.current = false;
      onThemeChange(false);
    };
  }, [onThemeChange]);

  return (
    <main className="home-page">
      <Hero />
      <div className="relative z-10 bg-black">
        <div className="flex flex-col gap-12 py-8">
          <About />
          <CapabilitiesMarquee />
          <Services />
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
        </div>
      </div>
    </main>
  );
}

export default Home;
