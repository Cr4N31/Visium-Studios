import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const currentYear = new Date().getFullYear();

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
      className="relative flex flex-col min-h-[92svh] md:gap-12 gap-10 items-center justify-center text-white md:min-h-[100vh]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="hero-copy relative z-20 flex w-full items-center justify-center px-1 sm:px-4"
        onPointerEnter={() => blobScale.set(1)}
        onPointerLeave={() => blobScale.set(0)}
        onPointerMove={handlePointerMove}
      >
        <motion.div
          aria-hidden="true"
          className="hero-copy__morph"
          style={{ left: blobLeft, top: blobTop, scale: smoothScale }}
        />

        <p className="hero-copy__headline relative w-full text-center text-[clamp(2.3rem,1vw,3.9rem)] md:mt-12 -mt-3 font-normal leading-[1.06] md:text-[clamp(3rem,5vw,5rem)]">
          <span className="block">
            <motion.span className="font-[400] block" variants={revealUp}>
              <span className="hero-copy__accent">Ambition</span> should
            </motion.span>
          </span>
          <span className="block font-[400]">
            <motion.span className="block" variants={revealUp}>
              have a <span className="hero-copy__accent">visual language</span>
              <br className="md:hidden" />
            </motion.span>
          </span>
        </p>
      </motion.div>
      <div className="md:h-[100vh] h-[550px] aspect-[9/16] md:aspect-video">
        <VideoMotion />
      </div>
    </motion.div>
  );
}

export default HeroText;
