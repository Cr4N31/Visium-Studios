function Target() {
  const profiles = [
    { key: 1, item: 'Primary Focus', desc: 'Early-stage technology founders preparing for an imminent platform launch, product rollout, or venture capital investment round.' },
    { key: 2, item: 'Secondary Focus', desc: 'Ambitious coaches, operators or educators building high-level premium personal brands and small business models.' },
    { key: 3, item: 'Demographic & Mindset', desc: 'Ambitious, resource-conscious leaders aged 22–40, primarily Nigeria-based, engineering solutions for rapid global impact.' },
  ]
  const points = [
    { key: 1, item: 'Amateur Perception', desc: 'Startups often look uncoordinated, fragmented or amateurish before launch, severely compromising market entry and authority.' },
    { key: 2, item: 'The Strategy Gap', desc: 'Founders frequently lack the deep design and positioning knowledge required to articulate complex technological frameworks compellingly.' },
    { key: 3, item: 'The Trust Deficit', desc: 'High-potential startups fail to secure early clients or investor confidence purely because their visual infrastructure lacks immediate credibility.' },
  ]

  return (
    <section className="px-8" data-aos="fade-up" id='target'>
      <h2 className="font-bold tracking-wide text-3xl my-8">
        <span className="text-5xl font-light italic tracking-wider leading-tight">03</span><br/>
        Market Architecture & Audience
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xl mb-10">
        We do not design for generic businesses or general commercial services. Our ecosystem is hyper-focused on solving the acute trust deficits faced by high-growth ventures entering critical market sectors.
      </p>

      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Clients</p>
        <h3 className="text-lg font-medium text-white/80 mb-4">Target Client Profiles</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
          {profiles.map((p, i) => (
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
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Problem space</p>
        <h3 className="text-lg font-medium text-white/80 mb-4">The Core Pain Points We Solve</h3>
        <ul className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
          {points.map((p, i) => (
            <li key={p.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 flex flex-col gap-2">
              <span className="text-xs text-white font-medium tracking-wide">0{i+1}</span>
              <div className="w-5 h-px bg-gray-300" />
              <h4 className="text-sm font-medium text-white/70">{p.item}</h4>
              <p className="text-xs text-gray-500 leading-relaxed mt-1">{p.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
export default Target