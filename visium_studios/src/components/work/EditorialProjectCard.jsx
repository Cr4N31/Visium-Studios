import { motion } from "framer-motion";
import CursorWarpField from "../../context/CursorWarpField";
import ProjectZoomLink from "../../context/ProjectZoomlink";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function EditorialProjectCard({ project }) {
  const imageSrc = project.coverImage ?? project.thumbnail;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="group"
    >
      <CursorWarpField intensity={26} className="block">
        <ProjectZoomLink
          to={`/work/${project.slug}`}
          image={imageSrc}
          alt={project.title}
          className="block relative aspect-[3/2] overflow-hidden rounded-2xl bg-white/5"
        >
          <img
            src={imageSrc}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </ProjectZoomLink>
      </CursorWarpField>

      <div className="mt-5">
        <span className="block text-white/40 text-[11px] uppercase tracking-widest">
          {project.tags?.join(" • ")}
        </span>

        <div className="flex items-center mt-2">
          <span className="inline-block overflow-hidden w-0 group-hover:w-7 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <span className="text-white text-2xl md:text-3xl pr-2">›</span>
          </span>
          <span className="text-white text-2xl md:text-3xl">
            {project.title}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default EditorialProjectCard;
