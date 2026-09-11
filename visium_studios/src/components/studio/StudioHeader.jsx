import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const revealUp = {
  hidden: { y: "100%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function StudioHeader() {
  return (
    <header className="relative isolate overflow-hidden border-b border-white/10 px-4 pb-20 pt-28 sm:px-6 md:px-10 md:pb-32 md:pt-36">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <motion.img
          src="/assets/logo/visiumSingleLogoBlack.png"
          alt=""
          className="absolute -right-28 top-32 w-[min(55vw,34rem)] opacity-[0.08] md:-right-20 md:top-24 md:w-[min(38vw,38rem)]"
          animate={{ y: [0, -16, 0], rotate: [10, 14, 10] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src="/assets/logo/visiumSingleLogoBlack.png"
          alt=""
          className="absolute -left-12 bottom-16 w-32 opacity-[0.05] md:left-[38%] md:bottom-20 md:w-40"
          animate={{ y: [0, 12, 0], rotate: [-12, -8, -12] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-20 flex items-start justify-between border-b border-white/15 pb-4 text-[10px] uppercase tracking-[0.2em] text-white/40 md:mb-28 md:text-xs">
          <motion.span variants={fadeUp}>Studio / 01</motion.span>
          <motion.span variants={fadeUp}>
            Setting the visual standard
          </motion.span>
        </div>

        <div className="grid gap-14 md:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] md:items-end md:gap-20">
          <div>
            <p className="mb-7 text-xs uppercase tracking-[0.2em] text-white/40">
              The world behind the work
            </p>
            <h1 className="max-w-5xl overflow-hidden text-[clamp(3.5rem,9vw,9rem)] font-semibold leading-[0.88] tracking-[-0.045em]">
              <motion.span variants={revealUp} className="block">
                Make the
              </motion.span>
              <motion.span variants={revealUp} className="block text-white/60">
                invisible
              </motion.span>
              <motion.span variants={revealUp} className="block">
                visible.
              </motion.span>
            </h1>
          </div>

          <div className="flex flex-col gap-6 border-l border-white/20 pl-5 text-base leading-relaxed text-white/60 md:pb-2 md:pl-8 md:text-lg">
            <motion.p variants={fadeUp}>
              Visium exists for ambitious businesses that have outgrown the way
              they present themselves.
            </motion.p>
            <motion.p variants={fadeUp} className="text-white">
              We build the visual systems that make quality, ambition and
              character impossible to miss.
            </motion.p>
          </div>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-20 grid gap-8 border-t border-white/15 pt-5 text-xs uppercase tracking-[0.18em] text-white/40 sm:grid-cols-3 md:mt-28"
        >
          <span>Branding / Digital</span>
          <span>Motion / Direction</span>
          <span className="sm:text-right">One visual language</span>
        </motion.div>
      </motion.div>
    </header>
  );
}

export default StudioHeader;
