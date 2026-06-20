import { useState } from 'react';
import { Siren, RotateCcw } from 'lucide-react';
import { useVitals } from '../lib/vitals';

// Discreet control for live demos: deterministically trigger a simulated
// cardiac event (so the alert/AI flow can be shown on cue), or reset.
// NOTE: this project ships a pre-compiled index.css with no Tailwind
// compiler, so layout-critical styles are inline to guarantee they apply.
export function DemoControl() {
  const { triggerEmergency, clearEpisodes, overallStatus } = useVitals();
  const [open, setOpen] = useState(false);

  const pill: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    fontWeight: 600,
    padding: '8px 12px',
    borderRadius: 9999,
    boxShadow: 'var(--shadow-pop)',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 104,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {open && (
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ ...pill, background: 'var(--bad)', color: '#fff' }} onClick={triggerEmergency}>
            <Siren size={14} strokeWidth={2.2} />
            Notfall simulieren
          </button>
          <button
            style={{ ...pill, background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)' }}
            onClick={clearEpisodes}
          >
            <RotateCcw size={14} strokeWidth={2.2} />
            Zurücksetzen
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Demo-Steuerung"
        title="Demo-Steuerung"
        className={overallStatus === 'normal' ? '' : 'animate-pulse'}
        style={{
          width: 44,
          height: 44,
          borderRadius: 9999,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: overallStatus === 'normal' ? 'var(--brand)' : '#fff',
          background: overallStatus === 'normal' ? 'var(--surface)' : 'var(--bad)',
          border: overallStatus === 'normal' ? '1px solid var(--border)' : 'none',
          boxShadow: 'var(--shadow-pop)',
        }}
      >
        <Siren size={20} strokeWidth={2} />
      </button>
    </div>
  );
}
