function Tone() {
  const tone = [
    { key: 1, t: 'Direct & Analytical', desc: 'We deliver no-nonsense, highly objective breakdowns. We educate our audience and clients clearly, cutting out all unnecessary corporate verbosity and artificial marketing buzzwords.' },
    { key: 2, t: 'Constructive Authority', desc: 'When evaluating design or strategy, we critique firmly and transparently, demonstrating our deep expertise and taste without pretense.' },
    { key: 3, t: 'The Emotional Authority', desc: 'We ensure our clients feel an immediate sense of clarity, trust and strategic confidence. For the outside world, our output commands aspiration, respect and instant recognition of our design authority.' },
  ]

  return (
    <section>
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Communication</p>
      <h3 className="text-lg font-medium text-white/80 mb-4">Tone of Voice & Communication</h3>
      <ul className="flex flex-col divide-y divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
        {tone.map((t) => (
          <li key={t.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
            <div className="flex flex-col gap-2">
              <span className="text-xs text-white font-medium tracking-wide">0{t.key}</span>
              <div className="w-5 h-px bg-gray-300" />
              <h4 className="text-sm font-medium text-white/70 leading-snug">{t.t}</h4>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{t.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default Tone