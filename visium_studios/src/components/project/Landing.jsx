import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { href } from "react-router-dom";

const actions = [
  {
    title: "I want a direct call.",
    desc: "30 minutes with one of the founders. No forms, no waiting.",
    href: "/call-page",
  },
  {
    title: "I have a project, ask me your questions.",
    desc: "A few short questions to get us prepared for the first discussion.",
    href: "/projectbriefform",
  },
];

// Diameter of the cursor-follow blob inside a card.
const BLOB_SIZE = 90;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const cardGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

function ActionCard({ item }) {
  const cardRef = useRef(null);
  const blobRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect || !blobRef.current) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    blobRef.current.style.transform = `translate3d(${x - BLOB_SIZE / 2}px, ${y - BLOB_SIZE / 2}px, 0)`;
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMove}
      className={`group relative flex flex-1 flex-col gap-4 overflow-hidden border p-8 text-left transition-colors duration-500 ease-out ${
        hovered
          ? "border-white bg-white text-black"
          : "border-white/30 bg-transparent text-white"
      }`}
    >
      {/* Cursor-follow blob — same white, mix-blend-difference language as
         the site-wide BlobCursor, so it self-inverts against whatever's
         beneath it instead of needing its own color per surface. */}
      <div
        ref={blobRef}
        aria-hidden="true"
        style={{ width: BLOB_SIZE, height: BLOB_SIZE }}
        className={`pointer-events-none absolute left-0 top-0 z-10 rounded-full bg-white mix-blend-difference transition-opacity duration-500 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
      />
      <a href={item.href}>
        <h3 className="relative md:text-2xl text-lg font-medium">
          {item.title}
        </h3>
        <p className="relative md:text-lg text-xs text-current/60">
          {item.desc}
        </p>
      </a>
    </motion.div>
  );
}

function Landing() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-8 py-6">
      <div className="p-12">
        <motion.h1
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={fadeUp}
          className="text-center text-4xl font-medium md:text-6xl"
        >
          What do you want to do?
        </motion.h1>
      </div>

      <motion.div
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
        variants={cardGroup}
        className="flex w-full max-w-4xl flex-col items-stretch justify-center gap-8 md:flex-row"
      >
        {actions.map((item) => (
          <ActionCard key={item.title} item={item} />
        ))}
      </motion.div>
    </section>
  );
}

export default Landing;
