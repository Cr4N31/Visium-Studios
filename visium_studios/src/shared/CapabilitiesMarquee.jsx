import { useEffect, useRef, useState } from "react";
import capabilities from "../data/capabilities";

const SPEED = 60; // px per second
const MAX_COPIES = 6;

const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";

function Group({ hidden, groupRef }) {
  return (
    <div
      ref={groupRef}
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-[0.3em] pr-[0.3em]"
    >
      {capabilities.map((item) => (
        <div
          key={item.title}
          className="flex shrink-0 items-center gap-[0.3em]"
        >
          <span className="whitespace-nowrap">{item.title}</span>
          <img
            src={item.src}
            alt={hidden ? "" : item.title}
            draggable={false}
            decoding="async"
            className="pointer-events-none aspect-square h-[0.95em] shrink-0 object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default function CapabilitiesMarquee() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const [copies, setCopies] = useState(2);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    const group = groupRef.current;
    if (!root || !track || !group) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let x = 0;
    let width = 0;
    let visible = true;
    let pressed = false;
    let pointerId = null;
    let lastPointerX = 0;
    let lastTime = 0;
    let raf = 0;

    const render = () => {
      if (width) {
        x %= width;
        if (x > 0) x -= width; // keep x in (-width, 0]
      }
      track.style.transform = `translate3d(${x}px,0,0)`;
    };

    const measure = () => {
      width = group.getBoundingClientRect().width;
      if (width) {
        const needed = Math.ceil(window.innerWidth / width) + 1;
        setCopies(Math.min(Math.max(needed, 2), MAX_COPIES));
      }
      render();
    };

    const tick = (time) => {
      const dt = Math.min(time - (lastTime || time), 50);
      lastTime = time;
      if (visible && !pressed && width && !reduceMotion) {
        x -= (SPEED * dt) / 1000;
        render();
      }
      raf = requestAnimationFrame(tick);
    };

    // Dragging (native pointer events, one pointer at a time)
    const onDown = (e) => {
      if (pointerId !== null) return;
      pointerId = e.pointerId;
      lastPointerX = e.clientX;
      pressed = true;
      root.setPointerCapture(e.pointerId);
    };
    const onMove = (e) => {
      if (e.pointerId !== pointerId) return;
      x += e.clientX - lastPointerX;
      lastPointerX = e.clientX;
      render();
    };
    const onEnd = (e) => {
      if (e.pointerId !== pointerId) return;
      pointerId = null;
      pressed = false;
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onEnd);
    root.addEventListener("pointercancel", onEnd);
    root.addEventListener("lostpointercapture", onEnd);

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(group);
    resizeObserver.observe(root);

    const io = new IntersectionObserver(
      ([entry]) => (visible = entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(root);

    document.fonts?.ready.then(measure);
    measure();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      io.disconnect();
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onEnd);
      root.removeEventListener("pointercancel", onEnd);
      root.removeEventListener("lostpointercapture", onEnd);
    };
  }, []);

  return (
    <div
      className="w-full min-w-0 max-w-full overflow-hidden"
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
    >
      <section
        ref={rootRef}
        aria-label="Capabilities"
        className="w-full max-w-full touch-pan-y select-none overflow-hidden py-10 text-5xl font-medium leading-none tracking-tight text-white active:cursor-grabbing md:py-14 md:text-7xl"
      >
        <div
          ref={trackRef}
          className="flex w-max items-center will-change-transform"
        >
          {Array.from({ length: copies }, (_, i) => (
            <Group
              key={i}
              hidden={i > 0}
              groupRef={i === 0 ? groupRef : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
