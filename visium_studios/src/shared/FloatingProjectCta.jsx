import { useLayoutEffect, useState } from "react";
import {
  motion,
} from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useMagnetic, useMorphPointer } from "./useCtaPointer";

const MotionLink = motion(Link);

function FloatingProjectCta() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const [homeHeroVisible, setHomeHeroVisible] = useState(isHomePage);
  const morph = useMorphPointer();
  const magnetic = useMagnetic();

  useLayoutEffect(() => {
    if (!isHomePage) return undefined;

    const hero = document.getElementById("home");
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHomeHeroVisible(entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isHomePage]);

  return (
    <MotionLink
      to="/startaproject"
      aria-label="Start a project"
      aria-hidden={isHomePage && homeHeroVisible}
      tabIndex={isHomePage && homeHeroVisible ? -1 : undefined}
      data-blob
      className={`hero-cta group fixed bottom-4 right-4 z-[60] inline-flex h-14 w-14 isolate items-center overflow-hidden rounded-full border-2 border-white bg-white px-3 text-black transition-[width,opacity,visibility] duration-300 ease-out hover:w-52 focus-visible:w-52 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:bottom-6 sm:right-6 motion-reduce:transition-none ${
        isHomePage && homeHeroVisible
          ? "pointer-events-none invisible opacity-0"
          : "visible opacity-100"
      }`}
      style={{
        x: magnetic.x,
        y: magnetic.y,
        pointerEvents: isHomePage && homeHeroVisible ? "none" : undefined,
      }}
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
