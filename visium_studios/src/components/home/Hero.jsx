import VisiumText from "./hero/VisiumText";
import VideoMotion from "../../shared/VideoMotion";
import HeroCTA from "./hero/HeroCTA";
function Hero() {
  return (
    <section
      id="home"
      className="home-hero relative isolate mx-auto flex min-h-[min(100svh,64rem)] bg-[#F4F4F1] w-full max-w-[1800px] flex-col justify-start gap-10 overflow-x-clip rounded-b-4xl px-5 pb-8 pt-20 text-[#0B0B0B] sm:px-7 md:min-h-[min(100svh,58rem)] md:justify-between md:gap-8 md:px-10 md:pb-18 md:pt-24 xl:px-14 2xl:px-20"
    >
      <div className="relative z-10 flex w-full p-0 flex-col gap-2 md:flex-row md:items-stretch">
        <div className="h-52 min-w-0 shrink-0 overflow-hidden rounded-xl md:h-auto md:min-h-[16rem] md:flex-1">
          <VideoMotion />
        </div>
        <HeroCTA />
      </div>

      <div className="relative z-10">
        <VisiumText />
      </div>
    </section>
  );
}

export default Hero;
