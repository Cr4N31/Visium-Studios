import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const revealUp = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } },
};

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
      className="relative flex min-h-[92svh] items-center justify-center text-white md:min-h-[86vh]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        className="hero-copy relative z-20 -mt-42 md:-mt-36 flex w-full items-center justify-center px-1 sm:px-4"
        onPointerEnter={() => blobScale.set(1)}
        onPointerLeave={() => blobScale.set(0)}
        onPointerMove={handlePointerMove}
      >
        <motion.div
          aria-hidden="true"
          className="hero-copy__morph"
          style={{ left: blobLeft, top: blobTop, scale: smoothScale }}
        />

        <p className="hero-copy__headline relative w-full text-center text-[clamp(3.3rem,17vw,6.9rem)] font-normal leading-[0.92] md:text-[clamp(6rem,11vw,12rem)]">
          <span className="block overflow-hidden">
            <motion.span className="block" variants={revealUp}>
              Perception is part of the
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span className="block" variants={revealUp}>
              product
            </motion.span>
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export default HeroText;
