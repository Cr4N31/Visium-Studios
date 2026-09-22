import { useRef, useEffect, useId } from "react";

function CursorWarpField({ children, className = "", intensity = 28 }) {
  const rawId = useId();
  const filterId = `warp-${rawId.replace(/[:]/g, "")}`;
  const containerRef = useRef(null);
  const displacementRef = useRef(null);
  const rafRef = useRef(null);
  const lastPos = useRef({ x: 0, y: 0, t: 0 });
  const targetScale = useRef(0);
  const currentScale = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e) => {
      const now = performance.now();
      const dt = Math.max(now - lastPos.current.t, 1);
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const velocity = Math.sqrt(dx * dx + dy * dy) / dt;

      targetScale.current = Math.min(velocity * intensity, intensity * 4);
      lastPos.current = { x: e.clientX, y: e.clientY, t: now };
    };

    const handleLeave = () => {
      targetScale.current = 0;
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    const tick = () => {
      currentScale.current +=
        (targetScale.current - currentScale.current) * 0.12;
      targetScale.current *= 0.9;

      if (displacementRef.current) {
        displacementRef.current.setAttribute(
          "scale",
          currentScale.current.toFixed(2),
        );
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [intensity]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008 0.015"
              numOctaves="2"
              seed="7"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: `url(#${filterId})` }}>{children}</div>
    </div>
  );
}

export default CursorWarpField;
