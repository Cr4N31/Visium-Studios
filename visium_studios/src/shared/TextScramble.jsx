import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DURATION = 1000;
const FRAME_INTERVAL = 45;

function scramble(text, progress) {
  const characters = Array.from(text);
  const revealCount = Math.floor(characters.length * progress);

  return characters
    .map((character, index) => {
      if (!/[a-z\d]/i.test(character) || index < revealCount) return character;
      return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    })
    .join("");
}

function TextScramble({ children, className = "", active = true }) {
  const text = String(children ?? "");
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);

  // Fires once, when ~40% of the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const [displayText, setDisplayText] = useState(text);
  const [started, setStarted] = useState(false);

  const shouldAnimate = active && !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAnimate || !isInView) return undefined;

    const startedAt = performance.now();
    let timeoutId;
    let animationFrameId;

    // Swap to the scrambled state immediately so the real text never flashes
    setDisplayText(scramble(text, 0));
    setStarted(true);

    const update = (now) => {
      const progress = Math.min((now - startedAt) / DURATION, 1);
      setDisplayText(progress === 1 ? text : scramble(text, progress));
      if (progress < 1) {
        timeoutId = window.setTimeout(() => {
          animationFrameId = window.requestAnimationFrame(update);
        }, FRAME_INTERVAL);
      }
    };

    animationFrameId = window.requestAnimationFrame(update);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [shouldAnimate, isInView, text]);

  // Hide the text until the animation begins, so off-screen headers
  // don't sit there fully revealed and then suddenly scramble on entry.
  const hidden = shouldAnimate && !started;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span
        ref={ref}
        aria-hidden="true"
        className={className}
        style={hidden ? { opacity: 0 } : undefined}
      >
        {shouldAnimate ? displayText : text}
      </span>
    </>
  );
}

export default TextScramble;
