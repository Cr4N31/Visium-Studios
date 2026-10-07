import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { sortedInsights, formatDate } from "../../data/insights";

function InsightCard({ article, featured = false }) {
  return (
    <Link
      to={`/insights/${article.slug}`}
      className={`group block ${featured ? "md:row-span-2" : ""}`}
    >
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden bg-black/5 ${
            featured ? "aspect-[4/3]" : "aspect-[16/10]"
          }`}
        >
          <motion.img
            src={article.image}
            alt={article.title}
            className="h-full w-full rounded-3xl object-cover"
            animate={{
              scale: [1, 1.025, 1],
              x: [0, 3, 0],
              y: [0, -3, 0],
            }}
            whileHover={{
              scale: 1.045,
              x: 0,
              y: 0,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* subtle image overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/[0.04]" />
        </div>

        {/* Content */}
        <div className="pt-5">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-black/80">
              {article.category}
            </span>

            <span className="text-[10px] uppercase tracking-[0.15em] text-black/80">
              {formatDate(article.date)}
            </span>
          </div>

          <h3
            className={`max-w-3xl font-serif leading-[1.05] tracking-tight transition-transform duration-500 group-hover:translate-x-1 ${
              featured
                ? "text-[clamp(1.9rem,9vw,0.9rem)] md:text-[clamp(1.7rem,5vw,2rem)]"
                : "text-[clamp(1.9rem,9vw,0.9rem)] md:text-[clamp(1.7rem,5vw,2rem)]"
            }`}
          >
            <span className=" font-[400] leading-[0.95] tracking-[-0.05em]">
              {article.title}
            </span>
          </h3>

          <p
            className={`mt-4 max-w-xl leading-relaxed text-black/55 ${
              featured ? "text-sm md:text-base" : "text-sm"
            }`}
          >
            {article.excerpt}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-black">
            <span className="relative">
              Read now
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
            <span
              aria-hidden="true"
              className="transition-transform duration-500 ease-out group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

function StudioNotes() {
  const featured = sortedInsights.find((article) => article.featured);
  const secondary = sortedInsights.filter((article) => !article.featured);

  return (
    <section className="relative bg-black px-8 pb-8 pt-6 text-white md:pt-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 grid gap-8 md:grid-cols-[1fr_2fr] md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block border border-black/50 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-black/80">
              Studio Notes
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h2>
              <span className="text-[clamp(2.9rem,9vw,5rem)] font-[400] leading-[0.95] md:text-[clamp(3rem,5vw,5rem)] tracking-[-0.05em]">
                Thoughts on building brands, products and visual systems.
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Editorial layout */}
        <div className="grid gap-14 md:grid-cols-[1.35fr_0.65fr] md:gap-8">
          {/* Featured */}
          {featured && <InsightCard article={featured} featured />}

          {/* Secondary */}
          <div className="flex flex-col gap-14">
            {secondary.map((article) => (
              <InsightCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="mt-20 border-t border-black/10 pt-6"
        ></motion.div>
      </div>
    </section>
  );
}

export default StudioNotes;
