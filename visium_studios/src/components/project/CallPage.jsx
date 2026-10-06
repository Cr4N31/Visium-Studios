import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

const actions = [
  {
    title: "Book a 30 call.",
    desc: "You can choose your time, directly on our calender",
  },
  {
    title: "Call us now",
    desc: "+00 000 000 000, If it's urgent",
  },
  {
    title: "Schedule a web conference",
    desc: "If the discussion is going to involve more individuals.",
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

      <h3 className="relative md:text-2xl text-lg font-medium">{item.title}</h3>
      <p className="relative md:text-lg text-xs text-current/60">{item.desc}</p>
    </motion.div>
  );
}

function CallPage() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="flex min-h-screen flex-col px-8 py-6" id="call-page">
      <div className="mt-18 mb-4 relative left-0">
        <a
          href="/startaproject"
          className="border border-white/20 px-6 py-2 hover:bg-white/20 rounded-full"
        >
          Back
        </a>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div className="pb-12">
          <motion.h1
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
            className="text-left text-4xl font-medium md:text-6xl"
          >
            <span className="font-normal">Perfect. Choose your moment.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={cardGroup}
          className="w-full max-w-4xl grid md:grid-cols-2 grid-cols-1 items-stretch justify-center gap-8 md:flex-row"
        >
          {actions.map((item) => (
            <ActionCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default CallPage;
