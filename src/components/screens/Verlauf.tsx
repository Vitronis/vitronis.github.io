import { Heart, Activity, Thermometer, Droplet, TrendingUp, Zap, Flame, Droplets } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { HealthAnalysisModal } from '../modals/HealthAnalysisModal';

const hrData24h = [
  { time: '00:00', value: 68 },
  { time: '02:00', value: 65 },
  { time: '04:00', value: 64 },
  { time: '06:00', value: 66 },
  { time: '08:00', value: 72 },
  { time: '10:00', value: 75 },
  { time: '12:00', value: 78 },
  { time: '14:00', value: 76 },
  { time: '16:00', value: 74 },
  { time: '18:00', value: 72 },
  { time: '20:00', value: 70 },
  { time: '22:00', value: 68 },
  { time: '24:00', value: 67 },
];

const hrData7d = [
  { time: 'Mo', value: 70 },
  { time: 'Di', value: 72 },
  { time: 'Mi', value: 69 },
  { time: 'Do', value: 71 },
  { time: 'Fr', value: 73 },
  { time: 'Sa', value: 68 },
  { time: 'So', value: 70 },
];

const bpData24h = [
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
  { time: '24:00', systolic: 114, diastolic: 74 },
];

const bpData7d = [
  { time: 'Mo', systolic: 118, diastolic: 78 },
  { time: 'Di', systolic: 120, diastolic: 80 },
  { time: 'Mi', systolic: 117, diastolic: 77 },
  { time: 'Do', systolic: 119, diastolic: 79 },
  { time: 'Fr', systolic: 121, diastolic: 81 },
  { time: 'Sa', systolic: 116, diastolic: 76 },
  { time: 'So', systolic: 118, diastolic: 78 },
];

const tempData24h = [
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
  { time: '24:00', value: 36.5 },
];

const tempData7d = [
  { time: 'Mo', value: 36.6 },
  { time: 'Di', value: 36.7 },
  { time: 'Mi', value: 36.5 },
  { time: 'Do', value: 36.6 },
  { time: 'Fr', value: 36.8 },
  { time: 'Sa', value: 36.5 },
  { time: 'So', value: 36.6 },
];

const spo2Data24h = [
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
];

const spo2Data7d = [
  { time: 'Mo', value: 97.5 },
  { time: 'Di', value: 97.8 },
  { time: 'Mi', value: 97.2 },
  { time: 'Do', value: 97.6 },
  { time: 'Fr', value: 98.1 },
  { time: 'Sa', value: 97.4 },
  { time: 'So', value: 97.7 },
];

const ekgData24h = [
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
];

const ekgData7d = [
  { time: 'Mo', value: 67 },
  { time: 'Di', value: 69 },
  { time: 'Mi', value: 66 },
  { time: 'Do', value: 68 },
  { time: 'Fr', value: 70 },
  { time: 'Sa', value: 65 },
  { time: 'So', value: 67 },
];

const caloriesData24h = [
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
];

const caloriesData7d = [
  { time: 'Mo', value: 2150 },
  { time: 'Di', value: 2340 },
  { time: 'Mi', value: 2080 },
  { time: 'Do', value: 2220 },
  { time: 'Fr', value: 2410 },
  { time: 'Sa', value: 1980 },
  { time: 'So', value: 2100 },
];

const bloodSugarData24h = [
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
];

const bloodSugarData7d = [
  { time: 'Mo', value: 91 },
  { time: 'Di', value: 93 },
  { time: 'Mi', value: 89 },
  { time: 'Do', value: 92 },
  { time: 'Fr', value: 94 },
  { time: 'Sa', value: 88 },
  { time: 'So', value: 90 },
];

interface ChartCardProps {
  icon: typeof Heart;
  title: string;
  data: any[];
  dataKeys: string[];
  colors: string[];
  unit?: string;
  onClick?: () => void;
}

function ChartCard({ icon: Icon, title, data, dataKeys, colors, unit, onClick }: ChartCardProps) {
  return (
    <div 
      className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} strokeWidth={2} className="text-[#2F80ED]" />
        <h2 className="text-[12px] font-medium text-[#1F2937]">
          {title}
        </h2>
      </div>
      
      <div className="w-full h-[140px]">
        <ResponsiveContainer width="100%" height={140} minWidth={0}>
          <LineChart data={data}>
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
              unit={unit}
            />
            {dataKeys.map((key, index) => (
              <Line 
                key={key}
                type="monotone" 
                dataKey={key} 
                stroke={colors[index]} 
                strokeWidth={1.5}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface VerlaufProps {
  onVitalClick: (type: 'heart' | 'blood-pressure' | 'oxygen' | 'temperature' | 'ekg' | 'calories' | 'blood-sugar') => void;
}

export function Verlauf({ onVitalClick }: VerlaufProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d'>('24h');
  const [showAnalysis, setShowAnalysis] = useState(false);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="px-4 pt-2 pb-4 space-y-3">
        {/* Segmented Control */}
        <div className="flex gap-1.5 p-1 bg-[#F7F8FA] rounded-lg">
          <button
            onClick={() => setTimeRange('24h')}
            className={`flex-1 px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
              timeRange === '24h'
                ? 'bg-white text-[#2F80ED] shadow-sm'
                : 'text-[#6B7280]'
            }`}
          >
            Letzte 24 Stunden
          </button>
          <button
            onClick={() => setTimeRange('7d')}
            className={`flex-1 px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
              timeRange === '7d'
                ? 'bg-white text-[#2F80ED] shadow-sm'
                : 'text-[#6B7280]'
            }`}
          >
            Letzte 7 Tage
          </button>
        </div>

        {/* Health Analysis Button */}
        <div 
          className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow border border-[#2F80ED]"
          onClick={() => setShowAnalysis(true)}
        >
          <div className="flex items-center justify-center gap-2">
            <TrendingUp size={16} strokeWidth={2} className="text-[#2F80ED]" />
            <span className="text-[12px] font-medium text-[#2F80ED]">
              Umfassende Gesundheitsanalyse anzeigen
            </span>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-3">
          <ChartCard
            icon={Heart}
            title="Herzfrequenz"
            data={timeRange === '24h' ? hrData24h : hrData7d}
            dataKeys={['value']}
            colors={['#2F80ED']}
            unit=" BPM"
            onClick={() => onVitalClick('heart')}
          />
          
          <ChartCard
            icon={Activity}
            title="Blutdruck"
            data={timeRange === '24h' ? bpData24h : bpData7d}
            dataKeys={['systolic', 'diastolic']}
            colors={['#2F80ED', '#27AE60']}
            onClick={() => onVitalClick('blood-pressure')}
          />

          <ChartCard
            icon={Droplets}
            title="Sauerstoffsättigung (SpO2)"
            data={timeRange === '24h' ? spo2Data24h : spo2Data7d}
            dataKeys={['value']}
            colors={['#2F80ED']}
            unit=" %"
            onClick={() => onVitalClick('oxygen')}
          />
          
          <ChartCard
            icon={Thermometer}
            title="Körpertemperatur"
            data={timeRange === '24h' ? tempData24h : tempData7d}
            dataKeys={['value']}
            colors={['#EB5757']}
            unit=" °C"
            onClick={() => onVitalClick('temperature')}
          />

          <ChartCard
            icon={Zap}
            title="EKG"
            data={timeRange === '24h' ? ekgData24h : ekgData7d}
            dataKeys={['value']}
            colors={['#27AE60']}
            unit=" BPM"
            onClick={() => onVitalClick('ekg')}
          />

          <ChartCard
            icon={Flame}
            title="Kalorienverbrauch"
            data={timeRange === '24h' ? caloriesData24h : caloriesData7d}
            dataKeys={['value']}
            colors={['#F2994A']}
            unit={timeRange === '24h' ? ' kcal/h' : ' kcal'}
            onClick={() => onVitalClick('calories')}
          />

          <ChartCard
            icon={Droplet}
            title="Blutzuckergehalt"
            data={timeRange === '24h' ? bloodSugarData24h : bloodSugarData7d}
            dataKeys={['value']}
            colors={['#FF6347']}
            unit=" mg/dL"
            onClick={() => onVitalClick('blood-sugar')}
          />
        </div>
      </div>

      {/* Health Analysis Modal */}
      <HealthAnalysisModal 
        isOpen={showAnalysis} 
        onClose={() => setShowAnalysis(false)}
        source="verlauf"
      />
    </div>
  );
}