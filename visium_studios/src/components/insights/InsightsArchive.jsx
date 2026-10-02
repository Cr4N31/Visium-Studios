import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sortedInsights, categories, formatDate } from "../../data/insights";

const filters = ["All", ...categories];
const ease = [0.22, 1, 0.36, 1];

function InsightRow({ article }) {
  return (
    <motion.li
      className="border-t border-white/20 last:border-b"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease }}
    >
      <Link
        to={`/insights/${article.slug}`}
        className="group flex items-start justify-between gap-5 py-6 md:gap-12 md:py-10"
      >
        <div className="flex min-w-0 flex-1 flex-col gap-3 md:gap-5">
          <p className="flex flex-wrap gap-x-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
            <span>{article.category}</span>
            <span aria-hidden="true">/</span>
            <span>{formatDate(article.date)}</span>
          </p>

          <h2 className="max-w-3xl text-2xl font-medium leading-[1] tracking-[-0.04em] text-white transition-transform duration-500 group-hover:translate-x-1 md:text-5xl">
            {article.title}
          </h2>

          <p className="line-clamp-3 max-w-xl text-sm leading-relaxed text-white/55">
            {article.excerpt}
          </p>

          <span className="mt-2 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white">
            <span className="relative">
              Read
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>

        <div className="aspect-[4/3] w-24 shrink-0 overflow-hidden bg-white/5 sm:w-40 md:w-72">
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </Link>
    </motion.li>
  );
}

function InsightsArchive() {
  const [active, setActive] = useState("All");

  const list =
    active === "All"
      ? sortedInsights
      : sortedInsights.filter((a) => a.category === active);

  return (
    <section className="px-4 pb-24 -mt-36 md:px-10 md:pb-40">
      <div className="mb-10 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40">
          Archive (0{list.length})
        </p>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={active === f}
              onClick={() => setActive(f)}
              className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                active === f
                  ? "border-white bg-white text-black"
                  : "border-white/30 text-white/60 hover:border-white hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <motion.ul
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {list.map((article) => (
          <InsightRow key={article.id} article={article} />
        ))}
      </motion.ul>
    </section>
  );
}

export default InsightsArchive;
