import {
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

export function useMorphPointer() {
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

export function useMagnetic(strength = 0.35) {
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
