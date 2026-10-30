import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useInView,
} from "framer-motion";
import { serviceList } from "../../data/serviceList";
import ToolsRing from "../../shared/ToolsRing";
import TextScramble from "../../shared/TextScramble";

const EASE = [0.76, 0, 0.24, 1];

const rowFadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const Note = ({ children, className = "" }) => (
  <span
    className={`max-w-[40ch] shrink-0 font-mono text-[11px] uppercase tracking-wide opacity-70 md:text-xs ${className}`}
  >
    {children}
  </span>
);

function Chevron({ open, reduce }) {
  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className="h-[clamp(1rem,2vw,1.75rem)] w-[clamp(1rem,2vw,1.75rem)] shrink-0 self-start mt-[clamp(0.5rem,1.6vw,1.5rem)]"
      initial={false}
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
    >
      <path d="M5 9l7 7 7-7" />
    </motion.svg>
  );
}

/* One row = two stacked copies.
   bottom: white bg, black text (revealed on hover or when open)
   top:    black bg, white text, clip-path closes to the center line
   When open, the whole row grows to fill the viewport (100svh). */
function Row({
  s,
  index,
  hovered,
  open,
  reduce,
  onActivate,
  onDeactivate,
  onToggle,
}) {
  const ref = useRef(null);
  useInView(ref, { amount: 0.15 });
  const revealed = hovered || open;

  // bring the expanded row to the top of the screen
  useEffect(() => {
    if (!open || !ref.current) return;
    const t = setTimeout(
      () =>
        ref.current?.scrollIntoView({
          behavior: reduce ? "auto" : "smooth",
          block: "start",
        }),
      reduce ? 0 : 120,
    );
    return () => clearTimeout(t);
  }, [open, reduce]);

  const content = (scramble = true) => (
    <div className="flex h-full flex-col px-5 py-3 md:px-10 md:py-4">
      {/* title row */}
      <div
        className="md:ml-[var(--o)]"
        style={{ "--o": open ? "0px" : s.offset || "0px" }}
      >
        <div className="flex min-w-0 flex-wrap items-center gap-x-6 gap-y-1">
          {!open && s.noteSide === "left" && <Note>{s.note}</Note>}

          <div className="flex items-start gap-3 md:gap-5">
            <span className="shrink-0 whitespace-nowrap font-mono uppercase leading-none text-[clamp(2rem,7.5vw,6.5rem)]">
              {scramble ? <TextScramble>{s.title}</TextScramble> : s.title}
            </span>
            <Chevron open={open} reduce={reduce} />
          </div>

          {!open && s.noteSide !== "left" && <Note>{s.note}</Note>}
        </div>

        {/* subtitle sits under the title when expanded */}
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.45, ease: EASE }}
          className="overflow-hidden"
        >
          <Note className="block pt-5">{s.note}</Note>
        </motion.div>
      </div>

      {/* expanded body: fills remaining height, content pinned to bottom */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{
          duration: reduce ? 0 : 0.4,
          ease: EASE,
          delay: open && !reduce ? 0.2 : 0,
        }}
        className={
          open ? "flex flex-1 flex-col justify-end" : "h-0 overflow-hidden"
        }
      >
        <div className="flex flex-col-reverse items-start justify-between gap-8 pb-6 pt-16 md:flex-row md:items-end md:gap-12 md:pb-10">
          <p className="max-w-[56ch] text-base leading-relaxed md:text-lg">
            {s.description}
          </p>

          {s.image && (
            <div className="h-[260px] w-[170px] shrink-0 overflow-hidden rounded-2xl bg-neutral-800 md:h-[360px] md:w-[225px]">
              <img
                src={s.image}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: false, amount: 0.15 }}
      variants={rowFadeUp}
      custom={index * 0.08}
    >
      <motion.div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className="relative flex cursor-pointer flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
        initial={false}
        animate={{ minHeight: open ? "100svh" : "0svh" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        onClick={() => onToggle(s.slug)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(s.slug);
          }
        }}
        onPointerEnter={(e) => e.pointerType === "mouse" && onActivate(s)}
        onPointerLeave={onDeactivate}
        onFocus={() => onActivate(s)}
        onBlur={onDeactivate}
      >
        <div aria-hidden className="absolute inset-0 bg-white text-black">
          {content(false)}
        </div>

        <motion.div
          className="relative flex-1 bg-[#0B0B0B] text-white"
          initial={false}
          animate={{
            clipPath: revealed ? "inset(50% 0% 50% 0%)" : "inset(0% 0% 0% 0%)",
          }}
          transition={{ duration: reduce ? 0 : 0.38, ease: EASE }}
        >
          {content()}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const [openSlug, setOpenSlug] = useState(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  const toggle = (slug) => setOpenSlug((cur) => (cur === slug ? null : slug));

  return (
    <section
      id="services"
      className="relative bg-[#0B0B0B] py-8 text-white md:py-12"
      onPointerMove={(e) => {
        x.set(e.clientX - 55);
        y.set(e.clientY - 90);
      }}
    >
      <div className="mb-24 flex items-start gap-2 px-9 md:gap-3 md:px-10">
        <sup className="mt-[0.5em] font-mono text-xs md:text-sm">(03)</sup>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
          <TextScramble>Service</TextScramble>
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
            open={openSlug === s.slug}
            onToggle={toggle}
            onActivate={setActive}
            onDeactivate={() => setActive(null)}
          />
        ))}
      </div>

      {/* cursor-following image card (hidden while a row is open, since the image is now inline) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[180px] w-[110px] overflow-hidden rounded-[2px] bg-neutral-800 md:block"
        style={{ x: sx, y: sy }}
        animate={{
          opacity: active && openSlug !== active.slug ? 1 : 0,
          scale: active && openSlug !== active.slug ? 1 : 0.85,
        }}
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

      <div>
        <ToolsRing />
      </div>
    </section>
  );
}
