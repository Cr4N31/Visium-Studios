import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const revealUp = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } },
};

import VideoMotion from "../VideoMotion";

function HeroText() {
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(52);
  const blobScale = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 120,
    damping: 22,
    mass: 0.45,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 120,
    damping: 22,
    mass: 0.45,
  });
  const smoothScale = useSpring(blobScale, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });
  const blobLeft = useTransform(smoothX, (value) => `${value}%`);
  const blobTop = useTransform(smoothY, (value) => `${value}%`);

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  return (
    <motion.div
      className="relative flex flex-col items-center justify-start pt-24 pb-10 gap-12 text-white sm:pt-28 sm:gap-10 md:min-h-[100vh] md:justify-center md:pt-0 md:pb-0 md:gap-12"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="hero-copy relative z-20 flex w-full items-center justify-center px-4 sm:px-6 md:px-4"
        onPointerEnter={() => blobScale.set(1)}
        onPointerLeave={() => blobScale.set(0)}
        onPointerMove={handlePointerMove}
      >
        <motion.div
          aria-hidden="true"
          className="hero-copy__morph"
          style={{ left: blobLeft, top: blobTop, scale: smoothScale }}
        />

        <p className="hero-copy__headline relative w-full text-center text-[clamp(2.25rem,9vw,5rem)] font-normal leading-[1.08] md:mt-24 md:leading-[1.06] lg:mt-20 md:text-[clamp(3rem,5vw,5rem)]">
          <span className="block">
            <motion.span className="font-[400] block" variants={revealUp}>
              <span className="hero-copy__accent">Ambition</span> should
            </motion.span>
          </span>
          <span className="block font-[400]">
            <motion.span className="block" variants={revealUp}>
              have a{" "}
              <span className="hero-copy__accent whitespace-nowrap">
                visual
              </span>
              <br className="md:hidden" />
              <span className="hero-copy__accent whitespace-nowrap">
                language
              </span>
            </motion.span>
          </span>
        </p>
      </motion.div>

      <div className="w-full px-4 aspect-[4/5] sm:px-6 sm:aspect-[3/4] md:h-[100vh] md:aspect-video md:px-0 md:mt-10">
        <VideoMotion />
      </div>
    </motion.div>
  );
}

export default HeroText;
