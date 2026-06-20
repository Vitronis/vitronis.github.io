import { Heart, Activity, Droplet, Thermometer, Cpu, AlertTriangle, Sparkles, ChevronRight } from 'lucide-react';
import { VitalCard } from '../VitalCard';
import { HealthAnalysisModal } from '../modals/HealthAnalysisModal';
import { ImplantStatusModal } from '../modals/ImplantStatusModal';
import { EmergencyCardModal } from '../modals/EmergencyCardModal';
import { useVitals, detectPattern, Status } from '../../lib/vitals';
import { useNav } from '../../lib/nav';
import { VITAL_COLOR } from '../../lib/theme';
import logo from '../../assets/vitronis-logo.png';

interface DashboardProps {
  onVitalClick: (type: 'heart' | 'blood-pressure' | 'oxygen' | 'temperature') => void;
}

const HERO_GRADIENT: Record<Status, string> = {
  normal: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
  warning: 'linear-gradient(135deg, #FFB259, #FF8A3D)',
  emergency: 'linear-gradient(135deg, #FF6E8A, #FF4D6D)',
};

function spark(values: { value: number }[], n = 24): number[] {
  return values.slice(-n).map((s) => s.value);
}

export function Dashboard({ onVitalClick }: DashboardProps) {
  const ctx = useVitals();
  const { vitals } = ctx;
  const pattern = detectPattern(ctx);
  const { push } = useNav();

  const openAnalysis = () =>
    push('Gesundheitsanalyse', <HealthAnalysisModal asPage source="dashboard" />);
  const openImplantStatus = () =>
    push('Implantatstatus', <ImplantStatusModal asPage />);
  const openEmergencyCard = () =>
    push('Notfallinformationen', <EmergencyCardModal asPage />);

  return (
    <div className="v-screen">
      {/* Hero — overall status */}
      <section
        className="v-card"
        style={{ padding: 18, background: HERO_GRADIENT[pattern.level], color: '#fff', border: 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 8, display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Vitronis" style={{ height: 56, objectFit: 'contain', display: 'block' }} />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 9999,
              padding: '6px 12px',
            }}
          >
            <Heart size={14} strokeWidth={2.4} fill="#fff" />
            <span style={{ fontSize: 13, fontWeight: 700 }}>{Math.round(vitals.heart.value)}</span>
            <span style={{ fontSize: 10, opacity: 0.85 }}>BPM</span>
          </div>
        </div>

        <p style={{ fontSize: 11, fontWeight: 600, opacity: 0.85, marginTop: 16, letterSpacing: '0.03em' }}>
          GESUNDHEITSSTATUS
        </p>
        <p style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 2 }}>{pattern.title}</p>
        <p style={{ fontSize: 12, opacity: 0.9, lineHeight: 1.4, marginTop: 6 }}>{pattern.detail}</p>
      </section>

      {/* Vitals grid */}
      <div>
        <p className="v-eyebrow" style={{ marginBottom: 10 }}>Vitalwerte</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div onClick={() => onVitalClick('heart')}>
            <VitalCard
              icon={Heart}
              title="Herzfrequenz"
              value={`${Math.round(vitals.heart.value)}`}
              unit="BPM"
              status={vitals.heart.status}
              accent={VITAL_COLOR.heart}
              spark={spark(vitals.heart.live)}
            />
          </div>
          <div onClick={() => onVitalClick('blood-pressure')}>
            <VitalCard
              icon={Activity}
              title="Blutdruck"
              value={`${Math.round(vitals['blood-pressure'].value)}/${Math.round(vitals['blood-pressure'].secondary ?? 0)}`}
              unit="mmHg"
              status={vitals['blood-pressure'].status}
              accent={VITAL_COLOR['blood-pressure']}
              spark={spark(vitals['blood-pressure'].live)}
            />
          </div>
          <div onClick={() => onVitalClick('oxygen')}>
            <VitalCard
              icon={Droplet}
              title="Sauerstoff (SpO₂)"
              value={`${Math.round(vitals.oxygen.value)}`}
              unit="%"
              status={vitals.oxygen.status}
              accent={VITAL_COLOR.oxygen}
              spark={spark(vitals.oxygen.live)}
            />
          </div>
          <div onClick={() => onVitalClick('temperature')}>
            <VitalCard
              icon={Thermometer}
              title="Temperatur"
              value={vitals.temperature.value.toFixed(1).replace('.', ',')}
              unit="°C"
              status={vitals.temperature.status}
              accent={VITAL_COLOR.temperature}
              spark={spark(vitals.temperature.live)}
            />
          </div>
        </div>
      </div>

      {/* AI analysis */}
      <button
        className="v-card v-pressable"
        onClick={openAnalysis}
        style={{ padding: 16, textAlign: 'left', display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}
      >
        <div className="v-chip" style={{ background: 'var(--brand)', color: '#fff' }}>
          <Sparkles size={18} strokeWidth={2.2} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>KI-Gesundheitsanalyse</p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Mustererkennung über alle Vitalwerte</p>
        </div>
        <ChevronRight size={18} className="v-faint" />
      </button>

      {/* Quick actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <ActionRow
          icon={Cpu}
          accent="var(--brand)"
          title="Implantatstatus"
          subtitle="Alle Systeme funktionieren normal"
          onClick={openImplantStatus}
        />
        <ActionRow
          icon={AlertTriangle}
          accent="var(--bad)"
          title="Notfallinformationen"
          subtitle="Schneller Zugriff auf wichtige Daten"
          onClick={openEmergencyCard}
        />
      </div>

    </div>
  );
}

function ActionRow({
  icon: Icon,
  accent,
  title,
  subtitle,
  onClick,
}: {
  icon: typeof Cpu;
  accent: string;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      className="v-card-soft v-pressable"
      onClick={onClick}
      style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left' }}
    >
      <div className="v-chip" style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}>
        <Icon size={18} strokeWidth={2.2} />
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{title}</p>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</p>
      </div>
      <ChevronRight size={18} className="v-faint" />
    </button>
  );
}
