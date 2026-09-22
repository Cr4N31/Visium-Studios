import { useRef, useState, useLayoutEffect, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const philosophy = [
  {
    key: 1,
    phil: "Clarity before style.",
    desc: "Every visual choice has a job.",
    align: "items-start text-left md:items-start",
    offset: "md:mr-auto",
    anchor: "right",
  },
  {
    key: 2,
    phil: "Strategy before pixels.",
    desc: "Direction comes before decoration.",
    align: "items-start text-left md:items-end md:text-right",
    offset: "md:ml-auto",
    anchor: "left",
  },
  {
    key: 3,
    phil: "Systems before assets.",
    desc: "The work has to hold together.",
    align: "items-start text-left md:items-start",
    offset: "md:mr-auto md:ml-[8%]",
    anchor: "right",
  },
  {
    key: 4,
    phil: "Taste before noise.",
    desc: "Credibility is built in the details.",
    align: "items-start text-left md:items-end md:text-right",
    offset: "md:ml-auto md:mr-[6%]",
    anchor: "left",
  },
];

function PhilosophyItem({ item, nodeRef }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 30%"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <motion.li
      ref={ref}
      style={{ opacity, y }}
      className={`relative z-10 flex max-w-xl flex-col gap-2 ${item.align} ${item.offset}`}
    >
      <span className="relative inline-flex items-center justify-center">
        <span className="absolute h-10 w-10 rounded-full bg-white/10 blur-xl" />
        <span className="relative text-[0.7rem] text-white/35 tabular-nums md:text-xs">
          0{item.key}
        </span>
      </span>

      <p
        ref={nodeRef}
        data-anchor={item.anchor}
        className="max-w-[16ch] font-serif text-[2rem] leading-[0.95] tracking-[-0.04em] text-white sm:text-[2.5rem] md:max-w-xl md:text-[2.6rem] lg:text-[3.4rem]"
      >
        {item.phil}
      </p>
      <p className="max-w-[22ch] text-sm leading-snug text-white/50 sm:text-base md:max-w-xl md:text-xl">
        {item.desc}
      </p>
    </motion.li>
  );
}

function buildSmoothPath(points) {
  if (!points.length) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;

  for (let i = 1; i < points.length - 1; i += 1) {
    const current = points[i];
    const next = points[i + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    d += ` Q ${current.x} ${current.y} ${midX} ${midY}`;
  }

  const last = points[points.length - 1];
  d += ` T ${last.x} ${last.y}`;

  return d;
}

function ConstellationNode({ point, progress, arriveAt }) {
  const glow = useTransform(
    progress,
    [Math.max(arriveAt - 0.06, 0), arriveAt, Math.min(arriveAt + 0.12, 1)],
    [0, 1, 0.35],
  );

  return (
    <motion.circle
      cx={point.x}
      cy={point.y}
      r="2.5"
      fill="#fff"
      style={{ opacity: glow }}
    />
  );
}

function ConstellationLines({ containerRef, nodeRefs, progress }) {
  const [points, setPoints] = useState([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const next = nodeRefs.current
      .filter(Boolean)
      .map((node) => {
        const rect = node.getBoundingClientRect();
        const anchor = node.dataset.anchor === "left" ? 0.18 : 0.82;

        return {
          x: rect.left - containerRect.left + rect.width * anchor,
          y: rect.top - containerRect.top + rect.height * 0.58,
        };
      })
      .filter(
        (point) =>
          Number.isFinite(point.x) && Number.isFinite(point.y) && point.x >= 0,
      );

    setPoints(next);
    setSize({ width: containerRect.width, height: containerRect.height });
  }, [containerRef, nodeRefs]);

  useLayoutEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      requestAnimationFrame(measure);
    };

    update();

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);

    window.addEventListener("resize", update);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(update);
    }

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [measure, containerRef]);

  const path = points.length > 1 ? buildSmoothPath(points) : "";
  const pathProgress = useTransform(progress, [0, 1], [0, 1]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 hidden md:block"
      width={size.width}
      height={size.height}
      viewBox={`0 0 ${size.width} ${size.height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      {path ? (
        <motion.path
          d={path}
          fill="none"
          stroke="rgb(0, 0, 0)"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: pathProgress, opacity: 0.98 }}
        />
      ) : null}

      {points.map((point, index) => (
        <ConstellationNode
          key={`${point.x}-${point.y}-${index}`}
          point={point}
          progress={progress}
          arriveAt={Math.max(
            points.length > 1 ? index / (points.length - 1) : 0,
            0,
          )}
        />
      ))}
    </svg>
  );
}

function Philosophy() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 30%"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-0 py-20 sm:px-0 md:px-0 md:py-48"
    >
      <p className="mb-12 px-4 text-left text-[0.7rem] uppercase tracking-[0.2em] text-white/70 md:mb-24 md:pr-[6%] md:text-right">
        Philosophy
      </p>

      <div ref={containerRef} className="relative px-4 sm:px-6 md:px-0">
        <ConstellationLines
          containerRef={containerRef}
          nodeRefs={nodeRefs}
          progress={scrollYProgress}
        />

        <ul className="relative z-10 flex  flex-col gap-12 md:gap-40">
          {philosophy.map((item, i) => (
            <PhilosophyItem
              className="bg-black"
              key={item.key}
              item={item}
              nodeRef={(el) => (nodeRefs.current[i] = el)}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Philosophy;
