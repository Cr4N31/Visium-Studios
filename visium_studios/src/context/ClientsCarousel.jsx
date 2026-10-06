import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import clients from "../data/clients";

const SPEED = 40; // px per second
const CARD_WIDTH = 260;

// Plain strings still work, so the old data shape will not break this
const items = clients.map((c) =>
  typeof c === "string" ? { name: c, caseStudy: c } : c,
);

// Indexed within one copy, so both halves of the loop match and the wrap has no jump
const offsets = [
  "mt-0",
  "mt-14 md:mt-24",
  "mt-4 md:mt-8",
  "mt-20 md:mt-32",
  "mt-8 md:mt-14",
];
const sizes = ["w-56 md:w-80", "w-52 md:w-72", "w-56 md:w-[19rem]"];

function Bubble({ item, i, hidden, onEnter, onLeave }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className={`mr-6 shrink-0 md:mr-10 ${offsets[i % offsets.length]}`}
    >
      <Link
        to={item.slug ? `/work/${item.slug}` : "/work"}
        tabIndex={hidden ? -1 : 0}
        aria-label={`${item.name}, ${item.caseStudy}`}
        onPointerEnter={(e) => onEnter(e, item)}
        onPointerLeave={onLeave}
        className={`group flex aspect-[3/2] items-center justify-center rounded-[50%] border-3 border-white px-8 text-center transition-colors duration-500 ${sizes[i % sizes.length]}`}
      >
        <span className="text-2xl tracking-[-0.03em] text-white/70 transition-colors duration-500 group-hover:text-white md:text-4xl">
          {item.name}
        </span>
      </Link>
    </div>
  );
}

function Marquee({ onActive }) {
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const speed = useRef(1);
  const target = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce || !trackRef.current) return;
    const half = trackRef.current.offsetWidth / 2;
    if (!half) return;

    // Ease toward paused or running instead of snapping
    speed.current += (target.current - speed.current) * 0.08;

    let next = x.get() - SPEED * (Math.min(delta, 64) / 1000) * speed.current;
    if (next <= -half) next += half;
    x.set(next);
  });

  const handleEnter = (e, item) => {
    if (e.pointerType !== "mouse") return;
    target.current = 0;
    onActive(item);
  };

  const handleLeave = () => {
    target.current = 1;
    onActive(null);
  };

  const copies = reduce ? [0] : [0, 1];

  return (
    <div
      className={`${
        reduce ? "overflow-x-auto" : "overflow-hidden"
      } [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]`}
    >
      <motion.div
        ref={trackRef}
        style={{ x: reduce ? 0 : x }}
        className="flex w-max items-start px-8"
      >
        {copies.map((copy) =>
          items.map((item, i) => (
            <Bubble
              key={`${copy}-${i}`}
              item={item}
              i={i}
              hidden={copy === 1}
              onEnter={handleEnter}
              onLeave={handleLeave}
            />
          )),
        )}
      </motion.div>
    </div>
  );
}

// Portal avoids stacking context issues, same pattern as the nav overlay
function CursorCard({ item, x, y }) {
  // Flip to the left of the cursor near the right edge so the card never clips
  const left = useTransform(x, (v) =>
    v > window.innerWidth - (CARD_WIDTH + 32) ? v - CARD_WIDTH - 16 : v + 16,
  );

  return createPortal(
    <motion.div
      aria-hidden="true"
      style={{ x: left, y }}
      className="pointer-events-none fixed left-0 top-0 z-[70]"
    >
      <AnimatePresence>
        {item && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top left", width: CARD_WIDTH }}
            className="mt-4 flex flex-col gap-2 border border-white/20 bg-black p-4"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              Case study
            </p>
            <p className="text-lg leading-tight tracking-[-0.03em] text-white">
              {item.caseStudy}
            </p>
            {item.line && (
              <p className="text-xs leading-relaxed text-white/55">
                {item.line}
              </p>
            )}
            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white underline underline-offset-4">
              Read more
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>,
    document.body,
  );
}

function ClientsCarousel() {
  const [active, setActive] = useState(null);
  const [canHover, setCanHover] = useState(false);

  // Raw pointer position, smoothed by a spring so the card trails slightly
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    setCanHover(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  return (
    <section
      id="aesthetics"
      aria-label="Selected clients"
      onPointerMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      className="overflow-hidden py-16 md:py-24"
    >
      <p className="mb-10 px-8 text-xs uppercase tracking-[0.2em] text-white/40 md:mb-16">
        Selected clients
      </p>

      <Marquee onActive={setActive} />

      {canHover && <CursorCard item={active} x={sx} y={sy} />}
    </section>
  );
}

export default ClientsCarousel;
