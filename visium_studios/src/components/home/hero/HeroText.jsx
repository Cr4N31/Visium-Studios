import { motion } from "framer-motion";
import hero_img from "/assets/img/subway_led_billboard.webp";
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
      className="relative flex min-h-[80vh] flex-col justify-between text-white md:min-h-[85vh]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* small filled corner mark, top-right — quiet chrome, echoes the reference */}
      <span className="absolute -top-4 right-0 h-3 w-16 bg-white md:h-4 md:w-24" />

      <div className="flex flex-col mt-30 gap-20 md:gap-10 justify-center items-center">
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

        {/* mobile hero image, centered */}
        <div className="w-full flex justify-center" data-aos="fade-up">
          <img
            src={hero_img}
            alt="hero"
            className="md:hidden block w-full object-cover"
          />
        </div>
      </div>

      {/* thin bottom strip — icon + line + CTA, no boxed frame */}
      <motion.div
        className="hidden md:flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between md:gap-12"
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

        <a
          href="/work"
          className="group flex items-center gap-3 text-xs uppercase tracking-[0.12em] text-white/70 transition-colors hover:text-white"
        >
          Explore our work
          <span className="text-lg font-light leading-none transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>
      </motion.div>
    </motion.div>
  );
}

export default HeroText;
