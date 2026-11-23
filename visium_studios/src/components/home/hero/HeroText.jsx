import { useRef } from "react";
import { motion as Motion, useInView, useReducedMotion } from "framer-motion";

// Slightly wobbly, overshooting ellipse so it reads as a pencil circle
const SCRIBBLE_PATH =
  "M 22 42 C 18 14, 90 4, 130 6 C 176 8, 197 26, 192 44 C 187 64, 130 77, 85 75 C 38 73, 6 58, 11 36 C 14 22, 42 11, 74 9";

function Scribble({ children, delay = 0, color = "#ffffff", duration = 3.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });
  const reduceMotion = useReducedMotion();

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap">
      <span className="relative z-10">{children}</span>

      <svg
        aria-hidden="true"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -inset-x-[6%] -inset-y-[14%] z-0 h-[128%] w-[112%] overflow-visible"
      >
        <Motion.path
          d={SCRIBBLE_PATH}
          fill="none"
          stroke={color}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduceMotion
              ? { pathLength: 1, opacity: 1 }
              : inView
                ? {
                    pathLength: [0, 1, 1, 0],
                    opacity: [1, 1, 1, 1],
                  }
                : { pathLength: 0, opacity: 0 }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : inView
                ? {
                    duration,
                    delay,
                    times: [0, 0.4, 0.75, 1], // draw, hold, undraw
                    ease: "easeInOut",
                    repeat: Infinity,
                  }
                : { duration: 0.3 }
          }
        />
      </svg>
    </span>
  );
}

function HeroText() {
  return (
    <Motion.div
      className="relative flex flex-col items-center justify-start pt-24 pb-10 gap-12 text-white sm:pt-28 sm:gap-10 md:min-h-[100vh] md:justify-center md:pt-0 md:pb-0 md:gap-12"
      initial="hidden"
      animate="show"
    >
      <Motion.div className="hero-copy relative z-20 flex w-full flex-col items-center justify-center gap-6">
        <p className="hero-copy__headline relative w-full text-center text-[clamp(2rem,8vw,5rem)] font-normal leading-[1] sm:text-[clamp(2.5rem,7vw,5rem)] sm:leading-[1.02] md:mt-24 md:text-[clamp(3rem,5vw,5rem)] md:leading-[1.06] lg:mt-20">
          <span className="block font-[400] leading-[0.95]">
            <Motion.span className="block">
              <Scribble>
                <span className="hero-copy__accent">Ambition</span>
              </Scribble>{" "}
              should
            </Motion.span>
          </span>
          <span className="block leading-[0.95] font-[400]">
            <Motion.span className="block">
              have a <Scribble delay={0.8}>visual language</Scribble>
            </Motion.span>
          </span>
        </p>
      </Motion.div>
    </Motion.div>
  );
}

export default HeroText;
