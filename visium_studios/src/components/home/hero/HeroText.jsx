import { motion } from "framer-motion";
import VideoMotion from "../VideoMotion";
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
      className="relative flex min-h-full flex-col gap-12 justify-between text-white"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex md:mt-0 -mt-60 flex-col items-center justify-center gap-24 md:gap-16">
        {/* headline — serif, generous whitespace, one italic word for emphasis, centered on all breakpoints */}
        <div className="flex flex-1 items-center justify-center px-1 sm:px-4 w-full">
          <p className="relative max-w-4xl w-full text-center text-[clamp(3.2rem,8vw,4.25rem)] font-normal leading-[1.05] tracking-[-0.02em] md:text-[clamp(2.6rem,5.5vw,5.5rem)]">
            <span className="block font-[400] overflow-hidden">
              <motion.span className="block" variants={revealUp}>
                Perception is part of the
              </motion.span>
            </span>
            <span className="block font-[400] overflow-hidden">
              <motion.span className="block" variants={revealUp}>
                <em>product</em>
              </motion.span>
            </span>
          </p>
        </div>
      </div>

      <motion.div className="" variants={fadeIn}>
        <VideoMotion />
      </motion.div>
    </motion.div>
  );
}

export default HeroText;
