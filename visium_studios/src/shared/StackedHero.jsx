import { useRef, useLayoutEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Wrap a section in this to get the "zoom out and get covered" stack effect.
// `extraScrollVh` controls how much extra scroll distance the zoom-out plays
// over before the next section fully covers it — bigger number = slower,
// more gradual shrink.
function StackedHero({ children, extraScrollVh = 60 }) {
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(null);

  // Measure the content's natural height (unclipped) and keep it in sync
  // if fonts load late, images resize, or the viewport changes.
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => setContentHeight(el.scrollHeight);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 32]);

  // Before the first measurement lands, fall back to a full viewport so
  // there's no layout jump on mount.
  const pinnedHeight = contentHeight ? `${contentHeight}px` : "100vh";

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        height: contentHeight
          ? `calc(${contentHeight}px + ${extraScrollVh}vh)`
          : `calc(100vh + ${extraScrollVh}vh)`,
      }}
    >
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: pinnedHeight }}
      >
        <motion.div
          style={{ scale, opacity, borderRadius }}
          className="w-full overflow-hidden"
        >
          <div ref={measureRef}>{children}</div>
        </motion.div>
      </div>
    </div>
  );
}

export default StackedHero;
