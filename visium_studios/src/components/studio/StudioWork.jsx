import { Link } from "react-router-dom";
import projects from "../../data/projects";
import ProjectCard from "../work/ProjectCard";

const selectedProjects = projects.filter((project) => project.featured).slice(0, 2);

function StudioWork() {
  return (
    <section id="studio-work" className="border-t border-white/10 px-8 py-20 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between md:mb-14">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/40">
              Selected work
            </p>
            <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-normal leading-[0.95] tracking-[-0.06em]">
              The work speaks.
            </h2>
          </div>
          <Link
            to="/work"
            className="w-fit border-b border-white/30 pb-1 text-xs uppercase tracking-[0.15em] text-white/70 transition-colors hover:border-white hover:text-white"
          >
            Explore all work <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {selectedProjects.map((project) => (
            <div
              key={project.id}
              className="aspect-[3/2] overflow-hidden bg-white/5"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudioWork;
