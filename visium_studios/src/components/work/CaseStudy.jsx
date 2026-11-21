import { useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { getProjectBySlug, getOtherWorks } from "../../data/projects";
import projects from "../../data/projects";
import TextScramble from "../../shared/TextScramble";
import { useMagnetic, useMorphPointer } from "../../shared/useCtaPointer";

const MotionLink = Motion(Link);

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const VIDEO_RE = /\.(mp4|webm|mov)$/i;

/** Accepts a plain string path or a media object and always returns a media object. */
const toMedia = (entry, alt = "") => {
  if (!entry) return null;
  if (typeof entry === "string") {
    return { src: entry, type: VIDEO_RE.test(entry) ? "video" : "image", alt };
  }
  const src = entry.src || "";
  return {
    ...entry,
    src,
    type: entry.type || (VIDEO_RE.test(src) ? "video" : "image"),
    alt: entry.alt || alt,
  };
};

/** Picks black or white text for a given background hex. */
const readableOn = (hex = "") => {
  const h = hex.replace("#", "");
  if (h.length !== 6) return "#ffffff";
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  return (r * 299 + g * 587 + b * 114) / 1000 > 150 ? "#111111" : "#ffffff";
};

const pad = (n) => String(n).padStart(2, "0");

/* -------------------------------------------------------------------------- */
/* Small building blocks                                                      */
/* -------------------------------------------------------------------------- */

/** Renders image, gif or video. Renders nothing without a src, and a quiet block if the file fails to load. */
function ProjectMedia({ media, alt = "", className = "" }) {
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const m = toMedia(media, alt);

  if (!m?.src) return null;

  if (failed) {
    return (
      <div
        role="img"
        aria-label={m.alt}
        className={`${className} min-h-40 bg-white/5`}
      />
    );
  }

  if (m.type === "video") {
    const mime = /\.webm$/i.test(m.src) ? "video/webm" : "video/mp4";
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={m.alt}
        className={className}
        onError={() => setFailed(true)}
      >
        <source src={encodeURI(m.src)} type={mime} />
      </video>
    );
  }

  return (
    <Motion.img
      src={encodeURI(m.src)}
      alt={m.alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/** "— 01  THE CHALLENGE." */
function SectionHeading({ number, children }) {
  return (
    <h2 className="mb-6 flex items-center gap-3 text-[clamp(1.1rem,2.2vw,1.75rem)] font-semibold uppercase leading-none tracking-tight text-white">
      <span aria-hidden="true" className="h-px w-5 bg-white/70" />
      <span>{number}</span>
      <span>{children}.</span>
    </h2>
  );
}

function Paragraphs({ items = [], className = "" }) {
  return items.map((text, i) => (
    <p
      key={i}
      className={`max-w-3xl text-sm leading-relaxed text-white/70 ${className}`}
    >
      {text}
    </p>
  ));
}

/** Magnetic CTA used in the callout and in the credits section. Each instance owns its pointer hooks. */
function CtaButton({ to, children, className = "" }) {
  const morph = useMorphPointer();
  const magnetic = useMagnetic();

  return (
    <MotionLink
      to={to}
      data-blob
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
      className={`hero-cta relative isolate inline-flex items-center justify-center overflow-hidden rounded-sm border border-white/15 px-6 py-3 text-[11px] font-semibold uppercase tracking-tight transition ${className}`}
    >
      <Motion.span
        aria-hidden="true"
        className="cta-morph"
        style={{ left: morph.left, top: morph.top, scale: morph.scale }}
      />
      <span className="relative z-[1]">{children}</span>
    </MotionLink>
  );
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

function Callout({ callout, accent }) {
  const bg = toMedia(callout.background);

  return (
    <div className="relative mt-8 overflow-hidden rounded-md bg-[#1a0000]">
      {bg?.src && (
        <ProjectMedia
          media={bg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, ${accent}d9 0%, ${accent}66 100%)`,
        }}
      />
      <div className="relative grid items-center gap-6 p-6 md:grid-cols-[1fr_auto] md:gap-10 md:p-10">
        <div className="md:border-r md:border-white/40 md:pr-10">
          {callout.eyebrow && (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-tight text-white/90">
              {callout.eyebrow}
            </p>
          )}
          <p className="max-w-md text-[clamp(1.5rem,3.2vw,2.5rem)] font-semibold leading-[1.05] tracking-tight text-white">
            {callout.headline}
          </p>
          {callout.text && (
            <p className="mt-3 max-w-sm text-xs text-white/80">
              {callout.text}
            </p>
          )}
        </div>
        {callout.cta && (
          <CtaButton
            to={callout.cta.href}
            className="bg-white text-black/80 hover:bg-white/80"
          >
            {callout.cta.label}
          </CtaButton>
        )}
      </div>
    </div>
  );
}

function Palette({ palette }) {
  const primary = palette.primary ?? [];
  const secondary = palette.secondary ?? [];

  return (
    <div className="mt-8 overflow-hidden rounded-md">
      {primary.length > 0 && (
        <div className="grid sm:grid-cols-2">
          {primary.map((color) => (
            <div
              key={color.name}
              className="px-5 py-6"
              style={{
                backgroundColor: color.hex,
                color: readableOn(color.hex),
              }}
            >
              <p className="text-[9px] uppercase tracking-tight opacity-70">
                Primary color
              </p>
              <p className="mt-1 text-sm font-semibold uppercase">
                {color.name}
              </p>
            </div>
          ))}
        </div>
      )}
      {secondary.length > 0 && (
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${secondary.length}, minmax(0, 1fr))`,
          }}
        >
          {secondary.map((color) => (
            <div
              key={color.name}
              className="px-4 py-5 text-[9px] uppercase leading-relaxed tracking-tight"
              style={{
                backgroundColor: color.hex,
                color: readableOn(color.hex),
              }}
            >
              <p className="mb-2 font-semibold">{color.name}</p>
              {color.hex && <p>Hex code: {color.hex.toUpperCase()}</p>}
              {color.rgb && <p>RGB: {color.rgb}</p>}
              {color.cmyk && <p>CMYK: {color.cmyk}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OtherWorkCard({ item }) {
  const logo = item.card?.logo;

  return (
    <Link
      to={`/work/${item.slug}`}
      aria-label={`View ${item.title} case study`}
      className="group flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md p-8 transition hover:opacity-90"
      style={{ backgroundColor: item.card?.background || "#E8E8E8" }}
    >
      {logo ? (
        <ProjectMedia
          media={logo}
          alt={item.title}
          className=" object-contain transition duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="text-center text-lg font-semibold uppercase tracking-tight text-black/70">
          {item.title}
        </span>
      )}
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

function CaseStudy() {
  const { slug } = useParams();
  const location = useLocation();
  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const backPathname = location.state?.from || "/work";
  const backHash = location.state?.hash || "";
  const backLabel = backPathname === "/" ? "Back to Home" : "Back to Work";

  const {
    story = [],
    logo,
    brand,
    motion,
    credits = [],
    cta,
    headerLogo,
    hero,
    meta = {},
  } = project;

  // Brand accent comes from the project palette so each case study feels like its own brand.
  const accent =
    logo?.palette?.primary?.[1]?.hex ||
    logo?.palette?.primary?.[0]?.hex ||
    "#ffffff";

  const brandGroups = (brand?.groups ?? []).filter(
    (group) => group.images?.length,
  );
  const hasLogoContent = Boolean(
    logo?.video?.src ||
      logo?.description?.length ||
      logo?.animationNote ||
      logo?.showcase?.src ||
      logo?.construction?.length ||
      logo?.palette ||
      logo?.lockup?.src,
  );

  // Other works: use the project's picks, fall back to the first three other projects.
  const picked = getOtherWorks(project);
  const otherWorks =
    picked.length > 0
      ? picked
      : projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  // Section numbers follow render order, so adding or removing a section never needs renumbering.
  const numbers = {};
  let count = 0;
  const take = (key) => {
    numbers[key] = pad(++count);
  };
  story.forEach((_, i) => take(`story-${i}`));
  if (hasLogoContent) take("logo");
  if (brandGroups.length) take("brand");
  if (motion?.banner) take("motion");
  if (credits.length) take("credits");
  if (otherWorks.length) take("others");

  // Meta row: Client / Services / Duration / Location, skipping anything empty.
  const metaItems = [
    ["Client", meta.client],
    ["Services", meta.services],
    ["Duration", meta.duration],
    ["Location", meta.location],
  ].filter(([, value]) => value);
  if (metaItems.length < 4 && project.year) {
    metaItems.push(["Year", project.year]);
  }

  return (
    <main className="bg-[#050505] text-white" data-aos="fade-up">
      <div className="mx-auto max-w-[1200px] px-4 pb-24 pt-24 sm:px-6 md:px-10">
        {/* ------------------------------ Header ------------------------------ */}
        <Link
          to={{ pathname: backPathname, hash: backHash }}
          className="mb-5 inline-block text-[10px] uppercase tracking-[0.2em] text-white/60 transition hover:text-white"
        >
          {backLabel}
        </Link>

        {headerLogo?.src && (
          <div
            className="mb-10 flex items-center justify-center px-1 py-1 rounded-lg"
            style={{ backgroundColor: headerLogo.background || "#F4F4F4" }}
          >
            <ProjectMedia
              media={headerLogo.src}
              alt={`${project.title} logo`}
              className="h-72 w-full object-cover"
            />
          </div>
        )}

        <header className="mb-8 grid items-end gap-8 md:grid-cols-[1.6fr_1fr] md:gap-10">
          <div>
            {project.category && (
              <p className="mb-3 text-[9px] uppercase tracking-[0.18em] text-white/50">
                {project.category}
              </p>
            )}
            <h1 className="text-[clamp(2.75rem,8vw,6.5rem)] font-light leading-[0.9] tracking-[-0.05em] text-[#f1efe9]">
              <TextScramble>{project.title}</TextScramble>
              {project.subtitle && (
                <>
                  {" "}
                  <span aria-hidden="true">{"\u2014"}</span>
                  <br />
                  {project.subtitle}
                </>
              )}
            </h1>
          </div>
          {project.tagline && (
            <p
              className="border-l pl-6 text-sm leading-relaxed text-white/80 md:max-w-xs"
              style={{ borderColor: "rgba(255,255,255,0.35)" }}
            >
              {project.tagline}
            </p>
          )}
        </header>

        {metaItems.length > 0 && (
          <dl className="mb-10 grid grid-cols-2 gap-y-5 border-y border-white/15 py-5 md:grid-cols-4">
            {metaItems.map(([label, value], i) => (
              <div
                key={label}
                className={`px-4 first:pl-0 ${
                  i > 0 ? "md:border-l md:border-white/15" : ""
                } ${i % 2 === 1 ? "border-l border-white/15 md:border-l" : ""}`}
              >
                <dt className="mb-1.5 text-[8px] uppercase tracking-[0.18em] text-white/45">
                  {label}
                </dt>
                <dd className="text-xs text-white/85">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {hero?.src && (
          <div className="mb-16 overflow-hidden rounded-md bg-[#111111]">
            <ProjectMedia
              media={hero}
              alt={hero.alt || project.title}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {/* ---------------------- 01 to 03 Story sections --------------------- */}
        {story.map((section, i) => (
          <section
            key={`${project.slug}-story-${i}`}
            className="mb-16"
            data-aos="fade-up"
          >
            <SectionHeading number={numbers[`story-${i}`]}>
              {section.label}
            </SectionHeading>
            <div className="space-y-4">
              <Paragraphs items={section.body} />
            </div>
            {section.callout && (
              <Callout callout={section.callout} accent={accent} />
            )}
          </section>
        ))}

        {/* ------------------------------ The Logo ---------------------------- */}
        {hasLogoContent && (
          <section className="mb-16" data-aos="fade-up">
            <SectionHeading number={numbers.logo}>{logo.label}</SectionHeading>

            {logo.video?.src && (
              <div className="mb-8 overflow-hidden rounded-md bg-[#111111]">
                <ProjectMedia
                  media={logo.video}
                  alt={logo.video.alt || `${project.title} logo animation`}
                  className="w-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4 flex flex-col justify-center items-center">
              <Paragraphs className="" items={logo.description} />
              {logo.animationNote && (
                <p className="max-w-3xl text-sm leading-relaxed text-white/70">
                  {logo.animationNote}
                </p>
              )}
            </div>

            {logo.showcase?.src && (
              <div className="mt-8 overflow-hidden rounded-md bg-[#111111]">
                <ProjectMedia
                  media={logo.showcase}
                  alt={logo.showcase.alt || `${project.title} logo`}
                  className="w-full object-cover"
                />
              </div>
            )}

            {logo.construction?.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {logo.construction.map((item, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-md bg-[#111111]"
                  >
                    <ProjectMedia
                      media={item}
                      alt={`${project.title} logo construction ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {logo.palette && <Palette palette={logo.palette} />}

            {logo.lockup?.src && (
              <div className="mt-4 overflow-hidden rounded-md">
                <ProjectMedia
                  media={logo.lockup}
                  alt={logo.lockup.alt || `${project.title} logo lockup`}
                  className="w-full object-cover"
                />
              </div>
            )}
          </section>
        )}

        {/* ------------------------------ The Brand --------------------------- */}
        {brandGroups.length > 0 && (
          <section className="mb-16" data-aos="fade-up">
            <SectionHeading number={numbers.brand}>
              {brand.label || "The Brand"}
            </SectionHeading>

            <div className="space-y-12">
              {brandGroups.map((group) => (
                <div key={`${project.slug}-${group.label}`}>
                  <h3 className="mb-4 text-[10px] uppercase tracking-[0.18em] text-white/55">
                    {group.label}
                  </h3>
                  {/* CSS columns give a collage that copes with any mix of image shapes. */}
                  <div className="columns-2 gap-3 md:columns-3">
                    {group.images.map((image, i) => (
                      <div
                        key={`${group.label}-${i}`}
                        className="mb-3 break-inside-avoid overflow-hidden rounded-md bg-[#111111]"
                      >
                        <ProjectMedia
                          media={image}
                          alt={`${project.title} ${group.label} ${i + 1}`}
                          className="h-auto w-full"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -------------------------- Identity in Motion ---------------------- */}
        {motion?.banner?.src && (
          <section className="mb-16" data-aos="fade-up">
            <SectionHeading number={numbers.motion}>
              {motion.label}
            </SectionHeading>

            <div
              className={`grid items-center gap-6 ${
                motion.caption ? "md:grid-cols-[2fr_1fr]" : ""
              }`}
            >
              <div className="overflow-hidden rounded-md bg-[#111111]">
                <ProjectMedia
                  media={motion.banner}
                  alt={
                    motion.banner.alt || `${project.title} identity in motion`
                  }
                  className="w-full object-cover"
                />
              </div>
              {motion.caption && (
                <p
                  className="border-l-2 pl-4 text-xs leading-relaxed text-white/80"
                  style={{ borderColor: accent }}
                >
                  {motion.caption}
                </p>
              )}
            </div>

            {motion.extra?.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {motion.extra.map((item, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-md bg-[#111111]"
                  >
                    <ProjectMedia
                      media={item}
                      alt={`${project.title} motion ${i + 2}`}
                      className="w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* -------------------------------- Credits --------------------------- */}
        {credits.length > 0 && (
          <section className="mb-16" data-aos="fade-up">
            <SectionHeading number={numbers.credits}>Credits</SectionHeading>

            <dl
              className="grid gap-y-5"
              style={{
                gridTemplateColumns: `repeat(${Math.min(credits.length, 4)}, minmax(0, 1fr))`,
              }}
            >
              {credits.map((credit, i) => (
                <div
                  key={`${credit.role}-${i}`}
                  className={`px-4 first:pl-0 ${
                    i > 0 ? "border-l border-white/15" : ""
                  }`}
                >
                  <dt className="mb-1.5 text-[8px] uppercase tracking-[0.18em] text-white/45">
                    {credit.role}
                  </dt>
                  <dd className="text-xs text-white/85">{credit.name}</dd>
                </div>
              ))}
            </dl>

            {cta?.label && (
              <div className="mt-12 text-center">
                <CtaButton to={cta.href} className="bg-white text-black/80">
                  <span className="font-medium">{cta.label}</span>
                </CtaButton>
              </div>
            )}
          </section>
        )}

        {/* ------------------------------ Other works ------------------------- */}
        {otherWorks.length > 0 && (
          <section
            className="border-t border-white/15 pt-10"
            data-aos="fade-up"
          >
            <div className="mb-6 flex items-end justify-between">
              <SectionHeading number={numbers.others}>
                Other works
              </SectionHeading>
              <Link
                to="/work"
                className="mb-6 text-[9px] uppercase tracking-[0.14em] text-white/60 transition hover:text-white"
              >
                View all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {otherWorks.map((item) => (
                <OtherWorkCard key={item.slug} item={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default CaseStudy;
