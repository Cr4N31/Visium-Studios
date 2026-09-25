import { motion, useReducedMotion } from "framer-motion";

const principles = [
  { top: "CLARITY", bottom: "OVER DECORATION." },
  { top: "SYSTEMS", bottom: "OVER ASSETS." },
  { top: "DISTINCTION", bottom: "OVER TRENDS." },
  { top: "INTENTION", bottom: "OVER NOISE." },
  { top: "QUALITY", bottom: "OVER OUTPUT." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Row-level fade-up: each row animates in once, when it scrolls into
// view — independent of every other row, no shared scroll track needed.
const rowFadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

/*
 * Chromatic-aberration "wiggle": on hover, the row nudges right and two
 * color-offset ghost copies of the text (cyan/magenta) peel away from
 * the base text and a tiny jitter runs once. Built with plain CSS
 * transitions (group-hover) for the ghost layers — cheap, no JS per
 * frame — plus one short framer-motion keyframe animation for the jitter.
 */
function PrincipleRow({ index, top, bottom }) {
  const label = `${top} ${bottom}`;
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="group relative border-t border-white/15 last:border-b"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={rowFadeUp}
      custom={index * 0.08}
    >
      <motion.div
        className="flex items-center gap-4 py-6 transition-transform duration-300 ease-out group-hover:translate-x-3 md:gap-8 md:py-10"
        whileHover={{ x: [0, -3, 3, -2, 2, 0] }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        <span className="w-8 shrink-0 text-xs text-white/40 md:w-12 md:text-sm">
          {number}
        </span>

        <div className="relative">
          {/* Ghost layers — hidden until hover, offset in complementary
              colors to fake a chromatic-aberration glitch. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 uppercase tracking-[-0.04em] text-cyan-300 opacity-0 transition-all duration-300 ease-out group-hover:-translate-x-[3px] group-hover:opacity-60 text-3xl leading-[1.05] sm:text-4xl md:text-6xl"
          >
            {label}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 uppercase tracking-[-0.04em] text-pink-400 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-[3px] group-hover:opacity-60 text-3xl leading-[1.05] sm:text-4xl md:text-6xl"
          >
            {label}
          </span>

          <p className="relative uppercase tracking-[-0.04em] text-3xl leading-[1.05] sm:text-4xl md:text-6xl">
            {label}
          </p>
        </div>

        <span
          aria-hidden="true"
          className="ml-auto hidden -translate-x-2 text-2xl opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:inline-block"
        >
          →
        </span>
      </motion.div>
    </motion.div>
  );
}

function VisiumStandard() {
  const prefersReducedMotion = useReducedMotion();

  const intro = (
    <motion.div
      className="flex flex-col px-4 py-24 md:px-10 md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      variants={fadeUp}
    >
      <span className="text-sm md:text-lg">The Visium Approach</span>
      <p className="mb-4 text-4xl uppercase tracking-[-0.07em] md:text-7xl">
        We set the standard
        <br /> before we set the style
      </p>
      <p className="text-lg md:text-xl">
        Our principles are simple and precise
      </p>
    </motion.div>
  );

  // Reduced-motion: same list structure, no hover glitch, no
  // scroll-triggered transitions — everything just renders in place.
  if (prefersReducedMotion) {
    return (
      <section className="bg-black text-white">
        {intro}
        <div className="px-4 md:px-10">
          {principles.map((p) => (
            <div
              key={p.top}
              className="border-t border-white/15 py-6 last:border-b md:py-10"
            >
              <p className="text-3xl uppercase leading-[1.05] tracking-[-0.04em] sm:text-4xl md:text-6xl">
                {p.top} {p.bottom}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center px-4 py-24 text-center md:py-32">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Setting the visual standard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white">
      {intro}

      <div className="px-4 md:px-10">
        {principles.map((p, index) => (
          <PrincipleRow
            key={p.top}
            index={index}
            top={p.top}
            bottom={p.bottom}
          />
        ))}
      </div>

      {/* Outro — centered, fades up once as it scrolls into view */}
      <motion.div
        className="flex items-center justify-center px-4 py-24 text-center md:py-32"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-white/60 md:text-base">
          Setting the visual standard.
        </p>
      </motion.div>
    </section>
  );
}

export default VisiumStandard;
