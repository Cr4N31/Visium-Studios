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
      className="relative flex min-h-[70vh] flex-col justify-center md:px-6 px-7 text-white"
    >
      {/* Headline */}
      <motion.h1 style={{ y: headY, opacity: headOpacity }}>
        <span className="text-[clamp(2.9rem,9vw,5rem)] tracking-[-0.07em] font-normal leading-[1.08] md:leading-[1.06] md:text-[clamp(3rem,5vw,5rem)]">
          <Line delay={0.1}>Our thoughts on building</Line>
          <Line delay={0.25}>
            <span className=" underline">brands</span>,{" "}
            <span className=" underline">products</span> and{" "}
            <span className=" underline">visual systems</span>.
          </Line>
        </span>
      </motion.h1>
    </section>
  );
}

export default InsightHero;
