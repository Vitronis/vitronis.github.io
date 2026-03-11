import { Heart, Activity, Droplet, Thermometer, Zap, Flame, Droplets } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface VitalDetailProps {
  type: 'heart' | 'blood-pressure' | 'oxygen' | 'temperature' | 'ekg' | 'calories' | 'blood-sugar';
  onBack: () => void;
}

const detailData = {
  heart: {
    icon: Heart,
    title: 'Herzfrequenz',
    color: '#2F80ED',
    unit: ' BPM',
    currentValue: '72 BPM',
    status: 'Normal',
    statusType: 'normal',
    data24h: [
  { time: '00:00', value: 54 },
  { time: '01:00', value: 52 },
  { time: '02:00', value: 60 },
  { time: '03:00', value: 59 },
  { time: '04:00', value: 53 },
  { time: '05:00', value: 51 },
  { time: '06:00', value: 77 },
  { time: '07:00', value: 71 },
  { time: '08:00', value: 80 },
  { time: '09:00', value: 66 },
  { time: '10:00', value: 72 },
  { time: '11:00', value: 69 },
  { time: '12:00', value: 65 },
  { time: '13:00', value: 74 },
  { time: '14:00', value: 64 },
  { time: '15:00', value: 74 },
  { time: '16:00', value: 73 },
  { time: '17:00', value: 82 },
  { time: '18:00', value: 86 },
  { time: '19:00', value: 72 },
  { time: '20:00', value: 79 },
  { time: '21:00', value: 74 },
  { time: '22:00', value: 76 },
  { time: '23:00', value: 55 },
  { time: '24:00', value: 54 },
  ],
    analysis: {
      title: 'Analyse',
      summary: 'Ihre Herzfrequenz liegt im normalen Bereich für Ihre Altersgruppe.',
      insights: [
        'Durchschnittswert: 69 BPM',
        'Niedrigster Wert: 51 BPM (05:00 Uhr)',
        'Höchster Wert: 86 BPM (18:00 Uhr)',
        'Trend: Stabil mit natürlicher Variation'
      ],
      recommendation: 'Ihre Herzfrequenz zeigt ein gesundes Muster. Achten Sie auf regelmäßige Bewegung und ausreichend Schlaf.'
    }
  },
  'blood-pressure': {
    icon: Activity,
    title: 'Blutdruck',
    color: '#27AE60',
    unit: ' mmHg',
    currentValue: '120 / 80',
    status: 'Normal',
    statusType: 'normal',
    data24h: [
      { time: '00:00', systolic: 115, diastolic: 75 },
      { time: '02:00', systolic: 112, diastolic: 73 },
      { time: '04:00', systolic: 110, diastolic: 72 },
      { time: '06:00', systolic: 114, diastolic: 74 },
      { time: '08:00', systolic: 120, diastolic: 80 },
      { time: '10:00', systolic: 122, diastolic: 82 },
      { time: '12:00', systolic: 125, diastolic: 83 },
      { time: '14:00', systolic: 123, diastolic: 81 },
      { time: '16:00', systolic: 120, diastolic: 80 },
      { time: '18:00', systolic: 118, diastolic: 78 },
      { time: '20:00', systolic: 116, diastolic: 76 },
      { time: '22:00', systolic: 115, diastolic: 75 },
      { time: '24:00', systolic: 120, diastolic: 80 },
    ],
    analysis: {
      title: 'Analyse',
      summary: 'Ihr Blutdruck liegt im optimalen Bereich.',
      insights: [
        'Durchschnitt systolisch: 118 mmHg',
        'Durchschnitt diastolisch: 78 mmHg',
        'Niedrigster Wert: 110/72 mmHg',
        'Höchster Wert: 125/83 mmHg'
      ],
      recommendation: 'Ihre Blutdruckwerte sind ausgezeichnet. Behalten Sie Ihren aktuellen Lebensstil bei und reduzieren Sie Salzzufuhr.'
    }
  },
  oxygen: {
    icon: Droplet,
    title: 'Sauerstoffsättigung',
    color: '#2F80ED',
    unit: ' %',
    currentValue: '98%',
    status: 'Normal',
    statusType: 'normal',
    data24h: [
      { time: '00:00', value: 97 },
      { time: '02:00', value: 96 },
      { time: '04:00', value: 96 },
      { time: '06:00', value: 97 },
      { time: '08:00', value: 98 },
      { time: '10:00', value: 98 },
      { time: '12:00', value: 99 },
      { time: '14:00', value: 98 },
      { time: '16:00', value: 98 },
      { time: '18:00', value: 97 },
      { time: '20:00', value: 97 },
      { time: '22:00', value: 97 },
      { time: '24:00', value: 98 },
    ],
    analysis: {
      title: 'Analyse',
      summary: 'Ihre Sauerstoffsättigung ist optimal.',
      insights: [
        'Durchschnittswert: 97.5%',
        'Niedrigster Wert: 96%',
        'Höchster Wert: 99%',
        'Konstant über 95% (Optimal)'
      ],
      recommendation: 'Ausgezeichnete Sauerstoffversorgung. Keine Maßnahmen erforderlich.'
    }
  },
  temperature: {
    icon: Thermometer,
    title: 'Körpertemperatur',
    color: '#EB5757',
    unit: ' °C',
    currentValue: '36,8°C',
    status: 'Normal',
    statusType: 'normal',
    data24h: [
      { time: '00:00', value: 36.5 },
      { time: '02:00', value: 36.4 },
      { time: '04:00', value: 36.3 },
      { time: '06:00', value: 36.4 },
      { time: '08:00', value: 36.6 },
      { time: '10:00', value: 36.7 },
      { time: '12:00', value: 36.9 },
      { time: '14:00', value: 36.8 },
      { time: '16:00', value: 36.8 },
      { time: '18:00', value: 36.7 },
      { time: '20:00', value: 36.6 },
      { time: '22:00', value: 36.5 },
      { time: '24:00', value: 36.8 },
    ],
    analysis: {
      title: 'Analyse',
      summary: 'Ihre Körpertemperatur liegt im normalen Bereich.',
      insights: [
        'Durchschnittswert: 36.6°C',
        'Niedrigster Wert: 36.3°C (Nacht)',
        'Höchster Wert: 36.9°C (Mittag)',
        'Natürliche zirkadiane Variation'
      ],
      recommendation: 'Normale Temperaturschwankungen über den Tag. Keine Anzeichen von Fieber oder Unterkühlung.'
    }
  },
  ekg: {
    icon: Zap,
    title: 'EKG',
    color: '#27AE60',
    unit: ' BPM',
    currentValue: '68 BPM',
    status: 'Normal',
    statusType: 'normal',
    data24h: [
      { time: '00:00', value: 62 },
      { time: '02:00', value: 58 },
      { time: '04:00', value: 56 },
      { time: '06:00', value: 60 },
      { time: '08:00', value: 68 },
      { time: '10:00', value: 72 },
      { time: '12:00', value: 75 },
      { time: '14:00', value: 73 },
      { time: '16:00', value: 70 },
      { time: '18:00', value: 68 },
      { time: '20:00', value: 65 },
      { time: '22:00', value: 63 },
      { time: '24:00', value: 60 },
    ],
    analysis: {
      title: 'Analyse',
      summary: 'Ihr EKG zeigt einen normalen Sinusrhythmus ohne Auffälligkeiten.',
      insights: [
        'Durchschnittswert: 66 BPM',
        'Niedrigster Wert: 56 BPM (04:00 Uhr)',
        'Höchster Wert: 75 BPM (12:00 Uhr)',
        'Keine Arrhythmien erkannt',
        'QRS-Komplex normal'
      ],
      recommendation: 'Ihr EKG zeigt einen gesunden Herzrhythmus. Keine Auffälligkeiten festgestellt. Weiterhin regelmäßige Kontrollen empfohlen.'
    }
  },
  calories: {
    icon: Flame,
    title: 'Kalorienverbrauch',
    color: '#F2994A',
    unit: ' kcal',
    currentValue: '2.145 kcal',
    status: 'Normal',
    statusType: 'normal',
    data24h: [
      { time: '00:00', value: 45 },
      { time: '02:00', value: 38 },
      { time: '04:00', value: 35 },
      { time: '06:00', value: 42 },
      { time: '08:00', value: 125 },
      { time: '10:00', value: 95 },
      { time: '12:00', value: 160 },
      { time: '14:00', value: 85 },
      { time: '16:00', value: 145 },
      { time: '18:00', value: 110 },
      { time: '20:00', value: 75 },
      { time: '22:00', value: 55 },
      { time: '24:00', value: 48 },
    ],
    analysis: {
      title: 'Analyse',
      summary: 'Ihr Kalorienverbrauch entspricht einem aktiven Lebensstil.',
      insights: [
        'Gesamtverbrauch heute: 2.145 kcal',
        'Durchschnitt pro Stunde: 89 kcal/h',
        'Höchster Verbrauch: 160 kcal/h (12:00 Uhr)',
        'Niedrigster Verbrauch: 35 kcal/h (04:00 Uhr)',
        'Aktivitätslevel: Moderat bis aktiv'
      ],
      recommendation: 'Ihr Kalorienverbrauch zeigt ein gesundes Aktivitätsmuster. Achten Sie auf ausgewogene Ernährung und ausreichende Flüssigkeitszufuhr.'
    }
  },
  'blood-sugar': {
    icon: Droplets,
    title: 'Blutzuckergehalt',
    color: '#FF6347',
    unit: ' mg/dL',
    currentValue: '95 mg/dL',
    status: 'Normal',
    statusType: 'normal',
    data24h: [
      { time: '00:00', value: 90 },
      { time: '02:00', value: 88 },
      { time: '04:00', value: 87 },
      { time: '06:00', value: 89 },
      { time: '08:00', value: 92 },
      { time: '10:00', value: 94 },
      { time: '12:00', value: 96 },
      { time: '14:00', value: 95 },
      { time: '16:00', value: 93 },
      { time: '18:00', value: 91 },
      { time: '20:00', value: 89 },
      { time: '22:00', value: 88 },
      { time: '24:00', value: 90 },
    ],
    analysis: {
      title: 'Analyse',
      summary: 'Ihr Blutzuckerspiegel liegt im optimalen Bereich.',
      insights: [
        'Durchschnittswert: 91 mg/dL',
        'Niedrigster Wert: 87 mg/dL (04:00 Uhr)',
        'Höchster Wert: 96 mg/dL (12:00 Uhr)',
        'Zielbereich: 70-100 mg/dL (nüchtern)',
        'Keine Anzeichen für Hypo- oder Hyperglykämie'
      ],
      recommendation: 'Ihre Blutzuckerwerte sind ausgezeichnet und zeigen eine gute metabolische Kontrolle. Behalten Sie Ihre ausgewogene Ernährung bei.'
    }
  }
};

export function VitalDetail({ type, onBack }: VitalDetailProps) {
  const detail = detailData[type];
  const Icon = detail.icon;
  
  const statusColors = {
    normal: 'text-[#27AE60]',
    warning: 'text-[#EB5757]',
  };

  const renderChart = () => {
    if (type === 'blood-pressure') {
      return (
        <LineChart data={detail.data24h}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            style={{ fontSize: '8px' }}
            tickLine={false}
          />
          <YAxis 
            stroke="#6B7280"
            style={{ fontSize: '8px' }}
            tickLine={false}
          />
          <Line 
            type="monotone" 
            dataKey="systolic" 
            stroke="#2F80ED" 
            strokeWidth={1.5}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="diastolic" 
            stroke="#27AE60" 
            strokeWidth={1.5}
            dot={false}
          />
        </LineChart>
      );
    }

    return (
      <LineChart data={detail.data24h}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
        <XAxis 
          dataKey="time" 
          stroke="#6B7280"
          style={{ fontSize: '8px' }}
          tickLine={false}
        />
        <YAxis 
          stroke="#6B7280"
          style={{ fontSize: '8px' }}
          tickLine={false}
          unit={detail.unit}
        />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={detail.color} 
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    );
  };

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="px-4 pt-2 pb-4 space-y-3">
        {/* Current Value Card */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#2F80ED]/10 rounded-lg">
                <Icon size={20} strokeWidth={2} className="text-[#2F80ED]" />
              </div>
              <h2 className="text-[13px] font-medium text-[#1F2937]">
                {detail.title}
              </h2>
            </div>
          </div>
          
          <div className="text-center py-2">
            <p className="text-[28px] font-semibold text-[#1F2937] mb-1">
              {detail.currentValue}
            </p>
            <div className="flex items-center justify-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${detail.statusType === 'normal' ? 'bg-[#27AE60]' : 'bg-[#EB5757]'}`} />
              <span className={`text-[11px] ${statusColors[detail.statusType as keyof typeof statusColors]}`}>
                {detail.status}
              </span>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-[12px] font-medium text-[#1F2937]">
              Verlauf (24 Stunden)
            </h3>
          </div>
          
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height={180} minWidth={0}>
              {renderChart()}
            </ResponsiveContainer>
          </div>

          {type === 'blood-pressure' && (
            <div className="flex items-center gap-3 mt-2 text-[10px]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#2F80ED]" />
                <span className="text-[#6B7280]">Systolisch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
                <span className="text-[#6B7280]">Diastolisch</span>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Card */}
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <h3 className="text-[12px] font-medium text-[#1F2937] mb-2">
            {detail.analysis.title}
          </h3>
          
          <p className="text-[11px] text-[#1F2937] mb-3">
            {detail.analysis.summary}
          </p>

          <div className="space-y-1.5 mb-3">
            {detail.analysis.insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#2F80ED] mt-1.5" />
                <span className="text-[10px] text-[#6B7280]">{insight}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#2F80ED]/5 rounded-lg p-2">
            <p className="text-[10px] text-[#1F2937]">
              <span className="font-medium">Empfehlung:</span> {detail.analysis.recommendation}
            </p>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-full bg-white border-2 border-[#2F80ED] text-[#2F80ED] py-2 px-3 rounded-lg hover:bg-[#2F80ED]/5 transition-colors text-[12px] font-medium"
        >
          Zurück zum Verlauf
        </button>
      </div>
    </div>
  );
}
