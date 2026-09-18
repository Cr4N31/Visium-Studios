import BrandingPageLayout from "./BrandingPageLayout";

const sections = [
  {
    heading: "Clarity before aesthetics",
    paragraphs: [
      "Positioning is the strategic definition of how a business is understood in the market. It answers what makes the offer valuable and why a customer should care now.",
      "Before a brand looks premium, it has to be clear. Positioning gives that clarity a shape and a narrative foundation.",
    ],
    list: [
      {
        point: "Market place",
        desc: "How the business fits within the category and where it stands out.",
      },
      {
        point: "Audience signal",
        desc: "The people the brand is built to attract and speak to directly.",
      },
      {
        point: "Value narrative",
        desc: "The message that clarifies why the offer deserves attention.",
      },
    ],
  },
  {
    heading: "A brand people understand",
    paragraphs: [
      "Strong positioning removes confusion. It gives the brand a sharper message, a more usable tone, and an easier path to trust. It also helps teams make decisions about offers, product, and communication with more confidence.",
      "We use positioning to sharpen the brand from the inside out so the expression can have meaning behind it.",
    ],
    list: [
      {
        point: "Differentiation",
        desc: "The edge that defines why the business stands apart.",
      },
      {
        point: "Audience focus",
        desc: "A clear target and a more compelling communication strategy.",
      },
      {
        point: "Message clarity",
        desc: "The story the business tells that makes the offer easier to trust.",
      },
    ],
  },
];

const services = [
  {
    point: "Positioning strategy",
    desc: "A definition of the business’s value and its place in the market.",
  },
  {
    point: "Audience mapping",
    desc: "Understanding who the business is for and what they actually need.",
  },
  {
    point: "Message architecture",
    desc: "A structured communication framework that supports every channel.",
  },
  {
    point: "Narrative clarity",
    desc: "A sharper, more useful story that increases trust and conversion.",
  },
];

const faqs = [
  {
    q: "Why is positioning important before design?",
    a: "Because design without positioning creates noise. Clarity of message gives the visual system direction and purpose.",
  },
  {
    q: "Can positioning change as the business grows?",
    a: "Yes. Positioning often evolves as new audiences, products, or market opportunities appear. That is a normal and healthy part of growth.",
  },
  {
    q: "How do you know if our positioning is weak?",
    a: "Usually it shows up as unclear messaging, low differentiation, inconsistent marketing, and difficulty explaining the offer simply.",
  },
];

function Positioning() {
  return (
    <BrandingPageLayout
      title="Positioning"
      intro="Positioning is the core strategic framework that tells people why this business matters and why it deserves attention in the first place."
      sections={sections}
      services={services}
      faqs={faqs}
    />
  );
}

export default Positioning;
