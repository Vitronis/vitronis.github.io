import { ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../lib/theme';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export function Header({ title, onBack }: HeaderProps) {
  const { theme, toggle } = useTheme();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8,
        padding: '14px 18px 6px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {onBack && (
          <button onClick={onBack} className="v-icon-btn" aria-label="Zurück">
            <ArrowLeft size={18} strokeWidth={2.2} />
          </button>
        )}
        <h1 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
          {title}
        </h1>
      </div>

      <button onClick={toggle} className="v-icon-btn" aria-label="Design wechseln" title="Hell / Dunkel">
        {theme === 'light' ? <Moon size={18} strokeWidth={2.2} /> : <Sun size={18} strokeWidth={2.2} />}
      </button>
    </header>
  );
}
