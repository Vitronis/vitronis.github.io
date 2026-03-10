import { X, Cloud, Languages, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [iCloudConnected, setICloudConnected] = useState(false);
  const [microsoftConnected, setMicrosoftConnected] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('de');
  const [showLanguages, setShowLanguages] = useState(false);

  if (!isOpen) return null;

  const languages = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const currentLanguage = languages.find(l => l.code === selectedLanguage);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            Einstellungen
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Verbindungen Section */}
          <div>
            <h3 className="text-[12px] font-medium text-[#1F2937] mb-3">
              Verbindungen
            </h3>
            
            <div className="space-y-2">
              {/* iCloud */}
              <div className="bg-[#F7F8FA] rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="p-2 bg-white rounded-lg">
                      <Cloud size={18} strokeWidth={2} className="text-[#2F80ED]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-medium text-[#1F2937]">iCloud</p>
                      <p className="text-[10px] text-[#6B7280]">
                        {iCloudConnected ? 'max@icloud.com' : 'Nicht verbunden'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setICloudConnected(!iCloudConnected)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                      iCloudConnected
                        ? 'bg-[#27AE60] text-white'
                        : 'bg-[#2F80ED] text-white hover:bg-[#2563EB]'
                    }`}
                  >
                    {iCloudConnected ? (
                      <span className="flex items-center gap-1">
                        <Check size={14} strokeWidth={2} />
                        Verbunden
                      </span>
                    ) : (
                      'Verbinden'
                    )}
                  </button>
                </div>

                {iCloudConnected && (
                  <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
                    <button
                      onClick={() => setICloudConnected(false)}
                      className="text-[10px] text-[#EB5757] hover:underline"
                    >
                      Verbindung trennen
                    </button>
                  </div>
                )}
              </div>

              {/* Microsoft */}
              <div className="bg-[#F7F8FA] rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1">
                    <div className="p-2 bg-white rounded-lg">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <rect width="11" height="11" fill="#F25022"/>
                        <rect x="13" width="11" height="11" fill="#7FBA00"/>
                        <rect y="13" width="11" height="11" fill="#00A4EF"/>
                        <rect x="13" y="13" width="11" height="11" fill="#FFB900"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-medium text-[#1F2937]">Microsoft Konto</p>
                      <p className="text-[10px] text-[#6B7280]">
                        {microsoftConnected ? 'max@outlook.com' : 'Nicht verbunden'}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setMicrosoftConnected(!microsoftConnected)}
                    className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                      microsoftConnected
                        ? 'bg-[#27AE60] text-white'
                        : 'bg-[#2F80ED] text-white hover:bg-[#2563EB]'
                    }`}
                  >
                    {microsoftConnected ? (
                      <span className="flex items-center gap-1">
                        <Check size={14} strokeWidth={2} />
                        Verbunden
                      </span>
                    ) : (
                      'Verbinden'
                    )}
                  </button>
                </div>

                {microsoftConnected && (
                  <div className="mt-2 pt-2 border-t border-[#E5E7EB]">
                    <button
                      onClick={() => setMicrosoftConnected(false)}
                      className="text-[10px] text-[#EB5757] hover:underline"
                    >
                      Verbindung trennen
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 bg-[#2F80ED]/5 rounded-lg p-2">
              <p className="text-[9px] text-[#1F2937]">
                <span className="font-medium">Info:</span> Durch die Verbindung werden Ihre Gesundheitsdaten automatisch synchronisiert und gesichert.
              </p>
            </div>
          </div>

          {/* Sprache Section */}
          <div>
            <h3 className="text-[12px] font-medium text-[#1F2937] mb-3">
              Sprache
            </h3>
            
            {showLanguages ? (
              <div className="space-y-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setShowLanguages(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${
                      selectedLanguage === lang.code
                        ? 'bg-[#2F80ED]/10 border-2 border-[#2F80ED]'
                        : 'bg-[#F7F8FA] hover:bg-[#E5E7EB]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[18px]">{lang.flag}</span>
                      <span className="text-[12px] text-[#1F2937]">{lang.name}</span>
                    </div>
                    {selectedLanguage === lang.code && (
                      <Check size={16} strokeWidth={2} className="text-[#2F80ED]" />
                    )}
                  </button>
                ))}
                <button
                  onClick={() => setShowLanguages(false)}
                  className="w-full bg-white border border-[#E5E7EB] text-[#6B7280] py-2 px-3 rounded-lg text-[11px] font-medium hover:bg-[#F7F8FA] transition-colors"
                >
                  Abbrechen
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLanguages(true)}
                className="w-full bg-[#F7F8FA] rounded-xl p-3 hover:bg-[#E5E7EB] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Languages size={18} strokeWidth={2} className="text-[#2F80ED]" />
                    <div className="text-left">
                      <p className="text-[12px] font-medium text-[#1F2937]">App-Sprache</p>
                      <p className="text-[10px] text-[#6B7280]">
                        {currentLanguage?.flag} {currentLanguage?.name}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} strokeWidth={2} className="text-[#6B7280]" />
                </div>
              </button>
            )}

            <div className="mt-3 bg-[#2F80ED]/5 rounded-lg p-2">
              <p className="text-[9px] text-[#1F2937]">
                <span className="font-medium">Hinweis:</span> Die App wird nach der Sprachwahl neu gestartet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
