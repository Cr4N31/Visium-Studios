// Mock data — swap thumbnail/media paths and copy once real assets/CMS exist.
// `size` drives the masonry span in WorkGrid: "tall" | "wide" | "normal"

const projects = [
  {
    id: "01",
    slug: "horizona",
    title: "Horizona",
    featured: true,
    tagline: "The future of aerial imaging.",
    tags: ["Brand Identity", "Digital Product", "Web Design"],
    size: "tall",
    thumbnail: "/assets/portfolio_images/Horizona/Preview Cover.png",
    coverImage: "/assets/portfolio_images/Horizona/Preview Cover.png",
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
    heroMedia: "/assets/portfolio_images/Horizona/Video 01.gif",
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
      "/assets/portfolio_images/Horizona/A - P1.png",
      "/assets/portfolio_images/Horizona/A - P11.png",
      "/assets/portfolio_images/Horizona/A - P21.png",
      "/assets/portfolio_images/Horizona/B - P2.png",
      "/assets/portfolio_images/Horizona/B - P12.png",
      "/assets/portfolio_images/Horizona/B - P22.png",
      "/assets/portfolio_images/Horizona/C - P3.png",
      "/assets/portfolio_images/Horizona/C - P13.png",
      "/assets/portfolio_images/Horizona/C - P23.png",
      "/assets/portfolio_images/Horizona/D - P4.png",
      "/assets/portfolio_images/Horizona/D - P14.png",
      "/assets/portfolio_images/Horizona/D - P24.png",
      "/assets/portfolio_images/Horizona/E - P5.png",
      "/assets/portfolio_images/Horizona/E - P15.png",
      "/assets/portfolio_images/Horizona/E - 25.png",
      "/assets/portfolio_images/Horizona/F - P6.png",
      "/assets/portfolio_images/Horizona/F -PAGE 16.png",
      "/assets/portfolio_images/Horizona/G - P7.png",
      "/assets/portfolio_images/Horizona/G - P27.png",
      "/assets/portfolio_images/Horizona/G - PAGE 17.png",
      "/assets/portfolio_images/Horizona/H - P8.png",
      "/assets/portfolio_images/Horizona/H - P18.png",
      "/assets/portfolio_images/Horizona/I - P9.png",
      "/assets/portfolio_images/Horizona/I - P19.png",
      "/assets/portfolio_images/Horizona/J - P10.png",
      "/assets/portfolio_images/Horizona/J - P20.png",
    ],

    src: [
      "/assets/portfolio_images/Horizona/Video 02.gif",
      "/assets/portfolio_images/Horizona/Video 03.gif",
    ],
  },
  {
    id: "02",
    slug: "rallow",
    title: "Rallow™  — Streetwear",
    featured: true,
    tagline: "Wear Your Bold Side, Wear Your Rebellion.",
    tags: ["Brand Strategy", "Visual Identity"],
    size: "wide",
    thumbnail: "/assets/portfolio_images/Rallow/Preview Cover.png",
    coverImage: "/assets/portfolio_images/Rallow/Preview Cover.png",
    year: "2025",
    client: "North Current Logistics",
    location: "Rotterdam, NL",
    externalUrl: "https://example.com",
    brief: `Rallow is a Nigerian cutting-edge streetwear brand that channels the spirit of rebellion and individuality. Rooted in the defiance of the mainstream, Rallow draws inspiration from global street culture, blending fearless designs with contemporary fashion. It’s not just a brand—it’s a movement for those who dare to push boundaries. 
        Designed for those who reject conformity, Rallow creates bold, premium pieces that resonate with rebels and risk-takers. Our ethos, "Wear Your Bold Side, Wear Your Rebellion," invites individuals to express their true selves through fashion, embracing a style that speaks louder than words. 
        With every garment, Rallow empowers their customers to stand out, fight the norm, and redefine what streetwear means.
        `,
    heroMedia: "/assets/portfolio_images/Rallow/VIDEO 01.gif",
    sections: [
      {
        label: "Context",
        content: `The Rallow logo is a powerful visual representation of the brand's core values: rebellion, individuality, and breaking the mold. The geometric design features three connected squares, each modified with chamfered corners at the top left and bottom right, symbolizing defiance and disruption of traditional forms. These chamfered corners signify the brand’s willingness to break away from conventional paths and embrace the unconventional.
                  The connection of the squares represents unity and strength, reflecting the Rallow community—individuals who come together through shared ideals of boldness and nonconformity. The linear alignment of the squares showcases order amidst rebellion, with an underlying structure that supports creativity and expression.
                  The use of sharp, clean lines adds a modern and edgy feel to the logo, aligning perfectly with Rallow’s streetwear aesthetic. This minimalist yet striking design creates a memorable brand mark that stands out in the fashion landscape, echoing Rallow’s commitment to making bold statements through simplicity and strength.
                  `,
      },
      {
        label: "Problem",
        content: `In a world saturated with fashion brands, finding streetwear that truly embodies individuality and rebellion is a challenge. Many existing brands fail to offer apparel that resonates with those seeking to express their unique identity while defying societal norms. Streetwear is often repetitive, lacking the bold statement and distinct style that today’s generation craves.
                  Rallow was born out of the need to create streetwear that challenges convention, empowers self-expression, and redefines what it means to wear defiance. The goal is to provide clothing that not only looks great but carries a message—one that speaks to a culture of rebellion and authenticity, filling the gap for those who want to stand out and break away from the ordinary.
                  `,
      },
      {
        label: "Approach",
        content: `To address the challenge of standing out in a crowded market, Rallow's branding solution focuses on creating a strong, unified visual identity that reflects its rebellious ethos. The design is built around bold typography, striking geometric forms, and a dynamic color palette that speaks to the brand’s defiant nature. Every element, from the logo to the custom clothing designs, works in harmony to communicate Rallow’s message of individuality and bold self-expression.
                  By embracing clean, modern design choices paired with disruptive messaging, Rallow establishes a distinct presence in the streetwear landscape. This cohesive identity not only connects with its audience on a personal level but also reinforces its core values of rebellion, independence, and authenticity. Through this powerful visual language, Rallow positions itself as more than just a brand—it's a movement for those who refuse to conform.
                  `,
      },
      {
        label: "Result",
        content: `Rallow’s logo animation captures the brand’s bold essence through fluid, intentional movement. The disconnected outlines of the geometric marks appear first, one by one, symbolizing individual expression. As they unite and fill with color, the animation reflects the brand’s rebellious journey toward unity and strength.
                  Each letter of the brand name then emerges in sequence, creating a smooth, layered reveal that adds depth and intrigue. The consistent motion and transitions maintain a cohesive visual flow, reinforcing Rallow’s bold and unapologetic identity in every frame.
                  `,
      },
    ],
    gallery: [
      "/assets/portfolio_images/Rallow/A - P1.png",
      "/assets/portfolio_images/Rallow/A - P11.png",
      "/assets/portfolio_images/Rallow/A - P21.png",
      "/assets/portfolio_images/Rallow/A - P31.png",
      "/assets/portfolio_images/Rallow/B - P2.png",
      "/assets/portfolio_images/Rallow/B - P12.png",
      "/assets/portfolio_images/Rallow/B - P22.png",
      "/assets/portfolio_images/Rallow/B - P32.png",
      "/assets/portfolio_images/Rallow/C - 23.png",
      "/assets/portfolio_images/Rallow/C - P3.png",
      "/assets/portfolio_images/Rallow/C - P13.png",
      "/assets/portfolio_images/Rallow/C - P33.png",
      "/assets/portfolio_images/Rallow/D - P4.png",
      "/assets/portfolio_images/Rallow/D - P14.png",
      "/assets/portfolio_images/Rallow/D - P24.png",
      "/assets/portfolio_images/Rallow/D - P34.png",
      "/assets/portfolio_images/Rallow/E - P5.png",
      "/assets/portfolio_images/Rallow/E - P15.png",
      "/assets/portfolio_images/Rallow/E - P25.png",
      "/assets/portfolio_images/Rallow/E - P35.png",
      "/assets/portfolio_images/Rallow/F - P6.png",
      "/assets/portfolio_images/Rallow/F - P16.png",
      "/assets/portfolio_images/Rallow/F - P26.png",
      "/assets/portfolio_images/Rallow/F - P36.png",
      "/assets/portfolio_images/Rallow/G - 27.png",
      "/assets/portfolio_images/Rallow/G - P7.png",
      "/assets/portfolio_images/Rallow/G - P17.png",
      "/assets/portfolio_images/Rallow/G - P37.png",
      "/assets/portfolio_images/Rallow/H - P8.png",
      "/assets/portfolio_images/Rallow/H - P28.png",
      "/assets/portfolio_images/Rallow/H -P18.png",
      "/assets/portfolio_images/Rallow/I - P9.png",
      "/assets/portfolio_images/Rallow/I - P19.png",
      "/assets/portfolio_images/Rallow/I - P29.png",
      "/assets/portfolio_images/Rallow/I - P39.png",
      "/assets/portfolio_images/Rallow/J - P10.png",
      "/assets/portfolio_images/Rallow/J - P20.png",
      "/assets/portfolio_images/Rallow/J - P30.png",
    ],
    src: [
      "/assets/portfolio_images/Rallow/VIDEO 02.gif",
      "/assets/portfolio_images/Rallow/VIDEO 03.gif",
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
