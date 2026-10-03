import {
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import { Link } from "react-router-dom";

const MotionLink = motion(Link);

function useMorphPointer() {
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const scale = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 22, mass: 0.45 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 22, mass: 0.45 });
  const smoothScale = useSpring(scale, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });

  return {
    left: useTransform(smoothX, (value) => `${value}%`),
    top: useTransform(smoothY, (value) => `${value}%`),
    scale: smoothScale,
    onPointerMove: (event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      x.set(((event.clientX - bounds.left) / bounds.width) * 100);
      y.set(((event.clientY - bounds.top) / bounds.height) * 100);
    },
    onPointerEnter: () => scale.set(1),
    onPointerLeave: () => scale.set(0),
  };
}

function useMagnetic(strength = 0.35) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.3 });

  return {
    x: springX,
    y: springY,
    onPointerMove: (event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      const relX = event.clientX - (bounds.left + bounds.width / 2);
      const relY = event.clientY - (bounds.top + bounds.height / 2);
      x.set(relX * strength);
      y.set(relY * strength);
    },
    onPointerLeave: () => {
      x.set(0);
      y.set(0);
    },
  };
}

function FloatingProjectCta() {
  const morph = useMorphPointer();
  const magnetic = useMagnetic();

  return (
    <MotionLink
      to="/startaproject"
      aria-label="Start a project"
      data-blob
      className="hero-cta group fixed bottom-4 right-4 z-[60] inline-flex h-14 w-14 isolate items-center overflow-hidden rounded-full border-2 border-white bg-white px-3 text-black transition-[width] duration-300 ease-out hover:w-52 focus-visible:w-52 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-6 sm:right-6 motion-reduce:transition-none"
      style={{ x: magnetic.x, y: magnetic.y }}
      onPointerEnter={morph.onPointerEnter}
      onPointerLeave={(event) => {
        morph.onPointerLeave(event);
        magnetic.onPointerLeave(event);
      }}
      onPointerMove={(event) => {
        morph.onPointerMove(event);
        magnetic.onPointerMove(event);
      }}
    >
      <motion.span
        aria-hidden="true"
        className="cta-morph"
        style={{
          left: morph.left,
          top: morph.top,
          scale: morph.scale,
        }}
      />
      <img
        src="/assets/logo/visiumSingleLogoBlack.png"
        alt=""
        aria-hidden="true"
        className="relative z-[1] h-7 w-7 shrink-0 object-contain"
      />
      <span className="relative z-[1] ml-3 whitespace-nowrap text-sm font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        Start a project →
      </span>
    </MotionLink>
  );
}

export default FloatingProjectCta;
