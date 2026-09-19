import { useCallback } from "react";
import { motion } from "framer-motion";

const BAR_COUNT = 5;
const STAGGER = 0.09;
const BAR_DURATION = 0.7;
const EASE = [0.7, 0, 0.2, 1]; // matches visium-curtain-fall's easing

// Covering sweeps left→right, so the rightmost bar (highest index) is the
// last one to finish. Revealing sweeps right→left, so the leftmost bar
// (index 0) finishes last. These are the two bars whose completion marks
// "fully covered" / "fully revealed".
const LAST_COVER_INDEX = BAR_COUNT - 1;
const LAST_REVEAL_INDEX = 0;

function Loader({ visible = true, onCoverComplete, onRevealComplete }) {
  const spinnerDelay = visible
    ? (BAR_COUNT - 1) * STAGGER + BAR_DURATION * 0.45
    : 0;

  const handleBarComplete = useCallback(
    (index) => {
      if (visible && index === LAST_COVER_INDEX) {
        onCoverComplete?.();
      }
      if (!visible && index === LAST_REVEAL_INDEX) {
        onRevealComplete?.();
      }
    },
    [visible, onCoverComplete, onRevealComplete],
  );

  return (
    <div
      className={`fixed inset-0 z-[200] ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-live="polite"
      aria-busy={visible}
    >
      {/* Staircase curtain: covers top-down, left column first */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <motion.div
            key={i}
            className="h-full flex-1 origin-top bg-[#050505]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: visible ? 1 : 0 }}
            transition={{
              duration: BAR_DURATION,
              ease: EASE,
              delay: visible ? i * STAGGER : (BAR_COUNT - 1 - i) * STAGGER,
            }}
            onAnimationComplete={() => handleBarComplete(i)}
          />
        ))}
      </div>

      {/* Logo / progress, only meaningful once the curtain has covered */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
          delay: spinnerDelay,
        }}
      >
        <div
          className="visium-loader-scene"
          aria-label="Loading Visium Studios"
        >
          <div className="visium-loader-curtain visium-loader-curtain--left" />
          <div className="visium-loader-curtain visium-loader-curtain--right" />

          <div className="visium-loader-content">
            <div className="visium-loader-shell">
              <img
                src="/assets/logo/Logo Icon - White.png"
                alt="Visium Studios"
                className="visium-loader-logo"
              />
            </div>

            <div className="visium-loader-bar" aria-hidden="true">
              <span className="visium-loader-bar-fill" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Loader;
