import { motion as Motion } from "framer-motion";

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
    <header className="relative isolate overflow-hidden px-8 pb-20 pt-32 md:pb-28 md:pt-44">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <Motion.img
          src="/assets/logo/visiumSingleLogoBlack.png"
          alt=""
          className="absolute -right-28 top-28 w-[min(55vw,34rem)] opacity-[0.06] md:-right-20 md:top-16 md:w-[min(38vw,38rem)]"
          animate={{ y: [0, -14, 0], rotate: [10, 14, 10] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto max-w-[1600px]"
      >
        <div className="mb-16 flex items-start justify-between border-b border-white/15 pb-4 text-[10px] uppercase tracking-[0.2em] text-white/40 md:mb-24 md:text-xs">
          <Motion.span variants={fadeUp}>Studio</Motion.span>
          <Motion.span variants={fadeUp}>Who we are / How we work</Motion.span>
        </div>

        <div className="max-w-[1350px]">
          <p className="mb-7 text-xs uppercase tracking-[0.2em] text-white/40">
            The world behind the work
          </p>
          <div className="overflow-hidden">
            <Motion.h1
              variants={revealUp}
              className="max-w-[1250px] text-[clamp(2.9rem,9vw,5rem)] font-normal leading-[1.08] tracking-[-0.07em] md:text-[clamp(3rem,5vw,5rem)] md:leading-[1.06]"
            >
              A multidisciplinary studio for brands with somewhere to go.
            </Motion.h1>
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-6 md:mt-20 md:grid-cols-[1fr_minmax(18rem,0.7fr)] md:gap-16">
          <Motion.p
            variants={fadeUp}
            className="max-w-4xl text-xl leading-snug text-white md:text-3xl"
          >
            Visium brings strategy, identity, digital and motion into one
            connected practice—so every expression of a brand feels like it
            belongs to the same ambition.
          </Motion.p>
          <Motion.p
            variants={fadeUp}
            className="max-w-lg text-sm leading-relaxed text-white/50 md:justify-self-end md:text-base"
          >
            We work closely, think across disciplines and stay involved from the
            first question to the final detail. The result is more than a set of
            assets: it is a visual system built to move a business forward.
          </Motion.p>
        </div>

        <Motion.div
          variants={fadeUp}
          className="mt-16 flex flex-wrap gap-x-8 gap-y-3 text-[10px] uppercase tracking-[0.18em] text-white/40 md:mt-24 md:gap-x-12 md:text-xs"
        >
          <span>Strategy</span>
          <span>Identity</span>
          <span>Digital</span>
          <span>Motion</span>
          <span>One connected studio</span>
        </Motion.div>

      </Motion.div>
    </header>
  );
}

export default StudioHeader;
