import ProjectCard from "./ProjectCard";

function Cell({ orphan, children }) {
  return (
    <div
      className={`relative min-h-0 overflow-hidden rounded-xl bg-neutral-200 md:rounded-2xl [&>*]:h-full [&>*]:w-full ${
        orphan ? "aspect-[4/3] md:col-span-2 md:aspect-[16/9]" : "aspect-[4/3]"
      }`}
    >
      {children}
    </div>
  );
}

function WorkGrid({ projects }) {
  const hasOrphan = projects.length % 2 === 1;

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3">
      {projects.map((project, i) => (
        <Cell key={project.id} orphan={hasOrphan && i === projects.length - 1}>
          <ProjectCard project={project} />
        </Cell>
      ))}
    </div>
  );
}

export default WorkGrid;
