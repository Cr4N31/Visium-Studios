import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const revealUp = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 1, ease: [0.65, 0, 0.35, 1] } },
};

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function HeroText() {
  return (
    <motion.div
      className="relative grid min-h-[100svh] grid-rows-[auto_1fr_auto] gap-4 overflow-hidden px-4 py-4 text-white sm:px-6 md:min-h-screen md:gap-8 md:px-10 md:py-7"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <motion.img
          src="/assets/logo/visiumSingleLogoBlack.png"
          alt=""
          className="absolute -right-20 top-[18%] w-[min(62vw,34rem)] opacity-[0.3] blur-[0.2px] md:-right-28 md:top-[10%] md:w-[min(42vw,38rem)]"
          animate={{ y: [0, -18, 0], rotate: [8, 10, 8] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="/assets/logo/visiumSingleLogoBlack.png"
          alt=""
          className="absolute -left-16 bottom-[18%] w-[min(28vw,15rem)] opacity-[0.1] md:-left-10 md:bottom-[14%] md:w-[min(18vw,12rem)]"
          animate={{ y: [0, 12, 0], rotate: [-14, -10, -14] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
        <motion.img
          src="/assets/logo/visiumSingleLogoBlack.png"
          alt=""
          className="absolute right-[28%] top-[6%] w-16 opacity-[0.1] md:right-[32%] md:top-[12%] md:w-24"
          animate={{ y: [0, 8, 0], rotate: [22, 16, 22] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </div>

      <div className="flex h-screen items-center">
        <motion.div
          className="group relative z-10 cursor-default"
          initial="rest"
          whileHover="hover"
        >
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 max-w-5xl text-[clamp(2.4rem,11vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] text-black md:text-[clamp(3.2rem,8vw,8.5rem)]"
            variants={{
              rest: { opacity: 0, x: 0, y: 0, skewX: 0 },
              hover: { opacity: 0.16, x: 10, y: 5, skewX: -5 },
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block">Perception,</span>
            <span className="block">is part of the</span>
            <span className="block">product.</span>
          </motion.span>
          <motion.p
            className="relative max-w-5xl origin-left text-[clamp(2.4rem,11vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[clamp(3.2rem,8vw,8.5rem)]"
            variants={{
              rest: { x: 0, skewX: 0, scaleX: 1, letterSpacing: "-0.04em" },
              hover: {
                x: -4,
                skewX: 3,
                scaleX: 0.98,
                letterSpacing: "-0.02em",
              },
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={revealUp}
                initial="hidden"
                animate="show"
              >
                <em className="italic">Perception</em>,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={revealUp}
                initial="hidden"
                animate="show"
              >
                is part of the
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                variants={revealUp}
                initial="hidden"
                animate="show"
              >
                product.
              </motion.span>
            </span>
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default HeroText;
