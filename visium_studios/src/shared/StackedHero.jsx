import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Wrap a section in this to get the "zoom out and get covered" stack effect.
// `extraScrollVh` controls how much extra scroll distance the zoom-out plays
// over before the next section fully covers it — bigger number = slower,
// more gradual shrink.
function StackedHero({ children, extraScrollVh = 60 }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 32]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `calc(100vh + ${extraScrollVh}vh)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{ scale, opacity, borderRadius }}
          className="h-full w-full overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export default StackedHero;
