import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { sortedInsights } from "../../data/insights";

const ease = [0.22, 1, 0.36, 1];

function Line({ children, delay = 0, className = "" }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function InsightHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const headY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center px-4 text-white"
    >
      {/* Headline */}
      <motion.h1
        style={{ y: headY, opacity: headOpacity }}
        className="max-w-[18ch] text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.045em] md:my-0 md:max-w-6xl"
      >
        <Line delay={0.1}>Our thoughts on building</Line>
        <Line delay={0.25} className="font-light italic text-white/55">
          brands, products and visual systems.
        </Line>
      </motion.h1>
    </section>
  );
}

export default InsightHero;
