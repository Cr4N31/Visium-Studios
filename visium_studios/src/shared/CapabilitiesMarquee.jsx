import { useRef, useState, useLayoutEffect } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useInView,
} from "framer-motion";
import capabilities from "../data/capabilities";

const SPEED = 60;

// Fade the left and right edges out, like the reference
const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";
const MotionSection = motion.section;

function wrapX(value, width) {
  if (!width) return value;
  let v = value % width;
  if (v > 0) v -= width;
  return v;
}

function Item({ item, hidden = false }) {
  return (
    <div className="flex shrink-0 items-center gap-[0.3em]">
      <span className="whitespace-nowrap">{item.title}</span>
      <img
        src={item.src}
        alt={hidden ? "" : item.title}
        draggable={false}
        loading="lazy"
        className="pointer-events-none aspect-square h-[0.95em] shrink-0 object-cover"
      />
    </div>
  );
}

function CapabilitiesMarquee() {
  const sectionRef = useRef(null);
  const groupRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "100px" });
  const x = useMotionValue(0);
  const [isPressed, setIsPressed] = useState(false);
  const [groupWidth, setGroupWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  useLayoutEffect(() => {
    if (!groupRef.current || !sectionRef.current) return;
    const measure = () => {
      setGroupWidth(groupRef.current.offsetWidth);
      setViewWidth(sectionRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(groupRef.current);
    ro.observe(sectionRef.current);
    return () => ro.disconnect();
  }, []);

  // Enough copies to fill the viewport, plus one extra for the wrap-around
  const copies = groupWidth ? Math.ceil(viewWidth / groupWidth) + 1 : 2;

  useAnimationFrame((_, delta) => {
    if (!isInView || isPressed || !groupWidth) return;

    const frameDelta = Math.min(delta, 32);
    const moveBy = SPEED * (frameDelta / 1000);
    x.set(wrapX(x.get() - moveBy, groupWidth));
  });

  const handlePan = (_, info) => {
    if (!groupWidth) return;
    x.set(wrapX(x.get() + info.delta.x, groupWidth));
  };

  return (
    <MotionSection
      ref={sectionRef}
      className="select-none overflow-hidden py-10 text-5xl font-medium leading-none tracking-tight text-white touch-pan-y cursor-grab active:cursor-grabbing md:py-14 md:text-7xl"
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onPan={handlePan}
    >
      <motion.div className="flex w-max items-center" style={{ x }}>
        {Array.from({ length: copies }, (_, copy) => (
          <div
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            className="flex items-center gap-[0.3em] pr-[0.3em]"
            aria-hidden={copy > 0 || undefined}
          >
            {capabilities.map((item) => (
              <Item key={item.title} item={item} hidden={copy > 0} />
            ))}
          </div>
        ))}
      </motion.div>
    </MotionSection>
  );
}

export default CapabilitiesMarquee;
