import { X, Battery, Thermometer, Phone, ZoomIn, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ImplantStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const batteryData24h = [
  { time: '00:00', value: 94 },
  { time: '04:00', value: 94 },
  { time: '08:00', value: 94 },
  { time: '12:00', value: 94 },
  { time: '16:00', value: 94 },
  { time: '20:00', value: 94 },
  { time: '24:00', value: 94 },
];

const batteryData7d = [
  { time: 'Mo', value: 94 },
  { time: 'Di', value: 94 },
  { time: 'Mi', value: 94 },
  { time: 'Do', value: 94 },
  { time: 'Fr', value: 94 },
  { time: 'Sa', value: 94 },
  { time: 'So', value: 94 },
];

const tempData24h = [
  { time: '00:00', value: 36.2 },
  { time: '04:00', value: 36.1 },
  { time: '08:00', value: 36.3 },
  { time: '12:00', value: 36.5 },
  { time: '16:00', value: 36.4 },
  { time: '20:00', value: 36.3 },
  { time: '24:00', value: 36.2 },
];

const tempData7d = [
  { time: 'Mo', value: 36.3 },
  { time: 'Di', value: 36.2 },
  { time: 'Mi', value: 36.4 },
  { time: 'Do', value: 36.3 },
  { time: 'Fr', value: 36.2 },
  { time: 'Sa', value: 36.3 },
  { time: 'So', value: 36.2 },
];

interface ChipPart {
  id: string;
  name: string;
  status: 'ok' | 'error';
  angle: number;
  error?: string;
}

const chipParts: ChipPart[] = [
  { id: '1', name: 'Sensor-Array', status: 'ok', angle: 0 },
  { id: '2', name: 'Prozessor', status: 'ok', angle: 45 },
  { id: '3', name: 'Batterie', status: 'ok', angle: 90 },
  { id: '4', name: 'Antenne', status: 'ok', angle: 135 },
  { id: '5', name: 'Speicher', status: 'ok', angle: 180 },
  { id: '6', name: 'Power Management', status: 'ok', angle: 225 },
  { id: '7', name: 'Bio-Sensor', status: 'ok', angle: 270 },
  { id: '8', name: 'Verschlüsselung', status: 'ok', angle: 315 },
];

export function ImplantStatusModal({ isOpen, onClose }: ImplantStatusModalProps) {
  const [timeRange, setTimeRange] = useState<'24h' | '7d'>('24h');
  const [selectedPart, setSelectedPart] = useState<ChipPart | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  if (!isOpen) return null;

  const batteryPercentage = 94;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            Implantatstatus
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Battery Status */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-3">
              <Battery size={16} strokeWidth={2} className="text-[#27AE60]" />
              <h3 className="text-[12px] font-medium text-[#1F2937]">
                Batteriestatus
              </h3>
            </div>

            {/* Battery Indicator (Apple-style) */}
            <div className="mb-3">
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#6B7280]">Ladung</span>
                    <span className="text-[14px] font-semibold text-[#1F2937]">{batteryPercentage}%</span>
                  </div>
                  <div className="relative h-8 bg-[#E5E7EB] rounded-lg overflow-hidden">
                    <div 
                      className="absolute inset-y-0 left-0 bg-[#27AE60] rounded-lg transition-all"
                      style={{ width: `${batteryPercentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[11px] font-medium text-white drop-shadow">
                        {batteryPercentage}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[9px] text-[#6B7280]"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Range Toggle */}
            <div className="flex gap-1.5 p-1 bg-[#F7F8FA] rounded-lg mb-2">
              <button
                onClick={() => setTimeRange('24h')}
                className={`flex-1 px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${
                  timeRange === '24h'
                    ? 'bg-white text-[#2F80ED] shadow-sm'
                    : 'text-[#6B7280]'
                }`}
              >
                24 Stunden
              </button>
              <button
                onClick={() => setTimeRange('7d')}
                className={`flex-1 px-3 py-1 text-[10px] font-medium rounded-md transition-colors ${
                  timeRange === '7d'
                    ? 'bg-white text-[#2F80ED] shadow-sm'
                    : 'text-[#6B7280]'
                }`}
              >
                7 Tage
              </button>
            </div>

            {/* Battery Chart */}
            <div className="w-full h-[120px]">
              <ResponsiveContainer width="100%" height={120} minWidth={0}>
                <LineChart data={timeRange === '24h' ? batteryData24h : batteryData7d}>
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
                    domain={[90, 100]}
                    unit="%"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#27AE60" 
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chip Temperature */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer size={16} strokeWidth={2} className="text-[#2F80ED]" />
              <h3 className="text-[12px] font-medium text-[#1F2937]">
                Chip-Temperatur
              </h3>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6B7280]">Aktuelle Temperatur</span>
                <span className="text-[14px] font-semibold text-[#1F2937]">36.2°C</span>
              </div>
            </div>

            <div className="w-full h-[120px]">
              <ResponsiveContainer width="100%" height={120} minWidth={0}>
                <LineChart data={timeRange === '24h' ? tempData24h : tempData7d}>
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
                    domain={[35, 38]}
                    unit="°C"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2F80ED" 
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chip Visualization */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[12px] font-medium text-[#1F2937]">
                Chip-Komponenten
              </h3>
              <button
                onClick={() => setZoomLevel(zoomLevel === 1 ? 1.5 : 1)}
                className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
              >
                <ZoomIn size={14} strokeWidth={2} className="text-[#2F80ED]" />
              </button>
            </div>

            {/* Ring Chip Visualization */}
            <div className="relative flex items-center justify-center py-6">
              <svg 
                width="200" 
                height="200" 
                viewBox="0 0 200 200"
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s' }}
              >
                {/* Outer ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="20"
                />
                {/* Inner ring */}
                <circle
                  cx="100"
                  cy="100"
                  r="60"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="20"
                />
                
                {/* Chip parts as segments */}
                {chipParts.map((part, index) => {
                  const angle = (part.angle * Math.PI) / 180;
                  const x = 100 + 70 * Math.cos(angle - Math.PI / 2);
                  const y = 100 + 70 * Math.sin(angle - Math.PI / 2);
                  
                  return (
                    <g key={part.id}>
                      <circle
                        cx={x}
                        cy={y}
                        r="8"
                        fill={part.status === 'ok' ? '#27AE60' : '#EB5757'}
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setSelectedPart(part)}
                      />
                    </g>
                  );
                })}
                
                {/* Center circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="40"
                  fill="#2F80ED"
                  opacity="0.1"
                />
                <text
                  x="100"
                  y="100"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-[10px] font-medium fill-[#2F80ED]"
                >
                  VIT-IMX
                </text>
              </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {chipParts.map((part) => (
                <div
                  key={part.id}
                  onClick={() => setSelectedPart(part)}
                  className="flex items-center gap-1.5 cursor-pointer hover:bg-[#F7F8FA] rounded p-1 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full ${part.status === 'ok' ? 'bg-[#27AE60]' : 'bg-[#EB5757]'}`} />
                  <span className="text-[9px] text-[#6B7280]">{part.name}</span>
                </div>
              ))}
            </div>

            {/* Selected Part Detail */}
            {selectedPart && (
              <div className="mt-3 bg-[#F7F8FA] rounded-lg p-2">
                <div className="flex items-start gap-2">
                  <div className={`w-3 h-3 rounded-full ${selectedPart.status === 'ok' ? 'bg-[#27AE60]' : 'bg-[#EB5757]'} mt-0.5`} />
                  <div className="flex-1">
                    <h4 className="text-[11px] font-medium text-[#1F2937]">
                      {selectedPart.name}
                    </h4>
                    <p className="text-[10px] text-[#6B7280] mt-0.5">
                      {selectedPart.status === 'ok' 
                        ? 'Funktioniert einwandfrei' 
                        : selectedPart.error || 'Fehler erkannt'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Support Button */}
          <button
            onClick={() => alert('Support wird angerufen...')}
            className="w-full flex items-center justify-center gap-2 bg-[#2F80ED] text-white py-2.5 px-4 rounded-lg hover:bg-[#2563EB] transition-colors"
          >
            <Phone size={16} strokeWidth={2} />
            <span className="text-[12px] font-medium">Support anrufen</span>
          </button>

          <div className="bg-[#F7F8FA] rounded-lg p-2">
            <p className="text-[9px] text-[#6B7280] text-center">
              Support-Hotline: +49 (0) 800 123 4567 • 24/7 verfügbar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
