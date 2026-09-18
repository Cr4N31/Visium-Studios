import { FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

import footer_img from "/assets/logo/fullWhite.png";

function Footer({ inverted = false }) {
  const isLight = false;
  const themeClasses = {
    shell: "border-white/10 bg-black text-white",
    muted: "text-white/40",
    soft: "text-white/60",
    primary: "text-white",
    secondary: "text-white/70",
    border: "border-white/10",
    button: "bg-white text-black",
  };
  const siteMap = [
    { name: "Home", href: "#home" },
    { name: "Work", href: "/work" },
    { name: "Studio", href: "/studio" },
    { name: "Contact", href: "#contact" },
  ];

  const branding = [
    { name: "Branding", href: "/branding" },
    { name: "Logo creation", href: "/branding/logo-creation" },
    { name: "Visual identity", href: "/branding/visual-identity" },
    { name: "Brand systems", href: "/branding/brand-systems" },
    { name: "Rebranding", href: "/branding/rebranding" },
    { name: "Art direction", href: "/branding/art-direction" },
    { name: "Positioning", href: "/branding/positioning" },
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
      href: "https://www.instagram.com/visiumstudios.co?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    },
    {
      name: "X",
      icon: <FaTwitter />,
      href: "#",
    },
    {
      name: "YouTube",
      icon: <FaLinkedinIn />,
      href: "#",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      href: "#",
    },
  ];

  return (
    <footer
      className={`mt-24 overflow-hidden border-t px-4 pt-8 pb-8 sm:px-6 md:px-8 ${themeClasses.shell}`}
    >
      {/* ================= CTA ================= */}
      <div
        className="mb-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between"
        data-aos="fade-up"
      >
        <p
          className={`text-4xl font-medium tracking-tight md:text-5xl lg:text-6xl ${themeClasses.primary}`}
        >
          Have something worth building?
        </p>

        <a
          href="/contact"
          className={`
            flex w-fit items-center gap-4
            rounded-full
            px-7 py-4
            text-sm font-semibold
            uppercase tracking-wide
            transition-all duration-300
            hover:gap-6
            ${themeClasses.button}
          `}
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
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.25em] ${themeClasses.muted}`}
          >
            Site map
          </p>

          <div className="space-y-0">
            {siteMap.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  block
                  text-2xl
                  leading-[1]
                  tracking-tight
                  transition-opacity duration-200
                  hover:opacity-50
                  ${themeClasses.primary}
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Branding */}
        <div>
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.25em] ${themeClasses.muted}`}
          >
            Branding
          </p>

          <div className="space-y-0">
            {branding.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  block
                  text-2xl
                  leading-[1]
                  tracking-tight
                  transition-opacity duration-200
                  hover:opacity-50
                  ${themeClasses.primary}
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Digital */}
        <div>
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.25em] ${themeClasses.muted}`}
          >
            Digital
          </p>

          <div className="space-y-0">
            {digital.map((link) => (
              <a
                key={link}
                href="#"
                className={`
                  block
                  text-2xl
                  leading-[1]
                  tracking-tight
                  transition-opacity duration-200
                  hover:opacity-50
                  ${themeClasses.primary}
                `}
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div>
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.25em] ${themeClasses.muted}`}
          >
            Connect
          </p>

          <div className="space-y-0">
            {connect.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`
                  flex items-center gap-2
                  text-2xl
                  leading-[1]
                  tracking-tight
                  transition-opacity duration-200
                  hover:opacity-50
                  ${themeClasses.primary}
                `}
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
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.25em] ${themeClasses.muted}`}
          >
            Studio
          </p>

          <p
            className={`text-2xl leading-none tracking-tight ${themeClasses.primary}`}
          >
            Visium Studios
          </p>

          <p className={`mt-2 text-sm ${themeClasses.muted}`}>
            © {new Date().getFullYear()} Visium Studios™
          </p>

          <a
            href="#"
            className={`
              mt-3 block
              text-sm
              transition-colors
              hover:opacity-60
              ${themeClasses.soft}
            `}
          >
            Privacy & Cookies
          </a>
        </div>

        {/* Contact */}
        <div>
          <p
            className={`mb-5 text-[10px] uppercase tracking-[0.25em] ${themeClasses.muted}`}
          >
            Contact
          </p>

          <a
            href="mailto:hello@visiumstudios.com"
            className={`
              block
              text-2xl
              leading-none
              tracking-tight
              transition-opacity
              hover:opacity-50
              ${themeClasses.primary}
            `}
          >
            hello@visiumstudios.com
          </a>

          <a
            href="tel:+0000000000"
            className={`
              mt-1
              block
              text-2xl
              leading-none
              tracking-tight
              transition-opacity
              hover:opacity-50
              ${themeClasses.primary}
            `}
          >
            +00 000 000 000
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <img
          src={footer_img}
          className="mt-10 w-full max-w-[500px]"
          alt="Visium Studios"
        />
      </div>
    </footer>
  );
}

export default Footer;
