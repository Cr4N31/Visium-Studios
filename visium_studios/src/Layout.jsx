import { BrowserRouter, Router, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Brand from "./pages/Brand";
import Target from "./pages/Target";
import Service from "./pages/Service";
import Strategy from "./pages/Strategy";
import Aesthetics from "./pages/Aesthetics";
function Layout() {
    return (
        <main>
            <Hero/>
            <div className="flex flex-col gap-12 py-8">
                <About/>
                <Brand/>
                <Target/>
                <Service/>
                <Strategy/>
                <Aesthetics/>
            </div>
  
        </main>
    )
}
export default Layout