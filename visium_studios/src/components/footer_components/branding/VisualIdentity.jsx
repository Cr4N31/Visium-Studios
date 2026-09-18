import BrandingPageLayout from "./BrandingPageLayout";

const sections = [
  {
    heading: "Identity as a system",
    paragraphs: [
      "Visual identity is not a disconnected set of design choices. It is a system that makes your brand recognizable, consistent, and trustworthy across every interaction.",
      "We define the signals that shape perception: typography, palette, image treatment, composition, and supporting graphic language. Every decision is made to feel coherent and useful.",
    ],
    list: [
      {
        point: "Typography",
        desc: "A clear voice for the brand across campaign, product, and editorial work.",
      },
      {
        point: "Color system",
        desc: "Primary and secondary tones that create mood and recognition.",
      },
      {
        point: "Graphic language",
        desc: "Patterns, icons, and composition principles that express the brand.",
      },
    ],
  },
  {
    heading: "Built for scale",
    paragraphs: [
      "A modern brand has to work everywhere: on a website, in social feeds, in proposals, in packaging, in investor decks, and on product surfaces. The identity has to remain clear under pressure.",
      "We design for the moments where the business needs to communicate with confidence and consistency.",
    ],
    list: [
      {
        point: "Applications",
        desc: "How the identity behaves in layout, motion, and campaign design.",
      },
      {
        point: "Consistency",
        desc: "Rules that keep the mark and voice coherent as the company grows.",
      },
      {
        point: "Flexibility",
        desc: "A system that adapts to different channels without losing recognition.",
      },
    ],
  },
];

const services = [
  {
    point: "Brand direction",
    desc: "The mood, tone, and design logic behind the system.",
  },
  {
    point: "Typography selection",
    desc: "Type pairings that communicate the intended personality.",
  },
  {
    point: "Color palette",
    desc: "A codified palette designed for differentiation and usability.",
  },
  {
    point: "Graphic system",
    desc: "Supporting visual patterns and assets built for real-world use.",
  },
];

const faqs = [
  {
    q: "Is visual identity just a logo and colors?",
    a: "No. It includes the visual logic behind the brand: typography, composition, tone, imagery, and the rules that keep everything coherent.",
  },
  {
    q: "Why does the brand need a consistent system?",
    a: "Consistency is what makes a brand feel established. It improves recognition and helps your business look intentional across channels.",
  },
  {
    q: "Can you take an existing brand and refine it?",
    a: "Yes. We often evolve existing brands to sharpen their language, improve hierarchy, and align the visual system with current strategy.",
  },
];

function VisualIdentity() {
  return (
    <BrandingPageLayout
      title="Visual Identity"
      intro="The visual identity is the expression of the business: how it looks, feels, and is remembered. It turns strategy into tangible recognition."
      sections={sections}
      services={services}
      faqs={faqs}
    />
  );
}

export default VisualIdentity;
