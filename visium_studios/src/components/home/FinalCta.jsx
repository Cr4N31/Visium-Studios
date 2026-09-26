import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";

function FinalCTA() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["80px", "0px", "-40px"],
  );

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65],
    [0, 1, 1],
  );

  const lineScale = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="start-a-project"
      className="relative min-h-[85svh] overflow-hidden border-t border-white/10 bg-black px-4 py-24 text-white sm:px-6 md:min-h-screen md:px-10 md:py-32"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative z-10 flex min-h-[65svh] flex-col justify-between md:min-h-[75svh]">
        {/* Section label */}
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            08 / Start a Project
          </span>

          <motion.span
            style={{ scaleX: lineScale }}
            className="h-px w-16 origin-left bg-white/30 md:w-24"
          />
        </div>

        {/* Main CTA */}
        <div className="mt-24 md:mt-0">
          <motion.div
            style={{
              y: headlineY,
              opacity: headlineOpacity,
            }}
          >
            <span
              id="final-cta-heading"
              className="max-w-[1100px] text-[clamp(3.5rem,9.5vw,9.5rem)] font-normal uppercase leading-[0.82] tracking-[-0.055em]"
            >
              Let&apos;s build something
              <br />
              worth looking at.
            </span>
          </motion.div>
        </div>

        {/* Bottom action */}
        <div className="mt-20 flex flex-col gap-10 md:mt-0 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-white/45 md:text-base">
            Have a business with somewhere to go? Let&apos;s build the visual
            system to take it there.
          </p>

          <Link
            to="/contact"
            className="group inline-flex w-fit items-center gap-5 border-b border-white/40 pb-3 text-sm font-medium uppercase tracking-[0.16em] text-white transition-colors hover:border-white"
          >
            <span>Start a project</span>

            <span className="text-2xl leading-none transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Subtle visual echo */}
      <motion.div
        style={{
          scaleX: lineScale,
          opacity: headlineOpacity,
        }}
        className="absolute bottom-10 left-4 right-4 h-px origin-left bg-white/10 sm:left-6 sm:right-6 md:left-10 md:right-10"
      />
    </section>
  );
}

export default FinalCTA;
