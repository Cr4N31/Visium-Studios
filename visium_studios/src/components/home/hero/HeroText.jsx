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
      className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-8 px-4 py-5 text-white sm:px-6 md:px-10 md:py-7"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="grid content-center gap-10 py-4 md:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] md:items-end md:gap-12 lg:gap-20">
        <div>
          <p className="mb-6 max-w-3xl text-xs uppercase tracking-[0.18em] text-white/60 md:mb-8 md:text-sm">
            Design with intent / Brands with presence
          </p>
          <p className="max-w-5xl text-[clamp(3.2rem,8vw,8.5rem)] font-semibold leading-[0.92] tracking-[-0.04em]">
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealUp}>
                <em className="italic">Perception</em>,
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealUp}>
                is part of the
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span className="block" variants={revealUp}>
                product.
              </motion.span>
            </span>
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-2 md:mb-2 md:grid-cols-[1.25fr_0.9fr]"
          variants={fadeIn}
        >
          <div className="relative aspect-[1.25] overflow-hidden border border-white/25 bg-black/10 p-3">
            <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.16em] text-white/60">
              Image placeholder / 01
            </span>
            <span className="absolute bottom-3 right-3 text-2xl font-light text-white/30">
              +
            </span>
          </div>
          <div className="relative aspect-[0.9] overflow-hidden border border-white/25 bg-black/10 p-3">
            <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.16em] text-white/60">
              Image placeholder / 02
            </span>
            <span className="absolute bottom-3 right-3 text-2xl font-light text-white/30">
              +
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="grid gap-6 border-t border-white/20 pt-4 text-xs leading-relaxed text-white/60 md:grid-cols-[minmax(150px,0.55fr)_minmax(0,1fr)_auto] md:items-end"
        variants={fadeIn}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white">
          ↘
        </div>
        <p className="max-w-xs">
          We don&apos;t just design. We Set the visual standard.
        </p>
        <a
          href="#contact"
          className="group flex min-h-20 items-end justify-between gap-8 border border-white/30 p-3 text-white transition-colors hover:bg-white hover:text-black md:min-w-48"
        >
          <span className="max-w-20 text-xs uppercase leading-[1.05] tracking-[0.12em]">
            Let&apos;s collaborate
          </span>
          <span className="text-3xl font-light leading-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}

export default HeroText;
