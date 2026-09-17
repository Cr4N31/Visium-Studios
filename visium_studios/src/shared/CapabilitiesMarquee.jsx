import { useRef, useState, useLayoutEffect } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import capabilities from "../data/capabilities";

const SPEED = 40;
function wrapX(value, width) {
  if (!width) return value;
  let v = value % width;
  if (v > 0) v -= width;
  return v;
}

function CapabilitiesMarquee() {
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const [groupWidth, setGroupWidth] = useState(0);

  useLayoutEffect(() => {
    if (!groupRef.current) return;
    const measure = () => setGroupWidth(groupRef.current.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(groupRef.current);
    return () => ro.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (isPaused || !groupWidth) return;
    const next = x.get() - (SPEED * delta) / 1000;
    x.set(wrapX(next, groupWidth));
  });

  const handlePan = (_, info) => {
    if (!groupWidth) return;
    x.set(wrapX(x.get() + info.delta.x, groupWidth));
  };

  return (
    <section
      className="overflow-hidden border-y border-white/10 py-10 md:py-14 select-none touch-none cursor-grab active:cursor-grabbing"
      onPointerDown={() => setIsPaused(true)}
      onPointerUp={() => setIsPaused(false)}
      onPointerLeave={() => setIsPaused(false)}
      onPointerCancel={() => setIsPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="flex w-max items-center"
        style={{ x }}
        onPan={handlePan}
      >
        <div
          ref={groupRef}
          className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16"
        >
          {capabilities.map((item, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-16">
              <span className="whitespace-nowrap font-serif text-xl leading-none text-white/80 md:text-2xl">
                {item}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
            </div>
          ))}
        </div>
        <div
          className="flex items-center gap-10 md:gap-16 pr-10 md:pr-16"
          aria-hidden="true"
        >
          {capabilities.map((item, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-16">
              <span className="whitespace-nowrap font-serif text-xl leading-none text-white/80 md:text-2xl">
                {item}
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default CapabilitiesMarquee;
