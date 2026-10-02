import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

function scrollToSection(e, id) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function CapabilitySection({ item, index }) {
  const layout = slotsFor(item.slctdWrk.length);
  const others = capabilities.filter((c) => c.id !== item.id);

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
          0{index + 1} / {item.title}
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

        <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-white/80">
          {item.does.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
            Related
          </span>
          {others.map((o) => (
            <a
              key={o.id}
              href={`#${o.id}`}
              onClick={(e) => scrollToSection(e, o.id)}
              className="text-base italic tracking-[-0.02em] text-white/45 transition-colors duration-500 hover:text-white"
            >
              {o.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: staggered work below the text */}
      <div className="relative z-10 mt-16 flex w-full flex-col gap-5 md:hidden">
        {item.slctdWrk.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className={`aspect-[4/3] w-[58%] overflow-hidden ${
              i % 2 === 0 ? "self-start" : "self-end"
            }`}
          >
            <Media src={src} alt={`${item.title} selected work ${i + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

function CapabilityGrid() {
  return (
    <>
      {capabilities.map((item, i) => (
        <CapabilitySection key={item.id} item={item} index={i} />
      ))}
    </>
  );
}

export default CapabilityGrid;
