import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function OurPosition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 1, 0.25]);

  return (
    <section ref={ref} className="px-0 py-20 sm:px-0 md:px-0 md:py-32">
      <motion.div
        style={{ opacity }}
        data-aos="fade-up"
        className="max-w-4xl text-left"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-8">
          Our Position
        </p>
        <div className="flex flex-col gap-8 font-serif leading-[1.15]">
          <p className="text-4xl md:text-6xl lg:text-7xl text-white">
            At{" "}
            <span className="underline underline-offset-8 decoration-white/30">
              Visium Studios
            </span>
            , we serve as a startup credibility engine. We help early-stage tech
            founders transform raw, scattered concepts into{" "}
            <span className="underline underline-offset-8 decoration-white/30">
              structured, market-ready brands
            </span>
            .
          </p>
          <p className="text-2xl md:text-3xl lg:text-4xl text-white/50 leading-snug">
            By prioritizing strategic, design-first solutions, we establish the
            visual authority and structural readiness that startups need to
            command attention, secure funding, and scale efficiently.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default OurPosition;
