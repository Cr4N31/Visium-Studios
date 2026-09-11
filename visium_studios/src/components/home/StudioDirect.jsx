import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const team = [
  { name: "Strategy", role: "Positioning, research & direction" },
  { name: "Design", role: "Identity, systems & visual worlds" },
  { name: "Digital", role: "Experiences, interfaces & technology" },
];

function StudioDirect() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.8]);

  return (
    <section
      ref={ref}
      id="studio-direct"
      className="px-4 py-20 sm:px-6 md:px-8 md:py-32"
    >
      <motion.div style={{ opacity }} data-aos="fade-up" className="max-w-5xl">
        <div className="flex flex-col gap-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">
            The studio
          </p>
          <p className="max-w-4xl text-4xl leading-[1.1] text-white md:text-6xl lg:text-7xl">
            Visium is a multidisciplinary visual systems studio building brands,
            digital experiences, and visual worlds for ambitious companies.
          </p>
        </div>

        <div className="mt-24 border-t border-white/20">
          <div className="grid grid-cols-1 gap-10 py-8 md:grid-cols-[minmax(10rem,0.7fr)_1.3fr] md:gap-16">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              The people behind it
            </p>
            <div>
              <p className="max-w-xl text-xl leading-snug text-white/50 md:text-2xl">
                A small, connected team bringing different kinds of attention to
                the same problem. No layers between the thinking and the making.
              </p>
              <ul className="mt-10 flex flex-col border-t border-white/10">
                {team.map((member, index) => (
                  <li
                    key={member.name}
                    className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/10 py-5 md:grid-cols-[2.5rem_minmax(10rem,0.7fr)_1fr] md:items-baseline md:gap-8"
                  >
                    <span className="text-xs text-white/30">0{index + 1}</span>
                    <p className="text-2xl text-white md:text-3xl">
                      {member.name}
                    </p>
                    <p className="text-sm leading-relaxed text-white/45 md:text-base">
                      {member.role}
                    </p>
                  </li>
                ))}
              </ul>

              <a
                href="/studio"
                className="mt-10 inline-flex items-center gap-3 text-xs uppercase border border-black/40 p-2 tracking-[0.18em] text-white transition-opacity hover:opacity-70"
              >
                View more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default StudioDirect;
