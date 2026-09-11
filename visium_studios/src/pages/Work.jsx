import { motion } from "framer-motion";
import WorkGrid from "../components/work/WorkGrid";
import projects from "../data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function Work() {
  return (
    <section
      id="work"
      className="bg-black text-white px-4 md:px-10 py-24 md:py-32"
    >
      <motion.div
        className="max-w-3xl mb-14 md:mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <span className="text-white/50 text-xs uppercase tracking-widest">
          Selected Work
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mt-3 leading-tight">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h2>
        <p className="text-white/60 mt-4 max-w-xl">
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut
          enim ad minim veniam quis nostrud exercitation.
        </p>
      </motion.div>

      <WorkGrid projects={projects} />
    </section>
  );
}

export default Work;
