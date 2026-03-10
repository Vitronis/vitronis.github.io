import { Home, Activity, AlertTriangle, User } from 'lucide-react';

type Screen = 'home' | 'verlauf' | 'notfall' | 'profil';

interface BottomNavigationProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function BottomNavigation({ activeScreen, onNavigate }: BottomNavigationProps) {
  const items = [
    { id: 'home' as Screen, label: 'Home', icon: Home },
    { id: 'verlauf' as Screen, label: 'Verlauf', icon: Activity },
    { id: 'notfall' as Screen, label: 'Notfall', icon: AlertTriangle },
    { id: 'profil' as Screen, label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] px-2 py-1 max-w-[390px] mx-auto">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center gap-0.5 py-1.5 px-3 transition-colors"
            >
              <Icon
                size={20}
                strokeWidth={2}
                className={isActive ? 'text-[#2F80ED]' : 'text-[#6B7280]'}
              />
              <span className={`text-[9px] ${isActive ? 'text-[#2F80ED]' : 'text-[#6B7280]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}