import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  { text: "Visium isn't a branding agency." },
  { text: "Visium isn't a digital agency." },
  { text: "Visium isn't a content studio." },
  { text: "Visium isn't a design agency." },
];

function StatementLine({ text, emphasis, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <motion.p
      style={{ opacity }}
      className={
        emphasis
          ? "font-serif not-italic text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] mt-8 md:mt-12"
          : "font-serif italic text-3xl md:text-5xl lg:text-6xl text-white/60 text-center leading-[1.15]"
      }
    >
      {text}
    </motion.p>
  );
}

function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.1"],
  });

  return (
    <section
      ref={ref}
      id="statement"
      className="px-8 py-40 md:py-56"
      data-aos="fade-up"
    >
      <div className="max-w-5xl mx-auto flex flex-col">
        {lines.map((line, i) => {
          const start = i / lines.length;
          const end = (i + 1) / lines.length;
          return (
            <StatementLine
              key={line.text}
              text={line.text}
              emphasis={line.emphasis}
              progress={scrollYProgress}
              start={start}
              end={end}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Statement;
