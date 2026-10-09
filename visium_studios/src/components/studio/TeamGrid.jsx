import team from "../../data/team";

function TeamGrid() {
  return (
    <section className="px-6 py-24 md:px-12 md:py-32">
      <div className="py-8">
        <h2 className="text-[clamp(2.5rem,7vw,6rem)] font-normal leading-[0.95]">
          The Team grid.
        </h2>
      </div>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-16">
        {team.map((member, i) => (
          <li key={member.name} className="group flex flex-col">
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-200">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-3">
              <h3 className="text-[clamp(1rem,1.4vw,1.25rem)] font-medium leading-tight tracking-tight">
                {member.name}
              </h3>
            </div>

            <p className="mt-1 text-xs uppercase tracking-[0.14em] opacity-60">
              {member.role}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TeamGrid;
