import Header from "./shared/Header"
import Layout from "./Layout"
import Footer from "./shared/Footer"
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in milliseconds
      once: false,     // Whether animation should happen only once while scrolling
    });
  }, []);

  return (
    <div className="bg-black text-white">
      <Header/>
      <Layout/>
      <Footer/>
    </div>
  )
}

export default App
