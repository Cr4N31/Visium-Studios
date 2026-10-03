import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
      className="relative flex min-h-[50vh] flex-col justify-between px-4 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32"
    >
      <div className="flex items-start justify-between text-[11px] mb-2 uppercase tracking-[0.2em] text-white/40">
        <p>Capabilities</p>
        <p>(0{capabilities.length})</p>
      </div>

      <motion.h1 style={{ y: headY, opacity: headOpacity }}>
        <span className="text-[clamp(2.9rem,9vw,5rem)] tracking-[-0.07em] font-normal leading-[1.08] md:leading-[1.06] md:text-[clamp(3rem,5vw,5rem)]">
          <Line delay={0.1}>One Visual Language,</Line>
          <Line delay={0.25}>Across Every Touchpoint</Line>
        </span>
      </motion.h1>

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
