// Mock data — swap thumbnail/media paths and copy once real assets/CMS exist.
// `size` drives the masonry span in WorkGrid: "tall" | "wide" | "normal"

const projects = [
  {
    id: "01",
    slug: "north-current",
    title: "North Current",
    featured: true,
    tagline:
      "Repositioning a legacy shipping brand for a digital-first market.",
    tags: ["Brand Strategy", "Visual Identity", "Web Design"],
    size: "wide",
    thumbnail: "/placeholders/project-01.jpg",
    year: "2025",
    client: "North Current Logistics",
    location: "Rotterdam, NL",
    externalUrl: "https://example.com",
    brief:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroMedia: "/placeholders/project-01-hero.mp4",
    sections: [
      {
        label: "Context",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
      },
      {
        label: "Problem",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint.",
      },
      {
        label: "Approach",
        content:
          "Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis.",
      },
      {
        label: "System",
        content:
          "Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium totam rem aperiam eaque ipsa quae.",
      },
      {
        label: "Result",
        content:
          "Ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.",
      },
    ],
    gallery: [
      "/placeholders/project-01-g1.jpg",
      "/placeholders/project-01-g2.jpg",
      "/placeholders/project-01-g3.jpg",
      "/placeholders/project-01-g4.jpg",
    ],
  },
  {
    id: "02",
    slug: "harbor-clinic",
    title: "Harbor Clinic",
    tagline: "A calm, clear digital experience for a modern medical practice.",
    tags: ["Web Design", "Development"],
    size: "tall",
    thumbnail: "/placeholders/project-02.jpg",
    year: "2025",
    client: "Harbor Clinic Group",
    location: "Lisbon, PT",
    externalUrl: "https://example.com",
    brief:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.",
    heroMedia: "/placeholders/project-02-hero.mp4",
    sections: [
      {
        label: "Context",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      },
      {
        label: "Problem",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
      },
      {
        label: "Approach",
        content: "Ut enim ad minim veniam quis nostrud exercitation ullamco.",
      },
      {
        label: "System",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit.",
      },
      {
        label: "Result",
        content:
          "Excepteur sint occaecat cupidatat non proident sunt in culpa.",
      },
    ],
    gallery: [
      "/placeholders/project-02-g1.jpg",
      "/placeholders/project-02-g2.jpg",
    ],
  },
  {
    id: "03",
    slug: "foundry-supply",
    title: "Foundry Supply Co.",
    featured: true,
    tagline:
      "Building a distribution brand that feels engineered, not generic.",
    tags: ["Brand Identity", "Creative Direction"],
    size: "normal",
    thumbnail: "/placeholders/project-03.jpg",
    year: "2024",
    client: "Foundry Supply Co.",
    location: "Detroit, US",
    externalUrl: "https://example.com",
    brief:
      "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    heroMedia: "/placeholders/project-03-hero.mp4",
    sections: [
      {
        label: "Context",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      },
      {
        label: "Problem",
        content: "Ut labore et dolore magna aliqua ut enim ad minim veniam.",
      },
      {
        label: "Approach",
        content: "Quis nostrud exercitation ullamco laboris nisi ut aliquip.",
      },
      {
        label: "System",
        content:
          "Ex ea commodo consequat duis aute irure dolor in reprehenderit.",
      },
      {
        label: "Result",
        content:
          "In voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
    ],
    gallery: [
      "/placeholders/project-03-g1.jpg",
      "/placeholders/project-03-g2.jpg",
      "/placeholders/project-03-g3.jpg",
    ],
  },
  {
    id: "04",
    slug: "atrium-realty",
    title: "Atrium Realty",
    tagline: "Positioning premium real estate through restraint, not excess.",
    tags: ["Brand Strategy", "Web Design", "Content"],
    size: "wide",
    thumbnail: "/placeholders/project-04.jpg",
    year: "2024",
    client: "Atrium Realty Group",
    location: "Austin, US",
    externalUrl: "https://example.com",
    brief: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    heroMedia: "/placeholders/project-04-hero.mp4",
    sections: [
      {
        label: "Context",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      },
      {
        label: "Problem",
        content: "Ut enim ad minim veniam quis nostrud exercitation ullamco.",
      },
      {
        label: "Approach",
        content: "Laboris nisi ut aliquip ex ea commodo consequat duis aute.",
      },
      {
        label: "System",
        content: "Irure dolor in reprehenderit in voluptate velit esse cillum.",
      },
      {
        label: "Result",
        content:
          "Dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.",
      },
    ],
    gallery: [
      "/placeholders/project-04-g1.jpg",
      "/placeholders/project-04-g2.jpg",
    ],
  },
  {
    id: "05",
    slug: "meridian-labs",
    title: "Meridian Labs",
    tagline: "A visual system for a biotech startup entering public trials.",
    tags: ["Visual Identity", "Web Design", "Development"],
    size: "normal",
    thumbnail: "/placeholders/project-05.jpg",
    year: "2023",
    client: "Meridian Labs",
    location: "Basel, CH",
    externalUrl: "https://example.com",
    brief:
      "Non proident sunt in culpa qui officia deserunt mollit anim id est.",
    heroMedia: "/placeholders/project-05-hero.mp4",
    sections: [
      {
        label: "Context",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      },
      {
        label: "Problem",
        content: "Sed do eiusmod tempor incididunt ut labore et dolore magna.",
      },
      {
        label: "Approach",
        content: "Aliqua ut enim ad minim veniam quis nostrud exercitation.",
      },
      {
        label: "System",
        content: "Ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        label: "Result",
        content:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
      },
    ],
    gallery: [
      "/placeholders/project-05-g1.jpg",
      "/placeholders/project-05-g2.jpg",
    ],
  },
  {
    id: "06",
    slug: "wayline-transit",
    title: "Wayline Transit",
    featured: true,
    tagline: "Wayfinding and digital identity for a city transit network.",
    tags: ["Brand Identity", "Digital Product"],
    size: "tall",
    thumbnail: "/placeholders/project-06.jpg",
    year: "2023",
    client: "Wayline Transit Authority",
    location: "Toronto, CA",
    externalUrl: "https://example.com",
    brief:
      "Cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat.",
    heroMedia: "/placeholders/project-06-hero.mp4",
    sections: [
      {
        label: "Context",
        content: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
      },
      {
        label: "Problem",
        content: "Non proident sunt in culpa qui officia deserunt mollit anim.",
      },
      {
        label: "Approach",
        content: "Id est laborum sed ut perspiciatis unde omnis iste natus.",
      },
      {
        label: "System",
        content:
          "Error sit voluptatem accusantium doloremque laudantium totam.",
      },
      {
        label: "Result",
        content: "Rem aperiam eaque ipsa quae ab illo inventore veritatis et.",
      },
    ],
    gallery: [
      "/placeholders/project-06-g1.jpg",
      "/placeholders/project-06-g2.jpg",
      "/placeholders/project-06-g3.jpg",
    ],
  },
];

export default projects;
