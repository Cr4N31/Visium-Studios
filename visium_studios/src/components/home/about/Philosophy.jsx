import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Philosophy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.25]);

  const philosophy = [
    {
      key: 1,
      phil: "Clarity Over Aesthetics",
      desc: "Design must serve a functional purpose before it serves an artistic one.",
    },
    {
      key: 2,
      phil: "Strategy Before Execution",
      desc: "We do not move a single pixel until the underlying brand logic is bulletproof.",
    },
    {
      key: 3,
      phil: "Selectivity Over Volume",
      desc: "We intentionally protect our creative quality by working exclusively with highly aligned founders.",
    },
    {
      key: 4,
      phil: "Authority Through Taste",
      desc: "Every asset we produce must make our clients look serious, credible and absolutely inevitable.",
    },
  ];

  return (
    <section ref={ref} className="px-8 py-24 md:py-32">
      <motion.div
        style={{ opacity }}
        data-aos="fade-up"
        className="ml-auto max-w-4xl text-right"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/70 mb-8">
          Philosophy
        </p>
        <ul className="flex flex-col gap-12">
          {philosophy.map((p) => (
            <li key={p.key} className="flex flex-col items-end gap-2">
              <span className="text-xs text-white/30 tabular-nums">
                0{p.key}
              </span>
              <p className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.15] text-white">
                {p.phil}
              </p>
              <p className="max-w-xl text-xl md:text-2xl text-white/50 leading-snug">
                {p.desc}
              </p>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export default Philosophy;
