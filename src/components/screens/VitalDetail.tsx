import { Heart, Activity, Droplet, Thermometer, Zap, Flame, Droplets, LucideIcon } from 'lucide-react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useVitals, VitalType, Status } from '../../lib/vitals';
import { VITAL_COLOR, STATUS_VAR } from '../../lib/theme';

interface VitalDetailProps {
  type: VitalType;
  onBack: () => void;
}

interface Meta {
  icon: LucideIcon;
  title: string;
  unit: string;
  decimals: number;
  hasSecondary?: boolean;
}

const META: Record<VitalType, Meta> = {
  heart: { icon: Heart, title: 'Herzfrequenz', unit: 'BPM', decimals: 0 },
  'blood-pressure': { icon: Activity, title: 'Blutdruck', unit: 'mmHg', decimals: 0, hasSecondary: true },
  oxygen: { icon: Droplet, title: 'Sauerstoffsättigung', unit: '%', decimals: 0 },
  temperature: { icon: Thermometer, title: 'Körpertemperatur', unit: '°C', decimals: 1 },
  ekg: { icon: Zap, title: 'EKG', unit: 'BPM', decimals: 0 },
  calories: { icon: Flame, title: 'Kalorienverbrauch', unit: 'kcal/h', decimals: 0 },
  'blood-sugar': { icon: Droplets, title: 'Blutzuckergehalt', unit: 'mg/dL', decimals: 0 },
};

const STATUS_LABEL: Record<Status, string> = { normal: 'Normal', warning: 'Auffällig', emergency: 'Kritisch' };
const AXIS = '#8A93A8'; // neutral, readable on both themes

function num(v: number, d: number) {
  return d > 0 ? v.toFixed(d).replace('.', ',') : Math.round(v).toString();
}

export function VitalDetail({ type, onBack }: VitalDetailProps) {
  const { vitals } = useVitals();
  const meta = META[type];
  const Icon = meta.icon;
  const state = vitals[type];
  const accent = VITAL_COLOR[type];
  const statusColor = STATUS_VAR[state.status];

  const chartData = state.live.map((s) => ({
    time: new Date(s.t).toLocaleTimeString('de-DE', { minute: '2-digit', second: '2-digit' }),
    value: s.value,
    secondary: s.secondary,
  }));

  const values = state.live.map((s) => s.value);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  const currentValue = meta.hasSecondary
    ? `${Math.round(state.value)} / ${Math.round(state.secondary ?? 0)}`
    : num(state.value, meta.decimals);

  const gradId = `grad-${type}`;

  return (
    <div className="v-screen">
      {/* Current value */}
      <section
        className="v-card"
        style={{ padding: 18, background: `radial-gradient(120% 120% at 100% 0%, ${accent}26, transparent 55%), var(--surface)` }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="v-chip" style={{ background: `${accent}24`, color: accent }}>
              <Icon size={18} strokeWidth={2.2} />
            </div>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{meta.title}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              className="animate-pulse"
              style={{ width: 8, height: 8, borderRadius: 9999, background: accent, display: 'inline-block' }}
            />
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>Live</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '14px 0 6px' }}>
          <p style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 5 }}>
            <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>{currentValue}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-muted)' }}>{meta.unit}</span>
          </p>
          <span
            className="v-status"
            style={{ background: `color-mix(in srgb, ${cssOf(state.status)} 16%, transparent)`, color: statusColor, marginTop: 8 }}
          >
            <span className="v-dot" style={{ background: statusColor }} />
            {STATUS_LABEL[state.status]}
          </span>
        </div>
      </section>

      {/* Real-time chart */}
      <section className="v-card" style={{ padding: 16 }}>
        <p className="v-eyebrow" style={{ marginBottom: 10 }}>Echtzeit · letzte 60 s</p>
        <div style={{ width: '100%', height: 190 }}>
          <ResponsiveContainer width="100%" height={190} minWidth={0}>
            {meta.hasSecondary ? (
              <LineChart data={chartData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={AXIS} strokeOpacity={0.18} vertical={false} />
                <XAxis dataKey="time" stroke={AXIS} tick={{ fontSize: 8, fill: AXIS }} tickLine={false} axisLine={false} interval={14} />
                <YAxis stroke={AXIS} tick={{ fontSize: 8, fill: AXIS }} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Line type="monotone" dataKey="value" stroke={accent} strokeWidth={2.5} dot={false} isAnimationActive={false} />
                <Line type="monotone" dataKey="secondary" stroke="var(--good)" strokeWidth={2} dot={false} isAnimationActive={false} />
              </LineChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 6, right: 6, bottom: 0, left: -18 }}>
                <defs>
                  <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={accent} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={AXIS} strokeOpacity={0.18} vertical={false} />
                <XAxis dataKey="time" stroke={AXIS} tick={{ fontSize: 8, fill: AXIS }} tickLine={false} axisLine={false} interval={14} />
                <YAxis stroke={AXIS} tick={{ fontSize: 8, fill: AXIS }} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                <Area type="monotone" dataKey="value" stroke={accent} strokeWidth={2.5} fill={`url(#${gradId})`} isAnimationActive={false} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {meta.hasSecondary && (
          <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
            <Legend color={accent} label="Systolisch" />
            <Legend color="var(--good)" label="Diastolisch" />
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="v-card-soft" style={{ padding: 16 }}>
        <p className="v-eyebrow" style={{ marginBottom: 12 }}>Analyse · 60 s Fenster</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <Stat label="Ø" value={`${num(avg, meta.decimals)}`} unit={meta.unit} />
          <Stat label="Min" value={`${num(min, meta.decimals)}`} unit={meta.unit} />
          <Stat label="Max" value={`${num(max, meta.decimals)}`} unit={meta.unit} />
        </div>
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 14,
            background: `color-mix(in srgb, ${cssOf(state.status)} 12%, transparent)`,
          }}
        >
          <p style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.45 }}>
            {state.status === 'normal'
              ? 'Werte liegen im Normalbereich.'
              : state.status === 'warning'
              ? 'Werte weichen vom Normalbereich ab. Beobachtung empfohlen.'
              : 'Kritische Werte erkannt. Bitte umgehend reagieren.'}
          </p>
        </div>
      </section>

      <button
        onClick={onBack}
        className="v-pressable"
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: 16,
          border: '1px solid var(--border-strong)',
          background: 'var(--surface)',
          color: 'var(--brand)',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Zurück
      </button>
    </div>
  );
}

// status -> a concrete color string usable inside color-mix()
function cssOf(s: Status): string {
  return s === 'normal' ? 'var(--good)' : s === 'warning' ? 'var(--warn)' : 'var(--bad)';
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: 9999, background: color, display: 'inline-block' }} />
      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div
      style={{
        background: 'var(--surface-2)',
        borderRadius: 14,
        padding: '10px 8px',
        textAlign: 'center',
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-muted)' }}>{label}</p>
      <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginTop: 2 }}>{value}</p>
      <p style={{ fontSize: 9, color: 'var(--text-faint)' }}>{unit}</p>
    </div>
  );
}
