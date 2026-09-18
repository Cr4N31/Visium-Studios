import BrandingPageLayout from "./BrandingPageLayout";

const sections = [
  {
    heading: "When the market changes",
    paragraphs: [
      "Rebranding is not a cosmetic refresh. It is a strategic decision to realign how the business is seen with where it is actually headed.",
      "Whether the business has expanded, changed positioning, or outgrown its current identity, the goal is clarity and forward motion rather than a superficial redesign.",
    ],
    list: [
      {
        point: "Strategic reset",
        desc: "A review of what the business is becoming and how the brand should reflect that.",
      },
      {
        point: "Audience fit",
        desc: "A more precise match between the brand and the people it most wants to attract.",
      },
      {
        point: "Operational continuity",
        desc: "A transition plan that minimizes disruption while improving perception.",
      },
    ],
  },
  {
    heading: "The challenge is nuance",
    paragraphs: [
      "The biggest mistake in rebranding is treating it as a visual rewrite while ignoring what has actually changed in the business. We approach it from the inside out to define the right shift.",
      "The result should feel cohesive, more precise, and easier for the market to understand.",
    ],
    list: [
      {
        point: "Positioning review",
        desc: "Clarifying the landscape and where you want to stand within it.",
      },
      {
        point: "Messaging reset",
        desc: "A cleaner explanation of value, difference, and opportunity.",
      },
      {
        point: "Identity refresh",
        desc: "A new visual system that supports the next stage of growth.",
      },
    ],
  },
];

const services = [
  {
    point: "Brand audit",
    desc: "Reviewing what is currently working, what is out of date, and what should change.",
  },
  {
    point: "Positioning shift",
    desc: "Reframing the business to match the long-term market opportunity.",
  },
  {
    point: "Identity redesign",
    desc: "A refit of the visual language in service of a stronger perception.",
  },
  {
    point: "Launch support",
    desc: "Changing the story and the system without losing momentum.",
  },
];

const faqs = [
  {
    q: "When should a company rebrand?",
    a: "When the business has evolved beyond its current expression, when the market no longer understands it clearly, or when the visual system no longer supports the opportunity ahead.",
  },
  {
    q: "Will a rebrand confuse existing customers?",
    a: "Not when it is structured properly. We use continuity and strategic messaging to make the change feel intentional rather than abrupt.",
  },
  {
    q: "Can you update the brand without losing what is already working?",
    a: "Yes. We build on the strengths that matter while removing the elements that no longer support the business clearly.",
  },
];

function Rebranding() {
  return (
    <BrandingPageLayout
      title="Rebranding"
      intro="Rebranding is a strategic repositioning of the business: clarifying who it is, what it stands for, and how it wants to be seen in a more relevant market."
      sections={sections}
      services={services}
      faqs={faqs}
    />
  );
}

export default Rebranding;
