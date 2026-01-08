import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CommunitySection } from './components/CommunitySection';
import { SpotsSection } from './components/SpotsSection';
import { EventsSection } from './components/EventsSection';
import { CultureSection } from './components/CultureSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <CommunitySection />
      <SpotsSection />
      <EventsSection />
      <CultureSection />
      <Footer />
    </div>
  );
}
