import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";

// Mock content. Move this into data/footer.js so it can be swapped later.
const ctaData = {
  background: "/assets/img/footer-bg.webp", // any image, it gets desaturated
  to: "/startaproject",
  manager: {
    name: "Jace k.",
    avatar: "/assets/img/img.png",
  },
};

function Footer() {
  const { background, to, manager } = ctaData;

  return (
    <footer className="relative isolate mt-12 overflow-hidden bg-neutral-950 text-white">
      {/* monochrome backdrop: grayscale image over a soft gray glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_70%_30%,#525252_0%,#171717_55%,#0a0a0a_100%)]"
      />
      <img
        src="/assets/img/bg.jfif"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80 contrast-125 grayscale"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-transparent to-black/60"
      />

      <div className="flex min-h-[80svh] flex-col justify-between gap-16 px-6 py-8 md:px-10 md:py-10">
        <p className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-300">
          <span className="block h-2 w-2 rounded-full bg-white" />
          Book a call
        </p>

        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto] md:gap-16">
          <Motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl text-[clamp(2.5rem,8vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.04em]"
          >
            Let&apos;s book a call with our manager.
          </Motion.h2>

          <Motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-white p-5 text-black md:w-80"
          >
            <div className="flex items-center gap-4">
              <img
                src={manager.avatar}
                alt={manager.name}
                className="h-16 w-16 shrink-0 rounded-full bg-neutral-300 object-cover grayscale"
              />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs uppercase tracking-[0.14em] text-neutral-500">
                  Jace Kayode
                </span>
                <span className="text-lg leading-tight tracking-tight">
                  {manager.name}
                </span>
              </div>
            </div>

            <Link
              to={to}
              className="group flex items-center justify-between rounded-full bg-black px-6 py-3 text-sm text-white transition-colors duration-300 hover:bg-neutral-800"
            >
              Book Call
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
