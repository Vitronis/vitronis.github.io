import { X, Radio, Smartphone, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ChipConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  type: 'wallet' | 'ids';
}

export function ChipConnectionModal({ isOpen, onClose, onComplete, type }: ChipConnectionModalProps) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setProgress(0);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setIsLoading(true);
      // Simulate loading progress
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep(4);
            onComplete();
          }, 500);
        }
      }, 150);
    } else if (step === 4) {
      onClose();
    }
  };

  const getTitle = () => {
    switch (step) {
      case 1:
        return 'Chip-Verbindung prüfen';
      case 2:
        return 'Handy an Chip halten';
      case 3:
        return 'Synchronisierung läuft...';
      case 4:
        return 'Erfolgreich synchronisiert!';
      default:
        return '';
    }
  };

  const getContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#2F80ED]/10 rounded-full flex items-center justify-center">
                <Radio size={32} strokeWidth={2} className="text-[#2F80ED]" />
              </div>
            </div>
            <div>
              <p className="text-[12px] text-[#1F2937] mb-2">
                Stellen Sie sicher, dass Sie mit Ihrem Implantat-Chip verbunden sind.
              </p>
              <div className="bg-[#27AE60]/10 rounded-lg p-3 mt-3">
                <div className="flex items-center gap-2 justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#27AE60] animate-pulse" />
                  <p className="text-[11px] text-[#27AE60] font-medium">
                    Chip verbunden
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#2F80ED]/5 rounded-lg p-2 mt-3">
              <p className="text-[9px] text-[#1F2937]">
                <span className="font-medium">Info:</span> {type === 'wallet' ? 'Ihre Karten' : 'Ihre Ausweise'} werden sicher auf dem Chip gespeichert.
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#2F80ED]/10 rounded-full flex items-center justify-center animate-pulse">
                <Smartphone size={32} strokeWidth={2} className="text-[#2F80ED]" />
              </div>
            </div>
            <div>
              <p className="text-[12px] text-[#1F2937] mb-2">
                Halten Sie Ihr Smartphone jetzt nah an den Implantat-Chip.
              </p>
              <p className="text-[11px] text-[#6B7280]">
                Der Chip befindet sich normalerweise am Handgelenk oder im Oberarm.
              </p>
            </div>
            <div className="bg-[#F2994A]/10 rounded-lg p-3">
              <p className="text-[10px] text-[#1F2937]">
                <span className="font-medium">⚠️ Wichtig:</span> Halten Sie das Gerät ruhig und warten Sie auf die Bestätigung.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#2F80ED]/10 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-[#2F80ED] border-t-transparent rounded-full animate-spin" />
              </div>
            </div>
            <div>
              <p className="text-[12px] text-[#1F2937] mb-4">
                Daten werden übertragen...
              </p>
              {/* Progress Bar */}
              <div className="w-full bg-[#E5E7EB] rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#2F80ED] to-[#1E5BBD] transition-all duration-300 ease-out rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-[11px] text-[#6B7280] mt-2">{progress}%</p>
            </div>
            <div className="bg-[#2F80ED]/5 rounded-lg p-2">
              <p className="text-[9px] text-[#1F2937]">
                Bitte bewegen Sie das Gerät nicht während der Übertragung.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#27AE60]/10 rounded-full flex items-center justify-center">
                <Check size={40} strokeWidth={2.5} className="text-[#27AE60]" />
              </div>
            </div>
            <div>
              <p className="text-[13px] font-medium text-[#27AE60] mb-2">
                Synchronisierung abgeschlossen!
              </p>
              <p className="text-[11px] text-[#6B7280]">
                {type === 'wallet' ? 'Ihre Karten wurden' : 'Ihre Ausweise wurden'} erfolgreich auf den Chip übertragen.
              </p>
            </div>
            <div className="bg-[#27AE60]/10 rounded-lg p-3">
              <p className="text-[10px] text-[#1F2937]">
                ✓ {type === 'wallet' ? 'Karten' : 'Ausweise'} gespeichert<br />
                ✓ Verschlüsselt gesichert<br />
                ✓ Sofort einsatzbereit
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getButtonText = () => {
    switch (step) {
      case 1:
        return 'Weiter';
      case 2:
        return 'Weiter';
      case 3:
        return null; // No button during loading
      case 4:
        return 'Fertig';
      default:
        return 'Weiter';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[360px] w-full">
        {/* Header */}
        <div className="border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            {getTitle()}
          </h2>
          {step !== 3 && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
            >
              <X size={20} strokeWidth={2} className="text-[#6B7280]" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {getContent()}
        </div>

        {/* Footer */}
        {getButtonText() && (
          <div className="border-t border-[#E5E7EB] p-4">
            <button
              onClick={handleNext}
              disabled={isLoading}
              className="w-full bg-[#2F80ED] text-white py-2.5 px-4 rounded-lg font-medium text-[12px] hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {getButtonText()}
            </button>
          </div>
        )}

        {/* Step Indicator */}
        {step < 4 && (
          <div className="px-4 pb-4">
            <div className="flex gap-1 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step
                      ? 'w-6 bg-[#2F80ED]'
                      : i < step
                      ? 'w-1.5 bg-[#27AE60]'
                      : 'w-1.5 bg-[#E5E7EB]'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
