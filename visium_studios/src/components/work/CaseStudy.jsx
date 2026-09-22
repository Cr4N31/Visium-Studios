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

  return (
    <main className="bg-black text-white">
      <div
        ref={scrollRef}
        className="w-full overflow-x-hidden overflow-y-auto bg-black [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <section className="flex min-h-screen w-full flex-col justify-between px-4 py-6 md:px-10 md:py-8">
          <div className="flex items-center mt-10 justify-between gap-4">
            <Link
              to="/work"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/80 transition hover:bg-white/10"
            >
              ← Back
            </Link>
          </div>

          <div className="mt-8 grid items-end gap-8 md:grid-cols-[1.3fr_0.9fr] md:gap-12">
            <motion.div
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="max-w-3xl"
            >
              <h1 className="mt-4 overflow-hidden leading-none">
                <motion.span
                  className="block text-5xl font-medium tracking-[-0.06em] text-[#f2efe8] md:text-[7rem]"
                  variants={maskReveal}
                >
                  {project.title}
                </motion.span>
              </h1>

              <div className="mt-8 space-y-6 text-sm leading-relaxed text-white/75 md:text-xl">
                <p>{project.brief}</p>
              </div>

              <button className="mt-10 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-black transition hover:opacity-90">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-black" />
                Launch project
              </button>
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

        {project.gallery.map((img, i) => (
          <section key={i} className="px-4 py-8 md:px-10 md:py-12">
            <div className="mx-auto max-w-6xl">
              <div
                className="h-[50vh] w-full rounded-[24px] border border-white/10 bg-white/5 bg-cover bg-center md:h-[70vh]"
                style={{
                  backgroundImage: `url(${img})`,
                }}
              />
            </div>
          </section>
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
