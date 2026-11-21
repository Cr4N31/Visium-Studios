import { Link, useLocation } from "react-router-dom";

import footer_img from "/assets/logo/fullWhite.png";

// Flip these to true when you are ready to bring the columns back
const SHOW_BRANDING = false;
const SHOW_DIGITAL = false;

function Footer() {
  const { pathname } = useLocation();
  const themeClasses = {
    shell: "border-white/10 bg-[#0B0B0B] text-white",
    muted: "text-white/40",
    soft: "text-white/60",
    primary: "text-white",
  };

  const siteMap = [
    { name: "Home", href: "/" },
    { name: "Work", href: "/work" },
    { name: "Capabilities", href: "/capabilities" },
    { name: "Studio", href: "/studio" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
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
    { name: "Websites", href: "#" },
    { name: "Digital products", href: "#" },
    { name: "UI/UX design", href: "#" },
    { name: "Digital experiences", href: "#" },
  ];

  const connect = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/visiumstudios.co?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==",
    },
    { name: "X", href: "#" },
    { name: "YouTube", href: "#" },
    { name: "LinkedIn", href: "#" },
  ];

  const handleSiteMapClick = (event, name, href) => {
    if (pathname !== href) return;

    const targetId =
      name === "Home" ? "home" : name === "Contact" ? "contact" : null;
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const labelClass = `mb-5 text-[10px] uppercase tracking-[0.25em] ${themeClasses.muted}`;
  const linkClass = `block text-2xl leading-[1] tracking-tight transition-opacity duration-200 hover:opacity-50 ${themeClasses.primary}`;

  return (
    <footer
      className={`mt-24 overflow-hidden border-t px-8 py-8 ${themeClasses.shell}`}
    >
      {/* ================= ALL COLUMNS, ONE GRID ================= */}
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Site Map */}
        <div>
          <p className={labelClass}>Site map</p>
          <div>
            {siteMap.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(event) =>
                  handleSiteMapClick(event, link.name, link.href)
                }
                className={linkClass}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Branding (hidden for now) */}
        {SHOW_BRANDING && (
          <div>
            <p className={labelClass}>Branding</p>
            <div>
              {branding.map((link) => (
                <Link key={link.name} to={link.href} className={linkClass}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Digital (hidden for now) */}
        {SHOW_DIGITAL && (
          <div>
            <p className={labelClass}>Digital</p>
            <div>
              {digital.map((link) => (
                <a key={link.name} href={link.href} className={linkClass}>
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Connect */}
        <div>
          <p className={labelClass}>Connect</p>
          <div>
            {connect.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={linkClass}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>

        {/* Studio */}
        <div>
          <p className={labelClass}>Studio</p>
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
            className={`mt-3 block text-sm transition-opacity hover:opacity-60 ${themeClasses.soft}`}
          >
            Privacy & Cookies
          </a>
        </div>

        {/* Contact */}
        <div>
          <p className={labelClass}>Contact</p>
          <a
            href="mailto:hello@visiumstudios.com"
            className={`block break-words text-xl leading-none tracking-tight transition-opacity hover:opacity-50 xl:text-2xl ${themeClasses.primary}`}
          >
            hello@visiumstudios.com
          </a>
          <a
            href="tel:+0000000000"
            className={`mt-1 block text-xl leading-none tracking-tight transition-opacity hover:opacity-50 xl:text-2xl ${themeClasses.primary}`}
          >
            +00 000 000 000
          </a>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <img
          src={footer_img}
          className="mt-16 w-full max-w-[500px]"
          alt="Visium Studios"
        />
      </div>
    </footer>
  );
}

export default Footer;
