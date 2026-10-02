import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const insights = [
  {
    id: 1,
    category: "Brand Systems",
    title: "Why Your Brand Doesn’t Need More Content. It Needs a System.",
    excerpt:
      "A strong brand isn't built by constantly producing more. It's built by creating a system that makes every piece of communication feel connected.",
    date: "September 18, 2026",
    slug: "why-your-brand-doesnt-need-more-content",
    image: "/assets/portfolio_images/Rallow/I - P39.png",
    featured: true,
  },
  {
    id: 2,
    category: "Visual Identity",
    title: "What Makes a Visual Identity Actually Scalable?",
    excerpt:
      "A visual identity has to work beyond the presentation deck. That's what makes a system flexible enough to grow with a brand.",
    date: "September 11, 2026",
    slug: "what-makes-a-visual-identity-scalable",
    image: "/assets/portfolio_images/Rallow/J - P10.png",
  },
  {
    id: 3,
    category: "Digital",
    title: "Your Website Is Part of Your Brand. Treat It Like One.",
    excerpt:
      "Your website isn't simply where your brand lives online. It is one of the most important expressions of the brand itself.",
    date: "September 04, 2026",
    slug: "your-website-is-part-of-your-brand",
    image: "/assets/portfolio_images/Rallow/J - P30.png",
  },
];

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
            className="h-full w-full object-cover"
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
              {article.date}
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
        </div>
      </motion.article>
    </Link>
  );
}

function StudioNotes() {
  const featured = insights.find((article) => article.featured);
  const secondary = insights.filter((article) => !article.featured);

  return (
    <section className="relative bg-black px-4 pt-6 pb-8 text-white md:px-12 md:pt-12">
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
