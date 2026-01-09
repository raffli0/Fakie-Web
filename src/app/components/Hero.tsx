import { ImageWithFallback } from './res/ImageWithFallback';

interface HeroProps {
  onLoginClick?: () => void;
}

export function Hero({ onLoginClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761772783144-a871bfa457ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkaW5nJTIwY29uY3JldGUlMjBwYXJrfGVufDF8fHx8MTc2Nzg4MDkxNXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Skate park background"
          className="w-full h-full object-cover opacity-40 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-8xl md:text-9xl mb-6 tracking-tight text-neutral-100">
          FAKIE
        </h1>
        <p className="text-2xl md:text-3xl mb-12 text-neutral-300 max-w-2xl mx-auto">
          A place to skate, learn, and belong.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={onLoginClick} className="px-8 py-4 bg-neutral-100 text-black hover:bg-neutral-200 hover:cursor-pointer transition-colors rounded-sm tracking-wide">
            JOIN THE COMMUNITY
          </button>
          <a href="#spots">
            <button className="px-8 py-4 bg-transparent border-2 border-neutral-400 text-neutral-100 hover:border-neutral-200 hover:text-neutral-200 hover:cursor-pointer transition-colors rounded-sm tracking-wide">
              EXPLORE SPOTS
            </button>
          </a>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-400 animate-bounce">
        <div className="w-6 h-10 border-2 border-neutral-400 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
