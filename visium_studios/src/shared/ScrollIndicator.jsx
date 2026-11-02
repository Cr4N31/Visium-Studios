import { useEffect, useRef } from "react";

const BAR_COUNT = 20;
const MIN_HEIGHT = 8; // px, the "dot" state
const MAX_HEIGHT = 44; // px, the active bar
const SPREAD = 1.1; // how many bars the wave reaches (smaller = sharper)
const MIN_OPACITY = 0.35;

export default function ScrollIndicator({
  indicatorRef,
  onSeek,
  className = "",
}) {
  const rootRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    const update = (t) => {
      for (let i = 0; i < BAR_COUNT; i++) {
        const bar = barsRef.current[i];
        if (!bar) continue;
        // circular distance so the wave wraps with the infinite loop
        let d = Math.abs((i + 0.5) / BAR_COUNT - t);
        d = Math.min(d, 1 - d) * BAR_COUNT;
        const k = Math.exp(-(d * d) / (2 * SPREAD * SPREAD));
        bar.style.height = `${MIN_HEIGHT + (MAX_HEIGHT - MIN_HEIGHT) * k}px`;
        bar.style.opacity = `${MIN_OPACITY + (1 - MIN_OPACITY) * k}`;
      }
    };

    if (indicatorRef) indicatorRef.current = { update };
    update(0);
    return () => {
      if (indicatorRef) indicatorRef.current = null;
    };
  }, [indicatorRef]);

  // Click / drag to seek
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !onSeek) return;
    let active = false;

    const seek = (e) => {
      const rect = root.getBoundingClientRect();
      const t = (e.clientX - rect.left) / rect.width;
      onSeek(Math.min(Math.max(t, 0), 0.999));
    };
    const down = (e) => {
      active = true;
      root.setPointerCapture(e.pointerId);
      seek(e);
    };
    const move = (e) => active && seek(e);
    const up = () => (active = false);

    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move);
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    return () => {
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
    };
  }, [onSeek]);

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`flex w-[14rem] max-w-full touch-none select-none items-center justify-between ${
        onSeek ? "cursor-pointer" : ""
      } ${className}`}
      style={{ height: MAX_HEIGHT }}
    >
      {Array.from({ length: BAR_COUNT }, (_, i) => (
        <span
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className="w-[5px] rounded-full bg-white will-change-[height,opacity]"
          style={{ height: MIN_HEIGHT, opacity: MIN_OPACITY }}
        />
      ))}
    </div>
  );
}
