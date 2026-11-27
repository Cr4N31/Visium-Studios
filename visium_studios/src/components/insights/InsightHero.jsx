import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import TextScramble from "../../shared/TextScramble";

const ease = [0.22, 1, 0.36, 1];

function Line({ children, delay = 0, className = "" }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <Motion.span
        className={`block ${className}`}
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease, delay }}
      >
        {children}
      </Motion.span>
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
      className="relative flex min-h-[60vh] flex-col justify-center bg-[#0B0B0B] px-5 pb-12 pt-28 text-[#F4F4F1] sm:px-7 md:px-[2vw] md:pb-16 md:pt-36"
    >
      {/* Headline */}
      <Motion.h1
        className="site-container font-serif text-[clamp(2.25rem,5.3vw,4.25rem)] font-normal leading-[1.15] tracking-[-0.045em]"
        style={{ y: headY, opacity: headOpacity }}
      >
        <Line delay={0.1}>
          <TextScramble>
            Our thoughts on building brands, products and visual systems and
            creating meaningful experiences
          </TextScramble>
        </Line>
      </Motion.h1>
    </section>
  );
}

export default InsightHero;
