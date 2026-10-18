import { useEffect, useId, useRef, useState } from "react";

/**
 * WordmarkReveal
 *
 * Wraps an SVG wordmark. While the pointer is over it, a liquid blob grows under
 * the cursor and acts as a window onto an alternate rendering of the wordmark.
 * Every new hover advances to the next variant, so no two hovers in a row match.
 *
 * Props
 *  - src         the base wordmark (svg url)
 *  - variants    array of image urls, same aspect ratio as the wordmark.
 *                Leave empty to use the built-in fallback: the wordmark itself,
 *                inverted, sitting on the blob.
 *  - blobColor   fill behind the variant image (default Visium black)
 *  - invert      only used by the fallback. Set false if your wordmark is
 *                already light and the blob is dark.
 *  - size        blob radius as a fraction of the wordmark width
 *  - className   sizing classes for the wrapper, e.g. "w-[100vw]"
 */

const N = 8; // points on the blob outline

// Closed Catmull-Rom spline turned into cubic beziers, centred on 0,0
function blobPath(radii) {
  const pts = radii.map((r, i) => {
    const a = (i / N) * Math.PI * 2;
    return [Math.cos(a) * r, Math.sin(a) * r];
  });
  const f = (n) => n.toFixed(4);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % N];
    const p3 = pts[(i + 2) % N];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d + "Z";
}

export default function WordmarkReveal({
  src,
  variants = [],
  blobColor = "#0B0B0B",
  invert = true,
  size = 0.17,
  className = "w-[100vw]",
  alt = "Visium Studios",
}) {
  const clipId = "wr" + useId().replace(/:/g, "");
  const list = variants.length ? variants : [null]; // null = inverted fallback

  const wrapRef = useRef(null);
  const layerRef = useRef(null);
  const pathRef = useRef(null);
  const crossRef = useRef(null);
  const dotRef = useRef(null);
  const counter = useRef(0);
  const [current, setCurrent] = useState(0);

  // Mutable animation state lives in a ref so pointer moves never re-render
  const st = useRef({
    tx: 0,
    ty: 0, // pointer target
    x: 0,
    y: 0, // blob position
    dx: 0,
    dy: 0, // trailing dot position
    scale: 0,
    target: 0,
    w: 0,
    raf: 0,
    pointerType: "mouse",
  });

  // Preload variants so the swap on hover is instant
  useEffect(() => {
    variants.forEach((v) => {
      const img = new Image();
      img.src = v;
    });
  }, [variants]);

  useEffect(() => {
    const s = st.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const radii = new Array(N).fill(1);

    const frame = (t) => {
      s.x += (s.tx - s.x) * 0.14;
      s.y += (s.ty - s.y) * 0.14;
      s.dx += (s.tx - s.dx) * 0.28;
      s.dy += (s.ty - s.dy) * 0.28;
      s.scale += (s.target - s.scale) * 0.13;

      const R = Math.max(110, s.w * size);
      const amp = reduce ? 0 : 1;
      for (let i = 0; i < N; i++) {
        radii[i] =
          1 +
          amp * 0.13 * Math.sin(t * 0.0012 * (1 + i * 0.17) + i * 1.7) +
          amp * 0.06 * Math.sin(t * 0.0021 + i * 2.3);
      }

      const hidden = s.target === 0 && s.scale < 0.003;
      if (layerRef.current)
        layerRef.current.style.visibility = hidden ? "hidden" : "visible";
      if (pathRef.current) {
        pathRef.current.setAttribute("d", blobPath(radii));
        pathRef.current.setAttribute(
          "transform",
          `translate(${s.x.toFixed(2)} ${s.y.toFixed(2)}) scale(${(R * s.scale).toFixed(3)})`,
        );
      }
      if (crossRef.current) {
        crossRef.current.style.transform = `translate3d(${s.tx}px, ${s.ty}px, 0) translate(-50%, -50%)`;
        crossRef.current.style.opacity = s.target ? 1 : 0;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${s.dx}px, ${s.dy}px, 0) translate(-50%, -50%)`;
        dotRef.current.style.opacity = s.target ? 1 : 0;
      }

      s.raf = hidden ? 0 : requestAnimationFrame(frame);
    };

    s.kick = () => {
      if (!s.raf) s.raf = requestAnimationFrame(frame);
    };
    return () => cancelAnimationFrame(s.raf);
  }, [size]);

  const locate = (e) => {
    const s = st.current;
    const r = wrapRef.current.getBoundingClientRect();
    s.w = r.width;
    s.tx = e.clientX - r.left;
    s.ty = e.clientY - r.top;
    s.pointerType = e.pointerType;
  };

  const onEnter = (e) => {
    const s = st.current;
    locate(e);
    // Snap so the blob is born under the cursor instead of sliding in
    s.x = s.dx = s.tx;
    s.y = s.dy = s.ty;
    s.target = 1;
    setCurrent(counter.current++ % list.length);
    s.kick?.();
  };

  const onMove = (e) => {
    locate(e);
    st.current.kick?.();
  };

  const onLeave = () => {
    st.current.target = 0;
    st.current.kick?.();
  };

  const variant = list[current];

  return (
    <div
      ref={wrapRef}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative select-none [@media(hover:hover)]:cursor-none ${className}`}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block h-auto w-full"
      />

      {/* Reveal layer, clipped to the moving blob. Must match the wordmark box exactly */}
      <div
        ref={layerRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundColor: blobColor,
          clipPath: `url(#${clipId})`,
          visibility: "hidden",
        }}
      >
        <img
          src={variant ?? src}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-contain"
          style={
            variant ? undefined : { filter: invert ? "invert(1)" : "none" }
          }
        />
      </div>

      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id={clipId}>
            <path ref={pathRef} d="M0,0Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Custom cursor: exact crosshair plus a trailing dot. Difference blend keeps it visible on black and white */}
      <span
        ref={crossRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden opacity-0 mix-blend-difference [@media(hover:hover)]:block"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="#F4F4F1"
          strokeWidth="1.5"
        >
          <path d="M9 1v16M1 9h16" />
        </svg>
      </span>
      <span
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden size-2 rounded-full bg-[#F4F4F1] opacity-0 mix-blend-difference [@media(hover:hover)]:block"
      />
    </div>
  );
}
