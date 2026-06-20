import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { Dashboard } from './components/screens/Dashboard';
import { Verlauf } from './components/screens/Verlauf';
import { VitalDetail } from './components/screens/VitalDetail';
import { Notfall } from './components/screens/Notfall';
import { Profil } from './components/screens/Profil';
import { AlertSystem } from './components/AlertSystem';
import { DemoControl } from './components/DemoControl';
import { Toaster } from 'sonner@2.0.3';

type Screen = 'home' | 'verlauf' | 'notfall' | 'profil' | 'vital-detail';
type VitalType = 'heart' | 'blood-pressure' | 'oxygen' | 'temperature' | 'ekg' | 'calories' | 'blood-sugar';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedVital, setSelectedVital] = useState<VitalType | null>(null);

  const handleBack = () => {
    if (currentScreen === 'vital-detail') {
      setCurrentScreen('verlauf');
      setSelectedVital(null);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleVitalDetail = (type: VitalType) => {
    setSelectedVital(type);
    setCurrentScreen('vital-detail');
  };

  const getHeaderTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Home';
      case 'verlauf':
        return 'Verlauf';
      case 'vital-detail':
        return 'Details';
      case 'notfall':
        return 'Notfall';
      case 'profil':
        return 'Profil';
    }
  };

  const showBackButton = currentScreen !== 'home';

  return (
    <div className="v-app">
      {/* iPhone 15 device frame (393 × 852) */}
      <div className="app-frame">
        {/* Scrollable content */}
        <div className="app-scroll">
          <Header
            title={getHeaderTitle()}
            onBack={showBackButton ? handleBack : undefined}
          />

          {/* Global in-app alert banner */}
          <AlertSystem />

          {/* Screen Content */}
          <main key={currentScreen} className="relative v-fade">
            {currentScreen === 'home' && <Dashboard onVitalClick={handleVitalDetail} />}
            {currentScreen === 'verlauf' && <Verlauf onVitalClick={handleVitalDetail} />}
            {currentScreen === 'vital-detail' && selectedVital && (
              <VitalDetail type={selectedVital} onBack={handleBack} />
            )}
            {currentScreen === 'notfall' && <Notfall />}
            {currentScreen === 'profil' && <Profil />}
          </main>
        </div>

        {/* Bottom Navigation (anchored to the frame) */}
        {currentScreen !== 'vital-detail' && (
          <BottomNavigation
            activeScreen={currentScreen === 'vital-detail' ? 'verlauf' : currentScreen}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Demo trigger (for live presentation) */}
        <DemoControl />

        {/* Toasts — contained within the device frame */}
        <Toaster
          position="bottom-right"
          richColors
          expand={false}
          gap={8}
          visibleToasts={4}
          toastOptions={{ style: { padding: '9px 12px', borderRadius: 12, fontSize: 12, minHeight: 0 } }}
        />
      </div>
    </div>
  );
}

export default App;