import { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Target from "../components/home/Target";
import FeaturedWork from "../components/home/FeaturedWork";
import ServicePreview from "../components/home/ServicePreview";
import Strategy from "../components/home/Strategy";
import Aesthetics from "../components/home/Aesthetics";
import StudioDirect from "../components/home/StudioDirect";
import StackedHero from "../shared/StackedHero";
import Statement from "../shared/Statement";
import VideoMotion from "../components/home/VideoMotion";

function Home({ onThemeChange }) {
  const [isInverted, setIsInverted] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      const about = document.querySelector("#work");
      const services = document.querySelector("#services");
      const home = document.querySelector(".home-page");

      if (!about || !services || !home) return;

      const aboutReached =
        about.getBoundingClientRect().top <= window.innerHeight * 0.75;
      const servicesReached =
        services.getBoundingClientRect().top <= window.innerHeight * 0.75;
      const homeHasEnded =
        home.getBoundingClientRect().bottom <= window.innerHeight;
      const nextValue = !aboutReached || (servicesReached && !homeHasEnded);

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
          <Statement />
          <StackedHero>
            <VideoMotion />
          </StackedHero>
          <About />
          <FeaturedWork />
          <ServicePreview />
          <Target />
          <Strategy />
          <StudioDirect />
          <Aesthetics />
        </div>
      </div>
    </main>
  );
}
export default Home;
