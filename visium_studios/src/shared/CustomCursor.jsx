import { useEffect, useRef } from "react";

function CustomCursor({ inverted = false }) {
  const cursorRef = useRef(null);
  const frameRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    const updateCursor = (event) => {
      positionRef.current = { x: event.clientX, y: event.clientY };

      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(() => {
        const { x, y } = positionRef.current;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        cursor.classList.add("custom-cursor--visible");
        frameRef.current = null;
      });
    };

    const hideCursor = () => {
      cursor.classList.remove("custom-cursor--visible");
    };

    window.addEventListener("pointermove", updateCursor, { passive: true });
    window.addEventListener("blur", hideCursor);

    return () => {
      window.removeEventListener("pointermove", updateCursor);
      window.removeEventListener("blur", hideCursor);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor${inverted ? " custom-cursor--inverted" : ""}`}
      aria-hidden="true"
    >
      <img src="/assets/logo/cursor-mark.svg" alt="" />
    </div>
  );
}

export default CustomCursor;
