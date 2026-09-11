import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../../data/projects";
import FeaturedTakeover from "../home/featuredWork/FeaturedTakeover";
import EditorialProjectCard from "../home/featuredWork/EditorialProjectCard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Pull only what's flagged featured — swapping mock data for real projects
// later is just editing this array in projects.js, nothing here changes.
const featured = projects.filter((p) => p.featured);
const [heroProject, ...restFeatured] = featured;

function FeaturedWork() {
  return (
    <section id="work-preview" className="bg-black text-white py-24 md:py-32">
      {/* Intro — sets up the section before work takes over the viewport */}
      <motion.div
        className="max-w-3xl mb-16 md:mb-20 px-4 md:px-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fadeUp}
      >
        <p className="text-4xl font-serif md:text-6xl mt-3 leading-relaxed md:leading-tight">
          Our works? <br /> Take a look & experience for yourself
        </p>
      </motion.div>

      {/* The takeover moment — full-bleed, dominates the viewport */}
      {heroProject && <FeaturedTakeover project={heroProject} />}

      {/* Remaining featured work, editorial grid beneath the takeover */}
      {restFeatured.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14 px-4 md:px-10 mt-20 md:mt-28">
          {restFeatured.map((project, i) => (
            <EditorialProjectCard
              key={project.id}
              project={project}
              index={i + 2}
            />
          ))}
        </div>
      )}

      {/* CTA to the full Work page */}
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
