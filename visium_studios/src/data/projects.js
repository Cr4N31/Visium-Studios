// Mock data — swap thumbnail/media paths and copy once real assets/CMS exist.
// `size` drives the masonry span in WorkGrid: "tall" | "wide" | "normal"

const projects = [
  {
    id: "01",
    slug: "horizona",
    title: "Horizona",
    featured: true,
    tagline: "The future of aerial imaging.",
    tags: ["Brand Identity", "Digital Product"],
    size: "tall",
    thumbnail: "/placeholders/project-06.jpg",
    year: "2023",
    client: "Daniel Krause",
    location: "Germany",
    externalUrl: "https://example.com",
    brief: `Horizona’s logo animation is a visual representation of precision, assembly, and innovation—core principles that define the brand. The sequence begins with a single triangle appearing in its normal form, symbolizing the foundation of aerial technology. 
            One by one, the remaining triangles slide into place, each adjusting the others, reflecting the meticulous engineering and calibration that go into every Horizona drone.
            At this stage, the elements remain disconnected, emphasizing the individuality of each component. Then, in a seamless transformation, the triangles flip and rotate, aligning into the final logo shape while still apart. This moment captures the essence of drone movement—agility, balance, and adaptability. 
            As they begin to shrink and interlock, the animation conveys a sense of refinement and completion, illustrating how precision and collaboration come together to create something greater.
            Finally, the brand name Horizona emerges letter by letter, reinforcing a smooth, calculated reveal. This measured transition mirrors the brand’s commitment to innovation and technical mastery, ensuring every detail is intentional and impactful. The animation as a whole embodies Horizona’s vision—merging technology and creativity to redefine perspectives from above.
            `,
    heroMedia: "/placeholders/project-06-hero.mp4",
    sections: [
      {
        label: "Context",
        content: `The Horizona™ Logo: A Symbol of Flight, Innovation and Progress
                  The Horizona logo rebrand represents a bold evolution from its previous design, aligning more closely with the brand’s core values of precision, exploration, and cutting-edge drone technology. 
                  The original logo, a hexagon with two internal lines and a heavy solid font, conveyed stability but lacked the dynamic motion and innovation that define Horizona’s mission.
                  The new logo, composed of four interconnected triangles in an X formation, is inspired by the spinning blades of a drone in flight. This design captures the essence of movement, agility, and limitless aerial perspectives. 
                  The refined geometric structure reflects engineering excellence, while its open, balanced form represents adaptability and forward-thinking design. Paired with a more modern and sleek typography, the rebranded identity enhances brand recognition and positions Horizona as a leader in aerial imaging. More than just a mark, it embodies the brand’s mission to push boundaries and elevate perspectives through innovation.,
                `,
      },
      {
        label: "Problem",
        content: `The Need for Precision and Innovation in Aerial Imaging.
                  In a rapidly evolving world of drone technology, finding a brand that truly prioritizes precision, innovation, and creative freedom is a challenge. 
                  Many existing drone camera brands focus solely on functionality, often neglecting the importance of intuitive design, cutting-edge imaging, and seamless user experience. 
                  As a result, professionals and creators struggle to find a solution that balances high performance with ease of use.
                  Horizona was created to bridge this gap—offering a new standard in aerial imaging with state-of-the-art drone cameras that combine advanced engineering with artistic vision. 
                  The brand’s mission is to empower photographers, filmmakers, and technology enthusiasts with the tools to capture breathtaking perspectives effortlessly. By redefining drone design and functionality, 
                  Horizona provides a solution that goes beyond flying—it elevates storytelling, exploration, and innovation from above.
                `,
      },
      {
        label: "Approach",
        content: `Defining a Bold and Innovative Identity for Horizona.
                  To establish Horizona as a leader in aerial imaging, the brand’s visual identity is built around precision, innovation, and movement. 
                  The redesigned logo, inspired by the spinning blades of a drone, embodies agility and cutting-edge technology, while the modern typography reflects clarity and professionalism. A sleek, high-tech color palette reinforces the brand’s futuristic vision, ensuring a striking yet sophisticated presence.
                  By combining geometric precision with fluid motion, Horizona’s identity captures the essence of exploration and limitless perspectives. Every design element—from the structured logo to the dynamic motion graphics—works in harmony to communicate the brand’s mission of redefining aerial storytelling. 
                  This cohesive visual language positions Horizona as more than just a drone brand; it represents a revolution in how we capture and experience the world from above.
                `,
      },
    ],
    gallery: [
      "/placeholders/project-06-g1.jpg",
      "/placeholders/project-06-g2.jpg",
      "/placeholders/project-06-g3.jpg",
    ],
  },
  {
    id: "02",
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
    id: "03",
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
    id: "04",
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
    id: "05",
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
    id: "06",
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
];

export default projects;
