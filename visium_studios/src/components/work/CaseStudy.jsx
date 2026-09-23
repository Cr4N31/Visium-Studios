import { Link, Navigate, useParams } from "react-router-dom";
import projects from "../../data/projects";

const normalizeHeroMedia = (heroMedia, fallbackThumb) => {
  const src = heroMedia || fallbackThumb || "";

  if (typeof src === "string") {
    const lower = src.toLowerCase();
    return {
      type:
        lower.endsWith(".mp4") ||
        lower.endsWith(".webm") ||
        lower.endsWith(".mov")
          ? "video"
          : lower.endsWith(".gif")
            ? "gif"
            : "image",
      src,
    };
  }

  return {
    type: src.type || "image",
    src: src.src || src.url || src.path || fallbackThumb || "",
  };
};

const normalizeMediaItem = (entry, index) => {
  if (typeof entry === "string") {
    return {
      src: entry,
      type: entry.toLowerCase().endsWith(".gif")
        ? "gif"
        : entry.toLowerCase().endsWith(".mp4") ||
            entry.toLowerCase().endsWith(".webm") ||
            entry.toLowerCase().endsWith(".mov")
          ? "video"
          : "image",
      className: index % 2 === 0 ? "col-span-1 md:col-span-2" : "col-span-1",
    };
  }

  const src = entry?.src || entry?.url || entry?.path || "";

  return {
    src,
    type:
      entry?.type ||
      entry?.kind ||
      (src.toLowerCase().endsWith(".gif")
        ? "gif"
        : src.toLowerCase().endsWith(".mp4") ||
            src.toLowerCase().endsWith(".webm") ||
            src.toLowerCase().endsWith(".mov")
          ? "video"
          : "image"),
    className:
      entry?.className ||
      (index % 2 === 0 ? "col-span-1 md:col-span-2" : "col-span-1"),
  };
};

const normalizeProject = (project) => {
  if (!project) return null;

  const galleryItems = [
    ...(Array.isArray(project.gallery) ? project.gallery : []),
    ...(Array.isArray(project.src) ? project.src : []),
  ];

  return {
    ...project,
    title: project.title || "Project",
    client: project.client || "Studio",
    location: project.location || "Global",
    year: project.year || "2025",
    category: project.category || project.tags?.join(" / ") || "Brand identity",
    brief: project.brief || project.tagline || "Project overview",
    intro:
      project.intro ||
      project.summary ||
      project.brief ||
      project.tagline ||
      "Project overview.",
    heroMedia: normalizeHeroMedia(
      project.heroMedia,
      project.thumbnail || project.coverImage,
    ),
    sections: Array.isArray(project.sections)
      ? project.sections.map((section) => ({
          label: section.label || "Overview",
          copy: section.content || section.copy || "",
        }))
      : [{ label: "Context", copy: project.brief || project.tagline || "" }],
    gallery: galleryItems.map((item, index) => normalizeMediaItem(item, index)),
    metrics: Array.isArray(project.metrics)
      ? project.metrics
      : [
          { label: "Role", value: project.tags?.[0] || "Brand direction" },
          {
            label: "Deliverables",
            value: project.tags?.join(" / ") || "Identity system",
          },
          { label: "Focus", value: project.tagline || "Strategic positioning" },
        ],
    cta: project.cta || "Start a project",
  };
};

function CaseStudy() {
  const { slug } = useParams();
  const project = normalizeProject(
    projects.find((item) => item.slug === slug) || projects[0],
  );

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const related = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  return (
    <main className="bg-[#050505] text-white" data-aos="fade-up">
      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-4 md:px-8">
        <div className="mb-8 mt-24 flex items-center justify-between">
          <Link
            to="/work"
            className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white/70 transition hover:bg-white/10"
          >
            ← Back
          </Link>
        </div>

        <header className="mb-10 grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-white/45">
              {project.category}
            </p>
            <h1 className="text-5xl font-medium tracking-[-0.07em] text-[#f1efe9] md:text-[7rem]">
              {project.title}
            </h1>
          </div>

          <div className="text-sm text-white/70 md:text-right">
            <p>{project.client}</p>
            <p>{project.location}</p>
            <p>{project.year}</p>
          </div>
        </header>

        <section className="mb-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111]">
          {project.heroMedia.type === "video" ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="h-[420px] w-full object-cover md:h-[620px]"
            >
              <source src={encodeURI(project.heroMedia.src)} type="video/mp4" />
            </video>
          ) : (
            <img
              src={encodeURI(project.heroMedia.src)}
              alt={project.title}
              className="h-[420px] w-full object-cover md:h-[620px]"
            />
          )}
        </section>

        <section className="mb-12 grid gap-8 md:grid-cols-[0.7fr_1.3fr]">
          <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">
            Overview
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-white/75 md:text-xl">
            <p>{project.intro}</p>
            <p>{project.brief}</p>
          </div>
        </section>

        <div className="mb-12 space-y-8">
          {project.sections.map((section, index) => (
            <section
              key={`${project.slug}-${section.label}`}
              className="grid gap-6 border-t border-white/10 pt-8 md:grid-cols-[120px_1fr] md:gap-10"
            >
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="space-y-3">
                <h2 className="text-xl font-medium text-white md:text-2xl">
                  {section.label}
                </h2>
                <p className="text-base leading-relaxed text-white/75 md:text-lg">
                  {section.copy}
                </p>
              </div>
            </section>
          ))}
        </div>

        <section className="mb-12 grid gap-4 md:grid-cols-3">
          {project.metrics.map((metric) => (
            <div
              key={`${project.slug}-${metric.label}`}
              className="rounded-[1.5rem] border border-white/10 bg-white/3 p-5"
            >
              <div className="mb-3 text-[10px] uppercase tracking-[0.24em] text-white/45">
                {metric.label}
              </div>
              <div className="text-lg text-white/80 md:text-xl">
                {metric.value}
              </div>
            </div>
          ))}
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {project.gallery.map((media, index) => {
            const src = media.src;
            const isVideo =
              media.type === "video" ||
              src.toLowerCase().endsWith(".mp4") ||
              src.toLowerCase().endsWith(".webm") ||
              src.toLowerCase().endsWith(".mov");
            const isGif =
              media.type === "gif" || src.toLowerCase().endsWith(".gif");

            return (
              <div
                key={`${project.slug}-gallery-${index}`}
                className={media.className || "col-span-1"}
              >
                <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111111]">
                  {isVideo ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="h-[240px] w-full object-cover md:h-[360px]"
                    >
                      <source src={encodeURI(src)} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={encodeURI(src)}
                      alt={project.title}
                      className="h-[240px] w-full object-cover md:h-[360px]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-16 border-t border-white/10 pt-12">
          <div className="mb-8 text-[10px] uppercase tracking-[0.28em] text-white/45">
            Next work
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((item) => {
              const itemProject = normalizeProject(item);

              return (
                <Link
                  key={itemProject.slug}
                  to={`/work/${itemProject.slug}`}
                  className="group block rounded-[1.5rem] border border-white/10 bg-white/3 p-4 transition hover:bg-white/5"
                >
                  <div className="mb-4 overflow-hidden rounded-[1rem]">
                    <img
                      src={encodeURI(itemProject.heroMedia.src)}
                      alt={itemProject.title}
                      className="h-52 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="text-xs uppercase tracking-[0.24em] text-white/45">
                    {itemProject.category}
                  </div>
                  <h3 className="mt-3 text-2xl font-medium text-white">
                    {itemProject.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="mt-20 text-center">
          <Link
            to="/work"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[11px] uppercase tracking-[0.26em] text-white/80 transition hover:bg-white/10"
          >
            {project.cta}
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CaseStudy;
