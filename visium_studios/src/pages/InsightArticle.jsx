import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useMagnetic, useMorphPointer } from "../shared/useCtaPointer";
import TextScramble from "../shared/TextScramble";
import {
  formatDate,
  getAdjacent,
  getInsight,
  getRelated,
} from "../data/insights";

const ease = [0.22, 1, 0.36, 1];
const MotionLink = Motion(Link);

/* ------------------------------------------------------------------ */
/* Body blocks                                                         */
/* ------------------------------------------------------------------ */

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-14 text-2xl font-medium leading-[1.05] tracking-[-0.03em] text-white md:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-10 text-lg font-medium tracking-[-0.02em] text-white md:text-xl">
          {block.text}
        </h3>
      );
    case "quote":
      return (
        <blockquote className="my-12 text-xl font-light italic leading-[1.2] tracking-[-0.02em] text-white md:text-2xl">
          “{block.text}”
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-12 md:-mx-10">
          <img
            src={block.src}
            alt={block.alt}
            loading="lazy"
            className="w-full object-cover"
          />
          {block.caption && (
            <figcaption className="mt-3 text-xs text-white/40">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    default:
      return (
        <p className="mt-5 text-[15px] leading-[1.7] text-white/70 md:text-base">
          {block.text}
        </p>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Clock                                                               */
/* ------------------------------------------------------------------ */

function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  const label = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-center gap-5 text-white/60">
      <svg
        viewBox="0 0 100 100"
        className="h-24 w-24 md:h-28 md:w-28"
        role="img"
        aria-label={`Local time ${label}`}
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="7"
            x2="50"
            y2={i % 3 === 0 ? 14 : 11}
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        {/* hour */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="28"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${hours * 30} 50 50)`}
        />
        {/* minute */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${minutes * 6} 50 50)`}
        />
        {/* second */}
        <line
          x1="50"
          y1="56"
          x2="50"
          y2="12"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
          transform={`rotate(${seconds * 6} 50 50)`}
        />
        <circle cx="50" cy="50" r="2" fill="currentColor" />
      </svg>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-white/40">Local time</span>
        <span className="text-xl font-medium tabular-nums tracking-[-0.02em] text-white/80">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function InsightArticle() {
  const ctaMorph = useMorphPointer();
  const ctaMagnetic = useMagnetic();
  const { slug } = useParams();
  const article = getInsight(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) return <Navigate to="/insights" replace />;

  const { prev, next } = getAdjacent(slug);
  const related = getRelated(slug, 3);

  // Previous, next, then one related note to fill the third slot.
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
    <article className="bg-[#0B0B0B] text-white">
      {/* Opening: title and meta on the left, image on the right */}
      <header className="grid gap-12 px-8 pb-16 pt-32 md:grid-cols-2 md:gap-8 md:pb-24 md:pt-40">
        <div className="flex flex-col justify-between gap-16">
          <div>
            <Motion.p
              className="mb-6 text-xl text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {article.category}
            </Motion.p>

            <Motion.h1
              className="max-w-3xl text-[clamp(2.5rem,5.5vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
            >
              <TextScramble>{article.title}</TextScramble>
            </Motion.h1>
          </div>

          <dl className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-white/40">Published</dt>
              <dd className="text-sm text-white/80">
                {formatDate(article.date)}
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-xs text-white/40">Author</dt>
              <dd className="text-sm text-white/80">{article.author}</dd>
            </div>
          </dl>
        </div>

        <Motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease, delay: 0.2 }}
        >
          <img
            src={article.image}
            alt={article.title}
            className="aspect-square w-full object-cover"
          />
        </Motion.div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-xl px-8 pb-24 pt-4 md:px-0 md:pb-36 md:pt-10">
        {article.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>

      {/* More notes: previous / next */}
      {more.length > 0 && (
        <section className="bg-[#F4F4F1] px-8 py-20 rounded-3xl text-[#0B0B0B] md:py-28">
          <h2 className="mb-12 text-3xl font-medium tracking-[-0.03em] md:mb-16 md:text-5xl">
            <TextScramble>More notes</TextScramble>
          </h2>

          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {more.map(({ item, tag }) => (
              <Link
                key={item.id}
                to={`/insights/${item.slug}`}
                className="group flex flex-col gap-4"
              >
                <div className="aspect-[4/5] overflow-hidden bg-black/5">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 text-xs text-black/50">
                  <span>{item.category}</span>
                  <span>
                    {tag === "Previous" && "← "}
                    {tag}
                    {tag === "Next" && " →"}
                  </span>
                </div>

                <h3 className="max-w-sm text-2xl font-medium leading-[1.05] tracking-[-0.03em]">
                  {item.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* End: CTA with clock beside it */}
      <section className="flex flex-col gap-16 px-8 pb-24 pt-24 md:flex-row md:items-end md:justify-between md:pb-40 md:pt-36">
        <MotionLink
          to="/contact"
          data-blob
          style={{ x: ctaMagnetic.x, y: ctaMagnetic.y }}
          onPointerEnter={ctaMorph.onPointerEnter}
          onPointerLeave={(event) => {
            ctaMorph.onPointerLeave(event);
            ctaMagnetic.onPointerLeave(event);
          }}
          onPointerMove={(event) => {
            ctaMorph.onPointerMove(event);
            ctaMagnetic.onPointerMove(event);
          }}
          className="hero-cta group relative isolate inline-flex items-baseline gap-4 overflow-hidden rounded-sm text-[clamp(2.5rem,8vw,8rem)] font-semibold leading-[0.9] tracking-tight text-white/80 transition-colors duration-500 hover:text-white"
        >
          <Motion.span
            aria-hidden="true"
            className="cta-morph"
            style={{
              left: ctaMorph.left,
              top: ctaMorph.top,
              scale: ctaMorph.scale,
            }}
          />
          <span className="relative z-[1]">Start a project</span>
          <span
            aria-hidden="true"
            className="relative z-[1] transition-transform duration-500 ease-out group-hover:translate-x-3"
          >
            →
          </span>
        </MotionLink>

        <Clock />
      </section>
    </article>
  );
}

export default InsightArticle;
