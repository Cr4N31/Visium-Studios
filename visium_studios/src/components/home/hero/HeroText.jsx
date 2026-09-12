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

// Sweeps a white rectangle across the headline on hover — mix-blend-mode:
// difference flips the covered text to black, a true color invert.
const invertSweep = {
  rest: { scaleX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function HeroText() {
  return (
    <motion.div
      className="relative border border-white/15 text-white"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* corner marks — pure chrome, echoes the blueprint/architecture frame */}
      <span className="absolute -top-1.5 -left-1.5 text-white/40 text-lg leading-none">
        +
      </span>
      <span className="absolute -top-1.5 -right-1.5 text-white/40 text-lg leading-none">
        +
      </span>
      <span className="absolute -bottom-1.5 -left-1.5 text-white/40 text-lg leading-none">
        +
      </span>
      <span className="absolute -bottom-1.5 -right-1.5 text-white/40 text-lg leading-none">
        +
      </span>

      {/* ===== Top row: small thumbnail (left) + headline (right) ===== */}
      <div className="flex flex-col gap-6 border-b border-white/15 p-5 md:flex-row md:items-start md:gap-10 md:p-8">
        <motion.div
          variants={fadeIn}
          className="relative w-full aspect-[4/3] overflow-hidden border border-white/25 bg-white/5 md:w-40 md:shrink-0 lg:w-48"
        >
          <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.16em] text-white/50">
            Image placeholder / 00
          </span>
        </motion.div>

        <motion.div
          className="flex-1 relative cursor-default"
          initial="rest"
          whileHover="hover"
        >
          <motion.span
            aria-hidden="true"
            variants={invertSweep}
            style={{ transformOrigin: "left" }}
            className="pointer-events-none absolute inset-0 z-10 bg-white mix-blend-difference"
          />
          <p className="relative text-[clamp(2.4rem,9vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[clamp(2.6rem,6vw,6rem)]">
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
        </motion.div>

        <motion.span
          variants={fadeIn}
          className="text-xs text-white/40 md:self-start md:ml-auto"
        >
          © {new Date().getFullYear()}
        </motion.span>
      </div>

      {/* ===== Bottom row: icon + line (left) / image pair + CTA (right) ===== */}
      <motion.div
        className="flex flex-col gap-6 p-5 md:flex-row md:items-stretch md:gap-6 md:p-8"
        variants={fadeIn}
      >
        <div className="flex items-start gap-4 md:w-56 md:shrink-0 md:flex-col md:justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white shrink-0">
            ↘
          </div>
          <p className="text-xs leading-relaxed text-white/60 max-w-xs">
            We don&apos;t just design. We Set the visual standard.
          </p>
        </div>

        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 aspect-[1.1] overflow-hidden border border-white/25 bg-white/5 p-3">
            <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.16em] text-white/50">
              Image placeholder / 01
            </span>
            <span className="absolute bottom-3 right-3 text-2xl font-light text-white/30">
              +
            </span>
          </div>

          <div className="relative flex-1 aspect-[1.1] overflow-hidden border border-white/25 bg-white/5 p-3">
            <span className="absolute left-3 top-3 text-[9px] uppercase tracking-[0.16em] text-white/50">
              Image placeholder / 02
            </span>
            <span className="absolute bottom-3 right-3 text-2xl font-light text-white/30">
              +
            </span>
          </div>

          <a
            href="#contact"
            className="group relative flex flex-1 aspect-[1.1] flex-col items-start justify-end gap-2 border border-white/30 bg-white p-3 text-black transition-colors"
          >
            <span className="max-w-[6rem] text-xs uppercase leading-[1.05] tracking-[0.12em]">
              Let&apos;s collaborate
            </span>
            <span className="absolute bottom-3 right-3 text-2xl font-light leading-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              ↗
            </span>
          </a>
        </div>
      </motion.div>

      <motion.span
        variants={fadeIn}
        className="absolute bottom-2 right-3 text-[10px] uppercase tracking-[0.16em] text-white/30 hidden md:block"
      >
        Scroll ↓
      </motion.span>
    </motion.div>
  );
}

export default HeroText;
