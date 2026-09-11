import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

function CaseStudySection({ label, content, index }) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-10 py-10 border-t border-white/10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={fadeUp}
    >
      <span className="text-white/40 text-xs uppercase tracking-widest">
        {String(index).padStart(2, "0")} — {label}
      </span>
      <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
        {content}
      </p>
    </motion.div>
  );
}

export default CaseStudySection;
