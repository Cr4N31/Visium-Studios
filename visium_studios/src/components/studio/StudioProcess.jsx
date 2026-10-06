import { motion as Motion } from "framer-motion";
import team from "../../data/team";

const stages = [
  {
    number: "01",
    title: "Listen closely.",
    description:
      "We get to the heart of the business, the people it serves and the change it wants to make.",
    people: ["Fawaz Madelewi", "Chioma Okoye"],
  },
  {
    number: "02",
    title: "Find the direction.",
    description:
      "Together we define the position and visual idea that will give the brand a clear reason to be remembered.",
    people: ["Jace Kayode", "Gold Wuraola"],
  },
  {
    number: "03",
    title: "Make it a system.",
    description:
      "Designers, motion artists and digital specialists build the identity and its real-world expressions in parallel.",
    people: ["Wisdom Chukwu", "Emmanuel Babalola", "Bitrus Duniya"],
  },
  {
    number: "04",
    title: "Carry it forward.",
    description:
      "We bring every detail together, prepare the team to use it and stay close through the next stage of growth.",
    people: ["Ken Godswill", "Nathan Araujo", "Chike Emmanuel"],
  },
];

function StudioProcess() {
  return (
    <section className="border-t border-white/10 px-8 py-20 md:py-32">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[1fr_0.7fr] md:items-end">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/40">
              How we work
            </p>
            <h2 className="max-w-4xl text-[clamp(2.5rem,7vw,6rem)] font-normal leading-[0.95] tracking-[-0.06em]">
              One team, from first thought to final form.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-relaxed text-white/50 md:justify-self-end md:text-base">
            Every project has its own mix of people. The team stays small and
            connected so the people who shape the idea are still close to the
            details that bring it to life.
          </p>
        </div>

        <div className="border-t border-white/15">
          {stages.map((stage) => (
            <Motion.article
              key={stage.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 border-b border-white/10 py-7 md:grid-cols-[5rem_0.9fr_1.1fr_0.8fr] md:items-start md:gap-8 md:py-9"
            >
              <span className="text-xs text-white/35">{stage.number}</span>
              <h3 className="text-2xl font-normal leading-tight tracking-[-0.04em] md:text-3xl">
                {stage.title}
              </h3>
              <p className="max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
                {stage.description}
              </p>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {stage.people.map((name) => {
                  const person = team.find((member) => member.name === name);
                  if (!person) return null;
                  return (
                    <img
                      key={person.name}
                      src={person.image}
                      alt={person.name}
                      title={`${person.name} — ${person.role}`}
                      loading="lazy"
                      className="h-10 w-10 rounded-full border border-black object-cover grayscale transition-[filter] duration-300 hover:grayscale-0 md:h-12 md:w-12"
                    />
                  );
                })}
              </div>
            </Motion.article>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[5rem_1fr] md:gap-8">
          <span className="text-xs uppercase tracking-[0.18em] text-white/35">
            Why this way
          </span>
          <p className="max-w-4xl text-lg leading-relaxed text-white/70 md:text-2xl">
            Because a brand is experienced as a whole. Keeping strategy,
            design, motion and digital close means fewer handoffs, stronger
            decisions and one coherent idea wherever the work goes.
          </p>
        </div>
      </div>
    </section>
  );
}

export default StudioProcess;
