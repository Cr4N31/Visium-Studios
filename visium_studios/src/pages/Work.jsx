import { motion as Motion } from "framer-motion";
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
      className="bg-black px-5 py-24 text-white sm:px-8 md:py-32"
    >
      <Motion.div
        className="max-w-3xl mb-14 md:mb-20"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <h1>
          <span className="text-[clamp(2rem,8vw,5rem)] font-normal leading-[1] sm:text-[clamp(2.5rem,7vw,5rem)] sm:leading-[1.02] md:text-[clamp(3rem,5vw,5rem)] md:leading-[1.06]">
            A selection of identities, digital experiences and visual systems
            built for ambitious brands.
          </span>
        </h1>
      </Motion.div>

      <WorkGrid projects={projects} />
    </section>
  );
}

export default Work;
