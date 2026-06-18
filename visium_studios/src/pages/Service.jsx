function Service() {
  const phase1 = [
    { key: 1, item: 'A — The Startup Brand System (Core Offer)', desc: 'Comprehensive Brand Strategy Workshops; Core Visual Identity (custom logo systems, precise color typography, specialized iconography layouts, and structural asset management); Comprehensive Digital Brand Guidelines, UI design templates, and exportable production style guides.' },
    { key: 2, item: 'B — The Launch Presence Kit (Strategic Add-On)', desc: '6–12 cohesive, premium social media templates engineered for high engagement; a tactical starter content blueprint tailored for digital market entry; direct consulting on professional brand presentation and positioning.' },
  ]
  const phase2 = [
    { key: 1, item: 'Advanced Web Design', desc: 'Static landing pages, custom marketing layouts, and MVP SaaS styling templates.' },
    { key: 2, item: 'Application UI/UX Design', desc: 'Comprehensive design systems for fully featured digital products.' },
    { key: 3, item: 'Cinematic Motion Graphics', desc: 'Immersive tech storytelling and pitch interaction design.' },
  ]
  const pricing = [
    { key: 1, item: 'Entry-Level Engagements', desc: 'Foundational Brand Assets & Starter Templates', price: '$150–$300' },
    { key: 2, item: 'Mid-Tier Structural Systems', desc: 'Full Brand Systems & Core Identity Packages', price: '$300–$800' },
    { key: 3, item: 'Premium Enterprise & Retainers', desc: 'Full-Service Product Architecture & Scaling Infrastructure', price: '$1,000+' },
  ]

  return (
    <section className="px-8" data-aos="fade-up" id='service'>
      <h2 className="font-bold tracking-wide text-3xl my-8">
        <span className="text-5xl font-light italic tracking-wider leading-tight">04</span><br/>
        Service Architecture & Pricing Model
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xl mb-10">
        Our operational roadmap systematically transitions projects from foundational visual systems into deeply embedded, full-scale digital product design and long-term ecosystem development.
      </p>

      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Phase 1</p>
        <h3 className="text-lg font-medium text-white/80 mb-4">Core Design Capabilities</h3>
        <ul className="flex flex-col divide-y divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
          {phase1.map((p, i) => (
            <li key={p.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-white font-medium tracking-wide">0{i+1}</span>
                <div className="w-5 h-px bg-gray-300" />
                <h4 className="text-sm font-medium text-white/70 leading-snug">{p.item}</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Phase 2</p>
        <h3 className="text-lg font-medium text-white/80 mb-2">Scale & Ecosystem Expansion</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-lg mb-4">
          As we grow, Visium expands from foundational branding into permanent digital infrastructure, capturing higher-value accounts through specialized retainers.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
          {phase2.map((p, i) => (
            <li key={p.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 flex flex-col gap-2">
              <span className="text-xs text-white font-medium tracking-wide">0{i+1}</span>
              <div className="w-5 h-px bg-gray-300" />
              <h4 className="text-sm font-medium text-white/70">{p.item}</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Service tiers</p>
        <h3 className="text-lg font-medium text-white/80 mb-4">Strategic Pricing Framework</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
          {pricing.map((p) => (
            <li key={p.key} className="bg-black hover:bg-gray-100/20 transition-colors p-6 flex flex-col gap-2">
              <span className="text-2xl font-medium text-white">{p.price}</span>
              <div className="w-6 h-px bg-gray-300 my-1" />
              <h4 className="text-sm font-medium text-white/70">{p.item}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
export default Service