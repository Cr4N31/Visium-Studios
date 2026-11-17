import { useEffect, useRef } from "react";

export default function ScrollIndicator({
  indicatorRef,
  onSeek,
  className = "",
}) {
  const rootRef = useRef(null);
  const thumbRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const update = (value) => {
      const progress = Math.min(Math.max(value, 0), 1);
      if (thumbRef.current) {
        thumbRef.current.style.left = `${progress * 100}%`;
        thumbRef.current.style.transform = `translate(-${progress * 100}%, -50%)`;
      }
      if (fillRef.current) {
        fillRef.current.style.width = `${progress * 100}%`;
      }
      rootRef.current?.setAttribute(
        "aria-valuenow",
        String(Math.round(progress * 100)),
      );
    };

    if (indicatorRef) indicatorRef.current = { update };
    update(0);
    return () => {
      if (indicatorRef) indicatorRef.current = null;
    };
  }, [indicatorRef]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !onSeek) return;
    let active = false;

    const seek = (event) => {
      const rect = root.getBoundingClientRect();
      const progress = (event.clientX - rect.left) / rect.width;
      onSeek(Math.min(Math.max(progress, 0), 0.999));
    };
    const down = (event) => {
      active = true;
      root.setPointerCapture(event.pointerId);
      seek(event);
    };
    const move = (event) => active && seek(event);
    const up = () => {
      active = false;
    };

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

  const handleKeyDown = (event) => {
    if (!onSeek) return;
    const current = Number(rootRef.current?.getAttribute("aria-valuenow") ?? 0);
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      onSeek(Math.min((current + 5) / 100, 0.999));
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      onSeek(Math.max((current - 5) / 100, 0));
    } else if (event.key === "Home") {
      event.preventDefault();
      onSeek(0);
    } else if (event.key === "End") {
      event.preventDefault();
      onSeek(0.999);
    }
  };

  return (
    <div
      className={`flex w-[14rem] max-w-full flex-col items-center gap-1 ${className}`}
    >
      <div className="flex w-full items-center gap-2 text-white/55">
        <span aria-hidden="true" className="text-sm leading-none">
          ←
        </span>
        <div
          ref={rootRef}
          role="slider"
          tabIndex={onSeek ? 0 : undefined}
          aria-label="Slide through images"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          onKeyDown={handleKeyDown}
          className={`relative h-8 flex-1 touch-none select-none ${
            onSeek ? "cursor-ew-resize" : ""
          }`}
        >
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/25" />
          <span
            ref={fillRef}
            className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-white/80"
            style={{ width: "0%" }}
          />
          <span
            ref={thumbRef}
            className="absolute left-0 top-1/2 flex h-5 w-9 items-center justify-center gap-1 rounded-full border border-white/60 bg-[#0B0B0B] text-[10px] leading-none text-white shadow-sm"
          >
            <span aria-hidden="true">‹</span>
            <span className="h-2 w-px bg-white/35" />
            <span aria-hidden="true">›</span>
          </span>
        </div>
        <span aria-hidden="true" className="text-sm leading-none">
          →
        </span>
      </div>
      <span className="text-[9px] uppercase tracking-[0.18em] text-white/45">
        Drag to slide
      </span>
    </div>
  );
}
