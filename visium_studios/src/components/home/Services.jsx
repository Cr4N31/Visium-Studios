import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { serviceList } from "../../data/serviceList";

const EASE = [0.76, 0, 0.24, 1];

// Matches Tailwind's `md` breakpoint (768px)
const MOBILE_QUERY = "(max-width: 767px)";

const rowFadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

const Note = ({ children }) => (
  <span className="max-w-[22ch] shrink-0 font-mono text-[11px] uppercase tracking-wide opacity-70">
    {children}
  </span>
);

/* One row = two stacked copies.
   bottom: white bg, black text (revealed)
   top:    black bg, white text, clip-path closes to the center line on hover */
function Row({
  s,
  index,
  hovered,
  spotlight,
  dimmed,
  reduce,
  onActivate,
  onDeactivate,
  onCenter,
}) {
  const ref = useRef(null);

  // Thin band across the middle of the viewport: the row inside it is "in focus"
  const inCenter = useInView(ref, { margin: "-48% 0px -48% 0px" });

  useEffect(() => {
    if (inCenter) onCenter?.(s.slug);
  }, [inCenter, onCenter, s.slug]);

  const content = (
    <div className="px-5 py-3 md:px-10 md:py-4">
      <div
        className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-1 md:ml-[var(--o)]"
        style={{ "--o": s.offset }}
      >
        {s.noteSide === "left" && <Note>{s.note}</Note>}
        <span className="shrink-0 whitespace-nowrap font-mono uppercase leading-none text-[clamp(2rem,7.5vw,6.5rem)]">
          {s.title}
        </span>
        {s.noteSide === "right" && <Note>{s.note}</Note>}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.5 }}
      variants={rowFadeUp}
      custom={index * 0.08}
    >
      <motion.div
        ref={ref}
        className="relative block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
        initial={false}
        animate={{ opacity: dimmed ? 0.35 : 1 }}
        transition={{ duration: reduce ? 0 : 0.35, ease: "easeOut" }}
        onPointerEnter={(e) => e.pointerType === "mouse" && onActivate(s)}
        onPointerLeave={onDeactivate}
        onFocus={() => onActivate(s)}
        onBlur={onDeactivate}
      >
        <div aria-hidden className="absolute inset-0 bg-white text-black">
          {content}
        </div>

        <motion.div
          className="relative bg-black text-white"
          initial={false}
          animate={{
            clipPath: hovered ? "inset(50% 0% 50% 0%)" : "inset(0% 0% 0% 0%)",
          }}
          transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
        >
          {content}
        </motion.div>

        {/* Mobile: divider line draws in as the row appears */}
        <motion.span
          aria-hidden
          className="absolute inset-x-5 top-0 z-10 h-px origin-left bg-white/20 md:hidden"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        />

        {/* Mobile: accent bar grows on the row that is in focus */}
        <motion.span
          aria-hidden
          className="absolute bottom-2 left-0 top-2 z-10 w-[3px] origin-center bg-white md:hidden"
          initial={false}
          animate={{ scaleY: spotlight ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const reduce = useReducedMotion();
  const isMobile = useIsMobile();
  const [active, setActive] = useState(null);
  const [centered, setCentered] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  return (
    <section
      id="services"
      className="relative bg-black py-8 text-white md:py-12"
      onPointerMove={(e) => {
        x.set(e.clientX - 55);
        y.set(e.clientY - 90);
      }}
    >
      <div className="flex items-start gap-2 md:px-10 px-9 mb-24 md:gap-3">
        <sup className="mt-[0.5em] font-mono text-xs md:text-sm">(03)</sup>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
          Service
        </h2>
      </div>

      <div>
        {serviceList.map((s, index) => (
          <Row
            key={s.slug}
            s={s}
            index={index}
            reduce={reduce}
            hovered={active?.slug === s.slug}
            spotlight={isMobile && centered === s.slug}
            dimmed={isMobile && centered !== null && centered !== s.slug}
            onActivate={setActive}
            onDeactivate={() => setActive(null)}
            onCenter={isMobile ? setCentered : undefined}
          />
        ))}
      </div>

      {/* cursor-following image card (mouse only) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[180px] w-[110px] overflow-hidden rounded-[2px] bg-neutral-800 md:block"
        style={{ x: sx, y: sy }}
        animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
      >
        <AnimatePresence mode="popLayout">
          {active && (
            <motion.img
              key={active.slug}
              src={active.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
