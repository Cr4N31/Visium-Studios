function Aesthetics() {
  const directives = [
    { key: 1, item: 'The Foundation', desc: 'High-contrast, deeply rich dark themes built on solid black and white bases, accented strictly by muted, intentional colors. No unnecessary decorative elements, temporary trends or unprompted gradients.' },
    { key: 2, item: 'Typography & Lines', desc: 'Heavy reliance on hyper-clean layouts, strong geometric lines, and minimalist futuristic typefaces that maximize readability and technological aesthetic.' },
    { key: 3, item: 'Imagery & Presentation', desc: 'Conceptual, abstract tech shapes framed with ample whitespace and open copy images. The layout must feel professional, ultra-precise and confidently ahead of its time.' },
  ]

  return (
    <section className="px-8" data-aos="fade-up" id='aesthetics'>
      <h2 className="font-bold tracking-wide text-3xl my-8">
        <span className="text-5xl font-light italic tracking-wider leading-tight">06</span><br/>
        Visual Direction & Design Aesthetics
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed max-w-xl mb-10">
        For designers, partners and employees building under the Visium banner, our visual direction is absolute and non-negotiable. It must remain sleek, futuristic and radically clean.
      </p>

      <section>
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Directives</p>
        <h3 className="text-lg font-medium text-white/80 mb-4">Aesthetic Directives</h3>
        <ul className="flex flex-col divide-y divide-gray-200/20 border border-gray-200/20 rounded-xl overflow-hidden">
          {directives.map((d, i) => (
            <li key={d.key} className="bg-black hover:bg-gray-100/20 transition-colors p-5 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 items-start">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-gray-400 font-medium tracking-wide">0{i+1}</span>
                <div className="w-5 h-px bg-gray-300" />
                <h4 className="text-sm font-medium text-text-white/70">{d.item}</h4>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{d.desc}</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
export default Aesthetics