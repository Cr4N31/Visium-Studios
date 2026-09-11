import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroText from "./hero/HeroText";

function Hero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center h-screen overflow-hidden bg-white"
      id="home"
    >
      <div className="absolute inset-0 z-[5]" />

      <motion.div
        className="relative z-20 w-full max-w-6xl mx-auto"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <HeroText />
      </motion.div>
    </section>
  );
}

export default Hero;
