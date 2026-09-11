import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Aspect ratio now applies to the IMAGE only, not the whole card — the
// card's total height is left to flow naturally so text never gets
// clipped or forced to overflow a pre-locked box.
const imageAspectClasses = {
  tall: "aspect-[3/4]",
  wide: "aspect-video",
  normal: "aspect-[4/3]",
};

const spanClasses = {
  wide: "md:col-span-2",
};

function EditorialProjectCard({ project, index }) {
  return (
    <motion.div
      className={spanClasses[project.size] || ""}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
    >
      <Link to={`/work/${project.slug}`} className="group block">
        <div
          className={`relative overflow-hidden bg-white/5 ${
            imageAspectClasses[project.size] || "aspect-[4/3]"
          }`}
          style={{
            backgroundImage: `url(${project.thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        </div>

        <div className="pt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <span className="text-white/30 text-xs tracking-widest mr-2">
              {String(index).padStart(2, "0")}
            </span>
            <h4 className="inline text-white text-lg md:text-xl font-bold group-hover:opacity-70 transition-opacity">
              {project.title}
            </h4>
            <p className="text-white/50 text-sm mt-1 max-w-sm">
              {project.tagline}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="block text-white/40 text-xs uppercase tracking-widest">
              {project.category}
            </span>
            <span className="block text-white/30 text-xs mt-1">
              {project.year}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default EditorialProjectCard;
