import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Masonry span control — keep this list short and deliberate so the grid
// stays disciplined rather than scattering into randomness.
const sizeClasses = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "",
};

const overlay = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const overlayContent = {
  rest: { y: 12, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
};

const imageScale = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.6, ease: "easeOut" } },
};

function ProjectCard({ project }) {
  const { slug, title, tagline, tags, size, thumbnail, id } = project;

  return (
    <motion.div
      className={`relative group overflow-hidden bg-white/5 ${sizeClasses[size] || ""}`}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Link to={`/work/${slug}`} className="block h-full w-full">
        {/* Thumbnail — replace bg placeholder with real image/video */}
        <motion.div
          variants={imageScale}
          className="absolute inset-0 bg-white/10 flex items-center justify-center"
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Fallback label if no image is wired up yet */}
          <span className="text-white/20 text-xs uppercase tracking-widest">
            {thumbnail ? "" : "Image placeholder"}
          </span>
        </motion.div>

        {/* Project index, always visible, top-left — quiet architectural marker */}
        <span className="absolute top-4 left-4 z-10 text-white/50 text-xs tracking-widest">
          {id}
        </span>

        {/* Hover overlay: dark scrim + metadata */}
        <motion.div
          variants={overlay}
          className="absolute inset-0 bg-black/70 flex flex-col justify-end p-5 z-10"
        >
          <motion.div variants={overlayContent}>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] uppercase tracking-widest text-white/60 border border-white/20 px-2 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-white text-xl md:text-2xl font-bold leading-tight">
              {title}
            </h3>
            <p className="text-white/60 text-sm mt-2 max-w-xs">{tagline}</p>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default ProjectCard;
