import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: [0.65, 0, 0.35, 1] },
  },
};

const textReveal = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 0.8, ease: [0.65, 0, 0.35, 1] } },
};

// Full-bleed, breaks out of any parent max-width — this is the single
// biggest visual moment on the homepage, deliberately oversized.
function FeaturedTakeover({ project }) {
  return (
    <motion.div
      className="relative w-full/2 left-1/2 -translate-x-1/2 h-[85vh] md:h-screen overflow-hidden bg-white/5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link to={`/work/${project.slug}`} className="block h-full w-full group">
        <motion.div
          variants={reveal}
          className="absolute inset-0 bg-white/10"
          style={{
            backgroundImage: `url(${project.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-14">
          <div className="flex flex-wrap items-center gap-3 mb-4 overflow-hidden">
            <motion.span
              variants={textReveal}
              className="text-[11px] uppercase tracking-widest text-white/70 border border-white/25 px-2.5 py-1"
            >
              {project.category}
            </motion.span>
            <motion.span
              variants={textReveal}
              className="text-white/50 text-sm"
            >
              {project.year}
            </motion.span>
          </div>

          <h3 className="overflow-hidden">
            <motion.span
              variants={textReveal}
              className="block text-4xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95]"
            >
              {project.title}
            </motion.span>
          </h3>

          <div className="overflow-hidden mt-4 max-w-xl">
            <motion.p
              variants={textReveal}
              className="text-white/60 text-base md:text-lg"
            >
              {project.tagline}
            </motion.p>
          </div>

          <div className="overflow-hidden mt-6">
            <motion.span
              variants={textReveal}
              className="inline-block text-white text-sm tracking-wide group-hover:opacity-60 transition-opacity"
            >
              VIEW PROJECT →
            </motion.span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default FeaturedTakeover;
