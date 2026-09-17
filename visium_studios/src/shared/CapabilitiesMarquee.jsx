// CapabilitiesMarquee.jsx
import { motion } from "framer-motion";
import capabilities from "../data/capabilities";

function CapabilitiesMarquee() {
  // duplicated once so the loop can reset seamlessly at -50%
  const loopItems = [...capabilities, ...capabilities];

  return (
    <section className="overflow-hidden border-y border-white/10 py-10 md:py-14">
      <motion.div
        className="flex w-max items-center gap-10 md:gap-16"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 22,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {loopItems.map((item, i) => (
          <div key={i} className="flex items-center gap-10 md:gap-16">
            <span className="whitespace-nowrap font-serif text-3xl leading-none text-white/80 md:text-5xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/30" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

export default CapabilitiesMarquee;
