const steps = [
  {
    id: 1,
    name: "Discover",
    duration: "3-5 days",
    desc: "We align on goals, audience, and constraints. We review analytics and current assets, run stakeholder interviews, and map risks and assumptions. The outcome is shared clarity on what success looks like.",
  },
  {
    id: 2,
    name: "Define",
    duration: "3-5 days",
    desc: "We translate goals into scope, timeline, and KPIs. We draft the roadmap, responsibilities, and the measurement plan so every step is testable. Trade-offs are explicit and documented.",
  },
  {
    id: 3,
    name: "Design",
    duration: "1-3 weeks",
    desc: "We explore concepts, then systematize into a modular UI and brand toolkit. Content structure, accessibility, and motion are specified so the build phase is predictable. Iterations are time-boxed with weekly reviews.",
  },
  {
    id: 4,
    name: "Build",
    duration: "1-4 weeks",
    desc: "We implement production-ready components, CMS schemas, and integrations. Performance budgets guide choices; QA runs continuously across devices. Analytics and events are instrumented from day one.",
  },
  {
    id: 5,
    name: "Launch",
    duration: "3-5 days",
    desc: "We ship behind a checklist: QA, Core Web Vitals, redirects, tracking, and security. We monitor the first 72 hours and fix issues fast. Your team gets a short handover and edit training.",
  },
  {
    id: 6,
    name: "Improve",
    duration: "Ongoing",
    desc: "We run experiments against KPIs and maintain in focused sprints. Insights feed the backlog; releases are small and frequent to keep momentum.",
  },
];

function HowWeWork() {
  return (
    <section className="bg-neutral-900 px-6 py-10 text-white">
      <div className="relative mx-auto flex max-w-5xl flex-col gap-16 md:gap-24">
        {steps.map((step) => {
          const isRight = step.id % 2 === 0;
          return (
            <article
              key={step.id}
              className={`flex flex-col gap-3 ${
                isRight ? "items-end text-right" : "items-start text-left"
              }`}
            >
              <span className="font-mono text-[10px] tracking-widest">
                [
                <span className={isRight ? "text-white" : "text-white"}>
                  {String(step.id).padStart(3, "0")}
                </span>
                ]
              </span>

              <h2 className="font-mono text-4xl font-bold uppercase leading-none md:text-7xl">
                {step.name}
              </h2>

              <p className="max-w-[16rem] text-[10px] leading-relaxed text-neutral-300 md:max-w-md md:text-sm">
                {step.desc}
              </p>

              <span className="font-mono text-[10px] font-bold uppercase tracking-widest md:text-xs">
                {step.duration}
              </span>
            </article>
          );
        })}

        {/* contact bar */}
        <a
          href="/contact"
          className="relative mt-4 flex h-12 items-center justify-center rounded-md bg-black font-mono text-[10px] font-bold uppercase tracking-widest md:h-16 md:text-sm"
        >
          Contact Manager
        </a>
      </div>
    </section>
  );
}

export default HowWeWork;
