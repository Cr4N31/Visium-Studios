import BrandingPageLayout from "./BrandingPageLayout";

const sections = [
  {
    heading: "A system, not a mood board",
    paragraphs: [
      "Brand systems are the practical framework behind a successful identity. They explain how the brand should look and behave in every context, not just in its best presentation.",
      "This gives founders and teams a way to make consistent decisions as the business grows, without losing the clarity of the original strategy.",
    ],
    list: [
      {
        point: "Brand rules",
        desc: "The standards that define how the identity is applied across channels.",
      },
      {
        point: "Asset library",
        desc: "The toolbox that teams can use without second-guessing design choices.",
      },
      {
        point: "Governance",
        desc: "The structure that keeps the brand coherent over time.",
      },
    ],
  },
  {
    heading: "For teams that need clarity",
    paragraphs: [
      "A strong brand system gives staff, partners, and agencies a shared reference point. It reduces friction, speeds up decisions, and keeps the business feeling intentional as it scales.",
      "We design these systems to be usable by real teams, not just beautiful in a pitch deck.",
    ],
    list: [
      {
        point: "Team alignment",
        desc: "A common visual language for everyone involved in communicating the brand.",
      },
      {
        point: "Scalability",
        desc: "Systems that can expand across campaigns, products, and regions.",
      },
      {
        point: "Operational clarity",
        desc: "Simple standards that are easy for internal teams to apply consistently.",
      },
    ],
  },
];

const services = [
  {
    point: "Systems design",
    desc: "A complete framework for how the identity scales and persists.",
  },
  {
    point: "Documentation",
    desc: "Brand guidelines that are useful to the teams using them daily.",
  },
  {
    point: "Application logic",
    desc: "How the identity works across website, social, decks, and campaign assets.",
  },
  {
    point: "Operational support",
    desc: "Frameworks for consistent communication as teams evolve.",
  },
];

const faqs = [
  {
    q: "What is the difference between a brand and a brand system?",
    a: "A brand is the perception and experience of the business. A brand system is the structure that keeps that experience consistent and usable across marketing and product touchpoints.",
  },
  {
    q: "Do I need a system if I am still small?",
    a: "If you plan to grow, yes. A system helps you stay consistent before your internal team expands or your communication becomes more complex.",
  },
  {
    q: "Can you build this for my team?",
    a: "Absolutely. We create systems that are clear enough for internal teams to use without relying on a designer for every small decision.",
  },
];

function BrandSystems() {
  return (
    <BrandingPageLayout
      title="Brand Systems"
      intro="A brand system turns an identity into a working operating model. It defines how the business looks, communicates, and scales without losing its core signal."
      sections={sections}
      services={services}
      faqs={faqs}
    />
  );
}

export default BrandSystems;
