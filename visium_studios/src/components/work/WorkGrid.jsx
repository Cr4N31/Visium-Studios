import { useRef, useState } from "react";
import {
  motion as Motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import ProjectCard from "./ProjectCard";

function ProjectSlide({ project, index, progress, isActive }) {
  const position = progress;
  const opacity = useTransform(
    position,
    [index - 0.7, index, index + 0.7],
    [0, 1, 0],
  );
  const x = useTransform(
    position,
    [index - 1, index, index + 1],
    ["100vw", "0vw", "-100vw"],
  );
  const pointerEvents = useTransform(opacity, (value) =>
    value > 0.5 ? "auto" : "none",
  );

  return (
    <Motion.div
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity, x, pointerEvents }}
      aria-hidden={!isActive}
      inert={!isActive}
    >
      <ProjectCard project={project} summaryBelow presentation />
    </Motion.div>
  );
}

function WorkGrid({ projects }) {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.35,
  });
  const slideProgress = useTransform(
    smoothScrollProgress,
    [0, 1],
    [0, Math.max(0, projects.length - 1)],
  );
  useMotionValueEvent(slideProgress, "change", (value) => {
    setActiveIndex(Math.round(value));
  });

  if (projects.length === 0) return null;

  return (
    <div
      ref={sectionRef}
      aria-label="Selected projects"
      className="relative"
      role="region"
      style={{ height: `${projects.length * 100}svh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {projects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={index}
            progress={slideProgress}
            isActive={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default WorkGrid;
