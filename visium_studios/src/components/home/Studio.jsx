import { useEffect, useRef } from "react";
import {
  motion as Motion,
  useAnimationFrame,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import team from "../../data/team";
import TextScramble from "../../shared/TextScramble";

const AUTO_SPEED = 36;
const LOOP_COPIES = 2;

function Studio() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const directionRef = useRef(1);
  const isMobileRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const isInView = useInView(sectionRef, { margin: "100px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => {
      isMobileRef.current = mediaQuery.matches;
      if (!mediaQuery.matches) directionRef.current = 1;
    };

    let previousScrollY = window.scrollY;
    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;
      if (isMobileRef.current && currentScrollY !== previousScrollY) {
        directionRef.current = currentScrollY > previousScrollY ? 1 : -1;
      }
      previousScrollY = currentScrollY;
    };

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, []);

  useAnimationFrame((_, delta) => {
    const carousel = carouselRef.current;
    if (!carousel || !isInView || reduce || isPointerDownRef.current) return;

    const loopWidth = carousel.scrollWidth / LOOP_COPIES;
    if (!loopWidth) return;

    const movement = (AUTO_SPEED * Math.min(delta, 32)) / 1000;
    carousel.scrollLeft += directionRef.current * movement;

    if (carousel.scrollLeft >= loopWidth) {
      carousel.scrollLeft -= loopWidth;
    } else if (carousel.scrollLeft < 0) {
      carousel.scrollLeft += loopWidth;
    }
  });

  const moveCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const distance = Math.min(carousel.clientWidth * 0.75, 420) * direction;
    carousel.scrollBy({ left: distance, behavior: "smooth" });
  };

  const carouselItems = Array.from({ length: LOOP_COPIES }, (_, copy) =>
    team.map((person) => ({ person, copy })),
  ).flat();

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-[#0B0B0B] py-10 text-white md:py-14"
    >
      <div className="px-5 sm:px-8 md:px-10">
        <div className="flex items-start gap-2 md:gap-3">
          <sup className="mt-[0.5em] font-mono text-xs md:text-sm">(05)</sup>
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[0.9] tracking-[-0.05em]">
            <TextScramble>Studio</TextScramble>
          </h2>
        </div>

        <div className="mt-8 grid gap-6 md:mt-10 md:grid-cols-[1.15fr_0.85fr] md:items-end md:gap-12">
          <h3 className="max-w-3xl text-[clamp(2rem,4.5vw,4rem)] leading-[0.98] tracking-[-0.055em]">
            A multidisciplinary studio for brands with somewhere to go.
          </h3>

          <div className="max-w-xl md:justify-self-end">
            <p className="text-sm leading-relaxed text-white/65 md:text-base">
              We bring brand, digital, product, motion, development, and
              strategy together under one visual direction—building the people,
              ideas, and systems behind what comes next.
            </p>
            <Link
              to="/studio"
              className="mt-6 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-xs uppercase tracking-[0.16em] transition-colors hover:border-white"
            >
              Meet the Studio <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10 md:mt-12">
        <div className="mb-4 flex justify-end gap-2 px-5 sm:px-8 md:px-10">
          <button
            type="button"
            aria-label="Scroll team carousel backward"
            onClick={() => moveCarousel(-1)}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-lg transition-colors hover:bg-white hover:text-black"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Scroll team carousel forward"
            onClick={() => moveCarousel(1)}
            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-lg transition-colors hover:bg-white hover:text-black"
          >
            →
          </button>
        </div>

        <div
          ref={carouselRef}
          className="studio-team-carousel flex gap-3 overflow-x-auto overscroll-x-contain px-5 pb-3 sm:gap-4 sm:px-8 md:gap-5 md:px-10"
          onPointerDown={() => {
            isPointerDownRef.current = true;
          }}
          onPointerUp={() => {
            isPointerDownRef.current = false;
          }}
          onPointerCancel={() => {
            isPointerDownRef.current = false;
          }}
          onPointerLeave={() => {
            isPointerDownRef.current = false;
          }}
        >
          {carouselItems.map(({ person, copy }) => (
            <Motion.article
              key={`${copy}-${person.name}`}
              aria-hidden={copy > 0}
              initial={false}
              whileHover={reduce ? undefined : { scale: 0.97 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              className="group w-[68vw] max-w-[18rem] shrink-0 sm:w-[42vw] md:w-[28vw] md:max-w-[22rem] lg:w-[23vw]"
            >
              <div className="aspect-[4/5] overflow-hidden bg-white/10 p-0 transition-[padding] duration-500 ease-out group-hover:p-2">
                <img
                  src={person.image}
                  alt={copy > 0 ? "" : person.name}
                  loading="lazy"
                  draggable="false"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3 border-t border-white/15 pt-2.5">
                <p className="text-sm">{person.name}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-white/50 md:text-xs">
                  {person.role}
                </p>
              </div>
            </Motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Studio;
