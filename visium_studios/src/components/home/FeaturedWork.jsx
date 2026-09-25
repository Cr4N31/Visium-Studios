import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "../../data/projects";
import CursorWarpField from "../../context/CursorWarpField";
import ProjectZoomLink from "../../context/ProjectZoomlink";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const VARIANTS = [
  {
    imageWidth: "w-[92%] md:w-[82%]",
    imageAlign: "mx-auto",
    aspect: "aspect-[16/10]",
    metaPosition: "above",
  },
  {
    imageWidth: "w-[85%] md:w-[52%]",
    imageAlign: "ml-auto",
    aspect: "aspect-[4/5]",
    metaPosition: "beside",
  },
  {
    imageWidth: "w-[92%] md:w-[85%]",
    imageAlign: "mx-auto",
    aspect: "aspect-[21/9]",
    metaPosition: "above",
  },
];

const featured = projects.filter((p) => p.featured).slice(0, 3);

function isPlaceholder(src) {
  return typeof src === "string" && src.startsWith("/placeholders/");
}

function resolveImage(project) {
  const src = project.coverImage ?? project.thumbnail;
  return src && !isPlaceholder(src) ? src : null;
}

function ProjectMeta({ index, project }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div>
      <p className="text-sm tracking-[0.05em] text-white/60">
        {num} / {project.title.toUpperCase()}
      </p>
      {project.tags?.length ? (
        <p className="mt-2 text-xs uppercase tracking-widest text-white/30">
          {project.tags.join(" · ")}
        </p>
      ) : null}
      {project.year && (
        <p className="text-xs uppercase tracking-widest text-white/30">
          {project.year}
        </p>
      )}
    </div>
  );
}

function CaseStudyLink({ slug }) {
  return (
    <Link
      to={`/work/${slug}`}
      className="group/link inline-flex items-center gap-2 text-sm tracking-wide text-white/70 transition-colors hover:text-white"
    >
      VIEW CASE STUDY
      <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
        →
      </span>
    </Link>
  );
}

function ProjectVisual({ project, aspect }) {
  const image = resolveImage(project);
  return (
    <CursorWarpField intensity={26} className="block">
      <ProjectZoomLink
        to={`/work/${project.slug}`}
        image={image ?? undefined}
        alt={project.title}
        className={`group block relative ${aspect} overflow-hidden rounded-[4px] bg-white/5`}
      >
        {image ? (
          <img
            src={image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-white/20">
            Coming soon
          </div>
        )}
      </ProjectZoomLink>
    </CursorWarpField>
  );
}

function FeaturedProject({ project, index }) {
  const variant = VARIANTS[index] ?? VARIANTS[0];
  const meta = <ProjectMeta index={index} project={project} />;
  const visual = (
    <div className={`${variant.imageWidth} ${variant.imageAlign}`}>
      <ProjectVisual project={project} aspect={variant.aspect} />
    </div>
  );
  const footer = (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 px-4 md:px-10">
      {project.tagline && (
        <p className="max-w-xl text-white/60">{project.tagline}</p>
      )}
      <CaseStudyLink slug={project.slug} />
    </div>
  );

  if (variant.metaPosition === "beside") {
    return (
      <motion.article
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="py-16 md:py-24"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
          <div className="px-4 md:w-[32%] md:px-10">{meta}</div>
          {visual}
        </div>
        {footer}
      </motion.article>
    );
  }

  return (
    <motion.article
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeUp}
      className="py-16 md:py-24"
    >
      <div className="px-4 md:px-10">{meta}</div>
      <div className="mt-8 md:mt-10">{visual}</div>
      {footer}
    </motion.article>
  );
}

function FeaturedWork() {
  return (
    <section id="work-preview" className="bg-black py-24 text-white md:py-32">
      <div className="px-4 md:px-10">
        <p className="text-5xl uppercase tracking-[-0.03em] md:text-8xl">
          Selected Work
        </p>
        <p className="mt-5 max-w-xl text-white/60">
          A selection of identities, digital experiences and visual systems
          built for ambitious brands.
        </p>
      </div>

      <div className="mt-16 divide-y divide-white/10 md:mt-24">
        {featured.map((project, index) => (
          <FeaturedProject key={project.id} project={project} index={index} />
        ))}
      </div>

      <motion.div
        className="mt-24 flex justify-center md:mt-32"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
      >
        <Link
          to="/work"
          className="border-b border-white/30 pb-1 text-lg tracking-wide transition-colors hover:border-white md:text-xl"
        >
          VIEW ALL WORK →
        </Link>
      </motion.div>
    </section>
  );
}

export default FeaturedWork;
