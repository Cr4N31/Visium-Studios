import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
  const { slug, title, tagline, tags = [], thumbnail, coverImage } = project;
  const imageSrc = thumbnail || coverImage || "";
  const imageUrl = imageSrc ? encodeURI(imageSrc) : "";

  return (
    <motion.div
      className="group relative overflow-hidden bg-white/5"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Link to={`/work/${slug}`} className="block h-full w-full">
        {/* Thumbnail */}
        <motion.div
          variants={imageScale}
          className="absolute inset-0 flex items-center justify-center bg-white/10"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!imageSrc && (
            <span className="text-xs uppercase tracking-widest text-white/20">
              Image placeholder
            </span>
          )}
        </motion.div>

        {/* Hover overlay */}
        <motion.div
          variants={overlay}
          className="absolute inset-0 z-10 flex flex-col justify-end bg-black/70 p-5"
        >
          <motion.div variants={overlayContent}>
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 px-2 py-1 text-[10px] uppercase tracking-widest text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
              {title}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-white/60">{tagline}</p>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
}

export default ProjectCard;
