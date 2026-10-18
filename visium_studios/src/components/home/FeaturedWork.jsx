import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../../data/projects";
import EditorialProjectCard from "../work/EditorialProjectCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const gridProjects = projects.filter((p) => p.featured).slice(0, 4);

function FeaturedWork() {
  return (
    <section
      id="work-preview"
      className="bg-black text-white py-6 md:py-12"
      data-aos="fade-up"
    >
      <div className="px-8 py-4 md:py-12">
        <div className="flex items-start gap-2 md:gap-3">
          <sup className="mt-[0.5em] font-mono text-xs md:text-sm">(04)</sup>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
            Selected Work
          </h2>
        </div>
      </div>

      {gridProjects.length > 0 && (
        <div className="mt-4 grid max-w-[1600px] grid-cols-1 gap-2 px-8 md:mx-auto md:mt-6 md:grid-cols-2 md:gap-2">
          {gridProjects.map((project) => (
            <EditorialProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      <motion.div
        className="flex justify-center mt-24 md:mt-32"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        <Link
          to="/work"
          className="text-white text-lg md:text-xl tracking-wide border-b border-white/30 pb-1 hover:border-white transition-colors"
        >
          View all work →
        </Link>
      </motion.div>
    </section>
  );
}

export default FeaturedWork;
