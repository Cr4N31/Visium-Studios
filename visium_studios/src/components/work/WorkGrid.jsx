import ProjectCard from "./ProjectCard";

// Splits the list into rows of two. An odd leftover becomes a full-width row.
function toRows(items, size = 2) {
  const rows = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

// Mobile aspect ratios give the single column a rhythm (landscape for the
// "wide" slot, portrait for the "narrow" slot). From md up, the row owns
// the height, so both cards in a row always line up exactly.
const SLOT = {
  wide: "aspect-[4/3]",
  narrow: "aspect-[4/5]",
  full: "aspect-[4/3] md:aspect-[16/9]",
};

function Cell({ slot, children }) {
  return (
    <div
      className={`${SLOT[slot]} md:aspect-auto relative min-h-0 overflow-hidden rounded-xl bg-neutral-200 md:rounded-2xl [&>*]:h-full [&>*]:w-full`}
    >
      {children}
    </div>
  );
}

function WorkGrid({ projects }) {
  const rows = toRows(projects);

  return (
    <div className="flex flex-col gap-2 md:gap-3">
      {rows.map((row, rowIndex) => {
        const isFull = row.length === 1;
        const flipped = rowIndex % 2 === 1;

        // Which slot each card takes in this row
        const slots = isFull
          ? ["full"]
          : flipped
            ? ["narrow", "wide"]
            : ["wide", "narrow"];

        const columns = isFull
          ? "md:grid-cols-1 md:aspect-[16/9]"
          : flipped
            ? "md:grid-cols-[1fr_2fr] md:aspect-[2.7/1]"
            : "md:grid-cols-[2fr_1fr] md:aspect-[2.7/1]";

        return (
          <div
            key={row.map((p) => p.id).join("-")}
            className={`grid grid-cols-1 gap-2 md:gap-3 ${columns}`}
          >
            {row.map((project, i) => (
              <Cell key={project.id} slot={slots[i]}>
                <ProjectCard project={project} />
              </Cell>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default WorkGrid;
