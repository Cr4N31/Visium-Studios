import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../../data/projects";
import CaseStudySection from "./CaseStudySection";
import RelatedProjects from "./RelatedProjects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const maskReveal = {
  hidden: { y: "100%" },
  show: {
    y: "0%",
    transition: {
      duration: 0.9,
      ease: [0.65, 0, 0.35, 1],
    },
  },
};

function CaseStudy() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const scrollRef = useRef(null);
  const [nextProjectVisible, setNextProjectVisible] = useState(false);
  const [nextProgress, setNextProgress] = useState(0);
  const [prevVisible, setPrevVisible] = useState(false);
  const [prevProgress, setPrevProgress] = useState(0);
  const transitionLock = useRef(false);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const previousProject =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];

  useEffect(() => {
    transitionLock.current = false;
  }, [slug]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (event) => {
      const maxScroll = Math.max(el.scrollHeight - el.clientHeight, 1);
      const scrollRatio = el.scrollTop / maxScroll;
      const nextTriggerRatio = 0.82;

      if (event.deltaY > 0 && scrollRatio >= nextTriggerRatio) {
        const progress = Math.min(
          Math.max(
            (scrollRatio - nextTriggerRatio) / (1 - nextTriggerRatio),
            0,
          ),
          1,
        );
        setNextProjectVisible(true);
        setNextProgress(progress);

        if (event.deltaY > 75 && !transitionLock.current && nextProject) {
          transitionLock.current = true;
          setNextProgress(1);
          window.setTimeout(() => navigate(`/work/${nextProject.slug}`), 260);
        }
        return;
      }

      setNextProjectVisible(false);
      setNextProgress(0);
      setPrevVisible(false);
      setPrevProgress(0);
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [navigate, nextProject, previousProject]);

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  const normalizeMediaItem = (item, fallbackLabel, fallbackType = "image") => {
    if (typeof item === "string") {
      return {
        src: item,
        type: item.endsWith(".gif") ? "gif" : fallbackType,
        alt: `${project.title} ${fallbackLabel}`,
      };
    }

    const src = item?.src || item?.url || item?.path || "";
    const type =
      item?.type || item?.kind || (src.endsWith(".gif") ? "gif" : fallbackType);

    return {
      src,
      type,
      alt: item?.alt || `${project.title} ${fallbackLabel}`,
    };
  };

  const videoItems = Array.isArray(project.src)
    ? project.src.map((item) => normalizeMediaItem(item, "video media", "gif"))
    : [];

  const galleryItems = Array.isArray(project.gallery)
    ? project.gallery.map((item) =>
        normalizeMediaItem(item, "gallery media", "image"),
      )
    : [];

  return (
    <main className="bg-black text-white">
      <div
        ref={scrollRef}
        className="w-full overflow-x-hidden overflow-y-auto bg-black [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <section className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden px-4 py-6 md:px-10 md:py-8">
          <div className="absolute inset-0 z-0">
            {project.heroMedia.endsWith(".gif") ? (
              <img
                src={encodeURI(project.heroMedia)}
                alt={`${project.title} hero media`}
                className="h-full w-full object-cover"
              />
            ) : (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={encodeURI(project.coverImage)}
                className="h-full w-full object-cover"
              >
                <source src={encodeURI(project.heroMedia)} type="video/mp4" />
              </video>
            )}
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative z-10 flex items-center mt-10 justify-between gap-4">
            <Link
              to="/work"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/80 transition hover:bg-white/10"
            >
              ← Back
            </Link>
          </div>

          <div className="relative z-10 mt-8 grid items-end gap-8 md:grid-cols-[1.3fr_0.9fr] md:gap-12">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="max-w-3xl"
            >
              <h1 className="mt-4 overflow-hidden leading-none">
                <motion.span
                  className="block text-5xl font-medium tracking-[-0.06em] text-[#f2efe8] drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)] md:text-[7rem]"
                  variants={maskReveal}
                >
                  {project.title}
                </motion.span>
              </h1>

              <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/75 md:text-xl">
                <p>{project.brief}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {project.sections.map((section, i) => (
          <section key={section.label} className="px-4 py-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-5xl">
              <CaseStudySection
                label={section.label}
                content={section.content}
                index={i + 1}
              />
            </div>
          </section>
        ))}

        {videoItems.length > 0 && (
          <div className="px-4 pt-8 md:px-10 md:pt-12">
            <div className="mx-auto max-w-5xl">
              <div className="mb-4 text-[11px] uppercase tracking-[0.26em] text-white/55">
                Video / GIFs
              </div>
            </div>
          </div>
        )}

        {videoItems.map((item, i) => (
          <motion.section
            key={`${project.slug}-video-${i}`}
            initial={{
              opacity: 0,
              y: 48,
              scale: 0.985,
              rotate: i % 2 === 0 ? -0.35 : 0.35,
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.03,
            }}
            className="px-4 md:px-10"
          >
            <div
              className={`mx-auto max-w-5xl ${i % 2 === 0 ? "md:-translate-y-1" : "md:translate-y-1"}`}
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
                {item.type === "video" ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="w-full object-cover"
                  >
                    <source src={encodeURI(item.src)} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={encodeURI(item.src)}
                    alt={item.alt || `${project.title} video media ${i + 1}`}
                    className="w-full object-cover transition duration-500 ease-out hover:scale-[1.015]"
                  />
                )}
              </div>
            </div>
          </motion.section>
        ))}

        {galleryItems.length > 0 && (
          <div className="px-4 pt-8 md:px-10 md:pt-12">
            <div className="mx-auto max-w-5xl">
              <div className="mb-4 text-[11px] uppercase tracking-[0.26em] text-white/55">
                Gallery
              </div>
            </div>
          </div>
        )}

        {galleryItems.map((item, i) => (
          <motion.section
            key={`${project.slug}-gallery-${i}`}
            initial={{
              opacity: 0,
              y: 48,
              scale: 0.985,
              rotate: i % 2 === 0 ? -0.35 : 0.35,
            }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.03,
            }}
            className="px-4 md:px-10"
          >
            <div
              className={`mx-auto max-w-5xl ${i % 2 === 0 ? "md:-translate-y-1" : "md:translate-y-1"}`}
            >
              <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.32)]">
                <img
                  src={encodeURI(item.src)}
                  alt={item.alt || `${project.title} gallery media ${i + 1}`}
                  className="w-full object-cover transition duration-500 ease-out hover:scale-[1.015]"
                />
              </div>
            </div>
          </motion.section>
        ))}

        <section className="px-4 py-8 md:px-10 md:py-12">
          <div className="mx-auto max-w-6xl">
            <RelatedProjects projects={related} />
          </div>
        </section>
      </div>

      {previousProject && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: prevVisible ? 1 : 0,
            y: prevVisible ? 0 : 18,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-none fixed bottom-5 left-5 z-50 w-[260px] rounded-full border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-md"
        >
          <div className="mb-2 text-[9px] uppercase tracking-[0.26em] text-white/55">
            Previous project
          </div>
          <div className="text-base font-medium text-white">
            {previousProject.title}
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: `${Math.min(prevProgress * 100, 100)}%` }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}

      {nextProject && (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{
            opacity: nextProjectVisible ? 1 : 0,
            y: nextProjectVisible ? 0 : 18,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-none fixed bottom-5 right-5 z-50 w-[260px] rounded-full border border-white/15 bg-white/5 px-4 py-3 backdrop-blur-md"
        >
          <div className="mb-2 text-[9px] uppercase tracking-[0.26em] text-white/55">
            Next project
          </div>
          <div className="text-base font-medium text-white">
            {nextProject.title}
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: `${Math.min(nextProgress * 100, 100)}%` }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}
    </main>
  );
}

export default CaseStudy;
