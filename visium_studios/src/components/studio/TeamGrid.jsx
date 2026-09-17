import { motion } from "framer-motion";
import team from "../../data/team";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.05 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function TeamGrid() {
  return (
    <section className="px-4 md:px-10 py-20 border-t border-white/10">
      <p className="text-xs uppercase tracking-widest text-white/40 mb-10">
        The Studio
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            transition={{ delay: (i % 6) * 0.04 }}
          >
            {/* Image slot — grayscale at rest, full color on hover, matching
                the black/white palette rule (color reserved for imagery) */}
            <motion.div
              variants={imageReveal}
              className="relative aspect-[3/4] overflow-hidden bg-white/5"
            >
              {member.image ? (
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition-[filter] duration-500 hover:grayscale-0"
                />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-white/20 text-xs uppercase tracking-widest">
                  Photo placeholder
                </span>
              )}
            </motion.div>

            <div className="border-b border-white/10 pb-4 pt-4">
              <h4 className="text-white text-lg font-medium">{member.name}</h4>
              <p className="text-white/40 text-sm mt-1">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default TeamGrid;
