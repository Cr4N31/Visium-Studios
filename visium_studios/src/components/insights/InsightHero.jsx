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
      className="relative flex min-h-[70vh] flex-col justify-center px-5 text-white sm:px-7 md:px-6"
    >
      {/* Headline */}
      <Motion.h1 style={{ y: headY, opacity: headOpacity }}>
        <span className="text-[clamp(2rem,8vw,5rem)] font-normal leading-[1] sm:text-[clamp(2.5rem,7vw,5rem)] sm:leading-[1.02] md:text-[clamp(3rem,5vw,5rem)] md:leading-[1.06]">
          <Line delay={0.1}>
            <TextScramble>Our thoughts on building</TextScramble>
          </Line>
          <Line delay={0.25}>
            <span className="underline">
              <TextScramble>brands</TextScramble>
            </span>
            ,{" "}
            <span className="underline">
              <TextScramble>products</TextScramble>
            </span>{" "}
            and{" "}
            <span className="underline">
              <TextScramble>visual systems</TextScramble>
            </span>
            .
          </Line>
        </span>
      </Motion.h1>
    </section>
  );
}

export default InsightHero;
