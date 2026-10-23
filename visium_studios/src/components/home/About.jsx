import { motion } from "framer-motion";
import CapabilitiesMarquee from "../../shared/CapabilitiesMarquee";
import { Link } from "react-router-dom";

const MotionSection = motion.section;

function About() {
  return (
    <MotionSection
      className="overflow-x-clip bg-black px-5 py-16 text-white sm:px-8 md:px-10"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Heading row */}
      <div className="flex items-start gap-2 md:gap-3">
        <sup className="mt-[0.5em] font-mono text-xs md:text-sm">(02)</sup>
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
          About
        </h2>
      </div>

      {/* Body: paragraph on the left, capabilities carousel beside it */}
      <div className="mt-8 flex flex-col items-stretch gap-10 md:mt-10 md:flex-row md:items-start md:gap-10 lg:gap-16">
        <p className="indent-8 text-[30px] leading-[1.12] tracking-[-0.02em] mt-1 md:w-[30%] md:min-w-[16rem] md:shrink-0">
          Visium is a visual systems studio for early-stage tech founders. We
          design identities, interfaces, and the systems that hold them
          together, so a young company looks as credible as the product it is
          building.
        </p>

        <div className="w-full min-w-0 md:flex-1">
          <div className="flex items-start justify-between text-sm">
            <span>We Deliver</span>
            <Link to="/studio" className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-current" />
              Read More
            </Link>
          </div>

          <div className="mt-4 min-w-0 max-w-full">
            <CapabilitiesMarquee />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export default About;
