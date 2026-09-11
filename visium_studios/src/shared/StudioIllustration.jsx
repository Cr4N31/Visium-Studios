import { motion } from "framer-motion";

const groupContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const outerSequence = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.35,
    },
  },
};

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.65, 0, 0.35, 1] },
  },
};

function StudioIllustration({ className = "" }) {
  return (
    <svg
      width="100%"
      viewBox="0 0 1200 800"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      className={className}
    >
      <title>Line illustration of an architecture studio workspace</title>
      <desc>
        Animated white line drawing on black background depicting a drafting
        desk with lamp, architectural models, blueprints on the wall, a chair,
        and a potted plant.
      </desc>

      <rect x="0" y="0" width="1200" height="800" fill="#ffffff" />

      <motion.g
        fill="none"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={outerSequence}
        initial="hidden"
        animate="show"
      >
        {/* Wall baseboard */}
        <motion.line x1="0" y1="620" x2="1200" y2="620" variants={draw} />

        {/* Blueprints on wall */}
        <motion.g strokeWidth="1.5" variants={groupContainer}>
          <motion.rect
            x="430"
            y="90"
            width="150"
            height="110"
            transform="rotate(-3 505 145)"
            variants={draw}
          />
          <motion.line
            x1="450"
            y1="130"
            x2="560"
            y2="130"
            transform="rotate(-3 505 145)"
            variants={draw}
          />
          <motion.line
            x1="450"
            y1="150"
            x2="540"
            y2="150"
            transform="rotate(-3 505 145)"
            variants={draw}
          />
          <motion.line
            x1="450"
            y1="170"
            x2="560"
            y2="170"
            transform="rotate(-3 505 145)"
            variants={draw}
          />
          <motion.rect
            x="465"
            y="180"
            width="30"
            height="20"
            transform="rotate(-3 505 145)"
            variants={draw}
          />

          <motion.rect
            x="600"
            y="70"
            width="130"
            height="160"
            transform="rotate(2 665 150)"
            variants={draw}
          />
          <motion.path
            d="M615 200 L650 150 L680 180 L710 120 L730 200"
            transform="rotate(2 665 150)"
            variants={draw}
          />
          <motion.line
            x1="615"
            y1="100"
            x2="720"
            y2="100"
            transform="rotate(2 665 150)"
            variants={draw}
          />

          <motion.rect
            x="760"
            y="110"
            width="90"
            height="70"
            transform="rotate(-2 805 145)"
            variants={draw}
          />
          <motion.line
            x1="775"
            y1="140"
            x2="835"
            y2="140"
            transform="rotate(-2 805 145)"
            variants={draw}
          />
          <motion.line
            x1="775"
            y1="155"
            x2="820"
            y2="155"
            transform="rotate(-2 805 145)"
            variants={draw}
          />

          <motion.rect x="590" y="240" width="26" height="26" variants={draw} />
          <motion.rect x="745" y="250" width="26" height="26" variants={draw} />
          <motion.rect x="745" y="290" width="26" height="26" variants={draw} />
        </motion.g>

        {/* Desk lamp */}
        <motion.g strokeWidth="2" variants={groupContainer}>
          <motion.circle cx="230" cy="500" r="14" variants={draw} />
          <motion.line x1="230" y1="514" x2="230" y2="560" variants={draw} />
          <motion.line x1="230" y1="560" x2="300" y2="400" variants={draw} />
          <motion.line x1="300" y1="400" x2="350" y2="330" variants={draw} />
          <motion.ellipse
            cx="352"
            cy="322"
            rx="26"
            ry="14"
            transform="rotate(35 352 322)"
            variants={draw}
          />
        </motion.g>

        {/* Shelf / drawer unit */}
        <motion.g strokeWidth="1.5" variants={groupContainer}>
          <motion.rect
            x="130"
            y="500"
            width="90"
            height="120"
            variants={draw}
          />
          <motion.line x1="130" y1="540" x2="220" y2="540" variants={draw} />
          <motion.line x1="130" y1="580" x2="220" y2="580" variants={draw} />
          <motion.line x1="170" y1="520" x2="180" y2="520" variants={draw} />
          <motion.line x1="170" y1="560" x2="180" y2="560" variants={draw} />
        </motion.g>

        {/* Desktop surface */}
        <motion.g strokeWidth="2" variants={groupContainer}>
          <motion.path
            d="M110 560 L1080 560 L1150 610 L60 610 Z"
            variants={draw}
          />
          <motion.line x1="60" y1="610" x2="60" y2="640" variants={draw} />
          <motion.line x1="1150" y1="610" x2="1150" y2="640" variants={draw} />
          <motion.line x1="60" y1="640" x2="1150" y2="640" variants={draw} />
        </motion.g>

        {/* Trestle legs */}
        <motion.g strokeWidth="1.5" variants={groupContainer}>
          <motion.line x1="200" y1="620" x2="150" y2="740" variants={draw} />
          <motion.line x1="240" y1="620" x2="290" y2="740" variants={draw} />
          <motion.line x1="150" y1="700" x2="290" y2="700" variants={draw} />
          <motion.line x1="900" y1="620" x2="850" y2="740" variants={draw} />
          <motion.line x1="940" y1="620" x2="990" y2="740" variants={draw} />
          <motion.line x1="850" y1="700" x2="990" y2="700" variants={draw} />
        </motion.g>

        {/* Architectural model */}
        <motion.g strokeWidth="1.5" variants={groupContainer}>
          <motion.path
            d="M470 560 L470 500 L540 500 L540 560"
            variants={draw}
          />
          <motion.path d="M470 500 L505 480 L540 500" variants={draw} />
          <motion.line x1="480" y1="560" x2="480" y2="520" variants={draw} />
          <motion.line x1="500" y1="560" x2="500" y2="520" variants={draw} />
          <motion.line x1="520" y1="560" x2="520" y2="520" variants={draw} />
          <motion.rect x="580" y="530" width="50" height="30" variants={draw} />
          <motion.rect x="600" y="500" width="20" height="30" variants={draw} />
        </motion.g>

        {/* Papers / binders */}
        <motion.g strokeWidth="1.5" variants={groupContainer}>
          <motion.rect x="700" y="510" width="70" height="50" variants={draw} />
          <motion.line x1="700" y1="525" x2="770" y2="525" variants={draw} />
          <motion.rect x="790" y="480" width="24" height="80" variants={draw} />
          <motion.rect x="820" y="480" width="24" height="80" variants={draw} />
        </motion.g>

        {/* Notebook */}
        <motion.rect
          x="330"
          y="540"
          width="90"
          height="20"
          transform="rotate(-4 375 550)"
          strokeWidth="1.5"
          variants={draw}
        />

        {/* Chair */}
        <motion.g strokeWidth="2" variants={groupContainer}>
          <motion.line x1="60" y1="640" x2="70" y2="760" variants={draw} />
          <motion.line x1="150" y1="640" x2="160" y2="760" variants={draw} />
          <motion.line x1="70" y1="700" x2="150" y2="700" variants={draw} />
          <motion.path
            d="M60 640 L150 640 L145 560 L65 560 Z"
            variants={draw}
          />
          <motion.path d="M65 560 L60 470 L150 470 L145 560" variants={draw} />
        </motion.g>

        {/* Plant */}
        <motion.g strokeWidth="1.5" variants={groupContainer}>
          <motion.rect
            x="1030"
            y="660"
            width="70"
            height="70"
            variants={draw}
          />
          <motion.path
            d="M1065 660 C1030 600 1010 520 1000 460"
            variants={draw}
          />
          <motion.path
            d="M1065 660 C1080 590 1090 500 1095 430"
            variants={draw}
          />
          <motion.path
            d="M1065 660 C1065 580 1060 500 1055 440"
            variants={draw}
          />
          <motion.path
            d="M1065 660 C1050 610 1030 560 1000 520"
            variants={draw}
          />
          <motion.path
            d="M1065 660 C1090 620 1110 570 1130 530"
            variants={draw}
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}

export default StudioIllustration;
