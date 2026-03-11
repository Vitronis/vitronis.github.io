import { X, Wifi, Signal, Bluetooth, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ConnectivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'wifi' | '5g' | 'bluetooth';
}

export function ConnectivityModal({ isOpen, onClose, type }: ConnectivityModalProps) {
  const [selectedWifi, setSelectedWifi] = useState<string | null>('Home-Network');
  const [bluetoothConnected, setBluetoothConnected] = useState(true);

  if (!isOpen) return null;

  const wifiNetworks = [
    { name: 'Home-Network', strength: 'Stark', secured: true },
    { name: 'Office-WiFi', strength: 'Mittel', secured: true },
    { name: 'Guest-Network', strength: 'Schwach', secured: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            {type === 'wifi' && 'WLAN'}
            {type === '5g' && '5G Mobilfunk'}
            {type === 'bluetooth' && 'Bluetooth'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {type === 'wifi' && (
            <>
              <p className="text-[11px] text-[#6B7280]">
                Verfügbare Netzwerke
              </p>
              {wifiNetworks.map((network) => (
                <div
                  key={network.name}
                  onClick={() => setSelectedWifi(network.name)}
                  className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedWifi === network.name
                      ? 'border-[#2F80ED] bg-[#2F80ED]/5'
                      : 'border-[#E5E7EB] hover:bg-[#F7F8FA]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Wifi size={18} strokeWidth={2} className="text-[#2F80ED]" />
                    <div>
                      <p className="text-[12px] text-[#1F2937] font-medium">
                        {network.name}
                      </p>
                      <p className="text-[10px] text-[#6B7280]">
                        {network.strength} • {network.secured ? 'Gesichert' : 'Offen'}
                      </p>
                    </div>
                  </div>
                  {selectedWifi === network.name && (
                    <CheckCircle size={16} strokeWidth={2} className="text-[#27AE60]" />
                  )}
                </div>
              ))}
            </>
          )}

          {type === '5g' && (
            <div className="space-y-3">
              <div className="bg-[#27AE60]/10 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Signal size={16} strokeWidth={2} className="text-[#27AE60]" />
                  <span className="text-[12px] font-medium text-[#27AE60]">
                    Verbunden
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#6B7280]">Anbieter:</span>
                    <span className="text-[#1F2937]">Deutsche Telekom</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#6B7280]">Netzwerk:</span>
                    <span className="text-[#1F2937]">5G</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#6B7280]">Signalstärke:</span>
                    <span className="text-[#1F2937]">Ausgezeichnet</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[#6B7280]">Datenübertragung:</span>
                    <span className="text-[#1F2937]">Aktiv</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#F7F8FA] rounded-lg p-3">
                <p className="text-[10px] text-[#6B7280]">
                  Das Implantat verwendet eine integrierte 5G-eSIM für die Datenübertragung an Ihr Smartphone und medizinische Einrichtungen.
                </p>
              </div>
            </div>
          )}

          {type === 'bluetooth' && (
            <div className="space-y-3">
              <div className={`rounded-lg p-3 ${bluetoothConnected ? 'bg-[#27AE60]/10' : 'bg-[#F7F8FA]'}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Bluetooth size={16} strokeWidth={2} className={bluetoothConnected ? 'text-[#27AE60]' : 'text-[#6B7280]'} />
                    <span className="text-[12px] font-medium text-[#1F2937]">
                      Vitronis VIT-IMX-789456
                    </span>
                  </div>
                  {bluetoothConnected && (
                    <CheckCircle size={16} strokeWidth={2} className="text-[#27AE60]" />
                  )}
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  {bluetoothConnected ? 'Verbunden' : 'Getrennt'}
                </p>
              </div>

              <button
                onClick={() => setBluetoothConnected(!bluetoothConnected)}
                className={`w-full py-2 px-3 rounded-lg transition-colors text-[12px] font-medium ${
                  bluetoothConnected
                    ? 'bg-[#EB5757] text-white hover:bg-[#DC2626]'
                    : 'bg-[#2F80ED] text-white hover:bg-[#2563EB]'
                }`}
              >
                {bluetoothConnected ? 'Verbindung trennen' : 'Verbinden'}
              </button>

              <div className="bg-[#F7F8FA] rounded-lg p-3">
                <p className="text-[10px] text-[#6B7280]">
                  Die Bluetooth-Verbindung ermöglicht die Synchronisierung Ihrer Vitalparameter in Echtzeit mit diesem Gerät.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
