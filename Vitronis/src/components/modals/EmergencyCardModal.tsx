import { X, User, Droplet, Calendar, AlertCircle, Phone } from 'lucide-react';

interface EmergencyCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyCardModal({ isOpen, onClose }: EmergencyCardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full">
        {/* Header */}
        <div className="bg-[#EB5757] rounded-t-2xl p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-white">
            Notfallinformationen
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-white" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Emergency Card */}
          <div className="bg-gradient-to-br from-[#EB5757] to-[#DC2626] rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={20} strokeWidth={2} className="text-white" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold">Max Mustermann</h3>
                  <p className="text-[10px] opacity-90">Patient-ID: VM-2024-0042</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <Calendar size={14} strokeWidth={2} />
                <span>Geb.: 15.03.1985 (40 Jahre)</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplet size={14} strokeWidth={2} />
                <span>Blutgruppe: A+</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle size={14} strokeWidth={2} />
                <span>Allergien: Penicillin</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/30">
              <p className="text-[10px] font-medium mb-2">Vorerkrankungen:</p>
              <div className="space-y-1 text-[10px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <span>Diabetes Typ 2</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <span>Hypertonie</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/30">
              <p className="text-[10px] font-medium mb-1">Medikamente:</p>
              <p className="text-[10px]">Metformin 500mg, Ramipril 5mg</p>
            </div>
          </div>

          {/* Implant Info */}
          <div className="bg-[#F7F8FA] rounded-lg p-3">
            <p className="text-[10px] font-medium text-[#1F2937] mb-1">
              Medizinisches Implantat
            </p>
            <p className="text-[9px] text-[#6B7280]">
              Vitronis VIT-IMX-789456-2024
            </p>
            <p className="text-[9px] text-[#6B7280] mt-1">
              Kontinuierliche Vitalparameter-Überwachung
            </p>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white border-2 border-[#EB5757] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={14} strokeWidth={2} className="text-[#EB5757]" />
              <h4 className="text-[11px] font-medium text-[#1F2937]">
                Notfallkontakt
              </h4>
            </div>
            <p className="text-[11px] text-[#1F2937]">Dr. Michael Köhler</p>
            <p className="text-[10px] text-[#6B7280]">Kardiologe</p>
            <button className="mt-2 w-full bg-[#EB5757] text-white py-1.5 px-3 rounded-lg hover:bg-[#DC2626] transition-colors text-[11px] font-medium">
              Sofort anrufen
            </button>
          </div>

          {/* Warning */}
          <div className="bg-[#EB5757]/10 rounded-lg p-3">
            <p className="text-[9px] text-[#EB5757] text-center">
              <span className="font-semibold">NOTRUF: 112</span>
              <br />
              Bei lebensbedrohlichen Situationen sofort den Rettungsdienst kontaktieren
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
