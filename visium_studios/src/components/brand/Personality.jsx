function Personality() {
  const personality = [
    { key: 1, per: 'Minimal & Intellectual', desc: 'We value substance over noise and deep strategy over decorative fluff.' },
    { key: 2, per: 'Precision-Driven', desc: 'Our frameworks, layouts and rationales are engineered with intentional, mathematical execution.' },
    { key: 3, per: 'Futuristic & Innovative', desc: 'We embrace a forward-looking mindset tailored explicitly for the bleeding edge of technology.' },
    { key: 4, per: 'Elite but Accessible', desc: 'While we maintain exceptionally high standards of taste, we remain structured, transparent, and deeply collaborative guides for the founders we accept.' },
  ]

  return (
    <section className="mb-10">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Traits</p>
      <h3 className="text-lg font-medium text-white/80 mb-4">Key Personality Traits</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
        {personality.map((p) => (
          <li key={p.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 flex flex-col gap-2">
            <span className="text-xs text-white font-medium tracking-wide">0{p.key}</span>
            <div className="w-5 h-px bg-gray-300" />
            <h4 className="text-sm font-medium text-white/70 leading-snug">{p.per}</h4>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">{p.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default Personality 