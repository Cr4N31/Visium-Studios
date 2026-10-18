import { useRef } from "react";
import { useAnimationFrame, useInView, useReducedMotion } from "framer-motion";
import { toolLogos } from "../data/toolLogos";

const SPIN_SPEED = 7; // degrees per second, so a full turn takes about 51s
const PER_RING = 24; // slots per ring, filled by cycling through the logos
const TILT = -4; // degrees; negative drops the near side, as if looking down on the ring

// Fade the left and right edges out
const EDGE_MASK =
  "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)";

const ringTransform = (angle) =>
  `translateZ(calc(var(--r) * -1)) rotateX(${TILT}deg) rotateY(${angle}deg)`;

// `phase` shifts the ring by a fraction of one step so the two rows stagger
function buildRing(logoOffset, phase) {
  return Array.from({ length: PER_RING }, (_, i) => ({
    logo: toolLogos[(i + logoOffset) % toolLogos.length],
    angle: (360 / PER_RING) * (i + phase),
  }));
}

const RINGS = [
  {
    id: "outer",
    items: buildRing(0, 0),
    top: "22%",
    radius: "var(--ring-r)",
    size: "var(--badge)",
  },
  {
    id: "inner",
    items: buildRing(5, 0.5),
    top: "52%",
    radius: "calc(var(--ring-r) * 0.86)",
    size: "calc(var(--badge) * 0.78)",
  },
];

function LogoMark({ logo }) {
  // Placeholder: no SVG yet, show the initials instead
  if (!logo.paths.length) {
    const initials = logo.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2);
    return (
      <span className="font-mono uppercase tracking-wide text-white/50">
        {initials}
      </span>
    );
  }

  return (
    <svg
      viewBox={logo.viewBox}
      fill="currentColor"
      aria-hidden="true"
      className="block h-full w-full"
    >
      {logo.paths.map((p, i) => (
        <path key={i} d={p.d} fillRule={p.evenodd ? "evenodd" : undefined} />
      ))}
    </svg>
  );
}

function ToolsRing() {
  const sectionRef = useRef(null);
  const ringRefs = useRef([]);
  const angle = useRef(0);

  const inView = useInView(sectionRef, { margin: "100px" });
  const reduce = useReducedMotion();

  // Written straight to the DOM, so spinning never triggers a React render
  useAnimationFrame((_, delta) => {
    if (!inView || reduce) return;
    angle.current = (angle.current - SPIN_SPEED * (delta / 1000)) % 360;
    const transform = ringTransform(angle.current);
    ringRefs.current.forEach((el) => {
      if (el) el.style.transform = transform;
    });
  });

  return (
    <section
      ref={sectionRef}
      role="img"
      aria-label={`Tools we use: ${toolLogos.map((l) => l.name).join(", ")}`}
      className="relative mt-12 md:mt-24 select-none overflow-hidden bg-black"
      style={{
        maskImage: EDGE_MASK,
        WebkitMaskImage: EDGE_MASK,
        height: "clamp(10rem, 18vw, 17rem)",
        "--ring-r": "clamp(16rem, 60vw, 60rem)",
        "--badge": "clamp(2.5rem, 5.4vw, 5rem)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ perspective: "calc(var(--ring-r) * 2.2)" }}
      >
        {RINGS.map((ring, ringIndex) => (
          <div
            key={ring.id}
            ref={(el) => (ringRefs.current[ringIndex] = el)}
            className="absolute left-1/2 h-0 w-0 [transform-style:preserve-3d]"
            style={{
              top: ring.top,
              "--r": ring.radius,
              "--s": ring.size,
              transform: ringTransform(0),
            }}
          >
            {ring.items.map(({ logo, angle: itemAngle }, i) => (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full bg-neutral-900 text-white ring-1 ring-white/15"
                style={{
                  width: "var(--s)",
                  height: "var(--s)",
                  marginLeft: "calc(var(--s) / -2)",
                  marginTop: "calc(var(--s) / -2)",
                  fontSize: "calc(var(--s) * 0.3)",
                  transform: `rotateY(${itemAngle}deg) translateZ(var(--r))`,
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${55 * logo.scale}%`,
                    height: `${55 * logo.scale}%`,
                  }}
                >
                  <LogoMark logo={logo} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default ToolsRing;
