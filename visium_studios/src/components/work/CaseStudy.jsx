import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../../data/projects";
import CaseStudySection from "./CaseStudySection";
import RelatedProjects from "./RelatedProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const maskReveal = {
  hidden: { y: "100%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] } },
};

function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/" replace />;

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="bg-black text-white">
      {/* Header — name, sub-label, tags, client/location, external link */}
      <header className="px-4 md:px-10 pt-32 pb-16 max-w-5xl">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Link
            to="/#work"
            className="text-white/50 text-xs uppercase tracking-widest"
          >
            ← Back to work
          </Link>

          <h1 className="overflow-hidden mt-6">
            <motion.span
              className="block text-5xl md:text-7xl font-bold leading-tight"
              variants={maskReveal}
            >
              {project.title}
            </motion.span>
          </h1>

          <span className="block text-white/40 text-sm mt-4">
            {project.year}
          </span>

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] uppercase tracking-widest text-white/60 border border-white/20 px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-8 text-sm text-white/70">
            <span>Client. {project.client}</span>
            <span>{project.location}</span>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white underline underline-offset-4"
              >
                Visit site ↗
              </a>
            )}
          </div>

          <p className="text-white/70 text-lg md:text-xl mt-10 max-w-2xl leading-relaxed">
            {project.brief}
          </p>
        </motion.div>
      </header>

      {/* Hero visual */}
      <motion.div
        className="w-full aspect-video bg-white/5 mx-auto max-w-6xl px-4 md:px-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full h-full flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
          {/* Swap for: <video src={project.heroMedia} autoPlay muted loop playsInline className="w-full h-full object-cover" /> */}
          Hero video placeholder
        </div>
      </motion.div>

      {/* Narrative sections: Context / Problem / Approach / System / Result */}
      <div className="max-w-4xl mx-auto px-4 md:px-10 mt-20">
        {project.sections.map((section, i) => (
          <CaseStudySection
            key={section.label}
            label={section.label}
            content={section.content}
            index={i + 1}
          />
        ))}
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 mt-20 mb-24">
        <span className="text-white/40 text-xs uppercase tracking-widest">
          Gallery
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {project.gallery.map((img, i) => (
            <div
              key={i}
              className="aspect-[4/3] bg-white/5 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!img && "Image placeholder"}
            </div>
          ))}
        </div>
      </div>

      <RelatedProjects projects={related} />
    </main>
  );
}

export default CaseStudy;
