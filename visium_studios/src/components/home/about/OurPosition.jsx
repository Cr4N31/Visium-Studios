import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoMotion from "../../../shared/VideoMotion";

function OurPosition() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.25, 1, 0.25]);

  return (
    <section ref={ref} className="px-0 py-20 sm:px-0 md:px-0 md:py-32">
      <motion.div
        style={{ opacity }}
        data-aos="fade-up"
        className="relative text-left"
      >
        <p className="mb-8 text-xs uppercase tracking-[0.2em] text-white/40">
          Our Position
        </p>

        <div className="font-serif leading-[1.05]">
          <p className="max-w-6xl text-5xl text-white md:text-7xl lg:text-8xl">
            At Visium Studios, raw ideas become credible brands.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default OurPosition;
