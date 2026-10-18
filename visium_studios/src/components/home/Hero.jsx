import VisiumText from "./hero/VisiumText";
import VideoMotion from "../../shared/VideoMotion";
import HeroCTA from "./hero/HeroCTA";

function Hero() {
  return (
    <section
      id="home"
      className="home-hero relative flex min-h-screen flex-col justify-start gap-[12vh] overflow-x-clip border-b rounded-b-4xl border-b border-b-transparent px-9 md:px-10 pb-8 pt-24 text-black md:mb-24 md:justify-between md:gap-8 md:pb-18"
    >
      <div className="flex w-full p-0 flex-col gap-2 md:flex-row md:items-stretch">
        <div className="h-52 min-w-0 flex-1 overflow-hidden rounded-xl">
          <VideoMotion />
        </div>
        <HeroCTA />
      </div>

      <VisiumText />
    </section>
  );
}

export default Hero;
