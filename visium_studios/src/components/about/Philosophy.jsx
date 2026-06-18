function Philosophy() {
  const philosophy = [
    { key: 1, phil: 'Clarity Over Aesthetics', desc: 'Design must serve a functional purpose before it serves an artistic one.' },
    { key: 2, phil: 'Strategy Before Execution', desc: 'We do not move a single pixel until the underlying brand logic is bulletproof.' },
    { key: 3, phil: 'Selectivity Over Volume', desc: 'We intentionally protect our creative quality by working exclusively with highly aligned founders.' },
    { key: 4, phil: 'Authority Through Taste', desc: 'Every asset we produce must make our clients look serious, credible and absolutely inevitable.' },
  ]

  return (
    <section>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Philosophy</p>
      <h3 className="text-lg font-medium text-gray-300 mb-4">Our Core Philosophy & Mantra</h3>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
        {philosophy.map((p) => (
          <li key={p.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 flex flex-col gap-2">
            <span className="text-xs text-white font-medium tracking-wide">0{p.key}</span>
            <div className="w-5 h-px bg-gray-300" />
            <h4 className="text-sm font-medium text-white/80 leading-snug">{p.phil}</h4>
            <p className="text-xs text-gray-500 leading-relaxed mt-1">{p.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Philosophy