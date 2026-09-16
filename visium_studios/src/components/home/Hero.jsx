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
      className="relative flex min-h-[120svh] items-center overflow-hidden bg-black px-4 py-16 md:min-h-[125vh] md:px-10 md:py-24"
      id="home"
    >
      <motion.div
        className="relative z-20 mx-auto w-full max-w-7xl"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <HeroText />
      </motion.div>
    </section>
  );
}

export default Hero;
