export const insights = [
  {
    id: 1,
    slug: "why-your-brand-doesnt-need-more-content",
    category: "Brand Systems",
    title: "Why Your Brand Doesn’t Need More Content. It Needs a System.",
    excerpt:
      "A strong brand isn't built by constantly producing more. It's built by creating a system that makes every piece of communication feel connected.",
    date: "2026-09-18",
    author: "Visium Studios",
    image: "/assets/portfolio_images/Rallow/I - P39.png",
    featured: true,
    body: [
      {
        type: "p",
        text: "Most brands feel pressure to publish more. More posts, more campaigns, more assets. The assumption is that volume builds recognition. In practice, volume without structure builds noise.",
      },
      { type: "h2", text: "Consistency is a design problem" },
      {
        type: "p",
        text: "When every piece of communication is made from scratch, each one drifts a little. Colors shift, tone wanders, layouts change with whoever made them. A system removes those decisions so the work can be about the message instead.",
      },
      {
        type: "quote",
        text: "A system does not limit creativity. It decides what never has to be decided again.",
      },
      { type: "h2", text: "What a brand system actually contains" },
      {
        type: "p",
        text: "Typography, color, layout rules, motion principles and a clear voice. Together they give a team a shared set of tools, so anything they make already looks and sounds like the brand.",
      },
      { type: "h3", text: "Start with the rules that repeat" },
      {
        type: "p",
        text: "Look at what you produce most often and define those first. Social templates, presentation layouts and email headers repay the effort fastest.",
      },
      {
        type: "image",
        src: "/assets/portfolio_images/Rallow/J - P10.png",
        alt: "Brand system applied across touchpoints",
        caption: "One system, applied across every touchpoint.",
      },
      { type: "h2", text: "Less content, more recognition" },
      {
        type: "p",
        text: "Once the system exists, fewer pieces do more work, because each one reinforces the same impression.",
      },
    ],
  },
  {
    id: 2,
    slug: "what-makes-a-visual-identity-scalable",
    category: "Visual Identity",
    title: "What Makes a Visual Identity Actually Scalable?",
    excerpt:
      "A visual identity has to work beyond the presentation deck. That's what makes a system flexible enough to grow with a brand.",
    date: "2026-09-11",
    author: "Visium Studios",
    image: "/assets/portfolio_images/Rallow/J - P10.png",
    body: [
      {
        type: "p",
        text: "An identity is easy to love in a presentation. The real test comes months later, when someone who never met the designers has to use it on a format nobody planned for.",
      },
      { type: "h2", text: "Built for the hundredth use, not the first" },
      {
        type: "p",
        text: "Scalable identities are designed around constraints: small sizes, one color, motion, tight layouts. If the mark and the system hold up there, they hold up anywhere.",
      },
      {
        type: "quote",
        text: "If it only works at full size on a white background, it is a drawing, not an identity.",
      },
      { type: "h3", text: "Flexible parts, fixed principles" },
      {
        type: "p",
        text: "Let color, imagery and layout flex within clear rules, and keep the core principles fixed. That balance lets a brand grow without fragmenting.",
      },
      { type: "h2", text: "Test it early" },
      {
        type: "p",
        text: "Apply the identity to the awkward cases before sign-off. Social avatars, favicons, packaging edges and short motion loops reveal weaknesses quickly.",
      },
    ],
  },
  {
    id: 3,
    slug: "your-website-is-part-of-your-brand",
    category: "Digital",
    title: "Your Website Is Part of Your Brand. Treat It Like One.",
    excerpt:
      "Your website isn't simply where your brand lives online. It is one of the most important expressions of the brand itself.",
    date: "2026-09-04",
    author: "Visium Studios",
    image: "/assets/portfolio_images/Rallow/J - P30.png",
    body: [
      {
        type: "p",
        text: "For many people, the website is the first and longest interaction they have with a brand. It sets expectations before any conversation happens.",
      },
      { type: "h2", text: "A website is not a brochure" },
      {
        type: "p",
        text: "Pages that only list services miss the point. Spacing, motion, typography and pacing all carry the brand's character, whether or not anyone notices them consciously.",
      },
      {
        type: "quote",
        text: "People rarely remember a layout. They remember how the site made the brand feel.",
      },
      { type: "h3", text: "Design and build as one process" },
      {
        type: "p",
        text: "When design and development are separated, details get lost between handoffs. Building from the same visual direction keeps what ships faithful to what was designed.",
      },
      { type: "h2", text: "Treat it like a living part of the brand" },
      {
        type: "p",
        text: "Review it the way you would review any brand asset. If something on the site would not be approved on a poster, it should not be approved on a page.",
      },
    ],
  },
];

export const sortedInsights = [...insights].sort(
  (a, b) => new Date(b.date) - new Date(a.date),
);

export const categories = [...new Set(insights.map((i) => i.category))];

// Stored as ISO strings so sorting is reliable; formatted for display here
export const formatDate = (iso) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));

export const getInsight = (slug) => insights.find((i) => i.slug === slug);

// Wraps around, so Previous and Next always exist
export function getAdjacent(slug) {
  const list = sortedInsights;
  const i = list.findIndex((a) => a.slug === slug);
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

export function getRelated(slug, limit = 2) {
  const current = getInsight(slug);
  const others = sortedInsights.filter((a) => a.slug !== slug);
  const same = others.filter((a) => a.category === current?.category);
  const rest = others.filter((a) => a.category !== current?.category);
  return [...same, ...rest].slice(0, limit);
}
