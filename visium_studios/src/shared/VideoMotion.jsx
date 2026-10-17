import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion"; // use "framer-motion" if that is what you have installed

const SRC = "/assets/video/final_motion.mp4";
const CURSOR_SIZE = 96;
const RADIUS = 12;
const EASE = [0.76, 0, 0.24, 1];

// Shows the current state, as you described it.
// To show the action instead, return playing ? "Pause" : "Play".
const labelFor = (playing) => (playing ? "Play" : "Pause");

function SoundToggle({ muted, onToggle, className = "", ...rest }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      aria-pressed={!muted}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      className={`video-sound-toggle flex items-center gap-2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm transition-colors hover:bg-black/85 ${className}`}
      {...rest}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          muted ? "bg-white/50" : "bg-red-500"
        }`}
      />
      {muted ? "Sound off" : "Sound on"}
    </button>
  );
}

function VideoMotion() {
  const wrapRef = useRef(null);
  const smallRef = useRef(null);
  const bigRef = useRef(null);
  const resume = useRef({ time: 0, playing: true });
  const locked = useRef(false);

  const [muted, setMuted] = useState(true);
  const [open, setOpen] = useState(false);
  const [from, setFrom] = useState(null);
  const [playing, setPlaying] = useState(true);
  const [overUI, setOverUI] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 600, damping: 40, mass: 0.4 });

  const moveCursor = (e) => {
    mx.set(e.clientX - CURSOR_SIZE / 2);
    my.set(e.clientY - CURSOR_SIZE / 2);
  };

  const openOverlay = (e) => {
    if (open || locked.current || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const small = smallRef.current;
    if (small) {
      resume.current = { time: small.currentTime, playing: !small.paused };
      small.pause();
    }
    if (e && typeof e.clientX === "number") {
      const x = e.clientX - CURSOR_SIZE / 2;
      const y = e.clientY - CURSOR_SIZE / 2;
      mx.jump(x);
      my.jump(y);
      sx.jump(x);
      sy.jump(y);
    }
    setFrom({ top: r.top, left: r.left, width: r.width, height: r.height });
    setPlaying(resume.current.playing);
    setOverUI(false);
    setOpen(true);
  };

  const closeOverlay = () => {
    const big = bigRef.current;
    const small = smallRef.current;
    if (big) resume.current = { time: big.currentTime, playing: !big.paused };
    if (small) {
      small.currentTime = resume.current.time;
      if (resume.current.playing) small.play().catch(() => {});
    }
    locked.current = true; // do not reopen until the pointer leaves the small video
    setOverUI(false);
    setOpen(false);
  };

  const togglePlay = () => {
    const v = bigRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleSound = () => {
    const next = !muted;
    [smallRef.current, bigRef.current].forEach((v) => {
      if (v) v.muted = next;
    });
    setMuted(next);
  };

  // Escape to close, lock page scroll, hide the site's custom cursor while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") closeOverlay();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("video-expanded");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("video-expanded");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // After closing, only re-arm hover once the pointer has left the small video
  useEffect(() => {
    if (open) return;
    const onMove = (e) => {
      if (e.target.closest?.("[data-video-overlay]")) return;
      if (!wrapRef.current?.contains(e.target)) locked.current = false;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [open]);

  const uiHover = {
    onPointerEnter: () => setOverUI(true),
    onPointerLeave: () => setOverUI(false),
  };

  return (
    <>
      <div
        ref={wrapRef}
        role="button"
        tabIndex={0}
        aria-label="Expand video"
        onMouseEnter={openOverlay}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openOverlay();
        }}
        className="relative h-full w-full overflow-hidden bg-transparent"
        data-aos="fade-up"
      >
        <video
          ref={smallRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          className="block h-full w-full rounded-lg object-cover"
        >
          <source src={SRC} type="video/mp4" />
        </video>

        <SoundToggle
          muted={muted}
          onToggle={toggleSound}
          className="absolute left-1/2 top-4 -translate-x-1/2"
        />
      </div>

      {createPortal(
        <AnimatePresence>
          {open && from && (
            <motion.div
              key="overlay"
              data-video-overlay
              className="fixed z-[150] cursor-none overflow-hidden bg-black"
              initial={{ ...from, borderRadius: RADIUS }}
              animate={{
                top: 0,
                left: 0,
                width: "100vw",
                height: "100dvh",
                borderRadius: 0,
              }}
              exit={{ ...from, borderRadius: RADIUS }}
              transition={{ duration: 0.7, ease: EASE }}
              onPointerMove={moveCursor}
              onClick={togglePlay}
            >
              <video
                ref={bigRef}
                muted={muted}
                loop
                playsInline
                className="block h-full w-full object-cover"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  v.currentTime = resume.current.time;
                  v.muted = muted;
                  if (resume.current.playing) {
                    v.play().catch(() => setPlaying(false));
                  }
                }}
              >
                <source src={SRC} type="video/mp4" />
              </video>

              <motion.div
                className="absolute left-1/2 top-6 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
              >
                <SoundToggle
                  muted={muted}
                  onToggle={toggleSound}
                  {...uiHover}
                />
              </motion.div>

              <motion.button
                type="button"
                aria-label="Close video"
                onClick={(e) => {
                  e.stopPropagation();
                  closeOverlay();
                }}
                {...uiHover}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-black text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                >
                  <path d="M2 2l12 12M14 2L2 14" />
                </svg>
              </motion.button>
            </motion.div>
          )}

          {open && from && (
            <motion.div
              key="cursor"
              aria-hidden
              className="pointer-events-none fixed left-0 top-0 z-[210] flex items-center justify-center rounded-full bg-white text-[11px] font-medium uppercase tracking-[0.12em] text-black [@media(hover:none)]:hidden"
              style={{ x: sx, y: sy, width: CURSOR_SIZE, height: CURSOR_SIZE }}
              initial={{ scale: 0 }}
              animate={{ scale: overUI ? 0.14 : 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.span animate={{ opacity: overUI ? 0 : 1 }}>
                {labelFor(playing)}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default VideoMotion;
