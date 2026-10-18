import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sortedInsights } from "../../data/insights";

const MotionArticle = motion.article;

function InsightRow({ article, index }) {
  const imageFirst = index % 2 === 0;

  return (
    <MotionArticle
      className="grid grid-cols-[minmax(0,1fr)_3rem] overflow-hidden rounded-md md:grid-cols-[minmax(0,1fr)_3.75rem]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/insights/${article.slug}`}
        className="group col-start-1 row-start-1 grid min-w-0 overflow-hidden border border-gray-500/20 md:min-h-28 md:grid-cols-2"
      >
        <div
          className={`relative aspect-[16/7] overflow-hidden md:aspect-auto md:min-h-28 ${
            imageFirst ? "md:order-1" : "md:order-2"
          }`}
        >
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </div>

        <div
          className={`flex min-w-0 flex-col justify-center px-5 py-5 md:px-7 md:py-4 ${
            imageFirst ? "md:order-2 md:border-l" : "md:order-1 md:border-r"
          }`}
        >
          <h3 className="font-mono text-lg uppercase leading-tight tracking-[-0.04em] md:text-xl">
            {article.title}
          </h3>
          <p className="mt-3 max-w-2xl text-xs leading-relaxed text-white/70 md:text-[11px]">
            {article.excerpt}
          </p>
        </div>
      </Link>

      <Link
        to={`/insights/${article.slug}`}
        aria-label={`Read more: ${article.title}`}
        className="group col-start-2 row-start-1 flex items-center justify-center border border-gray-500/20 bg-[#0B0B0B] transition-colors hover:bg-white hover:text-black"
      >
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] [writing-mode:vertical-rl] rotate-180">
          Read more
        </span>
      </Link>
    </MotionArticle>
  );
}

function StudioNotes() {
  return (
    <section className="bg-[#0B0B0B] px-3 py-8 text-white sm:px-5 md:px-8 md:py-10">
      <div className="mx-auto max-w-[90rem]">
        <header className="mb-8 flex items-center justify-between gap-4 border-b border-black/10 pb-6">
          <div className="flex items-start gap-2 md:gap-3">
            <sup className="mt-[0.5em] font-mono text-xs md:text-sm">(06)</sup>
            <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
              Insights
            </h2>
          </div>
          <Link
            to="/insights"
            className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] transition-opacity hover:opacity-55"
          >
            [All posts]
          </Link>
        </header>

        <div className="flex flex-col gap-3">
          {sortedInsights.slice(0, 3).map((article, index) => (
            <InsightRow key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StudioNotes;
