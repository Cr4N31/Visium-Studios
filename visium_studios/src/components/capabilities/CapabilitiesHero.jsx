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
      className="relative flex min-h-screen flex-col justify-between px-4 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32"
    >
      <div className="flex items-start justify-between text-[11px] mb-2 uppercase tracking-[0.2em] text-white/40">
        <p>Capabilities</p>
        <p>(0{capabilities.length})</p>
      </div>

      <motion.h1
        style={{ y: headY, opacity: headOpacity }}
        className="my-16 max-w-[16ch] text-[clamp(2.75rem,9vw,9rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white md:my-0 md:max-w-6xl"
      >
        <Line delay={0.1}>One Visual Language,</Line>
        <Line
          delay={0.25}
          className="font-light italic text-white/55 md:pl-[12vw]"
        >
          Across Every Touchpoint
        </Line>
      </motion.h1>

      <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
        <p className="max-w-xs text-sm leading-relaxed text-white/60 md:max-w-sm md:text-base">
          Visium brings brand, digital, product, motion and development together
          under one visual direction.
        </p>

        <ul className="flex flex-col gap-1 md:items-end">
          {capabilities.map((capability, i) => (
            <motion.li
              key={capability.href}
              className="flex items-baseline gap-4 text-2xl tracking-[-0.03em] text-white/35 transition-colors duration-500 hover:text-white md:text-3xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.8 + i * 0.07 }}
            >
              <a href={capability.href}>
                <span className="text-[11px] tracking-[0.2em] text-white/30">
                  0{i + 1}
                </span>
                {capability.label}
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default CapabilitiesHero;
