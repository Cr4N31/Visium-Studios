import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  motion as Motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const steps = [
  {
    id: 1,
    name: "Discover",
    duration: "3-5 days",
    desc: "We align on goals, audience, and constraints. We review analytics and current assets, run stakeholder interviews, and map risks and assumptions. The outcome is shared clarity on what success looks like.",
  },
  {
    id: 2,
    name: "Define",
    duration: "3-5 days",
    desc: "We translate goals into scope, timeline, and KPIs. We draft the roadmap, responsibilities, and the measurement plan so every step is testable. Trade-offs are explicit and documented.",
  },
  {
    id: 3,
    name: "Design",
    duration: "1-3 weeks",
    desc: "We explore concepts, then systematize into a modular UI and brand toolkit. Content structure, accessibility, and motion are specified so the build phase is predictable. Iterations are time-boxed with weekly reviews.",
  },
  {
    id: 4,
    name: "Build",
    duration: "1-4 weeks",
    desc: "We implement production-ready components, CMS schemas, and integrations. Performance budgets guide choices; QA runs continuously across devices. Analytics and events are instrumented from day one.",
  },
  {
    id: 5,
    name: "Launch",
    duration: "3-5 days",
    desc: "We ship behind a checklist: QA, Core Web Vitals, redirects, tracking, and security. We monitor the first 72 hours and fix issues fast. Your team gets a short handover and edit training.",
  },
  {
    id: 6,
    name: "Improve",
    duration: "Ongoing",
    desc: "We run experiments against KPIs and maintain in focused sprints. Insights feed the backlog; releases are small and frequent to keep momentum.",
  },
];

/* ---------- tuning knobs ---------- */
const HEAD = 0.65; // where the "pencil tip" sits in the viewport (0 top, 1 bottom)
const SAMPLE = 6; // px between points on the hand-drawn path
const MAIN_WIDTH = 1.3; // main graphite stroke
const GHOST_WIDTH = 0.7; // faint second pass
const WOBBLE_MAIN = 1.5; // px of hand wobble
const WOBBLE_GHOST = 2.2;

/* Paper grain: a tiny noise bitmap used as a mask, rasterised once, so it costs
   almost nothing while scrolling. It breaks the line up like graphite on paper. */
const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 3.5 0 0 0 -0.85'/></filter><rect width='220' height='220' filter='url(#g)'/></svg>`;
const GRAIN = `url("data:image/svg+xml,${encodeURIComponent(GRAIN_SVG)}")`;

const ease = (v) => v * v * (3 - 2 * v);

/* ---------- hand-drawn path helpers ---------- */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cubic(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x:
      u * u * u * p0.x +
      3 * u * u * t * p1.x +
      3 * u * t * t * p2.x +
      t * t * t * p3.x,
    y:
      u * u * u * p0.y +
      3 * u * u * t * p1.y +
      3 * u * t * t * p2.y +
      t * t * t * p3.y,
  };
}

// Big sweeping arc from S out to outerX and back down onto E, with hand wobble
function pencilPath(S, E, outerX, seed, amp) {
  const rand = rng(seed);
  const dy = E.y - S.y;
  const A = { x: outerX, y: S.y + dy * 0.52 };
  const c1 = {
    x: S.x + (outerX - S.x) * 0.55,
    y: S.y - Math.min(18, dy * 0.05),
  };
  const c2 = { x: outerX, y: A.y - dy * 0.26 };
  const c3 = { x: outerX, y: A.y + dy * 0.26 };
  const c4 = { x: E.x + (outerX - E.x) * 0.38, y: E.y - dy * 0.22 };

  const raw = [];
  for (let k = 0; k <= 48; k++) raw.push(cubic(S, c1, c2, A, k / 48));
  for (let k = 1; k <= 48; k++) raw.push(cubic(A, c3, c4, E, k / 48));

  const cum = [0];
  for (let k = 1; k < raw.length; k++) {
    cum.push(
      cum[k - 1] + Math.hypot(raw[k].x - raw[k - 1].x, raw[k].y - raw[k - 1].y),
    );
  }
  const L = cum[cum.length - 1];

  const w1 = (Math.PI * 2) / (170 + rand() * 70);
  const w2 = (Math.PI * 2) / (46 + rand() * 22);
  const p1 = rand() * 6.28;
  const p2 = rand() * 6.28;

  const count = Math.max(10, Math.round(L / SAMPLE));
  let j = 0;
  let d = "";
  for (let k = 0; k <= count; k++) {
    const s = (L * k) / count;
    while (j < cum.length - 2 && cum[j + 1] < s) j++;
    const len = cum[j + 1] - cum[j] || 1;
    const f = (s - cum[j]) / len;
    const a = raw[j];
    const b = raw[j + 1];
    const x = a.x + (b.x - a.x) * f;
    const y = a.y + (b.y - a.y) * f;
    const tx = (b.x - a.x) / len;
    const ty = (b.y - a.y) / len;
    const env = Math.min(1, s / 40, (L - s) / 40); // keep both ends pinned
    const off =
      amp * env * (0.62 * Math.sin(s * w1 + p1) + 0.38 * Math.sin(s * w2 + p2));
    d += `${k === 0 ? "M" : "L"}${(x - ty * off).toFixed(1)} ${(y + tx * off).toFixed(1)} `;
  }
  return d.trim();
}

/* ---------- one drawn stroke (two graphite passes) ---------- */
function PencilSegment({ seg, headY }) {
  const t = useTransform(headY, [seg.startY, seg.endY], [0, 1], {
    clamp: true,
  });
  const main = useTransform(t, ease);
  const lag = useTransform(t, (v) => ease(Math.max(0, (v - 0.05) / 0.95)));
  // round caps leave a dot at length 0, so hide the stroke until it has started
  const visible = useTransform(t, (v) => (v > 0.002 ? 1 : 0));

  return (
    <Motion.g
      style={{ opacity: visible }}
      fill="none"
      stroke="#f5f5f5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Motion.path
        d={seg.d2}
        style={{ pathLength: lag }}
        strokeWidth={GHOST_WIDTH}
        strokeOpacity={0.5}
      />
      <Motion.path
        d={seg.d1}
        style={{ pathLength: main }}
        strokeWidth={MAIN_WIDTH}
        strokeOpacity={0.9}
      />
    </Motion.g>
  );
}

/* ---------- component ---------- */
function HowWeWork() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const buttonRef = useRef(null);
  const headingRefs = useRef([]);
  const geoRef = useRef(null);
  const versionRef = useRef(0);

  const [geo, setGeo] = useState(null);
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(false);

  const { scrollY } = useScroll();
  const headRaw = useMotionValue(-1);
  const headY = useSpring(headRaw, { stiffness: 110, damping: 26, mass: 0.6 });

  // pencil tip position in wrapper coordinates
  const update = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    headRaw.set(
      reduce ? 1e7 : window.innerHeight * HEAD - el.getBoundingClientRect().top,
    );
  }, [headRaw, reduce]);
  useMotionValueEvent(scrollY, "change", update);

  // which card is glowing, and whether the line has reached the button
  const sync = useCallback((y) => {
    const g = geoRef.current;
    if (!g) return;
    const last = g.segs.length - 1;
    let next = -1;
    for (let i = 0; i < g.segs.length; i++) {
      const arrive = i === 0 ? g.segs[0].startY : g.segs[i - 1].endY;
      const leave =
        g.segs[i].startY + (g.segs[i].endY - g.segs[i].startY) * 0.4;
      if (y >= arrive && y < leave) {
        next = i;
        break;
      }
    }
    setActive(next);
    setDone(y >= g.segs[last].endY);
  }, []);
  useMotionValueEvent(headY, "change", sync);

  // measure headings and build the paths (runs on mount, resize, font load)
  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const wr = wrap.getBoundingClientRect();
      const W = wr.width;
      const rel = (el) => {
        const r = el.getBoundingClientRect();
        return {
          left: r.left - wr.left,
          right: r.right - wr.left,
          top: r.top - wr.top,
          width: r.width,
          height: r.height,
        };
      };
      const heads = headingRefs.current.map(rel);
      const btn = rel(buttonRef.current);

      const segs = steps.map((step, i) => {
        const h = heads[i];
        const goesLeft = step.id % 2 === 0; // right-aligned heading starts on its left edge
        const gap = Math.max(10, h.height * 0.2);
        const S = {
          x: goesLeft ? h.left - gap : h.right + gap,
          y: h.top + h.height * (0.5 + 0.2 * (((i * 37) % 10) / 10)),
        };

        let E;
        if (i === steps.length - 1) {
          E = { x: btn.left + btn.width * 0.46, y: btn.top - 2 };
        } else {
          const n = heads[i + 1];
          const nRight = steps[i + 1].id % 2 === 0;
          let ex = nRight
            ? n.left + n.width * 0.3
            : n.left + Math.max(n.width * 0.3, 90);
          ex = Math.min(ex, n.right - 12);
          E = { x: ex, y: n.top - 8 };
        }

        const outerX = goesLeft
          ? Math.max(4, Math.min(W * 0.05, Math.min(S.x, E.x) - 36))
          : Math.min(W - 4, Math.max(W * 0.93, Math.max(S.x, E.x) + 36));

        return {
          startY: S.y,
          endY: E.y,
          d1: pencilPath(S, E, outerX, 11 + i * 17, WOBBLE_MAIN),
          d2: pencilPath(S, E, outerX, 97 + i * 31, WOBBLE_GHOST),
        };
      });

      versionRef.current += 1;
      const next = { W, H: wr.height, segs, version: versionRef.current };
      geoRef.current = next;
      setGeo(next);
      update();
      sync(headY.get());
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    headingRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [update, sync, headY]);

  return (
    <section className="bg-neutral-900 px-6 py-10 text-white">
      <div
        ref={wrapRef}
        className="relative mx-auto flex max-w-5xl flex-col gap-16 md:gap-24"
      >
        {/* pencil line sits behind the cards */}
        {geo && (
          <svg
            aria-hidden="true"
            width={geo.W}
            height={geo.H}
            viewBox={`0 0 ${geo.W} ${geo.H}`}
            className="pointer-events-none absolute left-0 top-0 z-0"
            style={{
              WebkitMaskImage: GRAIN,
              maskImage: GRAIN,
              WebkitMaskSize: "220px 220px",
              maskSize: "220px 220px",
            }}
          >
            {geo.segs.map((seg, i) => (
              <PencilSegment
                key={`${geo.version}-${i}`}
                seg={seg}
                headY={headY}
              />
            ))}
          </svg>
        )}

        {steps.map((step, i) => {
          const isRight = step.id % 2 === 0;
          const lit = active === i;
          return (
            <article
              key={step.id}
              className={`relative isolate z-10 flex w-fit max-w-full flex-col gap-3 ${
                isRight
                  ? "items-end self-end text-right"
                  : "items-start self-start text-left"
              }`}
            >
              {/* glow that pulses when the line arrives, then fades as it leaves */}
              <Motion.span
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={
                  lit ? { opacity: [0, 1, 0.45, 0.9, 0.5] } : { opacity: 0 }
                }
                transition={
                  lit
                    ? {
                        duration: 1.8,
                        times: [0, 0.25, 0.5, 0.75, 1],
                        ease: "easeInOut",
                      }
                    : { duration: 1.1, ease: "easeOut" }
                }
                className="pointer-events-none absolute -inset-4 -z-10 rounded-2xl md:-inset-6"
                style={{
                  boxShadow:
                    "0 0 48px 4px rgba(255,255,255,0.14), inset 0 0 32px rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.14)",
                }}
              />

              <span className="font-mono text-[10px] tracking-widest">
                [{String(step.id).padStart(3, "0")}]
              </span>

              <Motion.h2
                ref={(el) => {
                  headingRefs.current[i] = el;
                }}
                animate={{
                  textShadow: lit
                    ? "0 0 22px rgba(255,255,255,0.35)"
                    : "0 0 0px rgba(255,255,255,0)",
                }}
                transition={{ duration: 1 }}
                className="font-mono text-4xl font-bold uppercase leading-none md:text-7xl"
              >
                {step.name}
              </Motion.h2>

              <p className="max-w-[16rem] text-[10px] leading-relaxed text-neutral-300 md:max-w-md md:text-sm">
                {step.desc}
              </p>

              <span className="font-mono text-[10px] font-bold uppercase tracking-widest md:text-xs">
                {step.duration}
              </span>
            </article>
          );
        })}

        {/* contact bar: inverts when the line lands on it */}
        <a
          ref={buttonRef}
          href="/contact"
          className={`relative z-10 mt-4 flex h-12 items-center justify-center rounded-md font-mono text-[10px] font-bold uppercase tracking-widest transition-colors duration-500 md:h-16 md:text-sm ${
            done ? "bg-white text-black" : "bg-black text-white"
          }`}
        >
          Contact Manager
        </a>
      </div>
    </section>
  );
}

export default HowWeWork;
