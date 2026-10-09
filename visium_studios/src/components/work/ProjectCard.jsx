import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import ProjectZoomLink from "../../context/ProjectZoomlink";

const overlay = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
};

const overlayContent = {
  rest: { y: 12, opacity: 0 },
  hover: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
};

const imageScale = {
  rest: { scale: 1 },
  hover: { scale: 1.04, transition: { duration: 0.6, ease: "easeOut" } },
};

function ProjectCard({ project, summaryBelow = false, presentation = false }) {
  const { slug, title, tagline, tags = [], thumbnail, coverImage } = project;
  const imageSrc = thumbnail || coverImage || "";
  const imageUrl = imageSrc ? encodeURI(imageSrc) : "";
  const coverRef = useRef(null);

  if (summaryBelow) {
    return (
      <article
        className={`md:w-[800px] w-full ${presentation ? "mx-auto max-w-6xl px-5 sm:px-8" : ""}`}
      >
        <ProjectZoomLink
          to={`/work/${slug}`}
          image={imageUrl}
          alt={title}
          zoomTargetRef={coverRef}
          className="group block w-full"
        >
          <div
            ref={coverRef}
            className={`relative overflow-hidden rounded-xl bg-white/5 sm:rounded-2xl ${
              presentation ? "aspect-[3/2]" : "aspect-[4/3]"
            }`}
          >
            {imageSrc ? (
              <ProjectZoomLink
                to={`/work/${slug}`}
                image={imageUrl}
                alt={title}
                className="block h-full w-full"
              >
                <Motion.img
                  src={imageUrl}
                  alt={`${title} project cover`}
                  loading="lazy"
                  decoding="async"
                  variants={imageScale}
                  initial="rest"
                  whileHover="hover"
                  className="h-full w-full object-contain"
                />
              </ProjectZoomLink>
            ) : (
              <span className="flex h-full items-center justify-center text-xs uppercase tracking-widest text-white/40">
                Image placeholder
              </span>
            )}
          </div>

          <div className="pt-4 text-white sm:pt-5">
            {tags.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.16em] text-white/50 sm:text-xs">
                {tags.map((tag, index) => (
                  <span key={`${tag}-${index}`}>
                    {index > 0 && <span aria-hidden="true">· </span>}
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <h3 className="text-xl font-medium leading-tight sm:text-2xl">
              {title}
            </h3>
            {tagline && (
              <p className="mt-1 text-sm leading-relaxed text-white/60 sm:text-base">
                {tagline}
              </p>
            )}
          </div>
        </ProjectZoomLink>
      </article>
    );
  }

  return (
    <Motion.div
      className="group relative overflow-hidden bg-white/5"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <Link to={`/work/${slug}`} className="block h-full w-full">
        {/* Thumbnail */}
        <Motion.div
          variants={imageScale}
          className="absolute inset-0 flex items-center justify-center bg-white/10"
          style={{
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!imageSrc && (
            <span className="text-xs uppercase tracking-widest text-white/20">
              Image placeholder
            </span>
          )}
        </Motion.div>

        {/* Hover overlay */}
        <Motion.div
          variants={overlay}
          className="absolute inset-0 z-10 flex flex-col justify-end bg-black/70 p-5"
        >
          <Motion.div variants={overlayContent}>
            <div className="mb-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-white/20 px-2 py-1 text-[10px] uppercase tracking-widest text-white/60"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 className="text-xl font-bold leading-tight text-white md:text-2xl">
              {title}
            </h3>
            <p className="mt-2 max-w-xs text-sm text-white/60">{tagline}</p>
          </Motion.div>
        </Motion.div>
      </Link>
    </Motion.div>
  );
}

export default ProjectCard;
