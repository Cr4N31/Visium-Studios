import { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Target from "../components/home/Target";
import FeaturedWork from "../components/home/FeaturedWork";
import ServicePreview from "../components/home/ServicePreview";
import Strategy from "../components/home/Strategy";
import ClientsCarousel from "../components/home/ClientsCarousel";
import ContactSection from "../components/home/ContactSection";
import StackedHero from "../shared/StackedHero";

function Home({ onThemeChange }) {
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const services = document.querySelector("#services");
      const contact = document.querySelector("#contact");
      const home = document.querySelector(".home-page");

      if (!services || !contact || !home) return;

      const servicesReached =
        services.getBoundingClientRect().top <= window.innerHeight * 0.75;
      const contactHasEnded =
        contact.getBoundingClientRect().bottom <= window.innerHeight * 0.9;
      const nextValue = servicesReached && !contactHasEnded;

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
          <About />
          <FeaturedWork />
          <ServicePreview />
          <Target />
          <Strategy />
          <ClientsCarousel />
          <ContactSection />
        </div>
      </div>
    </main>
  );
}
export default Home;
