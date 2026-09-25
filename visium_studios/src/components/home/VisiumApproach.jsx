import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import projects from "../../data/projects";

const RADIUS = "rounded-[4px]";
const COLUMNS = 4;
const GUTTER = 1.4;
const SLIDE_INTERVAL = 4200;
const TYPE_LABELS = ["IDENTITY", "GRID", "MOTION"];

const principles = [
  {
    n: "01",
    title: "THINK IN SYSTEMS",
    body: "Every touchpoint should feel like part of the same brand, not a collection of disconnected decisions.",
  },
  {
    n: "02",
    title: "DESIGN WITH INTENTION",
    body: "Every element has a role. We remove what doesn't contribute and refine what does.",
  },
  {
    n: "03",
    title: "BUILD TO MOVE",
    body: "Brands evolve. Their visual systems should be built to adapt across platforms, products and new stages of growth.",
  },
];

function isPlaceholder(src) {
  return typeof src === "string" && src.startsWith("/placeholders/");
}

function buildMediaPool() {
  const pool = projects.flatMap((project) =>
    [
      project.thumbnail,
      project.coverImage,
      project.heroMedia,
      ...(project.gallery ?? []),
      ...(project.src ?? []),
    ]
      .filter((src) => Boolean(src) && !isPlaceholder(src))
      .map((src) => ({ src, alt: project.title ?? "" })),
  );
  const seen = new Set();
  return pool.filter((item) =>
    seen.has(item.src) ? false : seen.add(item.src),
  );
}

const media = buildMediaPool();

function buildFragments() {
  const total = 16;
  const typeSlots = new Set([2, 6, 10]);
  let typeCursor = 0;
  const items = [];
  for (let i = 0; i < total; i += 1) {
    if (typeSlots.has(i)) {
      items.push({
        id: `type-${typeCursor}`,
        kind: "type",
        label: TYPE_LABELS[typeCursor],
      });
      typeCursor += 1;
    } else {
      items.push({
        id: `photo-${i}`,
        kind: "photo",
        start: (i * 5) % Math.max(media.length, 1),
      });
    }
  }
  return items;
}

function layoutMasonry(items) {
  const colHeights = Array(COLUMNS).fill(0);
  const placed = items.map((item, i) => {
    const col = colHeights.indexOf(Math.min(...colHeights));
    const height = item.kind === "type" ? 13 : 15 + ((i * 11) % 4) * 4;
    const top = colHeights[col];
    colHeights[col] += height + GUTTER;
    return { ...item, col, rawTop: top, rawHeight: height };
  });
  const scale = 100 / Math.max(...colHeights);
  return placed.map((item) => ({
    ...item,
    aligned: {
      top: `${(item.rawTop * scale).toFixed(2)}%`,
      left: `${((item.col * 100) / COLUMNS).toFixed(2)}%`,
      w: `${(100 / COLUMNS - GUTTER).toFixed(2)}%`,
      h: `${(item.rawHeight * scale).toFixed(2)}%`,
    },
  }));
}

function scatterFor(item, i) {
  const dx = ((i * 47) % 60) - 30;
  const dy = ((i * 83) % 50) - 10;
  const rotate = ((i * 29) % 20) - 10;
  const top = Math.max(-6, Math.min(96, parseFloat(item.aligned.top) + dy));
  const left = Math.max(-8, Math.min(96, parseFloat(item.aligned.left) + dx));
  return {
    top: `${top}%`,
    left: `${left}%`,
    w: item.aligned.w,
    h: item.aligned.h,
    rotate,
  };
}

const fragments = layoutMasonry(buildFragments()).map((item, i) => ({
  ...item,
  scattered: scatterFor(item, i),
}));

function Slideshow({ start }) {
  const [index, setIndex] = useState(start);

  useEffect(() => {
    if (media.length === 0) return undefined;
    const id = setInterval(
      () => setIndex((v) => (v + 1) % media.length),
      SLIDE_INTERVAL,
    );
    return () => clearInterval(id);
  }, []);

  const current = media[index % Math.max(media.length, 1)];
  if (!current) return null;

  return (
    <div className={`relative h-full w-full overflow-hidden ${RADIUS}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current.src}
          src={current.src}
          alt={current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 h-full w-full object-cover grayscale-[10%] contrast-[1.05]"
        />
      </AnimatePresence>
    </div>
  );
}

function TypeBlock({ label }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-start overflow-hidden ${RADIUS} bg-black px-[6%]`}
    >
      <span className="text-[clamp(1.25rem,3.4vw,2.6rem)] font-medium tracking-[-0.04em] leading-[0.9] text-white">
        {label}
      </span>
    </div>
  );
}

function Statement() {
  return (
    <>
      <p className="text-3xl text-black tracking-[-0.07em] md:text-5xl">
        WE DON&apos;T DESIGN ASSETS.
        <br /> WE BUILD SYSTEMS.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 md:gap-8">
        {principles.map((p) => (
          <div key={p.n}>
            <span className="block text-xs tracking-[0.08em] text-black/40">
              {p.n}
            </span>
            <p className="mt-2 text-sm font-medium tracking-[-0.02em] text-black md:text-base">
              {p.title}
            </p>
            <p className="mt-2 text-sm text-black/70">{p.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function Fragment({ data, progress }) {
  const { scattered, aligned, kind, label, start } = data;
  const top = useTransform(progress, [0.08, 0.5], [scattered.top, aligned.top]);
  const left = useTransform(
    progress,
    [0.08, 0.5],
    [scattered.left, aligned.left],
  );
  const width = useTransform(progress, [0.08, 0.5], [scattered.w, aligned.w]);
  const height = useTransform(progress, [0.08, 0.5], [scattered.h, aligned.h]);
  const rotate = useTransform(progress, [0.08, 0.5], [scattered.rotate, 0]);

  return (
    <motion.div
      className="absolute"
      style={{ top, left, width, height, rotate }}
    >
      {kind === "photo" ? (
        <Slideshow start={start} />
      ) : (
        <TypeBlock label={label} />
      )}
    </motion.div>
  );
}

function VisiumApproach() {
  const trackRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const fragmentsLabel = useTransform(
    scrollYProgress,
    [0, 0.12, 0.22],
    [1, 1, 0],
  );
  const alignmentLabel = useTransform(
    scrollYProgress,
    [0.18, 0.3, 0.42, 0.5],
    [0, 1, 1, 0],
  );
  const systemLabel = useTransform(scrollYProgress, [0.42, 0.55, 1], [0, 1, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0.28, 0.5], [0, 1]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.62], [24, 0]);

  const columns = [25, 50, 75];
  const rows = [20, 40, 60, 80];

  if (prefersReducedMotion) {
    return (
      <section
        id="visium-approach"
        className="relative bg-black px-4 py-24 text-white md:px-10 md:py-32"
      >
        <span className="mb-10 block text-xs tracking-[0.08em] text-black/50">
          THE VISIUM APPROACH
        </span>
        <div className="relative mx-auto aspect-[4/3] w-full max-w-5xl">
          {fragments.map((f) => (
            <div
              key={f.id}
              className="absolute"
              style={{
                top: f.aligned.top,
                left: f.aligned.left,
                width: f.aligned.w,
                height: f.aligned.h,
              }}
            >
              {f.kind === "photo" ? (
                <Slideshow start={f.start} />
              ) : (
                <TypeBlock label={f.label} />
              )}
            </div>
          ))}
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <Statement />
        </div>
      </section>
    );
  }

  return (
    <section
      id="visium-approach"
      ref={trackRef}
      className="relative h-[420vh] bg-black text-white"
    >
      <motion.div className="px-4 md:px-10 py-24 md:py-32">
        <span className="relative text-xs tracking-[0.08em] text-black/80">
          THE VISIUM APPROACH
        </span>
        <Statement />
      </motion.div>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 mx-[4%] my-[10%] md:mx-[8%] md:my-[8%]">
          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ opacity: gridOpacity }}
          >
            {columns.map((c) => (
              <span
                key={c}
                className="absolute top-0 h-full w-px bg-black/10"
                style={{ left: `${c}%` }}
              />
            ))}
            {rows.map((r) => (
              <span
                key={r}
                className="absolute left-0 w-full h-px bg-black/10"
                style={{ top: `${r}%` }}
              />
            ))}
          </motion.div>

          {fragments.map((f) => (
            <Fragment key={f.id} data={f} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default VisiumApproach;
