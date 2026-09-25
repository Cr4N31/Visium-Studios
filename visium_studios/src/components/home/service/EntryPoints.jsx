import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function EntryPoints() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.25]);

  return (
    <section ref={ref} className="px-4 md:px-10 py-24 md:py-32">
      <motion.div
        style={{ opacity }}
        data-aos="fade-up"
        className="max-w-4xl text-left"
      >
        <p className="mb-8 text-xs uppercase tracking-[0.2em] text-white/40">
          Entry Points
        </p>
        <div className="flex flex-col gap-8 font-serif leading-[1.15]">
          <p className="text-4xl text-white md:text-6xl lg:text-7xl">
            Projects can begin with a brand, a website, a campaign, or a single
            piece of content. Wherever the work enters, it should lead back to
            one coherent visual system.
          </p>
          <p className="text-2xl leading-snug text-white/50 md:text-3xl lg:text-4xl">
            We build consistency across the brand, so every expression feels
            considered, connected, and ready to grow.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default EntryPoints;
