import { Heart, Activity, Droplet, Thermometer, Cpu, AlertTriangle, TrendingUp } from 'lucide-react';
import { VitalCard } from '../VitalCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { HealthAnalysisModal } from '../modals/HealthAnalysisModal';
import { ImplantStatusModal } from '../modals/ImplantStatusModal';
import { EmergencyCardModal } from '../modals/EmergencyCardModal';
import logo from 'figma:asset/72f16a6553ec59aff9838ab7c23480f1b3bfd019.png';

const chartData = [
  { time: '00:00', hr: 68, bp: 115 },
  { time: '04:00', hr: 65, bp: 112 },
  { time: '08:00', hr: 72, bp: 120 },
  { time: '12:00', hr: 75, bp: 122 },
  { time: '16:00', hr: 70, bp: 118 },
  { time: '20:00', hr: 72, bp: 120 },
  { time: '24:00', hr: 68, bp: 115 },
];

interface DashboardProps {
  onVitalClick: (type: 'heart' | 'blood-pressure' | 'oxygen' | 'temperature') => void;
}

export function Dashboard({ onVitalClick }: DashboardProps) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showImplantStatus, setShowImplantStatus] = useState(false);
  const [showEmergencyCard, setShowEmergencyCard] = useState(false);

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="px-4 pt-2 pb-4 space-y-3">
        {/* Logo */}
        <div className="flex justify-center py-4">
          <img 
            src={logo} 
            alt="Vitronis" 
            className="h-20 object-contain"
            style={{ 
              mixBlendMode: 'multiply',
              backgroundColor: 'transparent'
            }}
          />
        </div>

        {/* Vitals Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => onVitalClick('heart')}>
            <VitalCard
              icon={Heart}
              title="Herzfrequenz"
              value="72 BPM"
              status="Normal"
              statusType="normal"
            />
          </div>
          <div onClick={() => onVitalClick('blood-pressure')}>
            <VitalCard
              icon={Activity}
              title="Blutdruck"
              value="120 / 80 mmHg"
              status="Normal"
              statusType="normal"
            />
          </div>
          <div onClick={() => onVitalClick('oxygen')}>
            <VitalCard
              icon={Droplet}
              title="Sauerstoffsättigung"
              value="98 %"
              status="Normal"
              statusType="normal"
            />
          </div>
          <div onClick={() => onVitalClick('temperature')}>
            <VitalCard
              icon={Thermometer}
              title="Körpertemperatur"
              value="36,8 °C"
              status="Normal"
              statusType="normal"
            />
          </div>
        </div>

        {/* Health Analysis */}
        <div 
          className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setShowAnalysis(true)}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} strokeWidth={2} className="text-[#2F80ED]" />
            <h2 className="text-[12px] font-medium text-[#1F2937]">
              Gesundheitsanalyse
            </h2>
          </div>
          
          <div className="space-y-2">
            <div className="bg-[#27AE60]/5 rounded-lg p-2">
              <p className="text-[10px] text-[#1F2937]">
                <span className="font-medium text-[#27AE60]">Sehr gut:</span> Alle Vitalwerte liegen im optimalen Bereich.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#27AE60] mt-1.5" />
                <p className="text-[10px] text-[#6B7280]">
                  Herzfrequenz und Blutdruck zeigen stabiles Muster
                </p>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#27AE60] mt-1.5" />
                <p className="text-[10px] text-[#6B7280]">
                  Sauerstoffsättigung konstant über 95%
                </p>
              </div>
              <div className="flex items-start gap-1.5">
                <div className="w-1 h-1 rounded-full bg-[#27AE60] mt-1.5" />
                <p className="text-[10px] text-[#6B7280]">
                  Körpertemperatur im Normalbereich
                </p>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
              <p className="text-[9px] text-[#6B7280]">
                <span className="font-medium text-[#1F2937]">Hinweis:</span> Bei anhaltenden Abweichungen oder Symptomen kontaktieren Sie bitte Ihren Arzt.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <div 
            className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowImplantStatus(true)}
          >
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-[#2F80ED]/10 rounded-lg">
                <Cpu size={16} strokeWidth={2} className="text-[#2F80ED]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[12px] font-medium text-[#1F2937] mb-0.5">
                  Implantatstatus
                </h3>
                <p className="text-[10px] text-[#6B7280]">
                  Alle Systeme funktionieren normal
                </p>
              </div>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowEmergencyCard(true)}
          >
            <div className="flex items-start gap-2">
              <div className="p-1.5 bg-[#EB5757]/10 rounded-lg">
                <AlertTriangle size={16} strokeWidth={2} className="text-[#EB5757]" />
              </div>
              <div className="flex-1">
                <h3 className="text-[12px] font-medium text-[#1F2937] mb-0.5">
                  Notfallinformationen
                </h3>
                <p className="text-[10px] text-[#6B7280]">
                  Schneller Zugriff auf wichtige Daten
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <HealthAnalysisModal 
        isOpen={showAnalysis} 
        onClose={() => setShowAnalysis(false)}
        source="dashboard"
      />
      <ImplantStatusModal 
        isOpen={showImplantStatus} 
        onClose={() => setShowImplantStatus(false)}
      />
      <EmergencyCardModal 
        isOpen={showEmergencyCard} 
        onClose={() => setShowEmergencyCard(false)}
      />
    </div>
  );
}