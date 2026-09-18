import BrandingPageLayout from "./BrandingPageLayout";

const sections = [
  {
    heading: "What a strong logo does",
    paragraphs: [
      "A logo should do more than look good in a browser or on a business card. It should signal the character of the business in a way people can remember without explanation.",
      "We build marks around clarity, meaning, and differentiation so they work across digital, packaging, social, signage, and pitch decks without losing their intent.",
    ],
    list: [
      {
        point: "Primary mark",
        desc: "The main logo system built for clarity and recognition.",
      },
      {
        point: "Submarks",
        desc: "Alternative lockups for social avatars, favicons, and product labels.",
      },
      {
        point: "Usage rules",
        desc: "Guidelines that keep the brand consistent across media.",
      },
    ],
  },
  {
    heading: "The process",
    paragraphs: [
      "We begin with the core message and the brand feel that should be visible at a glance. From there, we explore directions, refine the strongest option, and test it across the channels you actually use.",
      "The final system is never decorative alone. It is designed to support trust, recall, and strategic positioning from day one.",
    ],
    list: [
      {
        point: "Strategy",
        desc: "The narrative and differentiation behind the identity.",
      },
      {
        point: "Concept development",
        desc: "Graphic directions shaped around the brand story.",
      },
      {
        point: "Refinement",
        desc: "A tighter, more usable system for real-world application.",
      },
    ],
  },
];

const services = [
  {
    point: "Logo design",
    desc: "Distinctive, strategic identity systems built for modern brands.",
  },
  {
    point: "Wordmark systems",
    desc: "Typography-led marks for founders and portfolio businesses.",
  },
  {
    point: "Iconography",
    desc: "Graphic symbols supporting the main logo across media.",
  },
  {
    point: "Asset package",
    desc: "Final files prepared for web, print, and digital use.",
  },
];

const faqs = [
  {
    q: "Do you only design the logo itself?",
    a: "No. We design the complete logo system so it works on product packaging, digital interfaces, presentations, and signage without feeling inconsistent.",
  },
  {
    q: "Can the logo be expanded into a broader brand system?",
    a: "Yes. Many of our logo projects evolve into a larger foundational identity with typography, color, and usage rules.",
  },
  {
    q: "What if I already have a direction I like?",
    a: "We can refine, evolve, or reframe what you already have so it feels clearer, more premium, and more fitting to your market.",
  },
];

function LogoCreation() {
  return (
    <BrandingPageLayout
      title="Logo Creation"
      intro="A logo is the first sign of trust for a brand. It should make the promise instantly legible and feel intentional across every touchpoint."
      sections={sections}
      services={services}
      faqs={faqs}
    />
  );
}

export default LogoCreation;
