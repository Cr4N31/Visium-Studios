import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import projects from "../../data/projects";

const RADIUS = "rounded-[4px]";

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

/* -------------------------------------------------------
   HORIZONA
------------------------------------------------------- */

const horizona = projects.find((project) => project.slug === "horizona");

const HORIZONA_GALLERY = horizona?.gallery ?? [];

const PARTS = [
  {
    id: "logo",
    label: "LOGO",
    description: "The mark establishes the visual language.",
    media: horizona?.coverImage,
    side: "left",
    type: "image",
  },
  {
    id: "website",
    label: "WEBSITE",
    description: "The identity extends into the digital experience.",
    media: horizona?.heroMedia,
    side: "right",
    type: "gif",
  },
  {
    id: "ui",
    label: "UI",
    description: "The system adapts to functional interfaces.",
    media: HORIZONA_GALLERY[0],
    side: "left",
    type: "image",
  },
  {
    id: "image",
    label: "IMAGE",
    description: "The visual language shapes the imagery.",
    media: HORIZONA_GALLERY[3],
    side: "right",
    type: "image",
  },
  {
    id: "typography",
    label: "TYPOGRAPHY",
    description: "Type gives the system its voice.",
    media: HORIZONA_GALLERY[6],
    side: "left",
    type: "image",
  },
];

/* -------------------------------------------------------
   STATEMENT
------------------------------------------------------- */

function Statement() {
  return (
    <div className="relative z-10 max-w-5xl">
      <p>
        <span className="block text-[clamp(2.5rem,6vw,6rem)] font-semibold leading-[0.86] tracking-[-0.075em] text-black">
          WE DON&apos;T DESIGN ASSETS.
          <br />
          WE BUILD SYSTEMS.
        </span>
      </p>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/60 md:text-base">
        A brand doesn&apos;t live in a logo, a website or a campaign alone. We
        connect identity, digital and motion into a visual system that stays
        recognisable wherever the brand shows up.
      </p>
    </div>
  );
}

/* -------------------------------------------------------
   ANIMATED PRINCIPLE BACKGROUND

   This is intentionally restrained:
   - oversized type
   - Horizona imagery
   - thin editorial rules
   - slow scroll movement

   It sits behind the principles instead of competing
   with the actual copy.
------------------------------------------------------- */

function PrinciplesBackdrop({ progress }) {
  const backgroundY = useTransform(progress, [0, 0.2], ["8vh", "-8vh"]);

  const backgroundX = useTransform(progress, [0, 0.2], ["-4vw", "4vw"]);

  const imageOpacity = useTransform(progress, [0, 0.08, 0.2], [0, 0.28, 0]);

  const wordOpacity = useTransform(progress, [0, 0.08, 0.18], [0.04, 0.09, 0]);

  const lineScale = useTransform(progress, [0, 0.2], [0.65, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Giant editorial word */}

      <motion.div
        className="absolute -left-[8vw] top-[28%] whitespace-nowrap text-[28vw] font-semibold leading-none tracking-[-0.1em] text-black"
        style={{
          opacity: wordOpacity,
          x: backgroundX,
          y: backgroundY,
        }}
      >
        SYSTEM
      </motion.div>

      {/* Horizona image moving behind the principles */}

      <motion.div
        className="absolute -right-[12%] top-[15%] w-[38vw] max-w-[520px] overflow-hidden rounded-[4px] md:w-[26vw]"
        style={{
          opacity: imageOpacity,
          x: backgroundX,
          y: backgroundY,
          rotate: -4,
        }}
      >
        <img
          src={HORIZONA_GALLERY[1]}
          alt=""
          className="aspect-[4/3] w-full object-cover grayscale"
        />
      </motion.div>

      <motion.div
        className="absolute -left-[8%] bottom-[4%] w-[30vw] max-w-[420px] overflow-hidden rounded-[4px]"
        style={{
          opacity: imageOpacity,
          x: useTransform(progress, [0, 0.2], ["4vw", "-4vw"]),
          y: useTransform(progress, [0, 0.2], ["-3vh", "5vh"]),
          rotate: 5,
        }}
      >
        <img
          src={HORIZONA_GALLERY[8]}
          alt=""
          className="aspect-[4/3] w-full object-cover grayscale"
        />
      </motion.div>

      {/* Editorial line */}

      <motion.div
        className="absolute left-0 top-[50%] h-px w-full origin-left bg-black/10"
        style={{
          scaleX: lineScale,
        }}
      />

      <div className="absolute left-[50%] top-0 h-full w-px bg-black/[0.035]" />

      <div className="absolute left-[25%] top-0 h-full w-px bg-black/[0.025]" />

      <div className="absolute left-[75%] top-0 h-full w-px bg-black/[0.025]" />
    </div>
  );
}

/* -------------------------------------------------------
   PRINCIPLES
------------------------------------------------------- */

function Principles({ progress }) {
  return (
    <div className="relative z-10 mt-16 md:mt-24">
      <div className="grid grid-cols-1 gap-0 border-t border-black/10 md:grid-cols-3">
        {principles.map((principle, index) => {
          const start = 0.05 + index * 0.035;
          const end = start + 0.06;

          const opacity = useTransform(progress, [start, end], [0, 1]);

          const y = useTransform(progress, [start, end], [24, 0]);

          const lineScale = useTransform(progress, [start, end], [0, 1]);

          return (
            <motion.div
              key={principle.n}
              className="relative min-h-[190px] overflow-hidden border-b border-black/10 px-0 py-7 md:min-h-[230px] md:border-b-0 md:border-r md:px-6 md:py-8 first:md:pl-0 last:md:border-r-0 last:md:pr-0"
              style={{
                opacity,
                y,
              }}
            >
              {/* Animated background index */}

              <motion.span
                className="pointer-events-none absolute -right-2 -top-8 text-[7rem] font-semibold leading-none tracking-[-0.1em] text-black/[0.035]"
                style={{
                  y: useTransform(progress, [start, end], [20, -5]),
                }}
              >
                {principle.n}
              </motion.span>

              {/* Animated top rule */}

              <motion.div
                className="absolute left-0 top-0 h-px w-full origin-left bg-black"
                style={{
                  scaleX: lineScale,
                }}
              />

              <span className="relative block text-[10px] tracking-[0.12em] text-black/40">
                {principle.n}
              </span>

              <p className="relative mt-3 text-sm font-medium tracking-[-0.025em] text-black md:text-base">
                {principle.title}
              </p>

              <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-black/55">
                {principle.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   MEDIA
------------------------------------------------------- */

function PartMedia({ src, alt, scrollX, scrollY }) {
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    /*
      Disable mouse-parallax on touch devices naturally:
      pointer events from a touchscreen don't produce
      useful hover geometry.
    */

    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;

    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    mouseX.set(x * 8);
    mouseY.set(y * 8);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-[4px]"
      style={{
        x: scrollX,
        y: scrollY,
      }}
      animate={{
        scale: hovered ? 1.012 : 1,
      }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[4px]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: hovered ? 1.025 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   PART

   IMPORTANT:

   Each part has its OWN exclusive window.

   It does NOT remain visible after its window ends.

   This solves the visual stacking/fade problem.
------------------------------------------------------- */

function Part({ data, progress, index }) {
  const { label, description, media, side } = data;

  const isLeft = side === "left";

  /*
    Five clean windows.

    Every window has:

    ENTER
    HOLD
    EXIT
    GAP

    The gap guarantees the previous asset is completely
    gone before the next one begins.
  */

  const windowStart = 0.08 + index * 0.125;

  const enterStart = windowStart;
  const enterEnd = windowStart + 0.035;

  const holdStart = enterEnd;
  const holdEnd = windowStart + 0.075;

  const exitStart = holdEnd;
  const exitEnd = windowStart + 0.105;

  const initialX = isLeft ? "-9vw" : "9vw";

  const x = useTransform(
    progress,
    [enterStart, enterEnd, holdEnd, exitEnd],
    [initialX, "0vw", "0vw", isLeft ? "-6vw" : "6vw"],
  );

  const y = useTransform(
    progress,
    [enterStart, enterEnd, exitEnd],
    [index % 2 === 0 ? 24 : -24, 0, index % 2 === 0 ? -16 : 16],
  );

  /*
    THIS is the important fix.

    Instead of:

    0 → 1 and then staying there,

    each asset does:

    0 → 1 → 1 → 0

    before the next asset enters.
  */

  const opacity = useTransform(
    progress,
    [enterStart, enterEnd, holdEnd, exitStart, exitEnd],
    [0, 1, 1, 0, 0],
  );

  const scale = useTransform(
    progress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0.96, 1, 1, 0.97],
  );

  const rotate = useTransform(
    progress,
    [enterStart, enterEnd, exitEnd],
    [isLeft ? -1.5 : 1.5, 0, isLeft ? -1 : 1],
  );

  const mediaX = useTransform(
    progress,
    [enterStart, enterEnd, exitEnd],
    [0, 0, isLeft ? 5 : -5],
  );

  const mediaY = useTransform(
    progress,
    [enterStart, enterEnd, exitEnd],
    [0, 0, index % 2 === 0 ? -4 : 4],
  );

  return (
    <motion.article
      className={`absolute top-[47%] w-[84vw] max-w-[560px] -translate-y-1/2 md:top-[50%] md:w-[36vw] md:max-w-[520px] ${
        isLeft ? "left-[6vw] md:left-[8vw]" : "right-[6vw] md:right-[8vw]"
      }`}
      style={{
        x,
        y,
        opacity,
        scale,
        rotate,
        zIndex: 10,
      }}
    >
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <span className="block text-[10px] tracking-[0.12em] text-black/40">
            0{index + 1}
          </span>

          <h3 className="mt-1 text-xl font-medium tracking-[-0.05em] text-black md:text-2xl">
            {label}
          </h3>
        </div>

        <span className="hidden max-w-[180px] text-right text-xs leading-relaxed text-black/50 md:block">
          {description}
        </span>
      </div>

      <PartMedia
        src={media}
        alt={`Horizona ${label}`}
        scrollX={mediaX}
        scrollY={mediaY}
      />
    </motion.article>
  );
}

/* -------------------------------------------------------
   CONNECTION FIELD

   Appears only AFTER all five individual assets
   have completed their individual sequence.
------------------------------------------------------- */

function ConnectionField({ progress }) {
  const opacity = useTransform(progress, [0.68, 0.74, 0.82], [0, 0.35, 0]);

  const scale = useTransform(progress, [0.68, 0.78], [0.8, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10"
      style={{
        opacity,
        scale,
      }}
    >
      <div className="absolute left-1/2 top-1/2 h-px w-[60vw] -translate-x-1/2 bg-black/10" />

      <div className="absolute left-1/2 top-1/2 h-[45vh] w-px -translate-y-1/2 bg-black/10" />

      <div className="absolute left-[25%] top-[25%] h-2 w-2 rounded-full bg-black/20" />

      <div className="absolute right-[25%] top-[65%] h-2 w-2 rounded-full bg-black/20" />
    </motion.div>
  );
}

/* -------------------------------------------------------
   FINAL SYSTEM

   This only appears once the individual pieces have
   completely disappeared.

   So there is NO visual overlap between:
   PARTS and SYSTEM.
------------------------------------------------------- */

function SystemComposition({ progress }) {
  const opacity = useTransform(progress, [0.76, 0.84, 0.96], [0, 1, 1]);

  const y = useTransform(progress, [0.76, 0.84], [35, 0]);

  const scale = useTransform(progress, [0.76, 0.84], [0.94, 1]);

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-4 md:px-0"
      style={{
        opacity,
        y,
        scale,
      }}
    >
      <div className="relative h-[48vh] w-[92vw] max-w-[1050px] md:h-[54vh] md:w-[76vw]">
        {/* Logo */}

        <motion.div
          className="absolute left-[2%] top-[7%] w-[42%] overflow-hidden rounded-[4px] md:left-[12%] md:w-[32%]"
          style={{
            rotate: useTransform(progress, [0.82, 0.94], [-3, -1]),
          }}
        >
          <img
            src={horizona?.coverImage}
            alt="Horizona visual identity"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </motion.div>

        {/* Website */}

        <motion.div
          className="absolute right-[1%] top-[4%] w-[46%] overflow-hidden rounded-[4px] md:right-[8%] md:w-[38%]"
          style={{
            rotate: useTransform(progress, [0.82, 0.94], [3, 1]),
          }}
        >
          <img
            src={horizona?.heroMedia}
            alt="Horizona website"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </motion.div>

        {/* UI */}

        <motion.div
          className="absolute bottom-[3%] left-[8%] w-[40%] overflow-hidden rounded-[4px] md:bottom-[4%] md:left-[22%] md:w-[30%]"
          style={{
            rotate: useTransform(progress, [0.82, 0.94], [2, 0.5]),
          }}
        >
          <img
            src={HORIZONA_GALLERY[0]}
            alt="Horizona UI"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </motion.div>

        {/* Image */}

        <motion.div
          className="absolute bottom-[7%] right-[3%] w-[43%] overflow-hidden rounded-[4px] md:bottom-[8%] md:right-[14%] md:w-[32%]"
          style={{
            rotate: useTransform(progress, [0.82, 0.94], [-2, -0.5]),
          }}
        >
          <img
            src={HORIZONA_GALLERY[3]}
            alt="Horizona imagery"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </motion.div>

        {/* Typography */}

        <motion.div
          className="absolute left-[32%] top-[37%] z-10 w-[34%] overflow-hidden rounded-[4px] md:left-[39%] md:w-[25%]"
          style={{
            rotate: useTransform(progress, [0.82, 0.94], [1, 0]),
          }}
        >
          <img
            src={HORIZONA_GALLERY[6]}
            alt="Horizona typography"
            className="aspect-[4/3] h-full w-full object-cover"
          />
        </motion.div>

        {/* Center label */}

        <motion.div
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{
            opacity: useTransform(progress, [0.84, 0.92], [0, 1]),
          }}
        >
          <span className="text-[10px] tracking-[0.16em] text-black/50">
            ONE VISUAL SYSTEM
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------- */

function VisiumApproach() {
  const trackRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  /* -----------------------------------------------------
     REDUCED MOTION
  ----------------------------------------------------- */

  if (prefersReducedMotion) {
    return (
      <section
        id="visium-approach"
        className="relative overflow-hidden bg-white px-4 py-24 text-black md:px-10 md:py-32"
      >
        <span className="mb-10 block text-xs tracking-[0.08em] text-black/50">
          THE VISIUM APPROACH
        </span>

        <Statement />

        <Principles progress={{}} />

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-14 md:grid-cols-2">
          {PARTS.map((part, index) => (
            <article key={part.id}>
              <div className="mb-3">
                <span className="text-[10px] tracking-[0.12em] text-black/40">
                  0{index + 1}
                </span>

                <h3 className="mt-1 text-xl font-medium tracking-[-0.05em]">
                  {part.label}
                </h3>
              </div>

              <div className="aspect-[4/3] overflow-hidden rounded-[4px]">
                <img
                  src={part.media}
                  alt={`Horizona ${part.label}`}
                  className="h-full w-full object-cover"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-20 max-w-4xl">
          <SystemComposition progress={{}} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="visium-approach"
      ref={trackRef}
      className="relative h-[620vh] overflow-hidden bg-white text-black md:h-[650vh]"
    >
      {/* -------------------------------------------------
          INTRO / STATEMENT
      ------------------------------------------------- */}

      <div className="relative min-h-[100svh] px-4 pt-[16svh] md:px-10 md:pt-[18vh]">
        <div className="relative mx-auto max-w-[1600px]">
          <div className="mb-10 flex items-center justify-between md:mb-16">
            <span className="text-[10px] tracking-[0.12em] text-black/45 md:text-xs">
              THE VISIUM APPROACH
            </span>

            <span className="hidden text-xs tracking-[0.12em] text-black/30 md:block">
              FROM PARTS TO SYSTEM
            </span>
          </div>

          <Statement />

          <Principles progress={scrollYProgress} />
        </div>

        <PrinciplesBackdrop progress={scrollYProgress} />
      </div>

      {/* -------------------------------------------------
          STICKY VISUAL STAGE
      ------------------------------------------------- */}

      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* Editorial frame */}

        <div className="pointer-events-none absolute inset-x-[5%] top-[12%] bottom-[7%] border-t border-black/10 md:inset-x-[8%] md:top-[10%]">
          <span className="absolute left-0 top-2 text-[9px] tracking-[0.14em] text-black/30 md:text-[10px]">
            PARTS
          </span>

          <motion.span
            className="absolute right-0 top-2 text-[9px] tracking-[0.14em] text-black/30 md:text-[10px]"
            style={{
              opacity: useTransform(scrollYProgress, [0.74, 0.84], [0, 1]),
            }}
          >
            SYSTEM
          </motion.span>
        </div>

        {/* -------------------------------------------------
            INDIVIDUAL PARTS
        ------------------------------------------------- */}

        <div className="absolute inset-0">
          {PARTS.map((part, index) => (
            <Part
              key={part.id}
              data={part}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* -------------------------------------------------
            CONNECTION
        ------------------------------------------------- */}

        <ConnectionField progress={scrollYProgress} />

        {/* -------------------------------------------------
            FINAL SYSTEM
        ------------------------------------------------- */}

        <SystemComposition progress={scrollYProgress} />

        {/* -------------------------------------------------
            FINAL MESSAGE
        ------------------------------------------------- */}

        <motion.div
          className="absolute bottom-[7%] left-1/2 z-40 w-[90%] -translate-x-1/2 text-center md:w-auto"
          style={{
            opacity: useTransform(scrollYProgress, [0.88, 0.96], [0, 1]),
            y: useTransform(scrollYProgress, [0.88, 0.96], [20, 0]),
          }}
        >
          <p className="text-[clamp(1.5rem,3vw,3rem)] font-medium leading-[0.95] tracking-[-0.06em]">
            DIFFERENT EXPRESSIONS.
            <br />
            ONE SYSTEM.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default VisiumApproach;
