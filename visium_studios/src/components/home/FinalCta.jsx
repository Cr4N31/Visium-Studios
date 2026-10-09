import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useMagnetic, useMorphPointer } from "../../shared/useCtaPointer";

const MotionLink = Motion(Link);

function FinalCTA({ eyebrow = "Start a Project" }) {
  const sectionRef = useRef(null);
  const ctaMorph = useMorphPointer();
  const ctaMagnetic = useMagnetic();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    ["80px", "0px", "-40px"],
  );

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.65],
    [0, 1, 1],
  );

  const lineScale = useTransform(scrollYProgress, [0.15, 0.45], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="start-a-project"
      className="relative overflow-hidden border-t border-white/10 px-8 py-24 text-white md:min-h-screen md:py-32"
      aria-labelledby="final-cta-heading"
    >
      <div className="relative z-10 flex min-h-[52svh] flex-col justify-between md:min-h-[58svh]">
        {/* Section label */}
        <div className="flex items-center gap-4">
          <span className="text-xs uppercase tracking-[0.2em] text-white/40">
            {eyebrow}
          </span>

          <Motion.span
            style={{ scaleX: lineScale }}
            className="h-px w-16 origin-left bg-white/30 md:w-24"
          />
        </div>

        {/* Main CTA */}
        <div>
          <Motion.div
            style={{
              y: headlineY,
              opacity: headlineOpacity,
            }}
          >
            <span
              id="final-cta-heading"
              className="text-[clamp(2.9rem,9vw,5rem)] tracking-[-0.07em] font-normal leading-[1.08] md:leading-[1.06] md:text-[clamp(3rem,5vw,5rem)]"
            >
              Let&apos;s build something
              <br />
              worth looking at.
            </span>
          </Motion.div>
        </div>

        {/* Bottom action */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-sm text-sm leading-relaxed text-white/45 md:text-base">
            Have a business with somewhere to go? Let&apos;s build the visual
            system to take it there.
          </p>

          <MotionLink
            to="/startaproject"
            data-blob
            style={{ x: ctaMagnetic.x, y: ctaMagnetic.y }}
            onPointerEnter={ctaMorph.onPointerEnter}
            onPointerLeave={(event) => {
              ctaMorph.onPointerLeave(event);
              ctaMagnetic.onPointerLeave(event);
            }}
            onPointerMove={(event) => {
              ctaMorph.onPointerMove(event);
              ctaMagnetic.onPointerMove(event);
            }}
            className="hero-cta group relative isolate w-fit overflow-hidden rounded-full bg-white px-4 py-3 text-2xl text-sm font-semibold uppercase tracking-[0.16em] text-black transition-colors flex items-center justify-center gap-5"
          >
            <Motion.span
              aria-hidden="true"
              className="cta-morph"
              style={{
                left: ctaMorph.left,
                top: ctaMorph.top,
                scale: ctaMorph.scale,
              }}
            />
            <span className="relative z-[1] font-semibold">
              Start a project
            </span>

            <span className="relative z-[1] leading-none font-semibold transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </MotionLink>
        </div>
      </div>

      {/* Subtle visual echo */}
      <Motion.div
        style={{
          scaleX: lineScale,
          opacity: headlineOpacity,
        }}
        className="absolute bottom-10 left-8 right-8 h-px origin-left bg-white/10"
      />
    </section>
  );
}

export default FinalCTA;
