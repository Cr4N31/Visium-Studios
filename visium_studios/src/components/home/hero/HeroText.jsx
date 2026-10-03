import {
  motion as Motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const revealUp = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } },
};

import VideoMotion from "../../../shared/VideoMotion";

function useMorphPointer() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const scale = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.45 });
  const smoothScale = useSpring(scale, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });
  const left = useTransform(smoothX, (value) => `${value}%`);
  const top = useTransform(smoothY, (value) => `${value}%`);

  const onPointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width) * 100);
    y.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };
  const onPointerEnter = () => scale.set(1);
  const onPointerLeave = () => scale.set(0);

  return {
    left,
    top,
    scale: smoothScale,
    onPointerMove,
    onPointerEnter,
    onPointerLeave,
  };
}

function HeroText() {
  const headlineMorph = useMorphPointer();

  return (
    <Motion.div
      className="relative flex flex-col items-center justify-start pt-24 pb-10 gap-12 text-white sm:pt-28 sm:gap-10 md:min-h-[100vh] md:justify-center md:pt-0 md:pb-0 md:gap-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <Motion.div className="hero-copy relative z-20 flex flex-col gap-6 w-full items-center justify-center px-4 sm:px-6 md:px-4">
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
      </Motion.div>

      <div className="w-full px-4 aspect-[4/5] sm:px-6 sm:aspect-[3/4] md:h-[100vh] md:aspect-video md:px-0 md:mt-10">
        <VideoMotion />
      </div>
    </Motion.div>
  );
}

export default HeroText;
