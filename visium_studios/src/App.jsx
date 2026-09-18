import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./shared/Header";
import CTA from "./shared/CTA";
import Footer from "./shared/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Studio from "./pages/Studio";
import CaseStudy from "./components/work/CaseStudy";
import CustomCursor from "./shared/CustomCursor";
import Loader from "./shared/Loader";
import Branding from "./components/footer_components/branding/Branding";
import LogoCreation from "./components/footer_components/branding/LogoCreation";
import VisualIdentity from "./components/footer_components/branding/VisualIdentity";
import BrandSystems from "./components/footer_components/branding/BrandSystems";
import Rebranding from "./components/footer_components/branding/Rebranding";
import ArtDirection from "./components/footer_components/branding/ArtDirection";
import Positioning from "./components/footer_components/branding/Positioning";
import ContactSection from "./components/home/ContactSection";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function App() {
  const [homeInverted, setHomeInverted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: false, // Whether animation should happen only once while scrolling
    });
  }, []);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      setIsLoading(false);
    }, 1100);

    return () => window.clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);

      const routeTimer = window.setTimeout(() => {
        setIsLoading(false);
      }, 550);

      return () => window.clearTimeout(routeTimer);
    }
  }, [location.pathname]);

  const isBrandingPage = location.pathname === "/branding";
  const cursorInverted = isBrandingPage ? false : homeInverted;
  const headerInverted = isBrandingPage ? false : homeInverted;
  const ctaInverted = isBrandingPage ? false : homeInverted;

  return (
    <div className="bg-black text-white">
      <Loader visible={isLoading} />
      <ScrollToTop />
      <CustomCursor inverted={cursorInverted} />
      <Header inverted={headerInverted} />
      <Routes>
        <Route path="/" element={<Home onThemeChange={setHomeInverted} />} />
        <Route path="/work" element={<Work />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        {/*footer components*/}
        <Route path="/branding" element={<Branding />} />
        <Route path="/branding/logo-creation" element={<LogoCreation />} />
        <Route path="/branding/visual-identity" element={<VisualIdentity />} />
        <Route path="/branding/brand-systems" element={<BrandSystems />} />
        <Route path="/branding/rebranding" element={<Rebranding />} />
        <Route path="/branding/art-direction" element={<ArtDirection />} />
        <Route path="/branding/positioning" element={<Positioning />} />
      </Routes>
      <CTA inverted={ctaInverted} />
      <Footer inverted={false} />
    </div>
  );
}

export default App;
