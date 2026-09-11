import { Link } from "react-router-dom";

function RelatedProjects({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="border-t border-white/10 pt-14 pb-24 px-4 md:px-10">
      <span className="text-white/40 text-xs uppercase tracking-widest">
        Next up
      </span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/work/${project.slug}`}
            className="group block"
          >
            <div
              className="h-56 bg-white/5 mb-4"
              style={{
                backgroundImage: `url(${project.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <h4 className="text-white text-lg font-bold group-hover:opacity-70 transition-opacity">
              {project.title}
            </h4>
            <p className="text-white/50 text-sm mt-1">{project.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedProjects;
