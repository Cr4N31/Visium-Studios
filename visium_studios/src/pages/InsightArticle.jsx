import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import TextScramble from "../shared/TextScramble";
import {
  formatDate,
  getAdjacent,
  getInsight,
  getRelated,
} from "../data/insights";

const ease = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Body blocks                                                         */
/* Headings are intentionally not rendered so the piece reads through. */
/* Text stays in a narrow column, images break out wider.              */
/* ------------------------------------------------------------------ */

function Block({ block }) {
  switch (block.type) {
    case "h2":
    case "h3":
      return null;

    case "quote":
      return (
        <blockquote className="mx-auto mt-10 max-w-[36rem] border-l border-black/20 pl-5 text-[15px] italic leading-[1.7] text-black/75 md:text-base">
          {block.text}
        </blockquote>
      );

    case "image":
      return (
        <figure className="mx-auto my-14 max-w-[56rem] md:my-20">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full object-cover"
          />
          {block.caption && (
            <figcaption className="mt-3 text-[11px] leading-snug text-black/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    default:
      return (
        <p className="mx-auto mt-5 max-w-[36rem] text-[15px] leading-[1.7] text-black/75 md:text-base">
          {block.text}
        </p>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function InsightArticle() {
  const { slug } = useParams();
  const article = getInsight(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <Navigate to="/insights" replace />;

  const { prev, next } = getAdjacent(slug);
  const related = getRelated(slug, 3);

  // Previous, next, then related notes to fill the remaining slots.
  const seen = new Set();
  const more = [
    prev && { item: prev, tag: "Previous" },
    next && { item: next, tag: "Next" },
    ...related.map((item) => ({ item, tag: "Related" })),
  ]
    .filter(Boolean)
    .filter(({ item }) => {
      if (item.id === article.id || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .slice(0, 3);

  return (
    <article className="bg-[#F4F4F1] text-[#0B0B0B]">
      <Link
        to="/insights"
        className="fixed left-6 top-6 z-40 text-[10px] uppercase tracking-[0.14em] text-black/70 transition-colors hover:text-black sm:left-10 md:left-[6vw]"
        aria-label="Back to insights"
      >
        ← Back to insights
      </Link>

      {/* Header: meta + title left, image right */}
      <header className="grid md:min-h-[min(48vw,40rem)] md:grid-cols-2">
        <div className="flex flex-col justify-center gap-14 px-7 pb-10 pt-20 sm:px-10 sm:pt-24 md:px-[6vw] md:pb-[4vw] md:pt-[7vw]">
          <Motion.h1
            className="max-w-md text-[clamp(2.5rem,4vw,4.75rem)] font-normal leading-[0.98] tracking-[-0.045em]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <TextScramble>{article.title}</TextScramble>
          </Motion.h1>

          <Motion.dl
            className="space-y-5 text-[10px] uppercase tracking-[0.14em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <dt className="mb-1 text-black/45">Published</dt>
              <dd className="text-black/90">{formatDate(article.date)}</dd>
            </div>
            <div>
              <dt className="mb-1 text-black/45">Written by</dt>
              <dd className="text-black/90">{article.author}</dd>
            </div>
            {article.category && (
              <div>
                <dt className="mb-1 text-black/45">Category</dt>
                <dd className="text-black/90">{article.category}</dd>
              </div>
            )}
          </Motion.dl>
        </div>

        <Motion.div
          className="aspect-square bg-[#0B0B0B]/10 md:aspect-auto"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
        >
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
        </Motion.div>
      </header>

      {/* Content: one continuous read */}
      <div className="px-6 pb-24 pt-16 sm:px-10 md:pb-32 md:pt-24">
        {article.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* More from the journal */}
      {more.length > 0 && (
        <section className="border-t border-black/10 px-6 py-16 sm:px-10 md:px-[6vw] md:py-24">
          <h2 className="mb-10 text-[30px] uppercase tracking-[0.16em] text-black/85 md:mb-14">
            <TextScramble>More from the journal</TextScramble>
          </h2>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {more.map(({ item, tag }) => (
              <Link
                key={item.id}
                to={`/insights/${item.slug}`}
                className="group flex flex-col gap-3"
              >
                <div className="aspect-square overflow-hidden bg-[#0B0B0B]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 text-[9px] uppercase tracking-[0.14em] text-black/80">
                  <span>{item.category}</span>
                  <span>
                    {tag === "Previous" && "← "}
                    {tag}
                    {tag === "Next" && " →"}
                  </span>
                </div>

                <h3 className="max-w-sm text-lg leading-[1.1] tracking-[-0.02em] md:text-xl">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

export default InsightArticle;
