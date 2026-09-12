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
      className="relative text-white"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex flex-col gap-10 md:gap-16">
        <div className="flex justify-center px-1 sm:px-4">
          <p className="relative max-w-5xl text-center text-[clamp(2.4rem,10.5vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[clamp(2.6rem,6vw,6rem)]">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealUp}>
                <span className="font-semibold">Perception is part</span>
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealUp}>
                <span className="font-semibold">of the product</span>
              </motion.span>
            </span>
          </p>
        </div>
      </div>

      <motion.div
        className="flex flex-col mt-12 gap-8 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between md:gap-12"
        variants={fadeIn}
      >
        <div className="flex min-w-0 items-start gap-4 md:max-w-xs md:flex-1">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/40 text-white">
            ↘
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-white/60">
            We build visual systems that shape how ambitious brands are seen,
            understood and remembered.
          </p>
        </div>

        <div className="md:flex hidden w-full md:w-auto md:min-w-64">
          <a
            href="/work"
            className="group relative flex min-h-28 w-full flex-1 flex-col items-end justify-end gap-6 border border-white/30 bg-white p-4 text-black transition-colors hover:bg-white/90 md:aspect-[2.4] md:min-h-0 md:w-64"
          >
            <span className="mr-4 max-w-[8rem] text-right text-xs uppercase leading-[1.05] tracking-[0.12em]">
              Explore Our Work
            </span>
            <span className="absolute top-3 right-3 text-2xl font-light leading-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default HeroText;
