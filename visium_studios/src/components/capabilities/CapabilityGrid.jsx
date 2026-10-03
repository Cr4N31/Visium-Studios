import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { capabilities } from "../../data/capabilitiesPage";

const ease = [0.22, 1, 0.36, 1];

// Static class strings so Tailwind picks them up
const slots = [
  { pos: "top-[9%] left-[6%] w-[17vw]", ratio: "aspect-[4/3]", speed: 50 },
  { pos: "top-[16%] right-[7%] w-[11vw]", ratio: "aspect-[4/5]", speed: 90 },
  { pos: "bottom-[14%] left-[3%] w-[13vw]", ratio: "aspect-[3/2]", speed: 70 },
  {
    pos: "bottom-[10%] right-[4%] w-[15vw]",
    ratio: "aspect-[16/10]",
    speed: 40,
  },
];

const slotsFor = (n) =>
  n === 3 ? [slots[0], slots[1], slots[3]] : slots.slice(0, n);

// encodeURI handles the spaces in file names like "A - P1.png"
const Media = ({ src, alt, className = "" }) => (
  <img
    src={encodeURI(src)}
    alt={alt}
    loading="lazy"
    decoding="async"
    draggable={false}
    className={`h-full w-full object-cover ${className}`}
  />
);

function FloatingImage({ src, alt, slot, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [slot.speed, -slot.speed]);

  return (
    <div ref={ref} className={`absolute ${slot.pos} ${slot.ratio}`}>
      <motion.div
        style={{ y }}
        className="h-full w-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1, ease, delay: index * 0.12 }}
      >
        <Media src={src} alt={alt} />
      </motion.div>
    </div>
  );
}

function MobileCarousel({ images, title }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  // Progress based, so the last card registers even when it can't snap
  // fully to the start edge.
  const handleScroll = () => {
    const el = trackRef.current;
    if (!el || images.length < 2) return;
    const max = el.scrollWidth - el.clientWidth;
    const progress = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.round(progress * (images.length - 1)));
  };

  return (
    <motion.div
      className="relative z-10 -mx-4 mt-14 md:hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease }}
    >
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-pl-4 px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="aspect-[4/5] w-[76%] shrink-0 snap-start overflow-hidden"
          >
            <Media src={src} alt={`${title} selected work ${i + 1}`} />
          </div>
        ))}
      </div>

      {/* Counter + progress */}
      <div className="mt-5 flex items-center gap-4 px-4">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 tabular-nums">
          0{active + 1} / 0{images.length}
        </span>
        <div className="flex flex-1 gap-1">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-px flex-1 transition-colors duration-500 ${
                i === active ? "bg-white" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CapabilitySection({ item, index }) {
  const layout = slotsFor(item.slctdWrk.length);

  return (
    <section
      id={item.id}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 md:px-10"
    >
      {/* Desktop: scattered work around the edges */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {item.slctdWrk.map((src, i) => (
          <FloatingImage
            key={`${src}-${i}`}
            src={src}
            alt={`${item.title} selected work ${i + 1}`}
            slot={layout[i]}
            index={i}
          />
        ))}
      </div>

      {/* Centered content */}
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <motion.p
          className="border border-white/25 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {item.title}
        </motion.p>

        <motion.h2
          className="mt-8 text-[clamp(2.25rem,5vw,4.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1, ease }}
        >
          {item.statement}
        </motion.h2>

        <p className="mt-8 max-w-sm text-xs leading-relaxed text-white/55 md:text-sm">
          {item.what}
        </p>

        <Link
          to={`/capabilities/${item.id}`}
          className="hero-cta relative isolate mt-10 inline-flex items-center gap-4 overflow-hidden rounded-full border-2 border-white bg-white px-5 py-2 text-black transition-colors hover:border-white"
        >
          <span className="relative z-[1] font-semibold">Read more →</span>
        </Link>
      </div>

      <MobileCarousel images={item.slctdWrk} title={item.title} />
    </section>
  );
}

function CapabilityGrid() {
  return (
    <>
      {capabilities.map((item, i) => (
        <CapabilitySection id={item.id} key={item.id} item={item} index={i} />
      ))}
    </>
  );
}

export default CapabilityGrid;
