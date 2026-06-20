import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';

// =====================================================================
//  Vitronis — client-side vitals simulation engine
//  Single source of truth for live vital values, history and alerts.
//  Designed so it can later be swapped for a real ESP32 poll behind the
//  same `useVitals()` interface without touching the screens.
// =====================================================================

export type VitalType =
  | 'heart'
  | 'blood-pressure'
  | 'oxygen'
  | 'temperature'
  | 'ekg'
  | 'calories'
  | 'blood-sugar';

export type Status = 'normal' | 'warning' | 'emergency';

export interface VitalSample {
  t: number; // epoch ms
  value: number; // primary value
  secondary?: number; // diastolic for blood-pressure
}

export interface VitalState {
  type: VitalType;
  value: number;
  secondary?: number;
  status: Status;
  live: VitalSample[]; // rolling real-time window (last LIVE_POINTS samples)
}

export interface Alert {
  id: string;
  type: VitalType;
  status: Exclude<Status, 'normal'>;
  title: string;
  message: string;
  t: number;
}

const LIVE_POINTS = 60; // 60 s rolling real-time window
const TICK_MS = 1000;

// ---- Per-vital configuration -------------------------------------------------
interface VitalConfig {
  baseline: number;
  amplitude: number; // sinusoidal circadian drift
  noise: number; // per-tick random jitter
  decimals: number;
  // status bands on the primary value
  warnLow: number;
  warnHigh: number;
  emergLow: number;
  emergHigh: number;
  secondaryBaseline?: number; // diastolic
}

const CONFIG: Record<VitalType, VitalConfig> = {
  heart: { baseline: 72, amplitude: 6, noise: 2, decimals: 0, warnLow: 50, warnHigh: 110, emergLow: 40, emergHigh: 140 },
  'blood-pressure': { baseline: 120, amplitude: 5, noise: 2, decimals: 0, warnLow: 90, warnHigh: 140, emergLow: 80, emergHigh: 170, secondaryBaseline: 80 },
  oxygen: { baseline: 98, amplitude: 1, noise: 0.5, decimals: 0, warnLow: 94, warnHigh: 101, emergLow: 90, emergHigh: 101 },
  temperature: { baseline: 36.7, amplitude: 0.25, noise: 0.05, decimals: 1, warnLow: 36.0, warnHigh: 37.5, emergLow: 35.0, emergHigh: 38.5 },
  ekg: { baseline: 66, amplitude: 6, noise: 2, decimals: 0, warnLow: 50, warnHigh: 110, emergLow: 40, emergHigh: 140 },
  calories: { baseline: 90, amplitude: 40, noise: 12, decimals: 0, warnLow: -1, warnHigh: 99999, emergLow: -1, emergHigh: 99999 },
  'blood-sugar': { baseline: 92, amplitude: 6, noise: 2, decimals: 0, warnLow: 70, warnHigh: 140, emergLow: 55, emergHigh: 180 },
};

// An episode temporarily shifts a vital's baseline to an abnormal target.
interface Episode {
  target: number; // target primary value
  secondaryTarget?: number;
  until: number; // epoch ms
}

function evalStatus(type: VitalType, value: number): Status {
  const c = CONFIG[type];
  if (value <= c.emergLow || value >= c.emergHigh) return 'emergency';
  if (value <= c.warnLow || value >= c.warnHigh) return 'warning';
  return 'normal';
}

function round(value: number, decimals: number): number {
  const f = Math.pow(10, decimals);
  return Math.round(value * f) / f;
}

// Seed a rolling window so charts aren't empty on first paint.
function seedLive(type: VitalType): VitalSample[] {
  const c = CONFIG[type];
  const now = Date.now();
  const out: VitalSample[] = [];
  for (let i = LIVE_POINTS - 1; i >= 0; i--) {
    const drift = c.amplitude * Math.sin(i / 9);
    const value = round(c.baseline + drift + (Math.random() - 0.5) * c.noise, c.decimals);
    const secondary = c.secondaryBaseline !== undefined
      ? round(c.secondaryBaseline + drift * 0.6 + (Math.random() - 0.5) * c.noise, c.decimals)
      : undefined;
    out.push({ t: now - i * TICK_MS, value, secondary });
  }
  return out;
}

const ALL: VitalType[] = ['heart', 'blood-pressure', 'oxygen', 'temperature', 'ekg', 'calories', 'blood-sugar'];

const VITAL_TITLE: Record<VitalType, string> = {
  heart: 'Herzfrequenz',
  'blood-pressure': 'Blutdruck',
  oxygen: 'Sauerstoffsättigung',
  temperature: 'Körpertemperatur',
  ekg: 'EKG',
  calories: 'Kalorienverbrauch',
  'blood-sugar': 'Blutzuckergehalt',
};

interface VitalsContextValue {
  vitals: Record<VitalType, VitalState>;
  alerts: Alert[];
  overallStatus: Status;
  dismissAlert: (id: string) => void;
  triggerEmergency: () => void; // deterministic demo: simulated cardiac event
  clearEpisodes: () => void;
}

const VitalsContext = createContext<VitalsContextValue | null>(null);

export function VitalsProvider({ children }: { children: ReactNode }) {
  const [vitals, setVitals] = useState<Record<VitalType, VitalState>>(() => {
    const init = {} as Record<VitalType, VitalState>;
    for (const type of ALL) {
      const live = seedLive(type);
      const last = live[live.length - 1];
      init[type] = {
        type,
        value: last.value,
        secondary: last.secondary,
        status: evalStatus(type, last.value),
        live,
      };
    }
    return init;
  });
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const episodes = useRef<Partial<Record<VitalType, Episode>>>({});
  const prevStatus = useRef<Record<VitalType, Status>>(
    ALL.reduce((acc, t) => ({ ...acc, [t]: 'normal' as Status }), {} as Record<VitalType, Status>),
  );

  useEffect(() => {
    const id = setInterval(() => {
      const now = Date.now();
      setVitals((prev) => {
        const next = { ...prev };
        for (const type of ALL) {
          const c = CONFIG[type];
          const ep = episodes.current[type];
          if (ep && now >= ep.until) delete episodes.current[type];
          const active = episodes.current[type];

          // pull toward episode target if active, otherwise toward baseline
          const targetPrimary = active ? active.target : c.baseline;
          const drift = c.amplitude * Math.sin(now / 9000);
          const cur = prev[type].value;
          const pulled = cur + (targetPrimary + drift - cur) * 0.25;
          const value = round(pulled + (Math.random() - 0.5) * c.noise, c.decimals);

          let secondary: number | undefined;
          if (c.secondaryBaseline !== undefined) {
            const targetSec = active?.secondaryTarget ?? c.secondaryBaseline;
            const pulledSec = (prev[type].secondary ?? c.secondaryBaseline) +
              (targetSec + drift * 0.6 - (prev[type].secondary ?? c.secondaryBaseline)) * 0.25;
            secondary = round(pulledSec + (Math.random() - 0.5) * c.noise, c.decimals);
          }

          const status = evalStatus(type, value);
          const live = [...prev[type].live.slice(-(LIVE_POINTS - 1)), { t: now, value, secondary }];
          next[type] = { type, value, secondary, status, live };

          // raise an alert on a normal -> abnormal transition
          if (status !== 'normal' && prevStatus.current[type] === 'normal') {
            const alert: Alert = {
              id: `${type}-${now}`,
              type,
              status,
              title: status === 'emergency' ? `Notfall: ${VITAL_TITLE[type]}` : `Warnung: ${VITAL_TITLE[type]}`,
              message: buildMessage(type, status, value, secondary),
              t: now,
            };
            setAlerts((a) => [alert, ...a].slice(0, 8));
          }
          prevStatus.current[type] = status;
        }
        return next;
      });
    }, TICK_MS);
    return () => clearInterval(id);
  }, []);

  const overallStatus: Status = (() => {
    let s: Status = 'normal';
    for (const type of ALL) {
      const st = vitals[type].status;
      if (st === 'emergency') return 'emergency';
      if (st === 'warning') s = 'warning';
    }
    return s;
  })();

  const value: VitalsContextValue = {
    vitals,
    alerts,
    overallStatus,
    dismissAlert: (id) => setAlerts((a) => a.filter((x) => x.id !== id)),
    triggerEmergency: () => {
      // simulated cardiac event: HR + EKG spike, SpO2 drop, BP spike for 25 s
      const until = Date.now() + 25000;
      episodes.current.heart = { target: 168, until };
      episodes.current.ekg = { target: 165, until };
      episodes.current.oxygen = { target: 86, until };
      episodes.current['blood-pressure'] = { target: 178, secondaryTarget: 112, until };
    },
    clearEpisodes: () => {
      episodes.current = {};
    },
  };

  return <VitalsContext.Provider value={value}>{children}</VitalsContext.Provider>;
}

function buildMessage(type: VitalType, status: Status, value: number, secondary?: number): string {
  const sev = status === 'emergency' ? 'Kritischer' : 'Auffälliger';
  switch (type) {
    case 'heart':
      return `${sev} Wert: ${value} BPM. ${value > 120 ? 'Tachykardie erkannt.' : value < 50 ? 'Bradykardie erkannt.' : ''}`.trim();
    case 'ekg':
      return `${sev} Rhythmus: ${value} BPM. Mögliche Arrhythmie.`;
    case 'oxygen':
      return `${sev} Wert: ${value} %. Sauerstoffsättigung zu niedrig.`;
    case 'temperature':
      return `${sev} Wert: ${value.toString().replace('.', ',')} °C.`;
    case 'blood-pressure':
      return `${sev} Wert: ${value}/${secondary ?? ''} mmHg.`;
    case 'blood-sugar':
      return `${sev} Wert: ${value} mg/dL.`;
    default:
      return `${sev} Wert: ${value}.`;
  }
}

export function useVitals(): VitalsContextValue {
  const ctx = useContext(VitalsContext);
  if (!ctx) throw new Error('useVitals must be used within VitalsProvider');
  return ctx;
}

// Pattern-detection summary used by the dashboard "AI" card.
export function detectPattern(ctx: VitalsContextValue): { level: Status; title: string; detail: string } {
  const { vitals } = ctx;
  const hr = vitals.heart.value;
  const spo2 = vitals.oxygen.value;
  if (vitals.heart.status === 'emergency' && vitals.oxygen.status !== 'normal') {
    return {
      level: 'emergency',
      title: 'Mögliches kardiales Ereignis erkannt',
      detail: `Muster: erhöhte Herzfrequenz (${hr} BPM) kombiniert mit fallender Sauerstoffsättigung (${spo2} %). Sofortige Aufmerksamkeit empfohlen.`,
    };
  }
  if (ctx.overallStatus === 'emergency') {
    return { level: 'emergency', title: 'Kritischer Vitalwert erkannt', detail: 'Mindestens ein Vitalwert liegt im kritischen Bereich.' };
  }
  if (ctx.overallStatus === 'warning') {
    return { level: 'warning', title: 'Auffälligkeit erkannt', detail: 'Ein oder mehrere Vitalwerte weichen vom Normalbereich ab.' };
  }
  return { level: 'normal', title: 'Sehr gut', detail: 'Alle Vitalwerte liegen im optimalen Bereich.' };
}

export const VITAL_LABELS = VITAL_TITLE;
