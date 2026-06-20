import { X, User, QrCode, MapPin } from 'lucide-react';
import { useState } from 'react';

interface IDCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IDCardModal({ isOpen, onClose }: IDCardModalProps) {
  const [showQR, setShowQR] = useState(false);
  const [pin, setPin] = useState('');
  const correctPin = '1234'; // In production: secure handling

  if (!isOpen) return null;

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setShowQR(true);
    } else {
      alert('Falscher PIN-Code');
      setPin('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            Medizinischer Ausweis
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* ID Card */}
          <div className="bg-gradient-to-br from-[#2F80ED] to-[#1E40AF] rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] opacity-80 mb-1">Medizinischer Ausweis</p>
                <h3 className="text-[16px] font-semibold">Max Mustermann</h3>
                <p className="text-[11px] opacity-90">Patient-ID: VM-2024-0042</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <User size={24} strokeWidth={2} />
              </div>
            </div>

            <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
              <p className="text-[9px] opacity-80 mb-1">Implantat</p>
              <p className="text-[10px] font-medium">VIT-IMX-789456-2024</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
            <h4 className="text-[12px] font-medium text-[#1F2937] mb-2">
              Persönliche Informationen
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Geburtsdatum:</span>
                <span className="text-[#1F2937]">15. März 1985</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Alter:</span>
                <span className="text-[#1F2937]">40 Jahre</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Größe:</span>
                <span className="text-[#1F2937]">178 cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6B7280]">Gewicht:</span>
                <span className="text-[#1F2937]">82 kg</span>
              </div>
            </div>
          </div>

          {/* Critical Data */}
          <div className="bg-white border border-[#EB5757] rounded-lg p-3">
            <h4 className="text-[12px] font-medium text-[#EB5757] mb-2">
              Kritische Daten
            </h4>
            <div className="space-y-2">
              <div>
                <p className="text-[10px] text-[#6B7280]">Blutgruppe</p>
                <p className="text-[11px] text-[#1F2937] font-medium">A+</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6B7280]">Allergien</p>
                <p className="text-[11px] text-[#1F2937]">Penicillin</p>
              </div>
              <div>
                <p className="text-[10px] text-[#6B7280]">Vorerkrankungen</p>
                <div className="space-y-1 mt-1">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[#EB5757]" />
                    <span className="text-[11px] text-[#1F2937]">Diabetes Typ 2</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-[#EB5757]" />
                    <span className="text-[11px] text-[#1F2937]">Hypertonie</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#6B7280]">Medikamente</p>
                <p className="text-[11px] text-[#1F2937]">Metformin 500mg, Ramipril 5mg</p>
              </div>
            </div>
          </div>

          {/* Location Map Placeholder */}
          <div className="bg-[#F7F8FA] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <MapPin size={14} strokeWidth={2} className="text-[#2F80ED]" />
              <h4 className="text-[11px] font-medium text-[#1F2937]">
                Standort
              </h4>
            </div>
            <div className="bg-[#E5E7EB] rounded-lg h-32 flex items-center justify-center">
              <p className="text-[10px] text-[#6B7280]">Karte wird geladen...</p>
            </div>
            <p className="text-[9px] text-[#6B7280] mt-1">
              Berlin, Deutschland
            </p>
          </div>

          {/* QR Code Section */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <QrCode size={14} strokeWidth={2} className="text-[#2F80ED]" />
              <h4 className="text-[11px] font-medium text-[#1F2937]">
                QR-Code für Notärzte
              </h4>
            </div>

            {!showQR ? (
              <div className="space-y-2">
                <p className="text-[10px] text-[#6B7280]">
                  PIN-Code erforderlich für Zugriff
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="PIN eingeben"
                    maxLength={4}
                    className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-[11px]"
                  />
                  <button
                    onClick={handlePinSubmit}
                    className="px-4 py-2 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563EB] transition-colors text-[11px] font-medium"
                  >
                    OK
                  </button>
                </div>
                <p className="text-[9px] text-[#6B7280]">
                  Standard-PIN für Notärzte: Im Notfall verfügbar
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-white border-2 border-[#E5E7EB] rounded-lg p-4">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://www.instagram.com/vitronis_official" 
                    alt="Instagram QR Code"
                    className="w-40 h-40"
                  />
                </div>
                <p className="text-[9px] text-[#6B7280] mt-2 text-center">
                  Scannen für vollständige medizinische Daten
                </p>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-[#EB5757]/10 rounded-lg p-3">
            <p className="text-[9px] text-[#EB5757] text-center">
              <span className="font-semibold">Wichtig:</span> Diese Informationen sind ausschließlich für medizinisches Fachpersonal im Notfall bestimmt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
