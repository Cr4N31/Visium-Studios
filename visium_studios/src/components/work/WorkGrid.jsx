import { useState } from "react";
import EditorialProjectCard from "./EditorialProjectCard";
import HeroCTA from "../home/hero/HeroCTA";

const FILTERS = [
  "All",
  "Website",
  "UI/UX Design",
  "Development",
  "Branding",
  "SEO Optimization",
  "SMM",
];

const STATS = [
  {
    label: "Projects Done",
    value: "150+",
    description: "Successfully launched digital products and websites.",
  },
  {
    label: "Global Clients",
    value: "40+",
    description: "Working with brands across 15 different countries.",
  },
  {
    label: "Industry Awards",
    value: "12",
    description: "Recognized globally for our design excellence.",
  },
];

function WorkGrid({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.tags?.includes(activeFilter));

  return (
    <div>
      <section
        aria-label="Studio statistics and contact"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(17rem,1.15fr)] lg:items-center lg:gap-8"
      >
        {STATS.map((stat) => (
          <article key={stat.label} className="max-w-xs">
            <h2 className="text-sm">{stat.label}</h2>
            <p className="mt-3 text-3xl leading-none tracking-[-0.05em] md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-3 max-w-[24ch] text-xs leading-relaxed text-white/60">
              {stat.description}
            </p>
          </article>
        ))}
        <HeroCTA variant="compact" />
      </section>

      <div
        className="mt-16 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter projects by service"
      >
        {FILTERS.map((filter) => {
          const selected = activeFilter === filter;
          return (
            <button
              key={filter}
              type="button"
              aria-pressed={selected}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-lg border px-4 py-2.5 text-xs transition-colors ${
                selected
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/5 text-white hover:border-white/40"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="mt-8 flex flex-col gap-3 md:gap-4">
          {filteredProjects.map((project) => (
            <EditorialProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-8 border-t border-white/15 py-8 text-sm text-white/60">
          No projects match this filter yet.
        </p>
      )}
    </div>
  );
}

export default WorkGrid;
