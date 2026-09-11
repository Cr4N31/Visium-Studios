import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const revealUp = {
  hidden: { y: "100%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function StudioHeader() {
  return (
    <header className="px-4 md:px-10 pt-32 pb-24 md:pb-32 max-w-5xl">
      <motion.div initial="hidden" animate="show" variants={container}>
        <motion.p
          variants={fadeUp}
          className="text-xs uppercase tracking-widest text-white/40 mb-6"
        >
          Studio
        </motion.p>

        <h1 className="overflow-hidden">
          <motion.span
            variants={revealUp}
            className="block text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15]"
          >
            Visium exists because ambitious businesses often outgrow the way
            they present themselves.
          </motion.span>
        </h1>

        <div className="mt-10 flex flex-col gap-6 max-w-2xl text-white/60 text-lg leading-relaxed">
          <motion.p variants={fadeUp}>
            A company can have a great product, a strong team and serious
            ambition, yet still communicate through disconnected visuals. The
            identity feels different from the website. The website feels
            different from the social presence. Campaigns, content and digital
            products all start speaking their own visual language.
          </motion.p>

          <motion.p variants={fadeUp} className="text-white/80">
            The business is one thing. The perception becomes fragmented.
          </motion.p>

          <motion.p variants={fadeUp} className="text-white/80">
            Visium was built to close that gap.
          </motion.p>

          <motion.p variants={fadeUp}>
            We believe perception is part of the product. The way a business
            looks, moves and communicates shapes how people understand it, trust
            it and remember it.
          </motion.p>

          <motion.p variants={fadeUp}>
            That's why we don't treat branding, digital, motion and creative
            direction as isolated services. We bring them together as one visual
            system, built to be distinctive, coherent and flexible enough to
            grow with the business.
          </motion.p>

          <motion.p variants={fadeUp} className="text-white/80">
            The goal isn't simply to make a company look better. It's to make
            the quality, ambition and character of the business visible.
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="text-white text-xl md:text-2xl font-medium mt-2"
          >
            That's what Visium means by Setting the Visual Standard.
          </motion.p>
        </div>
      </motion.div>
    </header>
  );
}

export default StudioHeader;
