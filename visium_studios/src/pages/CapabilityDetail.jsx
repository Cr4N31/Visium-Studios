import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { capabilities } from "../data/capabilitiesPage";

const capabilityStories = {
  brand: {
    intro:
      "A brand is more than the mark people recognize. It is the set of choices that makes a business feel distinct, credible and consistent wherever someone encounters it.",
    challenge:
      "As a business changes, the identity it started with can stop reflecting its ambition. A familiar logo cannot do all the work if the imagery, typography and tone shift from one touchpoint to the next. The brand becomes harder to recognize, and the team is left making disconnected decisions without a clear standard.",
    approach:
      "We get to the heart of what the business does differently, who it needs to reach and the position it wants to own. From there, we build a visual language with a point of view—then define how its marks, type, color, imagery and art direction work together. The system is designed to guide real decisions, not sit in a presentation.",
    outcome:
      "The result is a brand people can recognize and understand, and a team can use with confidence. A clear system brings consistency without making every expression look the same, giving the business room to grow without losing what makes it distinct.",
    workIntro:
      "Look beyond the logo: the typography, composition, imagery and supporting details all carry the same point of view across the identity.",
  },
  digital: {
    intro:
      "A website has to do more than look like the brand. It needs to make the offer clear, help people find their way and make every interaction feel considered.",
    challenge:
      "A visitor arrives with a question, often before they know much about the business. If the message is buried, the route through the site is confusing, or the design could belong to anyone, that first moment creates friction instead of understanding. A visually polished page alone cannot solve a confused experience.",
    approach:
      "We begin with what visitors need to understand and what the business needs the site to make possible. We shape the structure, content hierarchy and key journeys around those needs, then bring the brand's visual direction into the interface. Responsive behavior and interaction are part of the design, so the experience holds together beyond the first screen.",
    outcome:
      "The result is a website that explains the offer with less effort, gives the brand a distinctive and consistent home, and makes the next step easier to find. It feels designed as one connected experience rather than a collection of pages.",
    workIntro:
      "Notice how the visual language carries from the opening impression into page structure, content and the small interactions that guide people through.",
  },
  product: {
    intro:
      "Product design is felt in the moments people repeat: finding a feature, completing a task and knowing what will happen next. Clarity has to hold up as the product grows.",
    challenge:
      "As new features accumulate, familiar tasks can become buried beneath more choices and inconsistent patterns. People have to stop and work out where to go or what a control will do. Adding capability without improving the experience can make a product feel more powerful to its makers and less usable to the people who rely on it.",
    approach:
      "We follow the decisions users need to make, from the first step in a flow to the moments where they need feedback or a way to recover. We simplify paths where they create unnecessary effort, make interface patterns behave consistently and build a design system that can support new features without reinventing the basics.",
    outcome:
      "The result is a product that feels easier to learn and more predictable in everyday use, without removing the depth that makes it useful. Shared patterns give the team a stronger foundation to extend the experience as the product evolves.",
    workIntro:
      "See how the interface and its underlying patterns work as one: familiar enough for repeated use, clear enough to make complex tasks feel manageable.",
  },
  motion: {
    intro:
      "A brand does not stop at a still image. The way it moves—its pace, transitions and gestures—can make its character recognizable in a different way.",
    challenge:
      "When motion is added as an effect after the design is finished, it can feel disconnected from the identity or distract from the message. A fast reveal, a slow transition and a looping graphic each set a different tone; without a shared point of view, those moments make the brand feel inconsistent.",
    approach:
      "We first decide what movement should communicate about the brand, then give it a rhythm through pacing, transitions and visual gestures. Those principles shape the whole range—from a subtle interface response to a campaign sequence—so each moment has a reason to move and belongs to the same visual world.",
    outcome:
      "The result is a brand with a distinct rhythm and a more memorable presence in motion. Movement draws attention to what matters, carries the story forward and makes the identity feel alive without relying on spectacle.",
    workIntro:
      "Watch for the repeated cues in each sequence: the timing, transitions and gestures give movement a recognizable voice rather than treating it as decoration.",
  },
  development: {
    intro:
      "The final experience is the design people actually use—not the mockup. Development keeps the idea intact as it becomes a responsive, working product.",
    challenge:
      "A visual detail can be easy to approve in a static layout and difficult to preserve across screen sizes, browsers and real interactions. When development begins after design is considered finished, small compromises accumulate: the intended rhythm disappears, behavior feels bolted on and what ships no longer feels like the original idea.",
    approach:
      "We keep design and development connected from the start, considering how the experience responds, loads and behaves as it is shaped. We translate the visual direction into working interfaces, accounting for responsive layouts and interaction in the build itself. That close feedback loop helps resolve the gap between what was designed and what can be used.",
    outcome:
      "The result is a responsive, working experience that preserves the character of the design in real use. The details are not lost at handoff; they become part of the finished product people encounter.",
    workIntro:
      "These examples show the visual direction carried into the browser, where responsive layouts and interaction become part of the design rather than an afterthought.",
  },
};

function CapabilityDetail() {
  const { slug } = useParams();
  const item = capabilities.find((capability) => capability.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) return <Navigate to="/capabilities" replace />;

  const index = capabilities.indexOf(item);
  const story = capabilityStories[item.id];

  return (
    <main className="bg-black text-white">
      <header className="px-4 pb-16 pt-32 md:px-10 md:pb-24 md:pt-44">
        <Link
          to="/capabilities"
          className="mb-12 inline-flex text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-white"
        >
          ← All capabilities
        </Link>
        <p className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/40">
          0{index + 1} / Capability
        </p>
        <h1 className="max-w-6xl text-[clamp(2.5rem,8vw,7rem)] font-normal leading-[0.95] tracking-[-0.06em]">
          {item.title}
        </h1>
        <p className="mt-8 max-w-3xl text-[clamp(1.5rem,3.5vw,3rem)] leading-[1.05] tracking-[-0.04em] text-white/75">
          {item.statement}
        </p>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
          {story.intro}
        </p>
      </header>

      <section className="border-t border-white/10 px-4 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              The challenge
            </span>
          </div>
          <p className="max-w-3xl text-xl leading-relaxed tracking-[-0.02em] text-white/75 md:text-3xl md:leading-snug">
            {story.challenge}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:mt-24 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16 md:pt-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              Our approach
            </span>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-white/60 md:text-xl">
            {story.approach}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-white/10 pt-8 md:mt-24 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16 md:pt-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              What this makes possible
            </span>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-white/60 md:text-xl">
            {story.outcome}
          </p>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 md:px-10 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
              The work
            </span>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-relaxed text-white/60 md:text-xl">
              {story.workIntro}
            </p>
            <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
              {item.does.map((service) => (
                <li
                  key={service}
                  className="border-t border-white/15 py-4 text-lg tracking-[-0.03em] text-white/80 md:text-xl"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-4 py-16 md:px-10 md:py-24">
        <p className="mb-8 text-[11px] uppercase tracking-[0.2em] text-white/40">
          Selected work / {item.label}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5">
          {item.slctdWrk.map((src, imageIndex) => (
            <img
              key={`${src}-${imageIndex}`}
              src={encodeURI(src)}
              alt={`${item.title} selected work ${imageIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-8 border-t border-white/10 px-4 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-24">
        <p className="max-w-2xl text-2xl leading-tight tracking-[-0.04em] md:text-4xl">
          Have a project that needs {item.label.toLowerCase()}?
        </p>
        <Link
          to="/startaproject"
          className="hero-cta relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full border-2 border-white bg-white px-8 py-4 text-black transition-colors hover:border-white"
        >
          <span className="relative z-[1] font-semibold">
            Start a project →
          </span>
        </Link>
      </section>
    </main>
  );
}

export default CapabilityDetail;
