import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import team from "../../data/team";

const SCATTER_LAYOUT = [
  {
    top: "10%",
    left: "14%",
    width: "24%",
    rotate: -2.5,
    float: { y: 10, x: 4, rotate: 1 },
    duration: 7,
  },
  {
    top: "16%",
    left: "88%",
    width: "15%",
    rotate: 2,
    float: { y: -8, x: -3, rotate: -1.2 },
    duration: 8.5,
  },
  {
    top: "58%",
    left: "10%",
    width: "17%",
    rotate: -1.5,
    float: { y: 8, x: -4, rotate: 1.3 },
    duration: 6.5,
  },
  {
    top: "64%",
    left: "87%",
    width: "19%",
    rotate: 2.4,
    float: { y: -10, x: 3, rotate: -1 },
    duration: 9,
  },
];

function ScatterImage({ item, layout, index }) {
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ top: layout.top, left: layout.left, width: layout.width }}
      initial={{ opacity: 0, y: 48, rotate: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotate: layout.rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.9,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Inner layer runs a separate, endless float loop so the entrance
          animation (outer) and the idle "alive" motion (inner) don't
          fight over the same transform values. */}
      <motion.div
        animate={{
          y: [0, layout.float.y, 0],
          x: [0, layout.float.x, 0],
          rotate: [0, layout.float.rotate, 0],
        }}
        transition={{
          duration: layout.duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.18)]"
      >
        <img
          src={item.image}
          alt={item.name}
          className="block h-auto w-full object-cover"
        />
      </motion.div>

      <div className="mt-3 text-center">
        <p className="text-sm font-medium">{item.name}</p>
        <p className="text-xs text-black/50">{item.role}</p>
      </div>
    </motion.div>
  );
}

function Studio() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    setIsMobile(mql.matches);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Just the first four headshots — one per scatter slot.
  const scattered = team.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-white px-4 py-24 text-black md:px-12">
      {/* Desktop: scattered composition around the centered text */}
      {!isMobile && (
        <div className="relative mx-auto min-h-[850px] max-w-5xl">
          {scattered.map((item, index) => (
            <ScatterImage
              key={item.name}
              item={item}
              layout={SCATTER_LAYOUT[index]}
              index={index}
            />
          ))}

          <div className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 text-center">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-block rounded-full border border-black/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-black/60"
            >
              The Studio
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl"
            >
              A multidisciplinary studio for brands with somewhere to go.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mx-auto mt-6 max-w-md text-base leading-relaxed text-black/60 md:text-lg"
            >
              Visium brings together brand, digital, product, motion,
              development and strategy under one visual direction — a single
              studio shaping every touchpoint a brand has.
            </motion.p>

            <motion.a
              href="/studio"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-medium uppercase tracking-[0.15em] transition-opacity hover:opacity-60"
            >
              Meet the Studio <span aria-hidden="true">→</span>
            </motion.a>
          </div>
        </div>
      )}

      {/* Mobile: text first, then a horizontal-scroll gallery — the
          absolute scatter needs room this viewport doesn't have. */}
      {isMobile && (
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-block rounded-full border border-black/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-black/60"
          >
            The Studio
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-3xl leading-[1.05] tracking-tight"
          >
            A multidisciplinary studio for brands with somewhere to go.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-black/60"
          >
            Visium brings together brand, digital, product, motion, development
            and strategy under one visual direction.
          </motion.p>

          <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
            {scattered.map((item) => (
              <div key={item.name} className="w-40 shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="block h-auto w-full rounded-sm object-cover"
                />
                <div className="mt-2">
                  <p className="text-xs font-medium">{item.name}</p>
                  <p className="text-[10px] text-black/50">{item.role}</p>
                </div>
              </div>
            ))}
          </div>

          <motion.a
            href="/studio"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-medium uppercase tracking-[0.15em]"
          >
            Meet the Studio <span aria-hidden="true">→</span>
          </motion.a>
        </div>
      )}
    </section>
  );
}

export default Studio;
