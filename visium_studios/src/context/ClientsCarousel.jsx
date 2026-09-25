import { motion } from "framer-motion";
import clients from "../data/clients";

const rows = [clients.slice(0, 5), clients.slice(5)];

function ClientRow({ items, reverse = false }) {
  const loopItems = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-white/10 last:border-b-0">
      <motion.div
        className="flex w-max items-center gap-12 py-5 pr-12 sm:gap-20 sm:pr-20 md:gap-28 md:py-7 md:pr-28"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
      >
        {loopItems.map((client, index) => (
          <span
            key={`${client}-${index}`}
            className="whitespace-nowrap text-lg tracking-tight text-white/30 transition-colors duration-300 hover:text-white/70 sm:text-xl md:text-2xl"
          >
            {client}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function ClientsCarousel() {
  return (
    <section
      id="aesthetics"
      className="overflow-hidden border-t border-white/10 px-4 py-16 sm:px-6 md:px-10 md:py-24"
      aria-label="Selected clients"
    >
      <div className="mb-8 flex items-end justify-between gap-6 md:mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          Selected clients
        </p>
      </div>

      <div className="border-t border-white/10">
        <ClientRow items={rows[0]} />
        <ClientRow items={rows[1]} reverse />
      </div>
    </section>
  );
}

export default ClientsCarousel;
