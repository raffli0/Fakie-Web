import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { CommunitySection } from './components/CommunitySection';
import { SpotsSection } from './components/SpotsSection';
import { EventsSection } from './components/EventsSection';
import { CultureSection } from './components/CultureSection';
import { Footer } from './components/Footer';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { SubmitSpotPage } from './components/SubmitSpotPage';
import { EditSpotPage } from './components/EditSpotPage';
import { SkateGearPage } from './components/SkateGearPage';
import { AddGearPage } from './components/AddGearPage';
import { EditGearPage } from './components/EditGearPage';

import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

export default function App() {
  const { user, logout, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'login' | 'register' | 'submitSpot' | 'editSpot' | 'gear' | 'addGear' | 'editGear'>('home');
  const [selectedSpotId, setSelectedSpotId] = useState<number | null>(null);

  useEffect(() => {
    if (user && (currentView === 'login' || currentView === 'register')) {
      setCurrentView('home');
    }
  }, [user, currentView]);

  if (isLoading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-black">
        <LoginPage
          onBackClick={() => setCurrentView('home')}
          onRegisterClick={() => setCurrentView('register')}
        />
      </div>
    );
  }

  if (currentView === 'register') {
    return (
      <div className="min-h-screen bg-black">
        <RegisterPage
          onBackClick={() => setCurrentView('home')}
          onLoginClick={() => setCurrentView('login')}
        />
      </div>
    );
  }

  if (currentView === 'submitSpot') {
    return (
      <div className="min-h-screen bg-black">
        <SubmitSpotPage
          onBackClick={() => setCurrentView('home')}
        />
      </div>
    );
  }

  if (currentView === 'editSpot' && selectedSpotId) {
    return (
      <div className="min-h-screen bg-black">
        <EditSpotPage
          spotId={selectedSpotId}
          onBackClick={() => {
            setSelectedSpotId(null);
            setCurrentView('home');
          }}
        />
      </div>
    );
  }

  if (currentView === 'gear') {
    return (
      <div className="min-h-screen bg-black">
        <SkateGearPage
          onBackClick={() => setCurrentView('home')}
          onAddGearClick={() => setCurrentView('addGear')}
          onEditGearClick={() => setCurrentView('editGear')}
        />
      </div>
    );
  }

  if (currentView === 'addGear') {
    return (
      <div className="min-h-screen bg-black">
        <AddGearPage
          onBackClick={() => setCurrentView('gear')}
        />
      </div>
    );
  }

  if (currentView === 'editGear') {
    return (
      <div className="min-h-screen bg-black">
        <EditGearPage
          onBackClick={() => setCurrentView('gear')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation
        onLoginClick={() => setCurrentView('login')}
        onGearClick={() => setCurrentView('gear')}
        user={user}
        onLogoutClick={logout}
      />
      <Hero onLoginClick={() => setCurrentView('login')} />
      <CommunitySection />
      <SpotsSection
        onSubmitSpotClick={() => setCurrentView('submitSpot')}
        onEditSpotClick={(spotId) => {
          setSelectedSpotId(spotId);
          setCurrentView('editSpot');
        }}
      />
      <EventsSection />
      <CultureSection />
      <Footer />
    </div>
  );
}