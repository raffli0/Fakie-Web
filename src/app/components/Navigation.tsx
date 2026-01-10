interface NavigationProps {
  onLoginClick?: () => void;
  onGearClick?: () => void;
  onLogoutClick?: () => void;
  user?: { username: string } | null;
}

export function Navigation({ onLoginClick, onGearClick, onLogoutClick, user }: NavigationProps) {
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
            {onGearClick && (
              <button
                onClick={onGearClick}
                className="text-neutral-300 hover:text-neutral-100 transition-colors"
              >
                Gear
              </button>
            )}
            <a href="#events" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              Events
            </a>
            <a href="#about" className="text-neutral-300 hover:text-neutral-100 transition-colors">
              About
            </a>
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-neutral-300">Hi, {user.username}</span>
                <button
                  onClick={onLogoutClick}
                  className="px-4 py-2 bg-neutral-800 text-neutral-100 border border-neutral-700 hover:bg-neutral-700 hover:cursor-pointer transition-colors rounded-sm text-sm tracking-wide"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              onLoginClick && (
                <button
                  onClick={onLoginClick}
                  className="px-4 py-2 bg-neutral-100 text-black hover:bg-neutral-200 hover:cursor-pointer transition-colors rounded-sm text-sm tracking-wide"
                >
                  LOGIN
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}