import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useReducedMotion,
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

/* Zigzag, measured from the reference (container width = 100%).
   Each closed row is a box that hugs its content (w-fit) and is pushed
   in from the left by `ml`. "auto" pins the box to the right edge.
   `note` is which side of the title the small caption sits on. */
const LAYOUT = [
  { ml: "0%", note: "right" },
  { ml: "5%", note: "left" },
  { ml: "auto", note: "left" },
  { ml: "4.6%", note: "left" },
  { ml: "0%", note: "right" },
  { ml: "12.8%", note: "left" },
];

const Note = ({ children, className = "" }) => (
  <span
    className={`shrink-0 font-mono text-[11px] uppercase tracking-wide md:text-[13px] ${className}`}
  >
    {children}
  </span>
);

/* One row = a box with two stacked copies of the same content.
   top:    your rest colors (dark box, white text). Its clip-path closes
           to the center line on hover / open, wiping to the layer below.
   bottom: your hover colors (white box, black text).
   Closed: box hugs its content and sits at its zigzag offset.
   Open:   box grows to the full width and height fits the content.
   There is no arrow in the reference, so none is rendered. */
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
  const L = LAYOUT[index % LAYOUT.length];
  const noteLeft = L.note === "left";
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

  const layoutTransition = { duration: reduce ? 0 : 0.6, ease: EASE };

  const content = (scramble = true) => (
    <motion.div
      layout="position"
      transition={layoutTransition}
      className="px-5 py-6 md:px-12 md:py-9"
    >
      <div
        className={
          open
            ? "flex flex-col"
            : "flex flex-col gap-2 md:flex-row md:items-center md:gap-12"
        }
      >
        <span className="shrink-0 whitespace-nowrap font-mono uppercase leading-none text-[clamp(2rem,6.2vw,5.5rem)]">
          {scramble ? <TextScramble>{s.title}</TextScramble> : s.title}
        </span>

        {/* closed: caption beside the title, left or right (zigzag) */}
        {!open && (
          <Note className={noteLeft ? "md:order-first" : ""}>{s.note}</Note>
        )}
      </div>

      {/* open: caption under the title, then the description */}
      {open && (
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.25 }}
        >
          <Note className="block pt-7">{s.note}</Note>
          <p className="max-w-[56ch] pb-2 pt-10 text-base leading-relaxed md:text-lg">
            {s.description}
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <motion.div
      layout
      transition={layoutTransition}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: false, amount: 0.15 }}
      variants={rowFadeUp}
      custom={index * 0.08}
      className="pb-0.5"
    >
      <motion.div
        ref={ref}
        layout
        transition={layoutTransition}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        style={{
          "--ml": open ? "0%" : L.ml,
          borderRadius: 8,
        }}
        className={`relative scroll-mt-24 cursor-pointer overflow-hidden  md:ml-[var(--ml)] ${
          open ? "w-full" : "w-full md:w-fit"
        }`}
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
        {/* revealed layer: your hover colors */}
        <motion.div
          layout
          transition={layoutTransition}
          aria-hidden
          className="absolute inset-0 bg-white text-black"
        >
          {content(false)}
        </motion.div>

        {/* rest layer: your rest colors, wipes to the center line */}
        <motion.div
          layout
          className="relative bg-[#0B0B0B] text-white"
          initial={false}
          animate={{
            clipPath: revealed ? "inset(50% 0% 50% 0%)" : "inset(0% 0% 0% 0%)",
          }}
          transition={{
            layout: layoutTransition,
            clipPath: { duration: reduce ? 0 : 0.38, ease: EASE },
          }}
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
  const [openSlugs, setOpenSlugs] = useState([]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  const toggle = (slug) =>
    setOpenSlugs((cur) =>
      cur.includes(slug) ? cur.filter((x) => x !== slug) : [...cur, slug],
    );

  return (
    <section
      id="services"
      className="relative bg-[#0B0B0B] py-8 text-white md:py-12"
      onPointerMove={(e) => {
        // card sits just right of the cursor, vertically centered on it
        x.set(e.clientX + 28);
        y.set(e.clientY - 137);
      }}
    >
      <div className="mb-24 flex items-start gap-2 px-8 md:gap-3 md:px-10">
        <sup className="mt-[0.5em] font-mono text-xs md:text-sm">(02)</sup>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
          <TextScramble>Service</TextScramble>
        </h2>
      </div>

      <LayoutGroup>
        <div className="px-5 md:px-10">
          {serviceList.map((s, index) => (
            <Row
              key={s.slug}
              s={s}
              index={index}
              reduce={reduce}
              hovered={active?.slug === s.slug}
              open={openSlugs.includes(s.slug)}
              onToggle={toggle}
              onActivate={setActive}
              onDeactivate={() => setActive(null)}
            />
          ))}
        </div>
      </LayoutGroup>

      {/* cursor-following image card: stays visible over open rows too */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-50 hidden h-[275px] w-[170px] overflow-hidden rounded-xl bg-neutral-800 md:block"
        style={{ x: sx, y: sy }}
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.85,
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
