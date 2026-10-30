import { Link, Navigate, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import projects from "../../data/projects";
import TextScramble from "../../shared/TextScramble";
import { useMagnetic, useMorphPointer } from "../../shared/useCtaPointer";

const MotionLink = Motion(Link);

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
      project.tagline ||
      project.brief ||
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

function ProjectMedia({ media, title, className }) {
  const src = media?.src || "";
  const isVideo = media?.type === "video" || /\.(mp4|webm|mov)$/i.test(src);

  if (isVideo) {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className={className}
      >
        <source src={encodeURI(src)} type="video/mp4" />
      </video>
    );
  }

  return (
    <img
      src={encodeURI(src)}
      alt={title}
      loading="lazy"
      className={className}
    />
  );
}

function CaseStudy() {
  const ctaMorph = useMorphPointer();
  const ctaMagnetic = useMagnetic();
  const { slug } = useParams();
  const project = normalizeProject(
    projects.find((item) => item.slug === slug) || projects[0],
  );

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const related = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 3);
  const featureMedia = project.gallery[0];
  const gallery = project.gallery.slice(featureMedia ? 1 : 0);
  const resultSection = project.sections.find(
    (section) => section.label.toLowerCase() === "result",
  );
  const storySections = project.sections.filter(
    (section) => section.label.toLowerCase() !== "result",
  );

  return (
    <main className="bg-[#050505] text-white" data-aos="fade-up">
      <div className="mx-auto max-w-[1440px] px-3 pb-20 pt-24 sm:px-5 md:px-8">
        <section className="relative mb-6 h-[clamp(12rem,32vw,26rem)] overflow-hidden rounded-lg bg-[#111111]">
          <ProjectMedia
            media={project.heroMedia}
            title={project.title}
            className="h-full w-full object-cover"
          />
          <Link
            to="/work"
            className="absolute left-4 top-4 rounded-full border border-white/30 bg-[#0B0B0B]/45 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-[#0B0B0B]/75"
          >
            ← Back to work
          </Link>
          <span className="absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
            {project.id}
          </span>
        </section>

        <header className="mb-8 border-b border-white/20 pb-5">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <h1 className="text-[clamp(3.5rem,10vw,8rem)] font-medium leading-[0.8] tracking-[-0.08em] text-[#f1efe9]">
              <TextScramble>{project.title}</TextScramble>
            </h1>
            <div className="flex flex-wrap gap-1.5 md:justify-end">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/25 px-2.5 py-1 text-[9px] uppercase tracking-wide text-white/75"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="mb-10 grid grid-cols-2 border-b border-white/15 pb-6 md:grid-cols-4">
          {[
            ["Client", project.client],
            ["Location", project.location],
            ["Services", project.category],
            ["Year", project.year],
          ].map(([label, value]) => (
            <div key={label} className="py-3 pr-4 md:py-4">
              <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
                {label}
              </p>
              <p className="text-xs text-white/85">{value}</p>
            </div>
          ))}
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            Overview
          </h2>
          <p className="max-w-4xl text-sm leading-relaxed text-white/80 md:text-base">
            {project.intro}
          </p>
        </section>

        {featureMedia && (
          <section className="mb-10 overflow-hidden rounded-lg bg-[#111111]">
            <ProjectMedia
              media={featureMedia}
              title={project.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </section>
        )}

        {storySections.length > 0 && (
          <section className="mb-10 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              Started from
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {storySections.map((section) => (
                <article
                  key={`${project.slug}-${section.label}`}
                  className="space-y-3"
                >
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">
                    {section.label}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/65">
                    {section.copy}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="mb-12 grid grid-cols-2 gap-2 md:gap-3">
            {gallery.map((media, index) => {
              const wide = index % 7 === 4;
              return (
                <div
                  key={`${project.slug}-gallery-${index}`}
                  className={`overflow-hidden rounded-lg bg-[#111111] ${
                    wide ? "col-span-2" : "col-span-1"
                  }`}
                  data-aos="fade-up"
                >
                  <ProjectMedia
                    media={media}
                    title={`${project.title} — image ${index + 2}`}
                    className={`w-full object-cover ${
                      wide ? "aspect-[2/1]" : "aspect-[4/3]"
                    }`}
                  />
                </div>
              );
            })}
          </section>
        )}

        {resultSection && (
          <section className="mb-10 grid gap-6 border-t border-white/15 pt-6 md:grid-cols-[1fr_2fr] md:gap-12">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
              Results
            </h2>
            <p className="max-w-4xl text-xs leading-relaxed text-white/70">
              {resultSection.copy}
            </p>
          </section>
        )}

        <section className="mb-14 grid gap-6 border-t border-white/15 pt-6 md:grid-cols-[1fr_2fr] md:gap-12">
          <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
            Credits
          </h2>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-4">
            {project.metrics.map((metric) => (
              <div key={`${project.slug}-${metric.label}`}>
                <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                  {metric.label}
                </p>
                <p className="text-xs leading-relaxed text-white/80">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/15 pt-6">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <span className="mb-2 block font-mono text-[9px] text-white/50">
                ·
              </span>
              <h2 className="text-3xl tracking-[-0.06em] md:text-5xl">
                Other Works
              </h2>
            </div>
            <Link
              to="/work"
              className="text-right transition-opacity hover:opacity-60"
            >
              <span className="block text-xl leading-none">
                ({String(projects.length - 1).padStart(2, "0")})
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.14em]">
                View all
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {related.map((item) => {
              const itemProject = normalizeProject(item);

              return (
                <Link
                  key={itemProject.slug}
                  to={`/work/${itemProject.slug}`}
                  className="group block overflow-hidden rounded-lg border border-white/10"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-[#111111]">
                    <ProjectMedia
                      media={itemProject.heroMedia}
                      title={itemProject.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <h3 className="border-t border-white/10 px-3 py-2 text-sm text-white/90">
                    {itemProject.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </section>

        <div className="mt-20 text-center">
          <MotionLink
            to="/startaproject"
            data-blob
            style={{ x: ctaMagnetic.x, y: ctaMagnetic.y }}
            onPointerEnter={ctaMorph.onPointerEnter}
            onPointerLeave={(event) => {
              ctaMorph.onPointerLeave(event);
              ctaMagnetic.onPointerLeave(event);
            }}
            onPointerMove={(event) => {
              ctaMorph.onPointerMove(event);
              ctaMagnetic.onPointerMove(event);
            }}
            className="hero-cta relative isolate inline-flex items-center justify-center overflow-hidden rounded-sm border border-white/15 bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-tight text-black/80 transition hover:bg-white/10"
          >
            <Motion.span
              aria-hidden="true"
              className="cta-morph"
              style={{
                left: ctaMorph.left,
                top: ctaMorph.top,
                scale: ctaMorph.scale,
              }}
            />
            <span className="relative z-[1]">{project.cta}</span>
          </MotionLink>
        </div>
      </div>
    </main>
  );
}

export default CaseStudy;
