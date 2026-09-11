import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Strategy() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.25]);

  const process = [
    {
      key: "01",
      title: "Think",
      desc: "We diagnose the problem before reaching for an answer. Research, context, and commercial reality give the work somewhere precise to begin.",
    },
    {
      key: "02",
      title: "Define",
      desc: "We establish the direction: the position, language, and visual logic that make a complex idea legible and distinct.",
    },
    {
      key: "03",
      title: "Build",
      desc: "Strategy becomes a system. Brand, design, technology, and visual culture are developed together rather than handed off as separate outputs.",
    },
    {
      key: "04",
      title: "Apply",
      desc: "The system is put to work across every relevant touchpoint, from the first impression to the details that make the experience hold together.",
    },
    {
      key: "05",
      title: "Refine",
      desc: "We edit, test, and sharpen until the work feels inevitable. Quality is not a final layer; it is the result of sustained attention.",
    },
  ];

  const principles = [
    "Clarity over decoration.",
    "Systems over assets.",
    "Distinction over trends.",
    "Intention over noise.",
    "Quality over output.",
  ];

  return (
    <section
      ref={ref}
      className="px-8 py-24 md:py-32"
      data-aos="fade-up"
      id="strategy"
    >
      <motion.div style={{ opacity }} className="ml-auto max-w-5xl">
        <p className="mb-8 text-right text-xs uppercase tracking-[0.2em] text-white/40">
          How we think
        </p>
        <div className="flex flex-col items-end gap-8 text-right">
          <p className="max-w-4xl text-4xl leading-[1.1] text-white md:text-6xl lg:text-7xl">
            Setting the visual standard means making the thinking visible.
          </p>
          <p className="max-w-2xl text-xl leading-snug text-white/50 md:text-2xl">
            We combine strategy, design, technology, and visual culture into one
            connected practice. The work does not begin when things start
            looking good.
          </p>
        </div>

        <div className="mt-24 border-t border-white/20">
          <div className="grid grid-cols-1 gap-10 py-8 md:grid-cols-[minmax(10rem,0.7fr)_1.3fr] md:gap-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              The method
            </p>
            <ol className="flex flex-col">
              {process.map((step) => (
                <li
                  key={step.key}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-6 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span className="text-xs text-white/30">{step.key}</span>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-[minmax(8rem,0.55fr)_1fr] md:gap-8">
                    <p className="text-3xl text-white md:text-4xl">
                      {step.title}
                    </p>
                    <p className="max-w-xl text-base leading-relaxed text-white/50">
                      {step.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 gap-10 border-t border-white/20 py-8 md:grid-cols-[minmax(10rem,0.7fr)_1.3fr] md:gap-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              The standard
            </p>
            <div>
              <ul className="flex flex-col">
                {principles.map((principle, index) => (
                  <li
                    key={principle}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4 last:border-b-0"
                  >
                    <span className="text-xs text-white/30">0{index + 1}</span>
                    <p className="text-2xl text-white md:text-4xl">
                      {principle}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-12 max-w-2xl text-3xl leading-tight text-white/70 md:text-5xl">
                If Visium touches a brand, the visual standard goes up.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Strategy;
