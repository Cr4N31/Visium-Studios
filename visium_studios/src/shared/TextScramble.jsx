import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const DURATION = 900;
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

function TextScramble({ children, className = "" }) {
  const text = String(children ?? "");
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      return undefined;
    }

    const startedAt = performance.now();
    let timeoutId;
    let animationFrameId;

    const update = (now) => {
      const progress = Math.min((now - startedAt) / DURATION, 1);
      setDisplayText(progress === 1 ? text : scramble(text, progress));
      if (progress < 1) {
        timeoutId = window.setTimeout(() => {
          animationFrameId = window.requestAnimationFrame(update);
        }, FRAME_INTERVAL);
      }
    };

    setDisplayText(scramble(text, 0));
    animationFrameId = window.requestAnimationFrame(update);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion, text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {displayText}
      </span>
    </>
  );
}

export default TextScramble;
