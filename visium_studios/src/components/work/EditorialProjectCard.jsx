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
      <div className="relative overflow-hidden rounded-lg">
        <CursorWarpField intensity={26} className="block">
          <ProjectZoomLink
            to={`/work/${project.slug}`}
            image={imageSrc}
            alt={project.title}
            className="block relative aspect-[3/2] overflow-hidden rounded-lg bg-white/5"
          >
            <img
              src={imageSrc}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </ProjectZoomLink>
        </CursorWarpField>

        {/* Info panel: slides up from the bottom of the card on hover.
            Sits outside CursorWarpField so the warp can't distort the text,
            and ignores the pointer so clicks still reach the link underneath. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-2 bottom-2 translate-y-[calc(100%_+_0.75rem)] rounded-md bg-black px-3.5 py-3 text-white ring-1 ring-white/10 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-focus-within:translate-y-0 [@media(hover:none)]:translate-y-0"
        >
          <span className="block text-sm uppercase leading-none">
            {project.title}
          </span>
          <span className="mt-2.5 flex flex-wrap items-center gap-y-1.5 text-[10px] leading-none text-white/60">
            {project.tags?.map((tag, i) => (
              <span key={tag} className="flex items-center">
                {tag}
                {i < project.tags.length - 1 && (
                  <span aria-hidden="true" className="mx-2 text-white/30">
                    ·
                  </span>
                )}
              </span>
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default EditorialProjectCard;
