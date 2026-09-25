import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/*
 * Explicit, bounded positions for each fragment as % of the
 * container. Because these are percentages (not px/vw), they
 * scale naturally with the container at any screen size —
 * no measurement, no resize listeners, nothing that can
 * overflow or desync on mobile.
 *
 * top/left = center anchor point (translate(-50%,-50%))
 * width    = % of container width
 * stack    = the small offset (in % points) applied once the
 *            fragment joins the stack, giving the folder-tab
 *            "peeking out" look rather than a flat overlap.
 */
const DESKTOP_LAYOUT = [
  {
    top: "22%",
    left: "20%",
    width: "24%",
    stack: { x: -4, y: 10, rotate: -1.4 },
  }, // Logo
  { top: "18%", left: "76%", width: "28%", stack: { x: 4, y: 5, rotate: 1.2 } }, // Website
  {
    top: "66%",
    left: "24%",
    width: "22%",
    stack: { x: -3, y: -4, rotate: -0.8 },
  }, // UI
  {
    top: "70%",
    left: "78%",
    width: "24%",
    stack: { x: 3, y: -9, rotate: 1.6 },
  }, // Image
  { top: "46%", left: "50%", width: "22%", stack: { x: 0, y: 0, rotate: 0 } }, // Typography
];

const MOBILE_LAYOUT = [
  {
    top: "14%",
    left: "32%",
    width: "48%",
    stack: { x: -3, y: 6, rotate: -1.2 },
  }, // Logo
  { top: "30%", left: "70%", width: "50%", stack: { x: 3, y: 3, rotate: 1.1 } }, // Website
  {
    top: "52%",
    left: "28%",
    width: "46%",
    stack: { x: -2, y: -3, rotate: -0.7 },
  }, // UI
  {
    top: "72%",
    left: "66%",
    width: "48%",
    stack: { x: 2, y: -6, rotate: 1.3 },
  }, // Image
  { top: "90%", left: "50%", width: "44%", stack: { x: 0, y: 0, rotate: 0 } }, // Typography
];

function Fragment({ fragment, index, isLast, progress, start, end, layout }) {
  const targetTop = `${50 + layout.stack.y}%`;
  const targetLeft = `${50 + layout.stack.x}%`;

  const top = useTransform(progress, [start, end], [layout.top, targetTop]);
  const left = useTransform(progress, [start, end], [layout.left, targetLeft]);
  const rotate = useTransform(progress, [start, end], [0, layout.stack.rotate]);
  const scale = useTransform(progress, [start, end], [1, 1 - index * 0.02]);

  // Subtle idle breathe on the final piece once fully assembled
  const breatheScale = isLast
    ? useTransform(progress, [end, 0.88, 1], [1 - index * 0.02, 0.985, 1])
    : scale;

  const labelOpacity = useTransform(
    progress,
    [start, start + (end - start) * 0.5, end],
    [1, 0.5, 0],
  );

  const shadowOpacity = useTransform(progress, [start, end], [0, 1]);

  return (
    <motion.li
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        top,
        left,
        width: layout.width,
        rotate,
        scale: isLast ? breatheScale : scale,
        zIndex: index + 1,
      }}
    >
      <motion.p
        className="mb-3 text-xs uppercase tracking-wider md:text-sm"
        style={{ opacity: labelOpacity }}
      >
        <span className="font-semibold">{fragment.name}</span>
      </motion.p>

      <div className="relative overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: shadowOpacity,
            boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          }}
        />
        <img
          src={fragment.img}
          alt={fragment.name}
          className="block w-full h-auto object-cover"
        />
      </div>
    </motion.li>
  );
}

function VisiumApproach() {
  const fragments = [
    {
      id: 1,
      name: "Logo",
      img: "/assets/portfolio_images/Horizona/G - P7.png",
    },
    {
      id: 2,
      name: "Website",
      img: "/assets/portfolio_images/Horizona/Video 02.gif",
    },
    { id: 3, name: "UI", img: "/assets/portfolio_images/Horizona/B - P12.png" },
    {
      id: 4,
      name: "Image",
      img: "/assets/portfolio_images/Horizona/H - P8.png",
    },
    {
      id: 5,
      name: "Typography",
      img: "/assets/portfolio_images/Horizona/C - P3.png",
    },
  ];

  const sectionRef = useRef(null);

  // Only listens for a width breakpoint crossing, not continuous
  // resize — so mobile address-bar show/hide (which changes
  // height, not width) never triggers a re-layout mid-scroll.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  const layoutMap = isMobile ? MOBILE_LAYOUT : DESKTOP_LAYOUT;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const fragmentProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const statementOpacity = useTransform(
    fragmentProgress,
    [0.75, 0.9, 1],
    [0, 0, 1],
  );
  const statementY = useTransform(
    fragmentProgress,
    [0.75, 0.9],
    ["40px", "0px"],
  );

  const stagger = 0.14;
  const duration = 0.24;

  return (
    <section
      ref={sectionRef}
      id="visium-approach"
      className="bg-black px-4 py-24 text-white md:px-12 md:py-32"
    >
      {/* INTRO — UNTOUCHED */}
      <div className="flex flex-col">
        <p>
          <span className="text-xl">The Visium Approach</span>
        </p>
        <h1 className="mb-4">
          <span className="text-4xl font-semibold tracking-[-0.08em] md:text-7xl">
            WE DON'T DESIGN ASSETS. <br />
            WE BUILD SYSTEMS.
          </span>
        </h1>
        <span className="max-w-3xl">
          A brand doesn't live in a logo, a website or a campaign alone. We
          connect identity, digital and motion into a visual system that stays
          recognisable wherever the brand shows up.
        </span>
      </div>

      {/* FRAGMENT AREA */}
      <div className="relative mt-24 h-[400vh] md:h-[600vh]">
        {/*
          pt-24/md:pt-28 keeps every fragment clear of a fixed
          site header — percentages for the children below are
          computed against this padded box, so the safe area is
          respected automatically at every breakpoint.
        */}
        <div className="sticky top-0 h-[100dvh] overflow-hidden pt-24 pb-10 md:pt-28">
          <ul className="relative h-full w-full">
            {fragments.map((fragment, index) => {
              const start = index * stagger;
              const end = start + duration;
              return (
                <Fragment
                  key={fragment.id}
                  fragment={fragment}
                  index={index}
                  isLast={index === fragments.length - 1}
                  progress={fragmentProgress}
                  start={start}
                  end={end}
                  layout={layoutMap[index]}
                />
              );
            })}

            <motion.div
              className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center"
              style={{ opacity: statementOpacity, y: statementY }}
            >
              <div className="text-center">
                <p className="text-xl uppercase tracking-[0.35em] text-white/50">
                  From parts to
                </p>
                <h2 className="mt-3 text-5xl font-semibold tracking-[-0.07em] md:text-8xl">
                  SYSTEM.
                </h2>
              </div>
            </motion.div>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default VisiumApproach;
