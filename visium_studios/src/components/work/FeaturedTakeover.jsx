import { motion } from "framer-motion";
import CursorWarpField from "../../context/CursorWarpField";
import ProjectZoomLink from "../../context/ProjectZoomlink";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

function FeaturedTakeover({ project }) {
  const imageSrc = project.coverImage ?? project.thumbnail;

  return (
    <motion.div
      className="group px-4 md:px-10"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
    >
      <CursorWarpField intensity={26} className="block">
        <ProjectZoomLink
          to={`/work/${project.slug}`}
          image={imageSrc}
          alt={project.title}
          className="block relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-white/5"
        >
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </ProjectZoomLink>
      </CursorWarpField>

      <div className="flex flex-wrap items-end justify-between gap-4 mt-6">
        <div className="flex items-center gap-3">
          <span className="text-4xl md:text-6xl font-bold text-white leading-none">
            {project.title}
          </span>
          <span className="text-4xl md:text-6xl text-white opacity-0 -translate-x-2 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-x-0">
            →
          </span>
        </div>
        <span className="text-white/40 text-xs uppercase tracking-widest">
          {project.category} — {project.year}
        </span>
      </div>
    </motion.div>
  );
}

export default FeaturedTakeover;
