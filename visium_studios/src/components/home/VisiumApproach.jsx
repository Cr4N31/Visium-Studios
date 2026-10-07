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
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";

import room_Image from "/assets/img/room.webp";

/* SECTION 1: SCROLL-SCRUBBED CANVAS FRAME SEQUENCE
   -> SHRINKS INTO A FRAMED PICTURE ON THE ROOM WALL */

const FRAME_COUNT = 90;

// Change to 1 if your exported files start at frame_001.jpg
const FRAME_START = 0;

const FRAME_PATH = (i) =>
  `/sequence/frame_${String(i + FRAME_START).padStart(3, "0")}.jpg`;
const PHASE_A_END = 5 / 7;

const ROOM_IMAGE_NATIVE = { width: 3840, height: 2143 };
const ROOM_SCREEN_RECT = { x: 1307, y: 733, width: 1221, height: 682 };

const lerp = (a, b, v) => a + (b - a) * v;

function getRoomFrameTransform(containerWidth, containerHeight) {
  if (!containerWidth || !containerHeight) {
    return {
      scale: 1,
      x: 0,
      y: 0,
      clipLeft: 0,
      clipTop: 0,
      clipRight: 0,
      clipBottom: 0,
    };
  }

  // room_Image is rendered with object-fit: cover. Replicate that math
  // to find where the screen rect actually lands on screen at this
  // viewport size.
  const coverScale = Math.max(
    containerWidth / ROOM_IMAGE_NATIVE.width,
    containerHeight / ROOM_IMAGE_NATIVE.height,
  );

  const displayedWidth = ROOM_IMAGE_NATIVE.width * coverScale;
  const displayedHeight = ROOM_IMAGE_NATIVE.height * coverScale;

  const offsetX = (containerWidth - displayedWidth) / 2;
  const offsetY = (containerHeight - displayedHeight) / 2;

  const screenLeft = offsetX + ROOM_SCREEN_RECT.x * coverScale;
  const screenTop = offsetY + ROOM_SCREEN_RECT.y * coverScale;
  const screenWidth = ROOM_SCREEN_RECT.width * coverScale;
  const screenHeight = ROOM_SCREEN_RECT.height * coverScale;

  const scale = Math.max(
    screenWidth / containerWidth,
    screenHeight / containerHeight,
  );

  const finalWidth = containerWidth * scale;
  const finalHeight = containerHeight * scale;

  const x = screenLeft + (screenWidth - finalWidth) / 2;
  const y = screenTop + (screenHeight - finalHeight) / 2;

  const localLeft = (screenLeft - x) / scale;
  const localTop = (screenTop - y) / scale;
  const localRight = (screenLeft + screenWidth - x) / scale;
  const localBottom = (screenTop + screenHeight - y) / scale;

  const clipLeft = Math.max(0, localLeft);
  const clipTop = Math.max(0, localTop);
  const clipRight = Math.max(0, containerWidth - localRight);
  const clipBottom = Math.max(0, containerHeight - localBottom);

  return { scale, x, y, clipLeft, clipTop, clipRight, clipBottom };
}

function useFrameSequence(frameCount, pathFn) {
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const images = new Array(frameCount);
    imagesRef.current = images;

    let settled = 0;

    // Count failures as settled too, so one missing frame
    // can never leave the loader stuck forever.
    const done = () => {
      if (cancelled) return;

      settled += 1;
      setLoadedCount(settled);
    };

    for (let i = 0; i < frameCount; i += 1) {
      const img = new Image();

      img.decoding = "async";
      img.onload = done;
      img.onerror = done;

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
  const canvasRef = useRef(null);

  // The tall track that gives the sticky viewport its scroll range.
  // Scroll progress is measured against this, not the whole section.
  const trackRef = useRef(null);
  const viewportRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [roomFrame, setRoomFrame] = useState({
    scale: 1,
    x: 0,
    y: 0,
    clipLeft: 0,
    clipTop: 0,
    clipRight: 0,
    clipBottom: 0,
  });

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
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Phase B (0 -> 1 across the room-reveal slice of the scroll track).
  const phaseB = useTransform(scrollYProgress, [PHASE_A_END, 1], [0, 1], {
    clamp: true,
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
        Mobile: show the complete frame.
        Desktop: keep the original cover behavior.
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

  const toFrameSeqProgress = useCallback(
    (raw) => Math.min(raw / PHASE_A_END, 1),
    [],
  );

  /* ---------------------------------------------------------------
     CANVAS RESIZE
  ---------------------------------------------------------------- */

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const viewport = viewportRef.current;

    if (!canvas || !viewport) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const rect = viewport.getBoundingClientRect();

      if (!rect.width || !rect.height) return;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);

      setRoomFrame(getRoomFrameTransform(rect.width, rect.height));

      currentIndexRef.current = -1;

      renderAtProgress(toFrameSeqProgress(scrollYProgress.get()));
    };

    resize();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [renderAtProgress, scrollYProgress, toFrameSeqProgress]);

  /* ---------------------------------------------------------------
     INITIAL FRAME
  ---------------------------------------------------------------- */

  useEffect(() => {
    if (!isReady) return;

    currentIndexRef.current = -1;

    renderAtProgress(toFrameSeqProgress(scrollYProgress.get()));
  }, [isReady, renderAtProgress, scrollYProgress, toFrameSeqProgress]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isReady) return;

    renderAtProgress(toFrameSeqProgress(latest));
  });

  /* OVERLAY ANIMATIONS */

  const statementOpacity = useTransform(
    scrollYProgress,
    [
      0.88 * PHASE_A_END,
      0.97 * PHASE_A_END,
      PHASE_A_END + 0.08 * (1 - PHASE_A_END),
      PHASE_A_END + 0.25 * (1 - PHASE_A_END),
    ],
    [0, 1, 1, 0],
  );

  const statementY = useTransform(
    scrollYProgress,
    [0.88 * PHASE_A_END, 0.97 * PHASE_A_END],
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

  /* ROOM REVEAL (phase B)

     These use the function form of useTransform so they always read the
     latest measured roomFrame. The array form can hold on to the first
     (scale 1) values captured before measurement finished.

     The room does the "camera" move: it starts zoomed in tight enough
     that the TV rect alone would fill the viewport, then pulls back to
     its natural scale. That ratio is the inverse of how much the canvas
     shrinks, so the two stay in lockstep and the picture reads as
     sitting still on the wall while you zoom out from it. */

  const roomImageScale = useTransform(phaseB, (v) =>
    lerp(1 / Math.max(roomFrame.scale, 0.001), 1, v),
  );

  const canvasScale = useTransform(phaseB, (v) => lerp(1, roomFrame.scale, v));
  const canvasX = useTransform(phaseB, (v) => lerp(0, roomFrame.x, v));
  const canvasY = useTransform(phaseB, (v) => lerp(0, roomFrame.y, v));

  const canvasTransform = useMotionTemplate`translate(${canvasX}px, ${canvasY}px) scale(${canvasScale})`;

  const clipLeft = useTransform(phaseB, (v) => lerp(0, roomFrame.clipLeft, v));
  const clipTop = useTransform(phaseB, (v) => lerp(0, roomFrame.clipTop, v));
  const clipRight = useTransform(phaseB, (v) =>
    lerp(0, roomFrame.clipRight, v),
  );
  const clipBottom = useTransform(phaseB, (v) =>
    lerp(0, roomFrame.clipBottom, v),
  );

  const canvasClipPath = useMotionTemplate`inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`;

  // Shadow grows in as the picture settles into the frame, so it reads as
  // sitting proud of the wall. It lives on a wrapper as a drop-shadow
  // filter: clip-path on the canvas would cut off a box-shadow, but a
  // filter on the parent is applied after the child is clipped.
  const canvasShadowOpacity = useTransform(phaseB, [0.15, 1], [0, 0.55], {
    clamp: true,
  });
  const canvasShadowFilter = useMotionTemplate`drop-shadow(0px 30px 40px rgba(0, 0, 0, ${canvasShadowOpacity}))`;

  return (
    <section id="visium-approach" className="bg-black text-white">
      {/* ==========================================================
          INTRO
      ========================================================== */}

      <div className="flex flex-col px-8 py-24 md:py-32">
        <p>
          <span className="text-xl">The Visium Approach</span>
        </p>
        <div className="mt-2 flex flex-col justify-start">
          <h1 className="mb-4">
            <span className="block text-[clamp(2.9rem,9vw,5rem)] font-[400] leading-[0.95] tracking-[-0.05em] md:text-[clamp(3rem,5vw,5rem)]">
              We don't design assets. <br />
              We build systems.
            </span>
          </h1>
          <span className="text-left text-base leading-relaxed text-white/70 md:text-xl">
            A brand doesn't live in a logo, a website or a campaign alone. We
            connect identity, digital and motion into a visual system that stays
            recognisable wherever the brand shows up.
          </span>
        </div>
      </div>

      {/* ==========================================================
          SCROLL SEQUENCE

          IMPORTANT: no overflow property on this container.

          It is what gives sticky its scrolling range, split between
          the frame-sequence scrub (phase A) and the shrink-into-the-
          wall reveal (phase B). useScroll targets this element.
      ========================================================== */}

      <div
        ref={trackRef}
        className={`
          relative w-full
          ${isMobile ? "h-[420vh]" : "h-[560vh]"}
        `}
      >
        <div
          ref={viewportRef}
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
          {/* ROOM (phase B backdrop). Sits under the canvas the whole
              time; revealed purely by the canvas shrinking away. */}

          <motion.img
            src={room_Image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: roomImageScale }}
          />

          {/* Wrapper carries the drop-shadow so clip-path can't cut it */}
          <motion.div
            className="absolute inset-0"
            style={{ filter: canvasShadowFilter }}
          >
            <motion.canvas
              ref={canvasRef}
              className="absolute inset-0 block h-full w-full"
              style={{
                transform: canvasTransform,
                transformOrigin: "0 0",
                clipPath: canvasClipPath,
                willChange: "transform",
              }}
            />
          </motion.div>

          {/* LOADING */}

          {!isReady && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black px-6 text-center text-sm text-white/40">
              Loading... {Math.round((loadedCount / FRAME_COUNT) * 100)}%
            </div>
          )}

          {/* FROM PARTS */}

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

          {/* TO SYSTEM */}

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
              <p className="mb-1 inline-block bg-white p-1 text-xs uppercase tracking-[0.35em] text-black/60 md:text-xl">
                To
              </p>

              <h2
                className="
                  bg-white
                  text-[clamp(3rem,15vw,8rem)]
                  font-semibold
                  leading-none
                  tracking-[-0.07em]
                  text-black
                "
              >
                SYSTEM.
              </h2>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <a
          href="/work/horizona"
          className="
            z-100
            mt-6
            inline-flex
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-transparent
            px-6
            py-3
            text-sm
            font-medium
            text-white
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
          "
        >
          View Case Study
        </a>
      </div>
    </section>
  );
}

/* =====================================================================
   SECTION 2: PRINCIPLES
===================================================================== */

const principles = [
  {
    gif: "/assets/portfolio_images/Horizona/Video 01.gif",
    title: "Thinks in systems",
    description:
      "Every touchpoint should feel like part of the same brand, not a collection of disconnected decisions.",
  },
  {
    gif: "/assets/portfolio_images/Horizona/Video 02.gif",
    title: "Design with intention",
    description:
      "Every element has a role. We remove what doesn't contribute and refine what does.",
  },
  {
    gif: "/assets/portfolio_images/Horizona/Video 03.gif",
    title: "Build to move",
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

/* Position of a node relative to a container, using offset* values.
   Unlike getBoundingClientRect, these ignore CSS transforms, so the
   fadeUp translateY on an ancestor can't throw the measurement off. */
function getOffsetWithin(node, container) {
  let x = 0;
  let y = 0;
  let el = node;

  while (el && el !== container) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }

  return { x, y, width: node.offsetWidth, height: node.offsetHeight };
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

    const next = nodeRefs.current
      .filter(Boolean)
      .map((node) => {
        const box = getOffsetWithin(node, container);

        const anchor = node.dataset.anchor === "left" ? 0.18 : 0.82;

        return {
          x: box.x + box.width * anchor,
          y: box.y + box.height * 0.5,
        };
      })
      .filter(
        (point) =>
          Number.isFinite(point.x) && Number.isFinite(point.y) && point.x >= 0,
      );

    setPoints(next);

    setSize({
      width: container.offsetWidth,
      height: container.offsetHeight,
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
          stroke="rgba(255, 255, 255, 0.35)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            pathLength: pathProgress,
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
  const reduceMotion = useReducedMotion();

  const isRight = index % 2 === 1;
  const anchor = isRight ? "right" : "left";
  const number = String(index + 1).padStart(2, "0");

  // Inward = toward the center of the page.
  // Left-anchored cards drift right (+1), right-anchored cards drift left (-1).
  const inward = isRight ? -1 : 1;

  return (
    <div className="relative z-10 flex min-w-0 py-16 md:py-24">
      <div
        className={`
          w-full min-w-0 md:w-[52%]
          ${isRight ? "md:ml-auto" : ""}
        `}
      >
        {/* Text sits above the asset */}
        <motion.div
          className="mb-6 md:mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={0}
        >
          <p className="mb-3 text-xs tracking-[0.3em] text-white/40">
            {number}
          </p>

          <h3 ref={titleRef} data-anchor={anchor} className="mb-4">
            <span className="text-[clamp(2rem,9vw,2rem)] font-[400] leading-[0.95] tracking-tight md:text-[clamp(2.9rem,5vw,3rem)]">
              {principle.title}
            </span>
          </h3>

          <p className="max-w-md text-base leading-relaxed text-white/60 md:text-lg">
            {principle.description}
          </p>
        </motion.div>

        {/* Asset */}
        <motion.div
          className="min-w-0"
          style={{ perspective: "1400px" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0.15}
        >
          {/* Layer 1: idle float. Drifts inward, then settles back straight. */}
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, inward * 28, 0],
                    rotateY: [inward * -7, inward * -2, inward * -7],
                    rotateX: [2, 0.5, 2],
                  }
            }
            initial={{ rotateY: inward * -7, rotateX: 2 }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.6,
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Layer 2: hover pushes the offset deeper */}
            <motion.div
              className="relative w-full min-w-0 overflow-hidden bg-white/5"
              whileHover={{
                x: inward * 24,
                rotateY: inward * -6,
                scale: 1.02,
              }}
              transition={{
                type: "tween",
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <img
                src={principle.gif}
                alt={principle.title}
                className="block h-auto w-full max-w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
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
      className="overflow-x-hidden bg-black px-8 py-6 text-white md:py-12"
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

        <h2>
          <span className="text-[clamp(2.9rem,9vw,5rem)] font-[400] leading-[0.95] tracking-[-0.05em] md:text-[clamp(3rem,5vw,5rem)]">
            What guides every system we build.
          </span>
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
