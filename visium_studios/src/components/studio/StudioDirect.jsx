import { motion as Motion } from "framer-motion";
import team from "../../data/team";

const disciplines = [
  {
    number: "01",
    title: "Strategy & direction",
    description:
      "We find the sharpest expression of a business: its position, its point of view and the story people should remember.",
    people: ["Jace Kayode", "Gold Wuraola"],
  },
  {
    number: "02",
    title: "Identity & systems",
    description:
      "We turn that direction into a distinctive visual language, with the rules and range to stay coherent as a brand grows.",
    people: ["Wisdom Chukwu", "Emmanuel Babalola"],
  },
  {
    number: "03",
    title: "Digital & motion",
    description:
      "We carry the identity into the places people meet it: digital products, websites, animation and moving image.",
    people: ["Bitrus Duniya", "Chike Emmanuel", "Nathan Araujo"],
  },
];

function StudioDirect() {
  return (
    <section
      id="studio-disciplines"
      className="border-t border-white/10 px-8 py-20 md:py-32"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
              What we bring together
            </p>
            <h2 className="max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-normal leading-[0.95] tracking-[-0.06em]">
              Different disciplines.{" "}
              <span className="text-white/40">One direction.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-white/50 md:justify-self-end md:text-base">
            Specialists work side by side, not in separate lanes. That means
            strategy informs the design, and the design carries through every
            experience.
          </p>
        </div>

        <div className="grid border-t border-white/15 md:grid-cols-3 md:divide-x md:divide-white/10">
          {disciplines.map((discipline) => (
            <Motion.article
              key={discipline.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col border-b border-white/10 py-7 md:border-b-0 md:px-7 md:py-8 first:md:pl-0 last:md:pr-0"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                Discipline
              </span>
              <h3 className="mt-7 text-2xl font-normal leading-tight tracking-[-0.04em] md:text-3xl">
                {discipline.title}
              </h3>
              <p className="mt-4 min-h-20 max-w-md text-sm leading-relaxed text-white/50">
                {discipline.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5">
                {discipline.people.map((name) => {
                  const person = team.find((member) => member.name === name);
                  if (!person) return null;
                  return (
                    <div key={person.name} className="flex items-center gap-3">
                      <img
                        src={person.image}
                        alt=""
                        loading="lazy"
                        className="h-10 w-10 rounded-full object-cover grayscale"
                      />
                      <div>
                        <p className="text-sm text-white/85">{person.name}</p>
                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/40">
                          {person.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudioDirect;
