import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AccordionItem({ q, a, isOpen, onToggle }) {
  return (
    <div className="border-t border-white/10 py-6">
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

function BrandingPageLayout({
  title,
  intro,
  sections = [],
  services = [],
  projects = [],
  faqs = [],
  ctaHref = "/contact",
  ctaLabel = "Start a project →",
}) {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-black text-white">
      <section className="px-6 pb-16 pt-28 sm:px-10 md:pt-40">
        <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-normal leading-[1.05] text-white">
          {title}
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base">
          {intro}
        </p>
      </section>

      {sections.map((section, index) => (
        <section
          key={section.heading || index}
          className="grid grid-cols-1 gap-8 border-t border-white/10 px-6 py-16 sm:px-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16"
        >
          <div>
            <span className="block text-xs text-white/40">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 text-xl font-normal uppercase tracking-tight text-white sm:text-2xl">
              {section.heading}
            </h2>
          </div>
          <div className="max-w-2xl space-y-5 text-sm leading-relaxed text-white/70 sm:text-base">
            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {section.list && section.list.length > 0 ? (
              <div className="pt-2">
                <PointsList items={section.list} />
              </div>
            ) : null}
          </div>
        </section>
      ))}

      {services.length > 0 ? (
        <section className="grid grid-cols-1 gap-8 border-t border-white/10 px-6 py-16 sm:px-10 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
          <div>
            <span className="block text-xs text-white/40">
              {String(sections.length + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 text-xl font-normal uppercase tracking-tight text-white sm:text-2xl">
              Services
            </h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-sm leading-relaxed text-white/70 sm:text-base">
              Each part works on its own, and together they become a system.
            </p>
            <div className="mt-5">
              <PointsList items={services} />
            </div>
          </div>
        </section>
      ) : null}

      {projects.length > 0 ? (
        <section className="border-t border-white/10 px-6 py-16 sm:px-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,280px)_1fr] md:gap-16">
            <div>
              <span className="block text-xs text-white/40">
                {String(
                  sections.length + (services.length > 0 ? 2 : 1),
                ).padStart(2, "0")}
              </span>
              <h2 className="mt-2 text-xl font-normal uppercase tracking-tight text-white sm:text-2xl">
                Projects
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Complete brands, built from strategy through launch.
            </p>
          </div>

          <div className="mt-10 mb-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
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
            className="mt-12 text-xs uppercase tracking-wide text-white/60 underline-offset-4 hover:underline"
          >
            View all projects →
          </a>
        </section>
      ) : null}

      {faqs.length > 0 ? (
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
      ) : null}

      <section className="flex justify-center border-t border-white/10 px-6 py-16 sm:px-10">
        <a
          href={ctaHref}
          className="rounded-full border border-white/30 px-6 py-3 text-sm text-white hover:border-white/60"
        >
          {ctaLabel}
        </a>
      </section>
    </div>
  );
}

export default BrandingPageLayout;
