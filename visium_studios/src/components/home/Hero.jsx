import VisiumText from "./hero/VisiumText";
import VideoMotion from "../../shared/VideoMotion";
import HeroCTA from "./hero/HeroCTA";

function Hero() {
  return (
    <section
      id="home"
      className="home-hero relative flex min-h-screen border-b border-b-transparent rounded-4xl flex-col justify-between gap-2 overflow-x-clip px-10 pb-8 md:pb-24 mb-24 pt-24 text-black"
    >
      <div className="flex w-full flex-col gap-2 md:flex-row md:items-stretch">
        <div className="h-60 min-w-0 flex-1 overflow-hidden rounded-xl">
          <VideoMotion />
        </div>
        <HeroCTA />
      </div>

      <VisiumText />
    </section>
  );
}

export default Hero;
