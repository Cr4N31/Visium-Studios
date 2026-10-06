import {
  motion as Motion,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useMagnetic, useMorphPointer } from "../../../shared/useCtaPointer";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const revealUp = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } },
};

import VideoMotion from "../../../shared/VideoMotion";

const MotionLink = Motion(Link);

function HeroText() {
  const headlineMorph = useMorphPointer();
  const ctaMorph = useMorphPointer();
  const ctaMagnetic = useMagnetic();

  return (
    <Motion.div
      className="relative flex flex-col items-center justify-start pt-24 pb-10 gap-12 text-white sm:pt-28 sm:gap-10 md:min-h-[100vh] md:justify-center md:pt-0 md:pb-0 md:gap-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Motion.div className="hero-copy relative z-20 flex w-full flex-col items-center justify-center gap-6">
        <p
          className="hero-copy__headline relative w-full text-center text-[clamp(2.9rem,9vw,5rem)] font-normal leading-[1.08] md:mt-24 md:leading-[1.06] lg:mt-20 md:text-[clamp(3rem,5vw,5rem)]"
          onPointerEnter={headlineMorph.onPointerEnter}
          onPointerLeave={headlineMorph.onPointerLeave}
          onPointerMove={headlineMorph.onPointerMove}
        >
          <Motion.div
            aria-hidden="true"
            className="hero-copy__morph"
            style={{
              left: headlineMorph.left,
              top: headlineMorph.top,
              scale: headlineMorph.scale,
            }}
          />

          <span className="block font-[400] leading-[0.95]">
            <Motion.span className="block" variants={revealUp}>
              <span className="hero-copy__accent">Ambition</span> should
            </Motion.span>
          </span>
          <span className="block leading-[0.95] font-[400]">
            <Motion.span className="block" variants={revealUp}>
              have a{" "}
              <span className="hero-copy__accent whitespace-nowrap">
                visual
              </span>
              <br className="md:hidden" />
              <span className="hero-copy__accent whitespace-nowrap">
                &nbsp;language
              </span>
            </Motion.span>
          </span>
        </p>
        <p className="text-white/90 text-xl text-center">
          We build the visual systems that set ambitions brands apart
        </p>
        <MotionLink
          to="/startaproject"
          data-blob
          className="hero-cta group relative isolate inline-flex items-center gap-5 overflow-hidden rounded-full border-2 border-white bg-white px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-black transition-colors hover:bg-transparent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
          style={{ x: ctaMagnetic.x, y: ctaMagnetic.y }}
          onPointerEnter={ctaMorph.onPointerEnter}
          onPointerLeave={(event) => {
            ctaMorph.onPointerLeave(event);
            ctaMagnetic.onPointerLeave(event);
          }}
          onPointerMove={(event) => {
            ctaMorph.onPointerMove(event);
            ctaMagnetic.onPointerMove(event);
          }}
        >
          <Motion.span
            aria-hidden="true"
            className="cta-morph"
            style={{
              left: ctaMorph.left,
              top: ctaMorph.top,
              scale: ctaMorph.scale,
            }}
          />
          <span className="relative z-[1]">Start a project</span>
          <span
            aria-hidden="true"
            className="relative z-[1] text-lg leading-none transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </MotionLink>
      </Motion.div>

      <div className="w-full aspect-[4/5] sm:aspect-[3/4] md:mt-10 md:aspect-video md:h-[100vh]">
        <VideoMotion />
      </div>
    </Motion.div>
  );
}

export default HeroText;
