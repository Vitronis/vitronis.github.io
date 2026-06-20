import { X, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState, CSSProperties } from 'react';
import { useVitals, detectPattern, VitalType, VITAL_LABELS, Status } from '../../lib/vitals';
import { VITAL_COLOR, STATUS_VAR } from '../../lib/theme';

interface HealthAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: 'dashboard' | 'verlauf';
}

const STATUS_LABEL: Record<Status, string> = { normal: 'Normal', warning: 'Auffällig', emergency: 'Kritisch' };

function fmt(type: VitalType, v: number, sec?: number): string {
  switch (type) {
    case 'heart': return `${Math.round(v)} BPM`;
    case 'blood-pressure': return `${Math.round(v)}/${Math.round(sec ?? 0)} mmHg`;
    case 'oxygen': return `${Math.round(v)} %`;
    case 'temperature': return `${v.toFixed(1).replace('.', ',')} °C`;
    case 'ekg': return `${Math.round(v)} BPM`;
    case 'calories': return `${Math.round(v)} kcal/h`;
    case 'blood-sugar': return `${Math.round(v)} mg/dL`;
  }
}

const ORDER: VitalType[] = ['heart', 'blood-pressure', 'oxygen', 'temperature', 'ekg', 'calories', 'blood-sugar'];

const TRENDS = [
  { label: 'Herzfrequenz-Variabilität', dir: 'up', value: '+5%' },
  { label: 'Durchschnittlicher Blutdruck', dir: 'down', value: '−2%' },
  { label: 'Aktivitätsniveau', dir: 'flat', value: 'Stabil' },
];

const RECS = [
  { title: 'Regelmäßige Bewegung', items: ['30 Min. Spazieren täglich', '3× pro Woche Ausdauertraining'] },
  { title: 'Ausgewogene Ernährung', items: ['5 Portionen Obst/Gemüse', '2–3 Liter Wasser pro Tag'] },
  { title: 'Stressmanagement', items: ['10–15 Min. Meditation', '7–8 Stunden Schlaf'] },
];

export function HealthAnalysisModal({ isOpen, onClose, source }: HealthAnalysisModalProps) {
  const [showRecs, setShowRecs] = useState(false);
  const ctx = useVitals();
  if (!isOpen) return null;

  const { vitals } = ctx;
  const pattern = detectPattern(ctx);
  const patternColor =
    pattern.level === 'emergency' ? 'var(--bad)' : pattern.level === 'warning' ? 'var(--warn)' : 'var(--good)';

  const lastUpdated = new Date().toLocaleString('de-DE', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  });

  const overlay: CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 70, background: 'rgba(0,0,0,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
  };

  return (
    <div style={overlay} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--surface)', color: 'var(--text)', width: '100%', maxWidth: 390,
          maxHeight: '88vh', borderRadius: 24, display: 'flex', flexDirection: 'column',
          overflow: 'hidden', boxShadow: 'var(--shadow-pop)', border: '1px solid var(--border)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700 }}>Gesundheitsanalyse</p>
            <p style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
              {source === 'dashboard' ? 'Aktuelle Werte' : 'Verlaufsdaten'} · {lastUpdated}
            </p>
          </div>
          <button className="v-icon-btn" onClick={onClose} aria-label="Schließen">
            <X size={18} strokeWidth={2.2} />
          </button>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 16, paddingBottom: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Overall status */}
          <div style={{ borderRadius: 16, padding: 14, background: `color-mix(in srgb, ${patternColor} 12%, transparent)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 9, height: 9, borderRadius: 9999, background: patternColor }} />
              <p style={{ fontSize: 14, fontWeight: 700, color: patternColor }}>{pattern.title}</p>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.45, marginTop: 6 }}>{pattern.detail}</p>
          </div>

          {/* Vital overview grid */}
          <div>
            <p className="v-eyebrow" style={{ marginBottom: 10 }}>Vitalwerte im Überblick</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {ORDER.map((t) => {
                const s = vitals[t];
                return (
                  <div key={t} style={{ borderRadius: 14, padding: 12, background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 9, height: 9, borderRadius: 9999, background: VITAL_COLOR[t], flexShrink: 0 }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>{VITAL_LABELS[t]}</span>
                    </div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 6 }}>
                      {fmt(t, s.value, s.secondary)}
                    </p>
                    <span style={{ fontSize: 10, fontWeight: 600, color: STATUS_VAR[s.status] }}>
                      {STATUS_LABEL[s.status]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 7-day trends */}
          <div className="v-card-soft" style={{ padding: 14 }}>
            <p className="v-eyebrow" style={{ marginBottom: 10 }}>7-Tage-Trends</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TRENDS.map((tr) => (
                <div key={tr.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tr.label}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: tr.dir === 'flat' ? 'var(--text-muted)' : 'var(--good)' }}>
                    {tr.dir === 'up' && <TrendingUp size={13} strokeWidth={2.4} />}
                    {tr.dir === 'down' && <TrendingDown size={13} strokeWidth={2.4} />}
                    {tr.dir === 'flat' && <Minus size={13} strokeWidth={2.4} />}
                    {tr.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations (collapsible) */}
          <div className="v-card-soft" style={{ overflow: 'hidden' }}>
            <button
              onClick={() => setShowRecs((v) => !v)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Empfehlungen</span>
              <ChevronRight size={16} className="v-faint" style={{ transform: showRecs ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {showRecs && (
              <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {RECS.map((r) => (
                  <div key={r.title} style={{ background: 'var(--surface-2)', borderRadius: 12, padding: 10 }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{r.title}</p>
                    {r.items.map((it) => (
                      <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 4 }}>
                        <span style={{ width: 4, height: 4, borderRadius: 9999, background: 'var(--brand)' }} />
                        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{it}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Disclaimer */}
          <p style={{ fontSize: 10, color: 'var(--text-faint)', lineHeight: 1.5, textAlign: 'center' }}>
            Diese Analyse ersetzt keine ärztliche Diagnose. Bei Beschwerden wenden Sie sich an Ihren Arzt.
          </p>
        </div>
      </div>
    </div>
  );
}
