import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const coreServices = [
  {
    point: "Strategy & research",
    desc: "Positioning and direction, before a single pixel.",
  },
  {
    point: "Visual identity",
    desc: "Logo, color palette, typography, supporting graphic elements.",
  },
  {
    point: "Brand book",
    desc: "The rules for using it, with real applied examples.",
  },
  {
    point: "Digital extension",
    desc: "Site, e-commerce, video and motion content.",
  },
];

const brandingServices = [
  {
    point: "Logo creation",
    desc: "The primary mark and all of its variations.",
  },
  {
    point: "Visual identity",
    desc: "The complete system built around the logo.",
  },
  {
    point: "Brand book",
    desc: "The manual that keeps everything consistent.",
  },
  {
    point: "Rebranding",
    desc: "For businesses that have outgrown their current image.",
  },
  {
    point: "Web design & development",
    desc: "Sites and online stores that carry the identity through.",
  },
];

const projects = [
  { id: 1, name: "Atmos", category: "Specialty coffee", size: "wide" },
  { id: 2, name: "Northline", category: "Fintech product", size: "square" },
  { id: 3, name: "Ferrum & Co", category: "Manufacturing", size: "tall" },
];

const faqs = [
  {
    q: "What does a branding project with Visium include?",
    a: "Strategy and positioning first, then identity, then the brand book that keeps it all consistent as your team grows.",
  },
  {
    q: "How long does it take?",
    a: "Most branding engagements run 4 to 8 weeks depending on scope, with strategy and research taking up the first stretch.",
  },
  {
    q: "What do I receive at the end?",
    a: "A full identity system, usage guidelines, and source files, ready to hand to any team that touches the brand next.",
  },
  {
    q: "Do you work with early-stage founders specifically?",
    a: "Yes, that's who we build for. Clarity matters most before a brand has an established audience to lean on.",
  },
  {
    q: "Can this extend into a website build?",
    a: "Yes, branding and web design & development are handled by the same team, so the identity carries through without translation loss.",
  },
];

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-t border-black/10 py-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="text-base font-normal sm:text-lg">{q}</span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
          className="shrink-0 text-2xl font-light"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PointsList({ items }) {
  return (
    <ul className="space-y-4">
      {items.map(({ point, desc }) => (
        <li key={point} className="flex flex-col gap-1 sm:flex-row sm:gap-2">
          <span className="font-medium">{point}:</span>
          <span className="text-white/60">{desc}</span>
        </li>
      ))}
    </ul>
  );
}

function Branding() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-black text-white">
      {/* Header */}
      <section className="px-6 pb-16 pt-28 sm:px-10 md:pt-40">
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-normal leading-[1.05] text-white">
          Branding
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          Branding means the complete system through which your business is
          recognized: strategy, visual name, logo, colors, typography, and the
          rules that hold them together. At Visium Studios, we focus on
          strategy, positioning, identity, and art direction.
        </p>
      </section>

      {/* 01 — What it means */}
      <section className="grid grid-cols-1 gap-8 border-t border-white/10 px-6 py-16 sm:px-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
        <div>
          <span className="block text-xs text-white/40">01</span>
          <h2 className="mt-2 text-xl font-normal uppercase tracking-tight text-white sm:text-2xl">
            What it means, concretely
          </h2>
        </div>
        <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-white/70 sm:text-base">
          <p>
            A brand is the overall perception of your product. It is the overall
            reputation and gut feeling people have about your product. They
            focus too much on flashy and unnecessary presentations on posts,
            websites, fliers, banners etc, so first-time visitors and customers
            don't quickly understand what the company does or what the product
            is about — this causes high cognitive overload and low conversion
            rates. At Visium we strictly believe in a clarity-first,
            design-second approach, where we communicate and tell the story of
            your product to your customers, providing clarity, advertising the
            purpose of your product and strengthening the trust of customers in
            your product.
          </p>
          <p>
            Most entrepreneurs and business owners often struggle to build a
            lasting brand because they focus too much on a logo instead of a
            clear strategy, and most branding agencies frequently overlook the
            internal team culture and long-term brand management. They focus too
            much on flashy and unnecessary presentations on posts, websites,
            fliers, banners etc, so first-time visitors and customers don't
            quickly understand what the company does or what the product is
            about — this causes high cognitive overload and low conversion
            rates.
          </p>
          <p>
            At Visium we strictly believe in a clarity-first, design-second
            approach, where we communicate and tell the story of your product to
            your customers, providing clarity, advertising the purpose of your
            product and strengthening the trust of customers in your product.
          </p>
          <div className="pt-2">
            <PointsList items={coreServices} />
          </div>
        </div>
      </section>

      {/* 02 — Services */}
      <section className="grid grid-cols-1 gap-8 border-t border-white/10 px-6 py-16 sm:px-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
        <div>
          <span className="block text-xs text-white/40">02</span>
          <h2 className="mt-2 text-xl font-normal uppercase tracking-tight text-white sm:text-2xl">
            Branding services
          </h2>
        </div>
        <div className="max-w-2xl">
          <p className="text-sm leading-relaxed text-white/70 sm:text-base">
            Each part works on its own, and together they become a system.
          </p>
          <div className="mt-5">
            <PointsList items={brandingServices} />
          </div>
        </div>
      </section>

      {/* 03 — Projects */}
      <section className="border-t border-white/10 px-6 py-16 sm:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
          <div>
            <span className="block text-xs text-white/40">03</span>
            <h2 className="mt-2 text-xl font-normal uppercase tracking-tight text-white sm:text-2xl">
              Projects
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Complete brands, built from strategy through launch.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 mb-8 sm:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id}>
              <div className="aspect-[4/5] w-full bg-white/10" />
              <p className="mt-3 font-medium text-white">{project.name}</p>
              <p className="text-sm text-white/50">{project.category}</p>
            </div>
          ))}
        </div>

        <a
          href="/work"
          type="button"
          className="mt-12 text-xs uppercase tracking-wide text-white/60 underline-offset-4 hover:underline"
        >
          View all projects →
        </a>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/10 px-6 py-16 sm:px-10">
        <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-normal leading-[1.05] text-white">
          Frequently asked questions
        </h2>
        <div className="mt-8 max-w-3xl">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="flex justify-center border-t border-white/10 px-6 py-16 sm:px-10">
        <a
          type="button"
          href="/contact"
          className="rounded-full border border-white/30 px-6 py-3 text-sm text-white hover:border-white/60"
        >
          Start a project →
        </a>
      </section>
    </div>
  );
}

export default Branding;
