import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";

/* =====================================================================
   SECTION 1 — SCROLL-SCRUBBED CANVAS FRAME SEQUENCE
===================================================================== */

const FRAME_COUNT = 90;

const FRAME_PATH = (i) => `/sequence/frame_${String(i).padStart(3, "0")}.jpg`;

function useFrameSequence(frameCount, pathFn) {
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const images = new Array(frameCount);
    imagesRef.current = images;

    let loaded = 0;

    for (let i = 0; i < frameCount; i += 1) {
      const img = new Image();

      img.decoding = "async";

      img.onload = () => {
        if (cancelled) return;

        loaded += 1;
        setLoadedCount(loaded);
      };

      img.src = pathFn(i);
      images[i] = img;
    }

    return () => {
      cancelled = true;
    };
  }, [frameCount, pathFn]);

  return {
    imagesRef,
    loadedCount,
    isReady: loadedCount >= frameCount,
  };
}

function VisiumApproach() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { imagesRef, isReady, loadedCount } = useFrameSequence(
    FRAME_COUNT,
    FRAME_PATH,
  );

  /* ---------------------------------------------------------------
     MOBILE DETECTION
  ---------------------------------------------------------------- */

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");

    setIsMobile(mql.matches);

    const handler = (event) => {
      setIsMobile(event.matches);
    };

    mql.addEventListener("change", handler);

    return () => {
      mql.removeEventListener("change", handler);
    };
  }, []);

  /* ---------------------------------------------------------------
     SCROLL PROGRESS
  ---------------------------------------------------------------- */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ---------------------------------------------------------------
     DRAW FRAME
  ---------------------------------------------------------------- */

  const drawFrame = useCallback(
    (index) => {
      const canvas = canvasRef.current;
      const img = imagesRef.current[index];

      if (!canvas || !img || !img.complete || img.naturalWidth === 0) {
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;

      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      /*
        Mobile:
        Show the complete frame.

        Desktop:
        Keep the original cover behavior.
      */

      const scale = isMobile
        ? Math.min(cw / iw, ch / ih)
        : Math.max(cw / iw, ch / ih);

      const dw = iw * scale;
      const dh = ih * scale;

      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, cw, ch);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [imagesRef, isMobile],
  );

  /* ---------------------------------------------------------------
     FRAME PROGRESS
  ---------------------------------------------------------------- */

  const currentIndexRef = useRef(-1);

  const frameProgress = useMotionValue(0);

  const renderAtProgress = useCallback(
    (progress) => {
      const clamped = Math.min(Math.max(progress, 0), 1);

      const index = Math.round(clamped * (FRAME_COUNT - 1));

      frameProgress.set(index);

      if (index !== currentIndexRef.current) {
        currentIndexRef.current = index;
        drawFrame(index);
      }
    },
    [drawFrame, frameProgress],
  );

  /* ---------------------------------------------------------------
     CANVAS RESIZE
  ---------------------------------------------------------------- */

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const rect = canvas.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      currentIndexRef.current = -1;

      renderAtProgress(scrollYProgress.get());
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [renderAtProgress, scrollYProgress]);

  /* ---------------------------------------------------------------
     INITIAL FRAME
  ---------------------------------------------------------------- */

  useEffect(() => {
    if (!isReady) return;

    currentIndexRef.current = -1;

    renderAtProgress(scrollYProgress.get());
  }, [isReady, renderAtProgress, scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isReady) return;

    renderAtProgress(latest);
  });

  /* ---------------------------------------------------------------
     OVERLAY ANIMATIONS
  ---------------------------------------------------------------- */

  const statementOpacity = useTransform(
    scrollYProgress,
    [0.88, 0.97, 1],
    [0, 0, 1],
  );

  const statementY = useTransform(
    scrollYProgress,
    [0.88, 0.97],
    ["40px", "0px"],
  );

  const partsOpacity = useTransform(
    frameProgress,
    [18, 20, 24, 35],
    [0, 1, 0.5, 0],
  );

  const partsY = useTransform(
    frameProgress,
    [18, 20, 24],
    ["20px", "0px", "0px"],
  );

  const partsScale = useTransform(frameProgress, [18, 20], [0.96, 1]);

  return (
    <section
      ref={sectionRef}
      id="visium-approach"
      className="bg-black text-white"
    >
      {/* ==========================================================
          INTRO
      ========================================================== */}

      <div className="flex flex-col px-4 py-24 md:px-12 md:py-32">
        <p>
          <span className="text-xl">The Visium Approach</span>
        </p>

        <h1 className="mb-4">
          <span className="block max-w-5xl text-4xl font-semibold leading-[0.95] tracking-[-0.08em] md:text-7xl">
            WE DON'T DESIGN ASSETS. <br />
            WE BUILD SYSTEMS.
          </span>
        </h1>

        <span className="block max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
          A brand doesn't live in a logo, a website or a campaign alone. We
          connect identity, digital and motion into a visual system that stays
          recognisable wherever the brand shows up.
        </span>
      </div>

      {/* ==========================================================
          SCROLL SEQUENCE

          IMPORTANT:
          No overflow property here.

          This container is what gives sticky its 300vh/400vh
          scrolling range.
      ========================================================== */}

      <div
        className={`
          relative w-full
          ${isMobile ? "h-[300vh]" : "h-[400vh]"}
        `}
      >
        {/* ========================================================
            STICKY VIEWPORT

            This stays locked to the viewport while the parent
            container is being scrolled.
        ========================================================= */}

        <div
          className="
            sticky
            top-0
            z-0
            h-[100dvh]
            w-full
            overflow-hidden
            bg-black
          "
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 block h-full w-full"
          />

          {/* ======================================================
              LOADING
          ====================================================== */}

          {!isReady && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black px-6 text-center text-sm text-white/40">
              Loading… {Math.round((loadedCount / FRAME_COUNT) * 100)}%
            </div>
          )}

          {/* ======================================================
              FROM PARTS
          ====================================================== */}

          <motion.div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
              px-4
            "
            style={{
              opacity: partsOpacity,
              y: partsY,
              scale: partsScale,
            }}
          >
            <h2
              className="
                max-w-[95vw]
                text-center
                text-[clamp(2.75rem,12vw,9rem)]
                font-semibold
                uppercase
                leading-[0.9]
                tracking-[-0.06em]
                text-white
              "
            >
              FROM PARTS
            </h2>
          </motion.div>

          {/* ======================================================
              TO SYSTEM
          ====================================================== */}

          <motion.div
            className="
              pointer-events-none
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
              px-4
            "
            style={{
              opacity: statementOpacity,
              y: statementY,
            }}
          >
            <div className="text-center">
              <p className="mb-1 text-xs inline-block p-1 bg-white uppercase tracking-[0.35em] text-white/50 md:text-xl">
                To
              </p>

              <h2
                className="
                  text-[clamp(3rem,15vw,8rem)]
                  font-semibold
                  leading-none
                  bg-white
                  tracking-[-0.07em]
                  text-white
                "
              >
                SYSTEM.
              </h2>
            </div>
          </motion.div>
        </div>
      </div>
      <div
        className="flex items-center
        justify-center"
      >
        <a
          href="/work/horizona"
          className="
        mt-6
        inline-flex
        items-center
        justify-center
        rounded-full
        border
        border-black
        bg-transparent
        px-6
        py-3
        text-sm
        font-medium
        text-black
        transition-all
        duration-300
        z-100
        hover:bg-black
        hover:text-white
      "
        >
          View Case Study
        </a>
      </div>
    </section>
  );
}

/* =====================================================================
   SECTION 2 — PRINCIPLES
===================================================================== */

const principles = [
  {
    gif: "/assets/portfolio_images/Horizona/Video 01.gif",
    title: "THINK IN SYSTEMS",
    description:
      "Every touchpoint should feel like part of the same brand, not a collection of disconnected decisions.",
  },
  {
    gif: "/assets/portfolio_images/Horizona/Video 02.gif",
    title: "DESIGN WITH INTENTION",
    description:
      "Every element has a role. We remove what doesn't contribute and refine what does.",
  },
  {
    gif: "/assets/portfolio_images/Horizona/Video 03.gif",
    title: "BUILD TO MOVE",
    description:
      "Brands evolve. Their visual systems should be built to adapt across platforms, products and new stages of growth.",
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
  },

  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      delay,
    },
  }),
};

function buildSmoothPath(points) {
  if (!points.length) return "";

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

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
    [0, 1, 0.45],
  );

  return (
    <motion.circle
      cx={point.x}
      cy={point.y}
      r="2.5"
      fill="#ffffff"
      style={{ opacity: glow }}
    />
  );
}

function ConstellationLines({ containerRef, nodeRefs, progress }) {
  const [points, setPoints] = useState([]);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

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

          y: rect.top - containerRect.top + rect.height * 0.5,
        };
      })
      .filter(
        (point) =>
          Number.isFinite(point.x) && Number.isFinite(point.y) && point.x >= 0,
      );

    setPoints(next);

    setSize({
      width: containerRect.width,
      height: containerRect.height,
    });
  }, [containerRef, nodeRefs]);

  useLayoutEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;

      requestAnimationFrame(measure);
    };

    update();

    const ro = new ResizeObserver(update);

    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

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
          stroke="#0f0f0f"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pathLength: pathProgress,
            opacity: 0.35,
          }}
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

function PrincipleRow({ principle, index, titleRef }) {
  const isReversed = index % 2 === 1;

  const tiltDirection = isReversed ? -1 : 1;

  const anchor = isReversed ? "left" : "right";

  const number = String(index + 1).padStart(2, "0");

  return (
    <div
      className={`
        relative z-10 flex min-w-0 flex-col
        items-center gap-10 py-16
        md:flex-row md:gap-16 md:py-24
        ${isReversed ? "md:flex-row-reverse" : ""}
      `}
    >
      <motion.div
        className="w-full min-w-0 md:w-1/2"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.4,
        }}
        variants={fadeUp}
        custom={0}
      >
        <p className="mb-4 text-sm tracking-[0.3em] text-white/40">{number}</p>

        <h3
          ref={titleRef}
          data-anchor={anchor}
          className="mb-5 text-3xl font-semibold tracking-[-0.03em] md:text-4xl"
        >
          {principle.title}
        </h3>

        <p className="max-w-md text-base leading-relaxed text-white/60 md:text-lg">
          {principle.description}
        </p>
      </motion.div>

      <motion.div
        className="w-full min-w-0 md:w-1/2"
        style={{
          perspective: "1400px",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.4,
        }}
        variants={fadeUp}
        custom={0.15}
      >
        <motion.div
          className="relative w-full min-w-0 overflow-hidden bg-white/5"
          style={{
            transform: `perspective(1400px) rotateY(${
              tiltDirection * 8
            }deg) rotateX(2deg)`,

            transformStyle: "preserve-3d",
          }}
          whileHover={{
            rotateY: 0,
            rotateX: 0,
            scale: 1.03,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 16,
          }}
        >
          <img
            src={principle.gif}
            alt={principle.title}
            className="block h-auto w-full max-w-full object-cover"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

function VisiumPrinciples() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const nodeRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 40%"],
  });

  return (
    <section
      ref={sectionRef}
      className="overflow-x-hidden bg-black px-4 py-24 text-white md:px-12 md:py-32"
    >
      <motion.div
        className="mb-4 flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.6,
        }}
        variants={fadeUp}
      >
        <p>
          <span className="text-xl">Our Principles</span>
        </p>

        <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.06em] md:text-5xl">
          WHAT GUIDES EVERY SYSTEM WE BUILD.
        </h2>
      </motion.div>

      <div ref={containerRef} className="relative min-w-0">
        <ConstellationLines
          containerRef={containerRef}
          nodeRefs={nodeRefs}
          progress={scrollYProgress}
        />

        <div className="divide-y divide-white/10">
          {principles.map((principle, index) => (
            <PrincipleRow
              key={principle.title}
              principle={principle}
              index={index}
              titleRef={(el) => {
                nodeRefs.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   MERGED EXPORT
===================================================================== */

function VisiumApproachSection() {
  return (
    <>
      <VisiumApproach />
      <VisiumPrinciples />
    </>
  );
}

export default VisiumApproachSection;
