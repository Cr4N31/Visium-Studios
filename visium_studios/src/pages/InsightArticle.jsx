import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  formatDate,
  getAdjacent,
  getInsight,
  getRelated,
} from "../data/insights";

const ease = [0.22, 1, 0.36, 1];

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-16 text-3xl font-medium leading-[1] tracking-[-0.04em] text-white md:text-5xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 text-xl font-medium tracking-[-0.03em] text-white md:text-2xl">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote className="my-14 text-2xl font-light italic leading-[1.1] tracking-[-0.03em] text-white md:text-4xl">
          “{block.text}”
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-14 md:-mx-16">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full object-cover"
          />
          {block.caption && (
            <figcaption className="mt-3 text-[11px] uppercase tracking-[0.15em] text-white/40">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return (
        <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
          {block.text}
        </p>
      );
  }
}

function InsightArticle() {
  const { slug } = useParams();
  const article = getInsight(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <Navigate to="/insights" replace />;

  const related = getRelated(slug, 2);
  const { prev, next } = getAdjacent(slug);

  return (
    <article className="bg-black text-white">
      {/* Opening */}
      <header className="px-4 pb-10 pt-32 md:px-10 md:pb-16 md:pt-44">
        <motion.p
          className="mb-6 text-[11px] uppercase tracking-[0.2em] text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {article.category}
        </motion.p>

        <motion.h1
          className="max-w-6xl text-[clamp(2.25rem,6.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
        >
          {article.title}
        </motion.h1>

        <div className="mt-10 flex flex-wrap gap-x-10 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-white/50">
          <p>{formatDate(article.date)}</p>
          <p>By {article.author}</p>
        </div>
      </header>

      <motion.div
        className="px-4 md:px-10"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease, delay: 0.2 }}
      >
        <img
          src={article.image}
          alt={article.title}
          className="aspect-[16/10] w-full object-cover md:aspect-[21/9]"
        />
      </motion.div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-14 md:px-0 md:pb-36 md:pt-24">
        {article.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* Related notes */}
      {related.length > 0 && (
        <section className="px-4 pb-24 md:px-10 md:pb-36">
          <p className="mb-8 text-[11px] uppercase tracking-[0.2em] text-white/40">
            Related notes
          </p>
          <div className="flex flex-col gap-12 md:flex-row md:gap-8">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/insights/${r.slug}`}
                className="group flex flex-col gap-4 md:w-1/2"
              >
                <div className="aspect-[16/10] overflow-hidden bg-white/5">
                  <img
                    src={r.image}
                    alt={r.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {r.category}
                </p>
                <h3 className="max-w-md text-2xl font-medium leading-[1] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-1">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Previous / Next */}
      <nav
        aria-label="More articles"
        className="flex flex-col gap-10 px-4 pb-24 md:flex-row md:justify-between md:gap-8 md:px-10"
      >
        {[
          { label: "Previous", item: prev, align: "" },
          { label: "Next", item: next, align: "md:text-right md:items-end" },
        ].map(({ label, item, align }) => (
          <Link
            key={label}
            to={`/insights/${item.slug}`}
            className={`group flex flex-col gap-3 md:w-1/2 ${align}`}
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              {label === "Previous" ? "← Previous" : "Next →"}
            </span>
            <span className="max-w-md text-xl leading-[1.05] tracking-[-0.03em] text-white/60 transition-colors duration-500 group-hover:text-white md:text-2xl">
              {item.title}
            </span>
          </Link>
        ))}
      </nav>

      {/* End */}
      <section className="px-4 pb-24 md:px-10 md:pb-40">
        <Link
          to="/contact"
          className="group inline-flex items-baseline gap-4 text-[clamp(2.5rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white/80 transition-colors duration-500 hover:text-white"
        >
          Start a project
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-out group-hover:translate-x-3"
          >
            →
          </span>
        </Link>
      </section>
    </article>
  );
}

export default InsightArticle;
