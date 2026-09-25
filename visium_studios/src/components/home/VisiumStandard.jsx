import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const principles = [
  { top: "CLARITY", bottom: "OVER DECORATION." },
  { top: "SYSTEMS", bottom: "OVER ASSETS." },
  { top: "DISTINCTION", bottom: "OVER TRENDS." },
  { top: "INTENTION", bottom: "OVER NOISE." },
  { top: "QUALITY", bottom: "OVER OUTPUT." },
];

// How much scroll distance (in vh) each principle — and the closing
// signature — gets before the next one takes over. Raise this for a
// slower, more immersive pace; lower it for something snappier.
const VH_PER_BEAT = 160;
const TOTAL_BEATS = principles.length + 1;
const TRACK_HEIGHT = `${VH_PER_BEAT * TOTAL_BEATS}vh`;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Principle({ index, segment, progress, top, bottom }) {
  const start = index * segment;
  const end = start + segment;
  const inEnd = start + segment * 0.4;
  const outStart = end - segment * 0.4;

  const opacity = useTransform(
    progress,
    [start, inEnd, outStart, end],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    progress,
    [start, inEnd, outStart, end],
    [0.86, 1, 1, 0.9],
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
      style={{ opacity, scale }}
    >
      <p className="text-6xl uppercase leading-[0.9] tracking-[-0.06em] md:text-[8.5rem]">
        {top}
      </p>
      <p className="text-6xl uppercase leading-[0.9] tracking-[-0.06em] md:text-[8.5rem]">
        {bottom}
      </p>
    </motion.div>
  );
}

function VisiumStandard() {
  const trackRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const segment = 1 / TOTAL_BEATS;
  const signatureStart = principles.length * segment;
  const signatureOpacity = useTransform(
    scrollYProgress,
    [signatureStart, signatureStart + segment * 0.3],
    [0, 1],
  );

  const intro = (
    <motion.div
      className="flex flex-col px-4 py-24 md:px-10 md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.5 }}
      variants={fadeUp}
    >
      <span className="text-sm md:text-lg">The Visium Approach</span>
      <p className="mb-4 text-4xl uppercase tracking-[-0.07em] md:text-7xl">
        We set the standard
        <br /> before we set the style
      </p>
      <p className="text-lg md:text-xl">
        Our principles are simple and precise
      </p>
    </motion.div>
  );

  if (prefersReducedMotion) {
    return (
      <section className="bg-black text-white">
        {intro}
        <div className="flex flex-col items-center gap-16 px-4 py-24 text-center md:py-32">
          {principles.map((p) => (
            <div key={p.top}>
              <p className="text-5xl uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
                {p.top}
              </p>
              <p className="text-5xl uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
                {p.bottom}
              </p>
            </div>
          ))}
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">
            Setting the visual standard.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-black text-white">
      {intro}
      <div ref={trackRef} className="relative" style={{ height: TRACK_HEIGHT }}>
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          {principles.map((p, index) => (
            <Principle
              key={p.top}
              index={index}
              segment={segment}
              progress={scrollYProgress}
              top={p.top}
              bottom={p.bottom}
            />
          ))}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
            style={{ opacity: signatureOpacity }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-white/60 md:text-base">
              Setting the visual standard.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default VisiumStandard;
