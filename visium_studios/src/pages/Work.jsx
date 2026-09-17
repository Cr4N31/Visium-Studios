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
        <span className="font-serif text-3xl md:text-5xl mt-3 leading-tight">
          From the thinkers and builders behind Visium.
        </span>
        <p className="text-white/60 mt-4 max-w-xl">
          These are a collections of projects and trusted clients that have been
          handled by visium, since it started. Ranging from brand designs,
          websites, digital products, brand idenity etc.
        </p>
      </motion.div>

      <WorkGrid projects={projects} />
    </section>
  );
}

export default Work;
