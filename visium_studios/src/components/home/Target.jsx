import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function Target() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.25]);

  const audiences = [
    {
      key: "01",
      title: "Early-stage technology founders",
      desc: "Preparing for a platform launch, product rollout, or venture capital round.",
    },
    {
      key: "02",
      title: "Ambitious independent operators",
      desc: "Coaches, educators, and builders creating premium personal brands with room to grow.",
    },
    {
      key: "03",
      title: "Leaders with global intent",
      desc: "Resource-conscious, Nigeria-based founders engineering solutions for rapid global impact.",
    },
  ];

  const problems = [
    "Amateur perception",
    "The strategy gap",
    "The trust deficit",
  ];

  return (
    <section
      ref={ref}
      id="target"
      className="px-4 py-20 sm:px-6 md:px-8 md:py-32"
    >
      <motion.div style={{ opacity }} data-aos="fade-up" className="max-w-5xl">
        <p className="mb-8 text-xs uppercase tracking-[0.2em] text-white/40">
          Market architecture
        </p>
        <div className="flex flex-col gap-8">
          <p className="max-w-4xl  text-4xl leading-[1.1] text-white md:text-6xl lg:text-7xl">
            We do not design for everyone. We design for the moment when a
            serious idea needs to become credible.
          </p>
          <p className="max-w-2xl text-xl leading-snug text-white/50 md:text-2xl">
            Visium works with ambitious founders entering consequential markets,
            where a fragmented visual presence can make a strong business look
            uncertain before it has the chance to prove itself.
          </p>
        </div>

        <div className="mt-24 border-t border-white/20">
          <div className="grid grid-cols-1 gap-10 border-b border-white/20 py-8 md:grid-cols-[minmax(10rem,0.7fr)_1.3fr] md:gap-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              Who we work with
            </p>
            <ul className="flex flex-col">
              {audiences.map((audience) => (
                <li
                  key={audience.key}
                  className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-5 last:border-b-0 last:pb-0 first:pt-0"
                >
                  <span className="text-xs text-white/30">{audience.key}</span>
                  <div>
                    <p className="text-2xl text-white md:text-3xl">
                      {audience.title}
                    </p>
                    <p className="mt-2 max-w-xl text-base leading-relaxed text-white/50">
                      {audience.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-10 py-8 md:grid-cols-[minmax(10rem,0.7fr)_1.3fr] md:gap-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              What gets in the way
            </p>
            <div>
              <p className="max-w-xl text-xl leading-snug text-white/70 md:text-2xl">
                Good businesses are often held back by a visual infrastructure
                that cannot carry the weight of their ambition.
              </p>
              <ul className="mt-8 flex flex-col">
                {problems.map((problem, index) => (
                  <li
                    key={problem}
                    className="flex items-center gap-4 border-b border-white/10 py-4 text-lg text-white/80 last:border-b-0"
                  >
                    <span className="text-xs text-white/30">0{index + 1}</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Target;
