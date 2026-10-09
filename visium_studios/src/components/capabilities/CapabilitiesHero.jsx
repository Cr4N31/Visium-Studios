import { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];
const capabilities = [
  { label: "Brand", href: "#brand" },
  { label: "Digital", href: "#digital" },
  { label: "Product", href: "#product" },
  { label: "Motion", href: "#motion" },
  { label: "Development", href: "#development" },
];

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

function CapabilitiesHero() {
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
      className="relative flex min-h-[30vh] flex-col justify-center gap-6 px-5 pb-10 pt-28 sm:px-8 md:justify-between md:gap-0 md:pb-14 md:pt-32"
    >
      <Motion.h1 style={{ y: headY, opacity: headOpacity }}>
        <span className="text-[clamp(2rem,8vw,5rem)] font-normal leading-[1] sm:text-[clamp(2.5rem,7vw,5rem)] sm:leading-[1.02] md:text-[clamp(3rem,5vw,5rem)] md:leading-[1.06]">
          <Line delay={0.1}>One Visual Language,</Line>
          <Line delay={0.25}>Across Every Touchpoint</Line>
        </span>
      </Motion.h1>

      <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xs text-sm leading-relaxed text-white/60 md:max-w-sm md:text-base">
          Visium brings brand, digital, product, motion and development together
          under one visual direction.
        </p>
      </div>
    </section>
  );
}

export default CapabilitiesHero;
