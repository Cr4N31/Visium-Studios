import { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Target from "../components/home/Target";
import FeaturedWork from "../components/home/FeaturedWork";
import ServicePreview from "../components/home/ServicePreview";
import Strategy from "../components/home/Strategy";
import ClientsCarousel from "../components/home/ClientsCarousel";
import ContactSection from "../components/home/ContactSection";
import StudioDirect from "../components/home/StudioDirect";
import StackedHero from "../shared/StackedHero";
import VideoMotion from "../components/home/VideoMotion";

function Home({ onThemeChange }) {
  const [isInverted, setIsInverted] = useState(true);

  useEffect(() => {
    const updateTheme = () => {
      const about = document.querySelector("#work");
      const services = document.querySelector("#services");
      const video = document.querySelector("#video-motion");
      const home = document.querySelector(".home-page");

      if (!about || !services || !video || !home) return;

      const videoReached =
        video.getBoundingClientRect().top <= window.innerHeight * 0.8;
      const servicesReached =
        services.getBoundingClientRect().top <= window.innerHeight * 0.75;
      const homeHasEnded =
        home.getBoundingClientRect().bottom <= window.innerHeight;
      const nextValue = !videoReached || (servicesReached && !homeHasEnded);

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
        <StackedHero id="video-motion" className="bg-black">
          <VideoMotion />
        </StackedHero>
        <div className="flex flex-col gap-12 py-8">
          <About />
          <FeaturedWork />
          <ServicePreview />
          <Target />
          <Strategy />
          <StudioDirect />
          <ClientsCarousel />
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
export default Home;
