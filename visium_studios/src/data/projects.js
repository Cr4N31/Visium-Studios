// ============================================================================
// Visium Studios: projects data
// ----------------------------------------------------------------------------
// One project = one object created with defineProject(). The case study page
// renders every project the same way, in this order:
//
//   header      -> logo card, title, category, tagline, meta row, hero image
//   story       -> numbered text sections (01, 02, 03 ...), optional callout banner
//   logo        -> logo video, description, showcase, construction, palette, lockup
//   brand       -> grouped galleries (Identity, Apparel, Campaign ...)
//   motion      -> "Identity in motion" banner + caption
//   credits     -> role / name pairs + CTA
//   otherWorks  -> slugs of other projects, rendered as logo cards
//
// Section numbers (01, 02 ...) are NOT stored. The frontend computes them from
// order, so adding or removing a section never needs renumbering.
//
// Every optional block can be omitted or set to null. The frontend should
// simply skip any block that is missing.
// ============================================================================

const ASSETS = "/assets/portfolio_images";

// --- helpers ----------------------------------------------------------------

/** Build full image paths from a folder name and a list of file names. */
const files = (folder, names) => names.map((n) => `${ASSETS}/${folder}/${n}`);

/** Shorthand for a single asset path. */
const asset = (folder, name) => `${ASSETS}/${folder}/${name}`;

/** Media object. type is "image" | "video" | "gif" so the frontend can pick the right tag. */
const media = (src, type = "image", alt = "") => ({ src, type, alt });

const DEFAULT_CREDITS = [
  { role: "Creative Direction", name: "Visium Studios" },
  { role: "Motion", name: "Visium Studios" },
  { role: "Photography", name: "Visium Studios" },
  { role: "Development", name: "Visium Studios" },
];

/**
 * Fills in every field with a safe default so all projects share one shape.
 * Anything you pass in overrides the default.
 */
const defineProject = (p) => ({
  // identity
  id: "",
  slug: "",
  title: "",
  subtitle: "", // shown after the title, e.g. "Rallow™" + "Streetwear"
  featured: false,
  category: "Brand Identity", // small label above the title
  tagline: "",
  tags: [],
  year: "",

  // listing / cards
  thumbnail: "", // work grid card
  card: { logo: "", background: "#E8E8E8" }, // "Other works" card

  // header
  headerLogo: { src: "", background: "#F4F4F4" }, // logo on the light banner
  hero: null, // media(...)
  meta: { client: "", services: "", duration: "", location: "" },
  externalUrl: "",

  // body
  story: [],
  logo: null,
  brand: null,
  motion: null,
  credits: DEFAULT_CREDITS,
  cta: { label: "Start a project", href: "/contact" },
  otherWorks: [],

  ...p,
});

// ============================================================================
// PROJECTS
// ============================================================================

const projects = [
  // --------------------------------------------------------------------------
  // 01 RALLOW  (reference case study, built from the Figma wireframe)
  // --------------------------------------------------------------------------
  defineProject({
    id: "01",
    slug: "rallow",
    title: "Rallow™",
    subtitle: "Streetwear",
    featured: true,
    category: "Brand Identity",
    tagline:
      "A bold streetwear brand built on culture, community and self-expression.",
    tags: ["Branding", "SMM"],
    year: "2025",

    thumbnail: asset("Rallow", "Preview Cover.png"),
    card: { logo: asset("Rallow", "VIDEO 01.gif"), background: "#E8E8E8" },

    headerLogo: {
      src: asset("Rallow", "VIDEO 01.gif"),
      background: "#F4F4F4",
    },
    hero: media(
      asset("Rallow", "Preview Cover.png"),
      "image",
      "Rallow campaign",
    ),
    meta: {
      client: "North Current Logistics",
      services: "Branding & visual system",
      duration: "3 months",
      location: "Rotterdam, NL",
    },

    // Sections 01 to 03. Each body is an array of paragraphs.
    story: [
      {
        label: "The Challenge",
        body: [
          "In a crowded fashion world, many Nigerians struggle to find streetwear that truly reflects who they are. Most brands offer similar styles that blend in rather than celebrate personal identity. There was a clear gap for clothing that helps people feel confident, authentic and seen for their uniqueness.",
          "So we thought, how do we design this streetwear brand to inspire self-expression and make individuality feel celebrated?",
        ],
      },
      {
        label: "The Solution",
        body: [
          "To address the challenge of standing out in a crowded market, Rallow's branding solution focuses on creating a strong, unified visual identity that reflects its rebellious ethos. The design is built around bold typography, striking geometric forms, and a dynamic color palette that speaks to the brand's defiant nature. Every element, from the logo to the custom clothing designs, works in harmony to communicate Rallow's message of individuality and bold self-expression.",
          "By embracing clean, modern design choices paired with disruptive messaging, Rallow establishes a distinct presence in the streetwear landscape. This cohesive identity not only connects with its audience on a personal level but also reinforces its core values of rebellion, independence, and authenticity. Through this powerful visual language, Rallow positions itself as more than just a brand. It's a movement for those who refuse to conform.",
        ],
      },
      {
        label: "Our Impact",
        body: [
          "More than a brand, it's a movement. Rallow is more than what you wear. It is a statement of confidence, individuality and self-expression. We exist to inspire a generation to embrace their uniqueness, challenge the ordinary and express themselves without limitations. Through fashion, creativity and culture, we are building a community where boldness is celebrated, individuality is valued and every style tells a story. Rallow. Wear your Bold Side.",
        ],
        // Optional banner that sits under the text (red banner in the Figma)
        callout: {
          eyebrow: "Our Impact.",
          headline: "More than a brand. It's a movement.",
          text: "Rallow continues to inspire creativity, confidence and culture.",
          cta: { label: "Let's Build Together", href: "/contact" },
          background: asset("Rallow", "Impact Banner.png"),
        },
      },
    ],

    // Section 04
    logo: {
      label: "The Logo",
      video: media(
        asset("Rallow", "VIDEO 01.gif"),
        "gif",
        "Rallow logo animation",
      ),
      description: [
        "The Rallow logo is a powerful visual representation of the brand's core values: rebellion, individuality, and breaking the mold. The geometric design features three connected squares, each modified with chamfered corners at the top left and bottom right, symbolizing defiance and disruption of traditional forms. These chamfered corners signify the brand's willingness to break away from conventional paths and embrace the unconventional.",
        "The connection of the squares represents unity and strength, reflecting the Rallow community, individuals who come together through shared ideals of boldness and nonconformity. The linear alignment of the squares showcases order amidst rebellion, with an underlying structure that supports creativity and expression. The use of sharp, clean lines adds a modern and edgy feel to the logo, aligning perfectly with Rallow's streetwear aesthetics.",
        "This minimalist yet striking design creates a memorable brand mark that stands out in the fashion landscape, echoing Rallow's commitment to making bold statements through simplicity and impact.",
      ],
      // Optional: the old "Result" copy about the animation
      animationNote:
        "Rallow's logo animation captures the brand's bold essence through fluid, intentional movement. The disconnected outlines of the geometric marks appear first, one by one, symbolizing individual expression. As they unite and fill with color, the animation reflects the brand's rebellious journey toward unity and strength.",
      showcase: media(
        asset("Rallow", "Logo Showcase.png"),
        "image",
        "Rallow logo on dark",
      ),
      construction: [
        media(
          asset("Rallow", "Logo Construction 01.png"),
          "image",
          "Logo mark and chamfer detail",
        ),
        media(
          asset("Rallow", "Logo Construction 02.png"),
          "image",
          "Logo grid",
        ),
      ],
      // VERIFY these values against the final brand guide. Deep Crimson and
      // Fiery Red were not legible in the Figma screenshot.
      palette: {
        primary: [
          { name: "Deep Crimson", hex: "#B71C1C" },
          { name: "Fiery Red", hex: "#E63030" },
        ],
        secondary: [
          {
            name: "Black",
            hex: "#111111",
            rgb: "017 017 017",
            cmyk: "75 68 68 90",
          },
          {
            name: "White",
            hex: "#F4F4F4",
            rgb: "244 244 244",
            cmyk: "03 02 02 00",
          },
          {
            name: "Peach",
            hex: "#F7E7DC",
            rgb: "247 231 220",
            cmyk: "02 08 10 00",
          },
        ],
      },
      lockup: media(
        asset("Rallow", "Logo Lockup Red.png"),
        "image",
        "Logo on crimson",
      ),
    },

    // Section 05. Each group renders under its own small uppercase label.
    // NOTE: the 38 existing files were split by letter prefix as a placeholder.
    // Move them into the group they actually belong to.
    brand: {
      label: "The Brand",
      groups: [
        {
          label: "Identity",
          images: files("Rallow", [
            "A - P1.png",
            "A - P11.png",
            "A - P21.png",
            "A - P31.png",
            "B - P2.png",
            "B - P12.png",
            "B - P22.png",
            "B - P32.png",
            "C - 23.png",
            "C - P3.png",
            "C - P13.png",
            "C - P33.png",
            "D - P4.png",
            "D - P14.png",
            "D - P24.png",
            "D - P34.png",
          ]),
        },
        {
          label: "Apparel",
          images: files("Rallow", [
            "E - P5.png",
            "E - P15.png",
            "E - P25.png",
            "E - P35.png",
            "F - P6.png",
            "F - P16.png",
            "F - P26.png",
            "F - P36.png",
            "G - 27.png",
            "G - P7.png",
            "G - P17.png",
            "G - P37.png",
          ]),
        },
        {
          label: "Campaign",
          images: files("Rallow", [
            "H - P8.png",
            "H - P28.png",
            "H -P18.png",
            "I - P9.png",
            "I - P19.png",
            "I - P29.png",
            "I - P39.png",
            "J - P10.png",
            "J - P20.png",
            "J - P30.png",
          ]),
        },
      ],
    },

    // Section 06
    motion: {
      label: "Identity in Motion",
      banner: media(
        asset("Rallow", "VIDEO 02.gif"),
        "gif",
        "Rallow identity in motion",
      ),
      extra: [media(asset("Rallow", "VIDEO 03.gif"), "gif")],
      caption:
        "From logos to lifestyle, Rallow's identity comes alive across apparel, tags, and experiences.",
    },

    // Section 07 uses DEFAULT_CREDITS and the default CTA.
    // Section 08. Slugs are resolved with getOtherWorks().
    otherWorks: ["horizona", "atrium-realty", "meridian-labs"],
  }),

  // --------------------------------------------------------------------------
  // 02 HORIZONA  (migrated from the old file, fill in the gaps as assets exist)
  // --------------------------------------------------------------------------
  defineProject({
    id: "02",
    slug: "horizona",
    title: "Horizona",
    subtitle: "",
    featured: true,
    category: "Brand Identity",
    tagline: "The future of aerial imaging.",
    tags: ["Branding", "UI/UX Design", "Website"],
    year: "2023",

    thumbnail: asset("Horizona", "Preview Cover.png"),
    card: { logo: asset("Horizona", "Video 01.gif"), background: "#E8E8E8" },

    headerLogo: {
      src: asset("Horizona", "Video 01.gif"),
      background: "#F4F4F4",
    },
    hero: media(
      asset("Horizona", "Preview Cover.png"),
      "image",
      "Horizona cover",
    ),
    meta: {
      client: "Daniel Krause",
      services: "Branding & motion",
      duration: "",
      location: "Germany",
    },
    externalUrl: "https://example.com",

    story: [
      {
        label: "Context",
        body: [
          "The Horizona™ Logo: A Symbol of Flight, Innovation and Progress.",
          "The Horizona logo rebrand represents a bold evolution from its previous design, aligning more closely with the brand's core values of precision, exploration, and cutting-edge drone technology. The original logo, a hexagon with two internal lines and a heavy solid font, conveyed stability but lacked the dynamic motion and innovation that define Horizona's mission.",
          "The new logo, composed of four interconnected triangles in an X formation, is inspired by the spinning blades of a drone in flight. This design captures the essence of movement, agility, and limitless aerial perspectives. The refined geometric structure reflects engineering excellence, while its open, balanced form represents adaptability and forward-thinking design. Paired with a more modern and sleek typography, the rebranded identity enhances brand recognition and positions Horizona as a leader in aerial imaging.",
        ],
      },
      {
        label: "Problem",
        body: [
          "The Need for Precision and Innovation in Aerial Imaging.",
          "In a rapidly evolving world of drone technology, finding a brand that truly prioritizes precision, innovation, and creative freedom is a challenge. Many existing drone camera brands focus solely on functionality, often neglecting the importance of intuitive design, cutting-edge imaging, and seamless user experience. As a result, professionals and creators struggle to find a solution that balances high performance with ease of use.",
          "Horizona was created to bridge this gap, offering a new standard in aerial imaging with state-of-the-art drone cameras that combine advanced engineering with artistic vision. By redefining drone design and functionality, Horizona provides a solution that goes beyond flying. It elevates storytelling, exploration, and innovation from above.",
        ],
      },
      {
        label: "Approach",
        body: [
          "Defining a Bold and Innovative Identity for Horizona.",
          "To establish Horizona as a leader in aerial imaging, the brand's visual identity is built around precision, innovation, and movement. The redesigned logo, inspired by the spinning blades of a drone, embodies agility and cutting-edge technology, while the modern typography reflects clarity and professionalism. A sleek, high-tech color palette reinforces the brand's futuristic vision.",
          "By combining geometric precision with fluid motion, Horizona's identity captures the essence of exploration and limitless perspectives. This cohesive visual language positions Horizona as more than just a drone brand; it represents a revolution in how we capture and experience the world from above.",
        ],
      },
    ],

    logo: {
      label: "The Logo",
      video: media(
        asset("Horizona", "Video 01.gif"),
        "gif",
        "Horizona logo animation",
      ),
      description: [
        "Horizona's logo animation is a visual representation of precision, assembly, and innovation, core principles that define the brand. The sequence begins with a single triangle appearing in its normal form, symbolizing the foundation of aerial technology. One by one, the remaining triangles slide into place, each adjusting the others, reflecting the meticulous engineering and calibration that go into every Horizona drone.",
        "Then, in a seamless transformation, the triangles flip and rotate, aligning into the final logo shape while still apart. This moment captures the essence of drone movement: agility, balance, and adaptability. As they begin to shrink and interlock, the animation conveys a sense of refinement and completion.",
        "Finally, the brand name Horizona emerges letter by letter, reinforcing a smooth, calculated reveal. The animation as a whole embodies Horizona's vision, merging technology and creativity to redefine perspectives from above.",
      ],
      animationNote: "",
      showcase: null,
      construction: [],
      palette: null,
      lockup: null,
    },

    // Existing 26 files, grouped as a placeholder. Re-sort when ready.
    brand: {
      label: "The Brand",
      groups: [
        {
          label: "Identity",
          images: files("Horizona", [
            "A - P1.png",
            "A - P11.png",
            "A - P21.png",
            "B - P2.png",
            "B - P12.png",
            "B - P22.png",
            "C - P3.png",
            "C - P13.png",
            "C - P23.png",
          ]),
        },
        {
          label: "Collateral",
          images: files("Horizona", [
            "D - P4.png",
            "D - P14.png",
            "D - P24.png",
            "E - P5.png",
            "E - P15.png",
            "E - 25.png",
            "F - P6.png",
            "F -PAGE 16.png",
          ]),
        },
        {
          label: "Application",
          images: files("Horizona", [
            "G - P7.png",
            "G - P27.png",
            "G - PAGE 17.png",
            "H - P8.png",
            "H - P18.png",
            "I - P9.png",
            "I - P19.png",
            "J - P10.png",
            "J - P20.png",
          ]),
        },
      ],
    },

    motion: {
      label: "Identity in Motion",
      banner: media(
        asset("Horizona", "Video 02.gif"),
        "gif",
        "Horizona in motion",
      ),
      extra: [media(asset("Horizona", "Video 03.gif"), "gif")],
      caption: "",
    },

    otherWorks: ["rallow", "atrium-realty", "meridian-labs"],
  }),

  // --------------------------------------------------------------------------
  // PLACEHOLDER PROJECTS
  // Only the basics are filled in. Anything missing falls back to the defaults
  // from defineProject(), so the case study page still renders safely.
  // --------------------------------------------------------------------------
  defineProject({
    id: "03",
    slug: "harbor-clinic",
    title: "Harbor Clinic",
    category: "Website",
    tagline: "A calm, clear digital experience for a modern medical practice.",
    tags: ["Website", "UI/UX Design", "Development"],
    year: "2025",
    thumbnail: "/placeholders/project-02.jpg",
    hero: media("/placeholders/project-02-hero.mp4", "video"),
    meta: {
      client: "Harbor Clinic Group",
      services: "",
      duration: "",
      location: "Lisbon, PT",
    },
    externalUrl: "https://example.com",
    story: [
      {
        label: "Context",
        body: ["Lorem ipsum dolor sit amet consectetur adipiscing elit."],
      },
      {
        label: "Problem",
        body: ["Sed do eiusmod tempor incididunt ut labore et dolore magna."],
      },
      {
        label: "Approach",
        body: ["Ut enim ad minim veniam quis nostrud exercitation ullamco."],
      },
    ],
    brand: {
      label: "The Work",
      groups: [
        {
          label: "Gallery",
          images: [
            "/placeholders/project-02-g1.jpg",
            "/placeholders/project-02-g2.jpg",
          ],
        },
      ],
    },
    otherWorks: ["rallow", "horizona", "atrium-realty"],
  }),

  defineProject({
    id: "04",
    slug: "foundry-supply",
    title: "Foundry Supply Co.",
    featured: true,
    category: "Brand Identity",
    tagline:
      "Building a distribution brand that feels engineered, not generic.",
    tags: ["Branding"],
    year: "2024",
    thumbnail: "/placeholders/project-03.jpg",
    hero: media("/placeholders/project-03-hero.mp4", "video"),
    meta: {
      client: "Foundry Supply Co.",
      services: "",
      duration: "",
      location: "Detroit, US",
    },
    externalUrl: "https://example.com",
    story: [
      {
        label: "Context",
        body: ["Lorem ipsum dolor sit amet consectetur adipiscing elit."],
      },
      {
        label: "Problem",
        body: ["Ut labore et dolore magna aliqua ut enim ad minim veniam."],
      },
      {
        label: "Approach",
        body: ["Quis nostrud exercitation ullamco laboris nisi ut aliquip."],
      },
    ],
    brand: {
      label: "The Brand",
      groups: [
        {
          label: "Identity",
          images: [
            "/placeholders/project-03-g1.jpg",
            "/placeholders/project-03-g2.jpg",
            "/placeholders/project-03-g3.jpg",
          ],
        },
      ],
    },
    otherWorks: ["rallow", "horizona", "meridian-labs"],
  }),

  defineProject({
    id: "05",
    slug: "atrium-realty",
    title: "Atrium Realty",
    category: "Brand Identity",
    tagline: "Positioning premium real estate through restraint, not excess.",
    tags: ["Branding", "Website", "SEO Optimization"],
    year: "2024",
    thumbnail: "/placeholders/project-04.jpg",
    card: { logo: "/placeholders/atrium-logo.png", background: "#E8E8E8" },
    hero: media("/placeholders/project-04-hero.mp4", "video"),
    meta: {
      client: "Atrium Realty Group",
      services: "",
      duration: "",
      location: "Austin, US",
    },
    externalUrl: "https://example.com",
    story: [
      {
        label: "Context",
        body: ["Lorem ipsum dolor sit amet consectetur adipiscing elit."],
      },
      {
        label: "Problem",
        body: ["Ut enim ad minim veniam quis nostrud exercitation ullamco."],
      },
      {
        label: "Approach",
        body: ["Laboris nisi ut aliquip ex ea commodo consequat duis aute."],
      },
    ],
    brand: {
      label: "The Brand",
      groups: [
        {
          label: "Identity",
          images: [
            "/placeholders/project-04-g1.jpg",
            "/placeholders/project-04-g2.jpg",
          ],
        },
      ],
    },
    otherWorks: ["rallow", "horizona", "meridian-labs"],
  }),

  defineProject({
    id: "06",
    slug: "meridian-labs",
    title: "Meridian Labs",
    category: "Brand Identity",
    tagline: "A visual system for a biotech startup entering public trials.",
    tags: ["Branding", "Website", "UI/UX Design", "Development"],
    year: "2023",
    thumbnail: "/placeholders/project-05.jpg",
    card: { logo: "/placeholders/meridian-logo.png", background: "#E8E8E8" },
    hero: media("/placeholders/project-05-hero.mp4", "video"),
    meta: {
      client: "Meridian Labs",
      services: "",
      duration: "",
      location: "Basel, CH",
    },
    externalUrl: "https://example.com",
    story: [
      {
        label: "Context",
        body: ["Lorem ipsum dolor sit amet consectetur adipiscing elit."],
      },
      {
        label: "Problem",
        body: ["Sed do eiusmod tempor incididunt ut labore et dolore magna."],
      },
      {
        label: "Approach",
        body: ["Aliqua ut enim ad minim veniam quis nostrud exercitation."],
      },
    ],
    brand: {
      label: "The Brand",
      groups: [
        {
          label: "Identity",
          images: [
            "/placeholders/project-05-g1.jpg",
            "/placeholders/project-05-g2.jpg",
          ],
        },
      ],
    },
    otherWorks: ["rallow", "horizona", "atrium-realty"],
  }),
];

// ============================================================================
// SELECTORS
// ============================================================================

export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug) ?? null;

export const getFeaturedProjects = () => projects.filter((p) => p.featured);

/** Resolves a project's otherWorks slugs into full project objects (for the card row). */
export const getOtherWorks = (project) =>
  (project?.otherWorks ?? []).map(getProjectBySlug).filter(Boolean);

/** Previous and next project, for optional pagination at the bottom of a case study. */
export const getAdjacentProjects = (slug) => {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
};

export { defineProject, media, asset, files };
export default projects;
