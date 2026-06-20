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
    <nav className="v-nav">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeScreen === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="v-nav-item"
            data-active={isActive}
          >
            <Icon size={20} strokeWidth={2.2} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
