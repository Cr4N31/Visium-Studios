import { useRef, useState, useLayoutEffect, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
} from "framer-motion";
import capabilities from "../data/capabilities";

const SPEED = 60;

// Matches Tailwind's `md` breakpoint (768px)
const MOBILE_QUERY = "(max-width: 767px)";

// Fade the left and right edges out, like the reference
const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

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
  const x = useMotionValue(0);
  const directionFactor = useRef(1);
  const isMobile = useRef(false);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  // px/s of scroll -> speed multiplier, clamped so a hard flick can't go wild
  const velocityFactor = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [-6, 0, 6],
  );
  const [isPressed, setIsPressed] = useState(false);
  const [groupWidth, setGroupWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  // Track whether we're on a mobile viewport (kept in a ref, no re-renders)
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => {
      isMobile.current = mq.matches;
      // Reset to the default direction when leaving mobile
      if (!mq.matches) directionFactor.current = 1;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
    if (isPressed || !groupWidth) return;

    let moveBy = directionFactor.current * SPEED * (delta / 1000);

    // Scroll-reactive speed and direction, mobile only
    if (isMobile.current) {
      const vf = velocityFactor.get();
      if (vf < 0) directionFactor.current = -1;
      else if (vf > 0) directionFactor.current = 1;

      moveBy += directionFactor.current * moveBy * vf;
    }

    x.set(wrapX(x.get() - moveBy, groupWidth));
  });

  const handlePan = (_, info) => {
    if (!groupWidth) return;
    x.set(wrapX(x.get() + info.delta.x, groupWidth));
  };

  return (
    <motion.section
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
    </motion.section>
  );
}

export default CapabilitiesMarquee;
