import ProjectCard from "./ProjectCard";

// grid-auto-rows gives every "unit" a fixed base height; tall/wide cards
// span multiples of that unit via row-span/col-span in ProjectCard, so the
// masonry stays on a strict underlying grid rather than free-floating.
function WorkGrid({ projects }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[220px] md:auto-rows-[260px]">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

export default WorkGrid;
