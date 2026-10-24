import { useEffect, useRef } from "react";
import {
  motion as Motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

// Screen rectangle inside room.webp, as percentages of the image
const SCREEN = { left: 34.04, top: 34.2, width: 31.8, height: 31.83 };
const ORIGIN_X = SCREEN.left + SCREEN.width / 2;
const ORIGIN_Y = SCREEN.top + SCREEN.height / 2;

// Scroll progress window (0 to 1) in which the zoom happens.
// Before ZOOM_START the video holds full screen, after ZOOM_END the room holds.
const ZOOM_START = 0.1;
const ZOOM_END = 0.75;

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

function StudioEnvironment() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const maxScale = useMotionValue(4);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  // Work out how far the room must scale so the screen rect covers the viewport
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      if (reduceMotion) {
        maxScale.set(1);
        return;
      }
      const needX =
        window.innerWidth / (stage.offsetWidth * (SCREEN.width / 100));
      const needY =
        window.innerHeight / (stage.offsetHeight * (SCREEN.height / 100));
      maxScale.set(Math.max(needX, needY) * 1.02);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [maxScale, reduceMotion]);

  // Interpolate in log space so the zoom feels even from start to finish
  const scale = useTransform([progress, maxScale], ([p, m]) => {
    const t = clamp((p - ZOOM_START) / (ZOOM_END - ZOOM_START), 0, 1);
    const eased = t * t * (3 - 2 * t);
    return Math.exp(Math.log(m) * (1 - eased));
  });

  // Captions and labels only appear once the room is mostly revealed
  const uiOpacity = useTransform(progress, [0.6, 0.8], [0, 1]);

  return (
    <section>
      {/* Tall track gives the scroll distance; the sticky child stays pinned */}
      <div ref={trackRef} className="relative h-[320vh]">
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <Motion.div
            style={{ opacity: uiOpacity }}
            className="absolute inset-x-0 top-0 z-20 flex items-end justify-between gap-6 px-8 pt-6"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">
              A point of view, built together
            </p>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-white/30 sm:block">
              Visium / The studio
            </span>
          </Motion.div>

          <Motion.figure
            ref={stageRef}
            style={{
              scale,
              transformOrigin: `${ORIGIN_X}% ${ORIGIN_Y}%`,
              width:
                "min(calc(100vw - 4rem), 1600px, calc((100vh - 7rem) * 1.7919))",
            }}
            className="relative aspect-[3840/2143] overflow-hidden bg-white/5"
          >
            <img
              src="/assets/img/room.webp"
              alt="A calm, considered creative workspace"
              className="block h-full w-full object-fill"
            />

            <div
              className="absolute overflow-hidden bg-black"
              style={{
                left: `${SCREEN.left}%`,
                top: `${SCREEN.top}%`,
                width: `${SCREEN.width}%`,
                height: `${SCREEN.height}%`,
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                aria-label="Visium motion work playing on the studio screen"
                className="block h-full w-full object-cover"
              >
                <source src="/assets/video/final_motion.mp4" type="video/mp4" />
              </video>
              <Motion.span
                style={{ opacity: uiOpacity }}
                className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 pb-[2%] pt-[8%] text-[clamp(4px,0.8vw,11px)] uppercase tracking-[0.14em] text-white/80"
              >
                Space to think / room to make
              </Motion.span>
            </div>

            <Motion.figcaption
              style={{ opacity: uiOpacity }}
              className="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-5 pt-20 sm:flex-row sm:items-end sm:justify-between sm:px-8 sm:pb-8"
            >
              <span className="max-w-2xl text-xl leading-tight tracking-[-0.03em] text-white sm:text-2xl md:text-4xl">
                Good work comes from looking at the same problem from different
                angles.
              </span>
            </Motion.figcaption>
          </Motion.figure>
        </div>
      </div>

      <div className="px-8 pb-20 md:pb-32">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid gap-8 border-b border-white/15 pb-8 md:grid-cols-[1fr_0.7fr] md:gap-16">
            <h2 className="max-w-3xl text-2xl font-normal leading-tight tracking-[-0.04em] md:text-4xl">
              A studio shaped around the work, not the org chart.
            </h2>
            <p className="max-w-lg text-sm leading-relaxed text-white/50 md:justify-self-end md:text-base">
              We bring the right mix of thinkers and makers around each brief.
              Perspectives stay close, decisions stay connected, and the work
              can move from a clear idea to a considered expression without
              losing its thread.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudioEnvironment;
