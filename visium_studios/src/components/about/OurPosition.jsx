function OurPosition() {
  return (
    <section className="mb-12">
      <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Positioning</p>
      <h3 className="text-lg font-medium text-white/80 mb-4">Our Positioning</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border border-gray-200/20 rounded-xl p-6">
        <div>
          <span className="inline-block text-xs px-3 py-1 border border-white/20 rounded-full text-white/70 mb-3">
            Startup credibility engine
          </span>
          <p className="text-xs text-white/60 leading-relaxed">
            Early-stage tech founders → market-ready brands
          </p>
        </div>
        <p className="md:col-span-2 text-sm text-gray-500 leading-relaxed">
          <span className="text-white/70">At Visium Studios</span>, we serve as a startup credibility engine. We help early-stage tech 
          founders transform <span className="text-white/70">raw, scattered concepts into structured, market-ready brands</span>. By 
          prioritizing <span className="text-white/70">strategic, design-first solutions, we establish the visual authority and 
          structural readiness</span> that startups need to command attention, secure funding, and scale 
          efficiently.
        </p>
      </div>
    </section>
  )
}

export default OurPosition