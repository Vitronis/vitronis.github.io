import { useEffect, useRef } from 'react';
import { toast } from 'sonner@2.0.3';
import { AlertTriangle, Activity } from 'lucide-react';
import { useVitals } from '../lib/vitals';

// Fires a toast for every newly-raised alert and renders a persistent
// banner whenever any vital is out of range. In-app alerts only (no push).
export function AlertSystem() {
  const { alerts, overallStatus } = useVitals();
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    for (const a of alerts) {
      if (seen.current.has(a.id)) continue;
      seen.current.add(a.id);
      const fn = a.status === 'emergency' ? toast.error : toast.warning;
      fn(a.title, { description: a.message, duration: a.status === 'emergency' ? 8000 : 5000 });
    }
  }, [alerts]);

  if (overallStatus === 'normal') return null;

  const emergency = overallStatus === 'emergency';
  // Layout via inline styles: this project's pre-compiled index.css has no
  // Tailwind compiler, so not every utility class has a rule.
  return (
    <div
      role="alert"
      style={{
        margin: '8px 16px 0',
        borderRadius: 12,
        padding: 12,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        color: '#fff',
        background: emergency
          ? 'linear-gradient(135deg, #FF6E8A, #FF4D6D)'
          : 'linear-gradient(135deg, #FFB259, #FF8A3D)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <div style={{ flexShrink: 0, marginTop: 2 }}>
        {emergency ? (
          <AlertTriangle size={18} strokeWidth={2.2} />
        ) : (
          <Activity size={18} strokeWidth={2.2} />
        )}
      </div>
      <div>
        <p style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.2 }}>
          {emergency ? 'Notfall erkannt' : 'Auffällige Vitalwerte'}
        </p>
        <p style={{ fontSize: 10, opacity: 0.9, lineHeight: 1.2, marginTop: 2 }}>
          {emergency
            ? 'Kritische Vitalwerte. Notfallinformationen bereithalten und ggf. Hilfe rufen.'
            : 'Ein oder mehrere Werte liegen außerhalb des Normalbereichs.'}
        </p>
      </div>
    </div>
  );
}
