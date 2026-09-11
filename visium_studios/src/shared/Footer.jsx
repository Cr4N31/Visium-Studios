import { FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

import footer_img from "/assets/logo/fullWhite.png";

function Footer() {
  const siteMap = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "/work" },
    { name: "Project", href: "#project" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const branding = [
    "Branding",
    "Logo creation",
    "Visual identity",
    "Brand Systems",
    "Rebranding",
    "Art direction",
    "Positioning",
  ];

  const digital = [
    "Websites",
    "Digital products",
    "UI/UX design",
    "Digital experiences",
  ];

  const connect = [
    {
      name: "Instagram",
      icon: <FaInstagram />,
    },
    {
      name: "TikTok",
      icon: <FaTwitter />,
    },
    {
      name: "YouTube",
      icon: <FaLinkedinIn />,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
    },
  ];

  return (
    <footer className="mt-24 overflow-hidden border-t border-white/10 px-4 pt-8 pb-8 sm:px-6 md:px-8">
      {/* ================= CTA ================= */}
      <div
        className="mb-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        data-aos="fade-up"
      >
        <p className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
          Have something worth building?
        </p>

        <a
          href="#contact"
          className="
            flex w-fit items-center gap-4
            rounded-full
            bg-white
            px-7 py-4
            text-sm font-semibold
            uppercase tracking-wide
            text-black
            transition-all duration-300
            hover:gap-6
          "
        >
          Let's talk
          <span>→</span>
        </a>
      </div>

      {/* ================= MAIN NAVIGATION ================= */}
      <div
        className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4"
        data-aos="fade-up"
      >
        {/* Site Map */}
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Site map
          </p>

          <div className="space-y-0">
            {siteMap.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  block
                  text-2xl
                  leading-[1]
                  tracking-tight
                  text-white
                  transition-opacity duration-200
                  hover:opacity-50
                "
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Branding */}
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Branding
          </p>

          <div className="space-y-0">
            {branding.map((link) => (
              <a
                key={link}
                href="#"
                className="
                  block
                  text-2xl
                  leading-[1]
                  tracking-tight
                  text-white
                  transition-opacity duration-200
                  hover:opacity-50
                "
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Digital */}
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Digital
          </p>

          <div className="space-y-0">
            {digital.map((link) => (
              <a
                key={link}
                href="#"
                className="
                  block
                  text-2xl
                  leading-[1]
                  tracking-tight
                  text-white
                  transition-opacity duration-200
                  hover:opacity-50
                "
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Connect
          </p>

          <div className="space-y-0">
            {connect.map((link) => (
              <a
                key={link.name}
                href="#"
                className="
                  flex items-center gap-2
                  text-2xl
                  leading-[1]
                  tracking-tight
                  text-white
                  transition-opacity duration-200
                  hover:opacity-50
                "
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ================= STUDIO / CONTACT ================= */}
      <div
        className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-4"
        data-aos="fade-up"
      >
        {/* Studio */}
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Studio
          </p>

          <p className="text-2xl leading-none tracking-tight text-white">
            Visium Studios
          </p>

          <p className="mt-2 text-sm text-white/40">
            © {new Date().getFullYear()} Visium Studios™
          </p>

          <a
            href="#"
            className="
              mt-3 block
              text-sm
              text-white/60
              transition-colors
              hover:text-white
            "
          >
            Privacy & Cookies
          </a>
        </div>

        {/* Contact */}
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-white/40">
            Contact
          </p>

          <a
            href="mailto:hello@visiumstudios.com"
            className="
              block
              text-2xl
              leading-none
              tracking-tight
              text-white
              transition-opacity
              hover:opacity-50
            "
          >
            hello@visiumstudios.com
          </a>

          <a
            href="tel:+0000000000"
            className="
              mt-1
              block
              text-2xl
              leading-none
              tracking-tight
              text-white
              transition-opacity
              hover:opacity-50
            "
          >
            +00 000 000 000
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src={footer_img} className="mt-10 w-full max-w-[500px]" />
      </div>
    </footer>
  );
}

export default Footer;
