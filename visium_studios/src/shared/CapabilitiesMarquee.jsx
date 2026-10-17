import { useRef, useState, useLayoutEffect } from "react";
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

const SPEED = 40;

function wrapX(value, width) {
  if (!width) return value;
  let v = value % width;
  if (v > 0) v -= width;
  return v;
}

function Card({ item, index, hidden = false }) {
  // Alternate the tilt direction so neighbouring cards fan out differently
  const tilt = index % 2 === 0 ? -2.5 : 2.5;

  return (
    <motion.figure
      className="relative w-[220px] shrink-0 md:w-[300px]"
      style={{
        marginTop: item.offset,
        boxShadow: "0 0 0 0 rgba(0,0,0,0)",
      }}
      whileHover={{
        y: -24,
        scale: 1.05,
        rotate: tilt,
        zIndex: 20,
        boxShadow: "0 28px 40px -14px rgba(0,0,0,0.4)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      <div
        className="overflow-hidden bg-white/10"
        style={{ aspectRatio: item.ratio }}
      >
        <img
          src={item.src}
          alt={hidden ? "" : item.title}
          draggable={false}
          loading="lazy"
          className="pointer-events-none h-full w-full object-cover"
        />
      </div>
    </motion.figure>
  );
}

function CapabilitiesMarquee() {
  const sectionRef = useRef(null);
  const groupRef = useRef(null);
  const x = useMotionValue(0);
  const directionFactor = useRef(1);

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

    const vf = velocityFactor.get();
    if (vf < 0) directionFactor.current = -1;
    else if (vf > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * vf;

    x.set(wrapX(x.get() - moveBy, groupWidth));
  });

  const handlePan = (_, info) => {
    if (!groupWidth) return;
    x.set(wrapX(x.get() + info.delta.x, groupWidth));
  };

  return (
    <motion.section
      ref={sectionRef}
      className="-mt-32 select-none overflow-hidden pb-16 pt-24 touch-pan-y cursor-grab active:cursor-grabbing md:pb-24"
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onPan={handlePan}
    >
      <motion.div className="flex w-max items-start" style={{ x }}>
        {Array.from({ length: copies }, (_, copy) => (
          <div
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            className="flex items-start gap-2.5 pr-2.5"
            aria-hidden={copy > 0 || undefined}
          >
            {capabilities.map((item, i) => (
              <Card key={item.title} item={item} index={i} hidden={copy > 0} />
            ))}
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default CapabilitiesMarquee;
