import { X, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';

interface AppsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface App {
  id: string;
  name: string;
  description: string;
  connected: boolean;
}

export function AppsModal({ isOpen, onClose }: AppsModalProps) {
  const [apps, setApps] = useState<App[]>([
    { id: '1', name: 'Apple Health', description: 'Synchronisierung mit Health App', connected: true },
    { id: '2', name: 'Strava', description: 'Fitness und Aktivitäts-Tracking', connected: true },
    { id: '3', name: 'Nike Run Club', description: 'Lauf-Tracking und Coaching', connected: false },
    { id: '4', name: 'MyFitnessPal', description: 'Ernährungs- und Kalorienverfolgung', connected: false },
    { id: '5', name: 'Headspace', description: 'Meditation und Achtsamkeit', connected: false },
    { id: '6', name: 'Sleep Cycle', description: 'Schlaf-Analyse und Smart Alarm', connected: true },
  ]);

  if (!isOpen) return null;

  const toggleApp = (id: string) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, connected: !app.connected } : app
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            App-Verknüpfungen
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          <p className="text-[11px] text-[#6B7280]">
            Verbinden Sie Ihr Implantat mit Ihren Lieblings-Apps für erweiterte Funktionen
          </p>

          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => toggleApp(app.id)}
              className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                app.connected
                  ? 'border-[#2F80ED] bg-[#2F80ED]/5'
                  : 'border-[#E5E7EB] hover:bg-[#F7F8FA]'
              }`}
            >
              <div className="mt-0.5">
                {app.connected ? (
                  <CheckCircle size={20} strokeWidth={2} className="text-[#2F80ED]" />
                ) : (
                  <Circle size={20} strokeWidth={2} className="text-[#6B7280]" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-[12px] font-medium text-[#1F2937]">
                  {app.name}
                </h3>
                <p className="text-[10px] text-[#6B7280] mt-0.5">
                  {app.description}
                </p>
                {app.connected && (
                  <p className="text-[9px] text-[#2F80ED] mt-1">
                    Verbunden
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="bg-[#F7F8FA] rounded-lg p-3 mt-4">
            <p className="text-[10px] text-[#6B7280]">
              <span className="font-medium text-[#1F2937]">Hinweis:</span> Die Datenfreigabe erfolgt verschlüsselt und nur mit Ihrer Zustimmung. Sie können Verknüpfungen jederzeit aufheben.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
