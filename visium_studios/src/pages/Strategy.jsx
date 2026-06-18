function Strategy() {
  const model = [
    { key: 1, item: 'Analytical Breakdowns', desc: 'Publishing transparent, data-driven critiques of existing market visual flaws — e.g. "Why most early-stage tech brands fail visually before launch."' },
    { key: 2, item: 'Proof Mechanisms', desc: "Sharing highly detailed before-and-after case studies that track how our structural design directly altered a startup's commercial credibility and investor appeal." },
    { key: 3, item: 'Founder Leverage', desc: 'Our internal leadership remains visible, using targeted thought leadership to organically funnel high-value tech founders directly to our studio.' },
  ]

  return (
    <section className="px-8" data-aos="fade-up" id='strategy'>
      <h2 className="font-bold tracking-wide text-3xl my-8">
        <span className="text-5xl font-light italic tracking-wider leading-tight">05</span><br/>
        The Visium Competitive Edge & Strategy
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xl mb-10">
        Our competitive advantage rests entirely on execution with absolute intent. While the market is flooded with designers who simply "make things pretty," Visium thinks, structures and builds with definitive commercial purpose.
      </p>

      <section className="mb-10">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Operations</p>
        <h3 className="text-lg font-medium text-white/80 mb-2">Our Operational Pipeline</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-lg mb-4">
          Every project must pass through our rigid 3-step pipeline to achieve verifiable client transformation.
        </p>
        <div className="border border-gray-200/20 rounded-xl bg-black p-5">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            {['01 — Deep Research', '02 — Strategic Positioning', '03 — Precise Design Implementation'].map((s, i, arr) => (
              <>
                <span key={s} className="text-xs font-medium text-white/70 bg-black border border-gray-200/20 rounded-lg px-3 py-1.5">{s}</span>
                {i < arr.length - 1 && <span className="text-gray-400 text-sm">→</span>}
              </>
            ))}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            <span className="font-medium text-white/70">Rigorous client filtering: </span>
            We protect our team's creative focus by executing strict intake filtering — thoroughly screening briefs and budgets to ensure we only onboard clients whose long-term vision aligns with our values.
          </p>
        </div>
      </section>

      <section>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Marketing</p>
        <h3 className="text-lg font-medium text-white/80 mb-2">Content & Thought Leadership Model</h3>
        <p className="text-sm text-gray-500 leading-relaxed max-w-lg mb-4">
          We do not pitch for superficial attention — we command it by demonstrating absolute mastery. Our public marketing functions as a continuous masterclass across LinkedIn, X and Instagram.
        </p>
        <ul className="flex flex-col divide-y divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
          {model.map((m, i) => (
            <li key={m.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-white font-medium tracking-wide">0{i+1}</span>
                <div className="w-5 h-px bg-gray-300" />
                <h4 className="text-sm font-medium text-white/70">{m.item}</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
export default Strategy