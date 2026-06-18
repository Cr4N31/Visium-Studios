

function Header() {
  const navLinks = [
    { name:'Identity', href: '#about' }, 
    { name: 'Brand', href: '#brand'},
    { name:'Market', href: '#target'}, 
    { name:'Services', href: '#service'}, 
    { name:'Strategy', href: '#strategy'}
]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div className="
        flex items-center justify-between
        h-14 px-6 rounded-2xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.2),0_8px_32px_rgba(0,0,0,0.4)]
      ">
        <p className="text-sm font-semibold tracking-widest uppercase text-white">
          Visium<span className="text-white/35 font-normal">studios</span>
        </p>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((n) => (
            <a
              key={n.name}
              href={n.href}
              className="text-xs text-white/50 hover:text-white hover:bg-white/8 px-3 py-1.5 rounded-lg tracking-wide transition-all duration-200"
            >
              {n.name}
            </a>
          ))}
        </nav>

        <button className="text-xs font-medium text-black bg-white px-4 py-1.5 rounded-lg tracking-wide hover:opacity-85 transition-opacity">
          Work with us
        </button>
      </div>
    </header>
  )
}
export default Header