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
      className="bg-black px-8 py-24 text-white md:py-32"
    >
      <motion.div
        className="max-w-3xl mb-14 md:mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <h1>
          <span className="text-[clamp(2.9rem,9vw,5rem)] tracking-[-0.07em] font-normal leading-[1.08] md:leading-[1.06] md:text-[clamp(3rem,5vw,5rem)]">
            A selection of identities, digital experiences and visual systems
            built for ambitious brands.
          </span>
        </h1>
      </motion.div>

      <WorkGrid projects={projects} />
    </section>
  );
}

export default Work;
