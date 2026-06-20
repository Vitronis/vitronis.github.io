import { LucideIcon } from 'lucide-react';
import { STATUS_VAR } from '../lib/theme';

type Status = 'normal' | 'warning' | 'emergency';

interface VitalCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  unit?: string;
  status: Status;
  accent: string;
  spark?: number[];
}

const STATUS_LABEL: Record<Status, string> = {
  normal: 'Normal',
  warning: 'Auffällig',
  emergency: 'Kritisch',
};

// Tiny inline sparkline (no recharts overhead per tile).
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data.length) return null;
  const w = 100;
  const h = 28;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / span) * (h - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: 'block' }}>
      <polyline points={pts.join(' ')} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function VitalCard({ icon: Icon, title, value, unit, status, accent, spark }: VitalCardProps) {
  const statusColor = STATUS_VAR[status];

  return (
    <div
      className="v-card-soft v-pressable"
      style={{
        padding: 14,
        background: `radial-gradient(120% 120% at 100% 0%, ${accent}1F, transparent 52%), var(--surface)`,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        minHeight: 132,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="v-chip" style={{ background: `${accent}24`, color: accent }}>
          <Icon size={18} strokeWidth={2.2} />
        </div>
        <span className="v-dot" style={{ background: statusColor }} />
      </div>

      <div>
        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>{title}</p>
        <p style={{ display: 'flex', alignItems: 'baseline', gap: 3, marginTop: 2 }}>
          <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>{value}</span>
          {unit && <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>{unit}</span>}
        </p>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 10, fontWeight: 600, color: statusColor }}>{STATUS_LABEL[status]}</span>
        <div style={{ flex: 1, maxWidth: 64, opacity: 0.85 }}>
          {spark && <Sparkline data={spark} color={accent} />}
        </div>
      </div>
    </div>
  );
}
