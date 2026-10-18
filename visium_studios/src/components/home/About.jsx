import { motion } from "framer-motion";

const MotionSection = motion.section;

function About() {
  return (
    <MotionSection
      className="bg-black px-5 py-16 text-white sm:px-8 md:px-10 md:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-start gap-4 md:gap-7">
        <h2 className="text-[clamp(4rem,10vw,8rem)] font-normal leading-[0.88] tracking-[-0.06em]">
          About
        </h2>
      </div>
      <p className="mt-24 max-w-[95ch] text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.12] tracking-[-0.035em] md:mt-32">
        Visium is a visual systems studio for early-stage tech founders. We
        design identities, interfaces, and the systems that hold them together,
        so a young company looks as credible as the product it is building.
      </p>
    </MotionSection>
  );
}
export default About;
