import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./shared/Header";
import CTA from "./shared/CTA";
import Footer from "./shared/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Studio from "./pages/Studio";
import CaseStudy from "./components/work/CaseStudy";
import CustomCursor from "./shared/CustomCursor";
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

  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: false, // Whether animation should happen only once while scrolling
    });
  }, []);

  return (
    <div className="bg-black text-white">
      <ScrollToTop />
      <CustomCursor />
      <Header inverted={homeInverted} />
      <Routes>
        <Route path="/" element={<Home onThemeChange={setHomeInverted} />} />
        <Route path="/work" element={<Work />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
      <CTA inverted={homeInverted} />
      <Footer />
    </div>
  );
}

export default App;
