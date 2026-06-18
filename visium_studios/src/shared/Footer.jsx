function Footer() {
  const studio = ['Who we are', 'Philosophy', 'Visual direction']
  const services = ['Brand system', 'Launch presence kit', 'Enterprise retainers']
  const connect = ['LinkedIn', 'Instagram', 'X / Twitter']

  return (
    <footer className="border-t border-white/8 mt-24 px-8 pt-10 pb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-8">
        <div>
          <p className="text-sm font-semibold tracking-widest uppercase text-white mb-2">
            Visium Studios
          </p>
          <p className="text-xs text-white/35 leading-relaxed max-w-[180px]">
            A startup credibility engine. Design-first, strategy-led, built for founders who mean business.
          </p>
        </div>

        {[['Studio', studio], ['Services', services], ['Connect', connect]].map(([label, links]) => (
          <div key={label}>
            <p className="text-[10px] uppercase tracking-widest text-white/25 mb-3">{label}</p>
            {links.map((link) => (
              <a
                key={link}
                href="#"
                className="block text-xs text-white/45 hover:text-white mb-2 transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-white/7 pt-5">
        <p className="text-[11px] text-white/20 tracking-wide">
         © {new Date().getFullYear()} Visium Studios. All rights reserved.
        </p>
        <div className="flex items-center gap-3 text-white/30">
          {/* swap these for your actual icon components */}
          <a href="#" className="hover:text-white transition-colors text-sm">in</a>
          <a href="#" className="hover:text-white transition-colors text-sm">ig</a>
          <a href="#" className="hover:text-white transition-colors text-sm">x</a>
        </div>
      </div>
    </footer>
  )
}
export default Footer