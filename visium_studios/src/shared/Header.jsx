import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Fade as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import header_logo from "/assets/logo/Logo Icon - White.png";
import header_logo_black from "/assets/logo/visiumSingleLogoBlack.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Studio", href: "/studio" },
  { name: "Contact", href: "#contact" },
];

const desktopNavLinks = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "Studio", href: "/studio" },
  { name: "Contact", href: "#contact" },
];

const HASH_LINKS = navLinks.filter((l) => l.href.startsWith("#"));

// Route links, longest-href first, so a more specific route (if one is
// ever added, e.g. "/work/featured") is checked before a shorter parent
// route like "/work".
const ROUTE_LINKS = navLinks
  .filter((l) => l.href.startsWith("/"))
  .sort((a, b) => b.href.length - a.href.length);

const EXIT_MS = 250;

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
      // eslint-disable-next-line no-console
      console.warn(
        `No element found for ${href} after ${retries * interval}ms — add id="${href.slice(1)}" to that section.`,
      );
    }
  };

  tryScroll();
}

// Finds which nav route (if any) the current pathname belongs to, so
// "/work/some-slug" still lights up "Work", etc. Exact match or
// path-segment-prefix match only (never a loose substring match).
function matchRoute(pathname) {
  return ROUTE_LINKS.find(
    (link) => pathname === link.href || pathname.startsWith(`${link.href}/`),
  );
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: EXIT_MS / 1000, ease: "easeIn" },
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

function MenuOverlay({ open, onClose, activeHref }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
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
          <div className="min-h-full flex flex-col">
            <motion.div
              variants={linkVariants}
              className="sticky top-0 z-10 flex items-center justify-between bg-black px-4 sm:px-6 pt-6 pb-4 shrink-0"
            >
              <span className="text-xs tracking-[0.2em] text-white font-mono">
                {todayLabel()}
              </span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                <img src={header_logo} className="w-4" />
                VISIŪM
              </span>
              <button
                type="button"
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
                const isActive = link.href === activeHref;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={linkVariants}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-[clamp(2.25rem,7vw,5.5rem)] font-medium text-white leading-[1.15] hover:opacity-60 transition-opacity text-center ${
                      isActive
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

  // Scroll-spy only matters on the homepage, where the hash sections live.
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

  // Any real route (Work, Services, and anything added later) is matched
  // generically against the current pathname. Only when there's no route
  // match — i.e. we're actually on "/" — does the scroll-spy value apply.
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 ${
        inverted ? "bg-transparent text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="hidden h-[68px] items-center justify-between border-t-4 border-[#303638] px-6 md:flex lg:px-8">
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

      <div className="flex h-14 items-center justify-between px-6 md:hidden">
        <img
          src={inverted ? header_logo_black : header_logo}
          className="w-8"
          alt="Visium Studios"
        />

        <div>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color={inverted && !isOpen ? "#000" : "#fff"}
          />
        </div>
      </div>

      <MenuOverlay
        open={isOpen}
        onClose={() => setOpen(false)}
        activeHref={activeHref}
      />
    </header>
  );
}

export default Header;
