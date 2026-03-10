import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { Dashboard } from './components/screens/Dashboard';
import { Verlauf } from './components/screens/Verlauf';
import { VitalDetail } from './components/screens/VitalDetail';
import { Notfall } from './components/screens/Notfall';
import { Profil } from './components/screens/Profil';

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
    <div className="min-h-screen bg-[#F7F8FA]">
      {/* Container für iPhone 14/15 */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-[#F7F8FA] relative">
        {/* Header */}
        <Header 
          title={getHeaderTitle()} 
          onBack={showBackButton ? handleBack : undefined}
        />

        {/* Screen Content */}
        <main className="relative">
          {currentScreen === 'home' && <Dashboard onVitalClick={handleVitalDetail} />}
          {currentScreen === 'verlauf' && <Verlauf onVitalClick={handleVitalDetail} />}
          {currentScreen === 'vital-detail' && selectedVital && (
            <VitalDetail type={selectedVital} onBack={handleBack} />
          )}
          {currentScreen === 'notfall' && <Notfall />}
          {currentScreen === 'profil' && <Profil />}
        </main>

        {/* Bottom Navigation */}
        {currentScreen !== 'vital-detail' && (
          <BottomNavigation 
            activeScreen={currentScreen === 'vital-detail' ? 'verlauf' : currentScreen}
            onNavigate={setCurrentScreen}
          />
        )}
      </div>
    </div>
  );
}

export default App;