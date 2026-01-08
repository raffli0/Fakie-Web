export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl tracking-tight text-neutral-100">
            FAKIE
          </div>
          <div className="flex items-center gap-8">
            <a href="#home" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Home
            </a>
            <a href="#community" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Community
            </a>
            <a href="#spots" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Spots
            </a>
            <a href="#events" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Events
            </a>
            <a href="#about" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              About
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
