import { useState, useEffect, useCallback, useRef, memo } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import header_logo from "/assets/logo/fullWhite.png";
import header_logo_black from "/assets/logo/Full Logo, Black - VISIŪM™.png";

const falling_logo = "/assets/logo/Logo Icon - White.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Studio", href: "/studio" },
  { name: "Contact", href: "/contact" },
];

const desktopNavLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Studio", href: "/studio" },
  { name: "Contact", href: "/contact" },
];

const HASH_LINKS = navLinks.filter((l) => l.href.startsWith("#"));

const ROUTE_LINKS = navLinks
  .filter((l) => l.href.startsWith("/"))
  .sort((a, b) => b.href.length - a.href.length);

const EXIT_MS = 250;

const WIPE_EASE = [0.76, 0, 0.24, 1];
const WIPE_IN = 0.7;
const WIPE_OUT = 0.6;

const BLOB_BASE = 48;
const BLOB_IDLE = 10;
const BLOB_HOVER = 48;
const BLOB_HOVER_TOUCH = 76;

const LOGO_COUNT = 16;
const LOGO_START_DELAY = 1000;
const LOGO_SPAWN_GAP = 130;
const GRAVITY = 2400;
const COLLIDER = 0.36;
const RESTITUTION = 0.28;

function todayLabel() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${String(d.getFullYear()).slice(2)}`;
}

function waitForElementAndScroll(href, { retries = 30, interval = 50 } = {}) {
  let attempts = 0;

  const tryScroll = () => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    attempts += 1;
    if (attempts < retries) {
      window.setTimeout(tryScroll, interval);
    } else if (process.env.NODE_ENV !== "production") {
      console.warn(
        `No element found for ${href} after ${retries * interval}ms — add id="${href.slice(1)}" to that section.`,
      );
    }
  };

  tryScroll();
}

function matchRoute(pathname) {
  return ROUTE_LINKS.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
}

const overlayVariants = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: WIPE_IN,
      ease: WIPE_EASE,
      delayChildren: 0.4,
      staggerChildren: 0.08,
    },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: WIPE_OUT, ease: WIPE_EASE },
  },
};

const linkVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: 12, transition: { duration: 0.2 } },
};

function stepPhysics(bodies, W, H, dt) {
  for (const b of bodies) {
    if (!b.active) continue;
    b.px = b.x;
    b.py = b.y;
    b.vy += GRAVITY * dt;
    b.x += b.vx * dt;
    b.y += b.vy * dt;
    b.angle += b.av * dt;
    b.av *= 0.995;
    b.grounded = false;
  }

  for (let iter = 0; iter < 4; iter++) {
    // logo vs logo
    for (let i = 0; i < bodies.length; i++) {
      const a = bodies[i];
      if (!a.active) continue;
      for (let j = i + 1; j < bodies.length; j++) {
        const c = bodies[j];
        if (!c.active) continue;

        const dx = c.x - a.x;
        const dy = c.y - a.y;
        const min = a.r + c.r;
        const d2 = dx * dx + dy * dy;
        if (d2 >= min * min) continue;

        const dist = Math.sqrt(d2) || 0.0001;
        const nx = dx / dist;
        const ny = dy / dist;
        const ma = a.r * a.r;
        const mc = c.r * c.r;
        const mt = ma + mc;
        const overlap = min - dist;

        a.x -= nx * overlap * (mc / mt);
        a.y -= ny * overlap * (mc / mt);
        c.x += nx * overlap * (ma / mt);
        c.y += ny * overlap * (ma / mt);

        const rvx = c.vx - a.vx;
        const rvy = c.vy - a.vy;
        const vn = rvx * nx + rvy * ny;
        if (vn < 0) {
          const e = -vn > 120 ? RESTITUTION : 0;
          const inv = 1 / ma + 1 / mc;
          const imp = (-(1 + e) * vn) / inv;
          a.vx -= (imp * nx) / ma;
          a.vy -= (imp * ny) / ma;
          c.vx += (imp * nx) / mc;
          c.vy += (imp * ny) / mc;

          const tx = -ny;
          const ty = nx;
          const vt = rvx * tx + rvy * ty;
          const jt = (-vt * 0.12) / inv;
          a.vx -= (jt * tx) / ma;
          a.vy -= (jt * ty) / ma;
          c.vx += (jt * tx) / mc;
          c.vy += (jt * ty) / mc;

          if (-vn > 120) {
            a.av += (vt / a.r) * 0.05;
            c.av += (vt / c.r) * 0.05;
          }
        }
      }
    }

    for (const b of bodies) {
      if (!b.active) continue;
      if (b.x < b.r) {
        b.x = b.r;
        if (b.vx < 0) b.vx *= -0.3;
      } else if (b.x > W - b.r) {
        b.x = W - b.r;
        if (b.vx > 0) b.vx *= -0.3;
      }
      if (b.y > H - b.r) {
        b.y = H - b.r;
        if (b.vy > 0) b.vy = b.vy > 160 ? -b.vy * RESTITUTION : 0;
        b.grounded = true;
      }
    }
  }

  for (const b of bodies) {
    if (!b.active) continue;
    if (b.grounded) b.vx *= 0.97;

    const moved = Math.hypot(b.x - b.px, b.y - b.py);
    if (moved >= 0.3) {
      if (b.grounded) b.av += (b.vx / b.r - b.av) * 0.15;
    } else {
      b.av *= 0.85;
      if (moved < 0.05) {
        b.vx *= 0.5;
        b.vy *= 0.5;
      }
    }
    b.rest = moved < 0.05 && Math.abs(b.av) < 0.05;
  }
}

function isSettled(bodies) {
  for (const b of bodies) {
    if (!b.active || !b.rest) return false;
  }
  return true;
}

const FallingLogos = memo(function FallingLogos() {
  const layerRef = useRef(null);
  const itemRefs = useRef([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || reduceMotion) return;

    let { width: W, height: H } = layer.getBoundingClientRect();
    const baseSize = Math.min(150, Math.max(60, Math.min(W * 0.26, H * 0.2)));

    const bodies = Array.from({ length: LOGO_COUNT }, (_, i) => {
      const size = baseSize * (0.6 + Math.random() * 0.55);
      const r = size * COLLIDER;
      const el = itemRefs.current[i];
      if (el) {
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
      }
      return {
        el,
        size,
        r,
        x: r + Math.random() * Math.max(W - r * 2, 1),
        y: -size,
        vx: (Math.random() - 0.5) * 160,
        vy: 150 + Math.random() * 250,
        angle: Math.random() * Math.PI * 2,
        av: (Math.random() - 0.5) * 5,
        spawnAt: LOGO_START_DELAY + i * LOGO_SPAWN_GAP + Math.random() * 60,
        active: false,
        grounded: false,
        rest: false,
        px: 0,
        py: 0,
      };
    });

    const STEP = 1 / 120;
    let raf = 0;
    let last = 0;
    let elapsed = 0;
    let acc = 0;
    let calm = 0;

    const draw = () => {
      for (const b of bodies) {
        if (!b.active || !b.el) continue;
        b.el.style.transform = `translate3d(${b.x - b.size / 2}px, ${b.y - b.size / 2}px, 0) rotate(${b.angle}rad)`;
      }
    };

    const frame = (now) => {
      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      elapsed += dt * 1000;

      for (const b of bodies) {
        if (!b.active && elapsed >= b.spawnAt) {
          b.active = true;
          if (b.el) {
            b.el.style.transform = `translate3d(${b.x - b.size / 2}px, ${b.y - b.size / 2}px, 0)`;
            b.el.style.opacity = "1";
          }
        }
      }

      acc += dt;
      while (acc >= STEP) {
        stepPhysics(bodies, W, H, STEP);
        acc -= STEP;
      }
      draw();

      calm = isSettled(bodies) ? calm + 1 : 0;
      if (calm > 40) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      calm = 0;
      last = 0;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onResize = () => {
      const rect = layer.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      wake();
    };

    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {Array.from({ length: LOGO_COUNT }, (_, i) => (
        <img
          key={i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          src={falling_logo || undefined}
          alt=""
          draggable={false}
          className="absolute left-0 top-0 select-none opacity-0 will-change-transform"
        />
      ))}
    </div>
  );
});

const BlobCursor = memo(function BlobCursor({ originRef }) {
  const blobRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const el = blobRef.current;
    if (!el) return;

    const s = {
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      scale: 0,
      tScale: 0,
      stretch: 0,
      angle: 0,
      touch: false,
      down: false,
      seen: false,
    };
    let raf = 0;

    const render = () => {
      const follow = reduceMotion ? 1 : 0.2;
      const px = s.x;
      const py = s.y;

      s.x += (s.tx - s.x) * follow;
      s.y += (s.ty - s.y) * follow;
      s.scale += (s.tScale - s.scale) * (reduceMotion ? 1 : 0.18);

      const vx = s.x - px;
      const vy = s.y - py;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.5) s.angle = Math.atan2(vy, vx);

      // squash and stretch along the direction of travel
      const targetStretch = reduceMotion ? 0 : Math.min(speed / 40, 0.45);
      s.stretch += (targetStretch - s.stretch) * 0.2;

      el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) rotate(${s.angle}rad) scale(${s.scale * (1 + s.stretch)}, ${s.scale * (1 - s.stretch * 0.45)})`;

      const settled =
        Math.abs(s.tx - s.x) < 0.1 &&
        Math.abs(s.ty - s.y) < 0.1 &&
        Math.abs(s.tScale - s.scale) < 0.002 &&
        s.stretch < 0.002;

      raf = settled ? 0 : requestAnimationFrame(render);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const hoverScale = () =>
      (s.touch ? BLOB_HOVER_TOUCH : BLOB_HOVER) / BLOB_BASE;
    const idleScale = () => (s.touch ? 0 : BLOB_IDLE / BLOB_BASE);
    const isTarget = (t) => t instanceof Element && !!t.closest("[data-blob]");

    const place = (e, snap) => {
      s.tx = e.clientX;
      s.ty = e.clientY;
      if (snap || !s.seen) {
        s.x = s.tx;
        s.y = s.ty;
        s.seen = true;
      }
    };

    const onMove = (e) => {
      s.touch = e.pointerType === "touch";
      place(e, false);
      if (s.touch && !s.down) return;
      s.tScale = isTarget(e.target) ? hoverScale() : idleScale();
      wake();
    };

    const onDown = (e) => {
      s.touch = e.pointerType === "touch";
      if (!s.touch) return;
      s.down = true;
      place(e, true);
      s.scale = 0;
      s.tScale = isTarget(e.target) ? hoverScale() : 0;
      wake();
    };

    const onUp = () => {
      if (!s.touch) return;
      s.down = false;
      s.tScale = 0;
      wake();
    };

    const onLeaveWindow = () => {
      if (s.touch) return;
      s.tScale = 0;
      wake();
    };

    const origin = originRef?.current;
    if (origin) {
      s.tx = s.x = origin.x;
      s.ty = s.y = origin.y;
      s.seen = true;
      s.tScale = BLOB_IDLE / BLOB_BASE;
      wake();
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [originRef, reduceMotion]);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-30 rounded-full bg-white mix-blend-difference"
      style={{
        width: BLOB_BASE,
        height: BLOB_BASE,
        marginLeft: -BLOB_BASE / 2,
        marginTop: -BLOB_BASE / 2,
        transform: "translate3d(-100px, -100px, 0) scale(0)",
      }}
    />
  );
});

function MenuOverlay({ open, onClose, activeHref, originRef }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredHref, setHoveredHref] = useState(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setHoveredHref(null);
  }, [open]);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      onClose();

      const isRoute = href.startsWith("/");

      window.setTimeout(() => {
        if (isRoute) {
          navigate(href);
          return;
        }

        if (location.pathname !== "/") {
          navigate("/");
          waitForElementAndScroll(href);
        } else {
          waitForElementAndScroll(href);
        }
      }, EXIT_MS);
    },
    [onClose, navigate, location.pathname],
  );

  const handleClose = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    [onClose],
  );

  if (typeof document === "undefined") return null;

  const underlinedHref = hoveredHref ?? activeHref;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] bg-black overflow-y-auto overscroll-contain"
        >
          <FallingLogos />
          <BlobCursor originRef={originRef} />

          <div className="relative z-10 min-h-full flex flex-col">
            <motion.div
              variants={linkVariants}
              className="sticky top-0 z-10 flex items-center justify-between bg-transparent px-4 sm:px-6 pt-6 pb-4 shrink-0"
            >
              <span className="text-xs tracking-[0.2em] text-white font-mono">
                {todayLabel()}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <img src={header_logo} className="w-20" />
              </span>
              <button
                type="button"
                data-blob
                onClick={handleClose}
                className="relative z-20 flex items-center gap-1 text-xs tracking-[0.2em] text-white/60 hover:text-white transition-colors px-2 py-2 -mr-2"
              >
                CLOSE
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </motion.div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-6 py-12 sm:py-16">
              {navLinks.map((link) => {
                const isUnderlined = link.href === underlinedHref;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    data-blob
                    variants={linkVariants}
                    onClick={(e) => handleNavClick(e, link.href)}
                    onPointerEnter={() => setHoveredHref(link.href)}
                    onPointerLeave={() => setHoveredHref(null)}
                    className={`text-[clamp(2.25rem,7vw,5.5rem)] font-medium text-white leading-[1.15] text-center ${
                      isUnderlined
                        ? "underline decoration-2 underline-offset-[10px]"
                        : ""
                    }`}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function Header({ inverted = false }) {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("/");
  const observerRef = useRef(null);
  const menuOriginRef = useRef(null);

  useEffect(() => {
    if (location.pathname !== "/") return;

    const sectionEls = HASH_LINKS.map((l) =>
      document.querySelector(l.href),
    ).filter(Boolean);

    if (sectionEls.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveSection(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sectionEls.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, [location.pathname]);

  const matchedRoute = matchRoute(location.pathname);
  const activeHref = matchedRoute ? matchedRoute.href : activeSection;

  const handleDesktopNavClick = useCallback(
    (e, href) => {
      e.preventDefault();

      if (href.startsWith("/")) {
        navigate(href);
        return;
      }

      if (location.pathname !== "/") {
        navigate("/");
        waitForElementAndScroll(href);
        return;
      }

      waitForElementAndScroll(href);
    },
    [navigate, location.pathname],
  );

  const handleMenuToggle = useCallback(
    (e) => {
      // Remember where a mouse click happened so the blob dot starts there.
      const usedMouse =
        e.detail > 0 && !window.matchMedia("(pointer: coarse)").matches;
      menuOriginRef.current =
        !isOpen && usedMouse ? { x: e.clientX, y: e.clientY } : null;
      setOpen((open) => !open);
    },
    [isOpen],
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 ${
        inverted ? "bg-transparent text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="hidden h-[68px] items-center justify-between px-6 md:flex lg:px-8">
        <a href="/" aria-label="Visium Studios home">
          <img
            src={
              inverted
                ? "/assets/logo/Full Logo, Black - VISIŪM™.png"
                : "/assets/logo/fullWhite.png"
            }
            className="h-auto w-36"
            alt="Visium Studios"
          />
        </a>

        <nav
          className="flex items-center gap-8 lg:gap-10"
          aria-label="Main navigation"
        >
          {desktopNavLinks.map((link) => (
            <div key={link.href} className="relative">
              <a
                href={link.href}
                onClick={(e) => handleDesktopNavClick(e, link.href)}
                aria-current={activeHref === link.href ? "page" : undefined}
                className={`desktop-nav-link text-xs uppercase tracking-[0.12em] transition-opacity hover:opacity-50 ${
                  activeHref === link.href ? "opacity-100" : "opacity-65"
                }`}
              >
                {link.name}
              </a>
              <span
                aria-hidden="true"
                className={`absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current transition-all duration-300 ${
                  activeHref === link.href
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0"
                }`}
              />
            </div>
          ))}
        </nav>
      </div>

      <div className="flex h-[72px] items-stretch justify-between md:hidden">
        <img
          src={inverted ? header_logo_black : header_logo}
          className="ml-6 w-24 self-center"
          alt="Visium Studios"
        />

        <button
          type="button"
          className={`custom-menu-trigger${isOpen ? " custom-menu-trigger--open" : ""}`}
          onClick={handleMenuToggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span />
          <span />
        </button>
      </div>

      <MenuOverlay
        open={isOpen}
        onClose={() => setOpen(false)}
        activeHref={activeHref}
        originRef={menuOriginRef}
      />
    </header>
  );
}

export default Header;
