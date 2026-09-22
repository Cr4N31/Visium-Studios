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
      className="bg-black text-white py-24 md:py-32"
      data-aos="fade-up"
    >
      <div className="p-12">
        <p className="md:text-8xl text-5xl">Featured Work</p>
        <p className="mt-5">
          A collection of visual experiences and works created and tailored for
          ambitious and forward thinking teams
        </p>
      </div>

      {gridProjects.length > 0 && (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 md:gap-6 px-4 md:px-10 mt-4 md:mt-6 max-w-[1600px] mx-auto">
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
