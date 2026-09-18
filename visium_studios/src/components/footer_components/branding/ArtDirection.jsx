import BrandingPageLayout from "./BrandingPageLayout";

const sections = [
  {
    heading: "Direction with intent",
    paragraphs: [
      "Art direction is the visual steering of a brand across campaigns, storytelling, and product experiences. It determines the mood, pacing, and coherence of the work.",
      "This is what makes a brand feel premium, memorable, and emotionally resonant rather than just technically consistent.",
    ],
    list: [
      {
        point: "Creative direction",
        desc: "The visual narrative guiding the execution of every campaign.",
      },
      {
        point: "Editorial quality",
        desc: "The craft that makes each asset feel deliberate and elevated.",
      },
      {
        point: "Content system",
        desc: "A repeatable structure for storytelling across channels.",
      },
    ],
  },
  {
    heading: "From idea to execution",
    paragraphs: [
      "We help brands define what they should look like in motion, in photography, in social storytelling, and in launch moments. The goal is not decoration — it is a persuasive visual language that supports the strategy.",
      "When the creative direction is strong, the entire brand becomes easier to trust and more magnetic to the right audience.",
    ],
    list: [
      {
        point: "Campaign language",
        desc: "The visual and narrative DNA of a launch or market push.",
      },
      {
        point: "Photo direction",
        desc: "Styling and treatment that support the desired brand perception.",
      },
      {
        point: "Motion cues",
        desc: "Movement patterns and pacing that reinforce the identity.",
      },
    ],
  },
];

const services = [
  {
    point: "Campaign direction",
    desc: "Creative leadership across product moments, launches, and editorial storytelling.",
  },
  {
    point: "Visual storytelling",
    desc: "A clear language for photography, film, and motion-based brand expression.",
  },
  {
    point: "Design guidance",
    desc: "A creative framework that ensures every asset feels aligned.",
  },
  {
    point: "Launch art direction",
    desc: "The visual system used to introduce the brand into the market with clarity.",
  },
];

const faqs = [
  {
    q: "What is art direction in branding?",
    a: "It is the intentional guidance that shapes how a brand looks and feels across campaigns, content, and experiences.",
  },
  {
    q: "Do I need art direction if I already have an identity?",
    a: "Yes, if you want the brand to feel coherent across launches, content production, and touchpoints over time.",
  },
  {
    q: "Can art direction work alongside a web or product build?",
    a: "Absolutely. It keeps the brand system coherent whether the work is a campaign, a website, or a deeper product experience.",
  },
];

function ArtDirection() {
  return (
    <BrandingPageLayout
      title="Art direction"
      intro="Art direction gives a brand its emotional tone and visual discipline. It is the layer that makes the identity feel crafted, intentional, and memorable."
      sections={sections}
      services={services}
      faqs={faqs}
    />
  );
}

export default ArtDirection;
