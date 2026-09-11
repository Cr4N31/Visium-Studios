import { motion } from "framer-motion";
import disciplines from "../../data/disciplines";
import EntryPoints from "./service/EntryPoints";

const treeVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 1, 0.36, 1] },
  },
};

const capabilityVariants = {
  hidden: { opacity: 0, y: 12 },
  show: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.18 + index * 0.08,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const branchPaths = [
  "M50 4 C50 26 35 34 28 76",
  "M50 4 C50 42 65 52 72 116",
  "M50 4 C48 64 35 88 28 160",
  "M50 4 C52 78 65 112 72 196",
];

const branchEndpointY = [34.5, 52.7, 72.7, 89.1];

function ServicesPreview() {
  return (
    <section
      id="services"
      className="bg-black px-4 py-24 text-white md:px-10 md:py-32"
    >
      <div className="mb-20 max-w-5xl md:mb-28">
        <p className="mb-6 text-xs uppercase tracking-[0.28em] text-white/40">
          The system
        </p>
        <p className="text-6xl leading-[0.9] md:text-9xl">
          Different disciplines.
          <br />
          One visual system.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2 md:gap-y-32">
        {disciplines.map((discipline) => (
          <motion.article
            key={discipline.key}
            className="service-tree"
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.3, once: false }}
            variants={treeVariants}
          >
            <div className="relative z-10 mx-auto max-w-[18rem] text-center">
              <span className="mb-3 block text-xs tracking-[0.28em] text-white/40">
                {discipline.key}
              </span>
              <p className="text-3xl font-light uppercase tracking-tight md:text-4xl">
                {discipline.name}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/50">
                {discipline.summary}
              </p>
            </div>

            <div className="service-tree__network">
              <svg
                className="service-tree__branches"
                viewBox="0 0 100 220"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <motion.path
                  d="M50 0 L50 220"
                  pathLength="1"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    show: {
                      pathLength: 1,
                      opacity: 1,
                      transition: { duration: 1.2, ease: "easeInOut" },
                    },
                  }}
                />
                {branchPaths.map((path, index) => (
                  <motion.path
                    key={path}
                    d={path}
                    pathLength="1"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      show: {
                        pathLength: 1,
                        opacity: 1,
                        transition: {
                          delay: 0.18 + index * 0.1,
                          duration: 0.8,
                          ease: "easeInOut",
                        },
                      },
                    }}
                  />
                ))}
              </svg>

              <div className="service-tree__capabilities">
                {discipline.capabilities.map((capability, index) => (
                  <motion.div
                    key={capability}
                    className={`service-tree__capability ${
                      index % 2 === 0
                        ? "service-tree__capability--left"
                        : "service-tree__capability--right"
                    }`}
                    style={{ top: `${branchEndpointY[index]}%` }}
                    custom={index}
                    variants={capabilityVariants}
                  >
                    <span className="service-tree__node" />
                    <span>{capability}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <EntryPoints />
    </section>
  );
}

export default ServicesPreview;
