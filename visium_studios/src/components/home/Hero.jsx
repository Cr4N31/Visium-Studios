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
      className="relative flex min-h-[100svh] items-center bg-black px-4 py-10 md:min-h-screen md:px-10 md:py-16"
      id="home"
    >
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
