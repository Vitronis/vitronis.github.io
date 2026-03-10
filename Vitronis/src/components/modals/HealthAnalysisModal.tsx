import { X, TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface HealthAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: 'dashboard' | 'verlauf';
}

export function HealthAnalysisModal({ isOpen, onClose, source }: HealthAnalysisModalProps) {
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  if (!isOpen) return null;

  const lastUpdated = new Date().toLocaleString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const recommendations = [
    {
      title: 'Regelmäßige Bewegung',
      examples: [
        '30 Minuten spazieren gehen täglich',
        '3x pro Woche Ausdauertraining',
        'Treppensteigen statt Aufzug nutzen'
      ]
    },
    {
      title: 'Ausgewogene Ernährung',
      examples: [
        'Mehr Obst und Gemüse (5 Portionen täglich)',
        'Reduzierung von Salz und Zucker',
        'Ausreichend Wasser trinken (2-3 Liter/Tag)'
      ]
    },
    {
      title: 'Stressmanagement',
      examples: [
        'Meditation oder Yoga (10-15 Min. täglich)',
        'Ausreichend Schlaf (7-8 Stunden)',
        'Regelmäßige Pausen bei der Arbeit'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            Umfassende Gesundheitsanalyse
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Meta Info */}
          <div className="bg-[#F7F8FA] rounded-lg p-3">
            <div className="flex items-center justify-between text-[10px] text-[#6B7280]">
              <span>Zuletzt aktualisiert: {lastUpdated}</span>
            </div>
            <div className="mt-1 text-[10px] text-[#6B7280]">
              Bezogen auf: {source === 'dashboard' ? 'Aktuelle Werte' : 'Verlaufsdaten (24h)'}
            </div>
          </div>

          {/* Overall Status */}
          <div className="bg-[#27AE60]/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-[#27AE60]" />
              <h3 className="text-[12px] font-medium text-[#27AE60]">
                Ausgezeichneter Gesundheitszustand
              </h3>
            </div>
            <p className="text-[10px] text-[#1F2937]">
              Ihre aktuellen Vitalwerte liegen durchweg im optimalen Bereich. Das Implantat funktioniert einwandfrei und alle Systeme arbeiten stabil.
            </p>
          </div>

          {/* Detailed Analysis */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
            <h3 className="text-[12px] font-medium text-[#1F2937] mb-2">
              Detaillierte Vitalparameter-Analyse
            </h3>
            
            <div className="space-y-3">
              {/* Heart Rate */}
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#1F2937]">Herzfrequenz</span>
                  <div className="flex items-center gap-1 text-[#27AE60]">
                    <Minus size={12} strokeWidth={2} />
                    <span className="text-[10px]">Stabil</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Ø 71 BPM • Variabilität: Normal • Rhythmus: Regelmäßig
                </p>
                <div className="mt-1 bg-[#27AE60]/5 rounded px-2 py-1">
                  <p className="text-[9px] text-[#1F2937]">
                    Ihre Herzfrequenz zeigt ein gesundes Muster mit natürlicher zirkadianer Variation.
                  </p>
                </div>
              </div>

              {/* Blood Pressure */}
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#1F2937]">Blutdruck</span>
                  <div className="flex items-center gap-1 text-[#27AE60]">
                    <TrendingDown size={12} strokeWidth={2} />
                    <span className="text-[10px]">Verbessernd</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Ø 118/78 mmHg • Trend: -2% (7 Tage) • Optimal
                </p>
                <div className="mt-1 bg-[#27AE60]/5 rounded px-2 py-1">
                  <p className="text-[9px] text-[#1F2937]">
                    Ausgezeichnete Werte. Leichte Verbesserung in den letzten 7 Tagen erkennbar.
                  </p>
                </div>
              </div>

              {/* Oxygen Saturation */}
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#1F2937]">Sauerstoffsättigung</span>
                  <div className="flex items-center gap-1 text-[#27AE60]">
                    <TrendingUp size={12} strokeWidth={2} />
                    <span className="text-[10px]">Optimal</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Ø 97.8% • Min: 96% • Max: 99% • Konstant optimal
                </p>
                <div className="mt-1 bg-[#27AE60]/5 rounded px-2 py-1">
                  <p className="text-[9px] text-[#1F2937]">
                    Durchgehend über 95%. Exzellente Sauerstoffversorgung.
                  </p>
                </div>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#1F2937]">Körpertemperatur</span>
                  <div className="flex items-center gap-1 text-[#27AE60]">
                    <Minus size={12} strokeWidth={2} />
                    <span className="text-[10px]">Normal</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Ø 36.6°C • Natürliche Variation • Kein Fieber
                </p>
                <div className="mt-1 bg-[#27AE60]/5 rounded px-2 py-1">
                  <p className="text-[9px] text-[#1F2937]">
                    Normale Temperaturschwankungen über den Tag. Keine Auffälligkeiten.
                  </p>
                </div>
              </div>

              {/* EKG */}
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#1F2937]">EKG</span>
                  <div className="flex items-center gap-1 text-[#27AE60]">
                    <Minus size={12} strokeWidth={2} />
                    <span className="text-[10px]">Normal</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Ø 66 BPM • Sinusrhythmus • Keine Arrhythmien
                </p>
                <div className="mt-1 bg-[#27AE60]/5 rounded px-2 py-1">
                  <p className="text-[9px] text-[#1F2937]">
                    Regelmäßiger Herzrhythmus ohne Auffälligkeiten. QRS-Komplex normal.
                  </p>
                </div>
              </div>

              {/* Calories */}
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#1F2937]">Kalorienverbrauch</span>
                  <div className="flex items-center gap-1 text-[#27AE60]">
                    <TrendingUp size={12} strokeWidth={2} />
                    <span className="text-[10px]">Aktiv</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  2.145 kcal heute • Ø 89 kcal/h • Aktivitätslevel: Moderat
                </p>
                <div className="mt-1 bg-[#27AE60]/5 rounded px-2 py-1">
                  <p className="text-[9px] text-[#1F2937]">
                    Gesundes Aktivitätsmuster. Achten Sie auf ausgewogene Ernährung.
                  </p>
                </div>
              </div>

              {/* Blood Sugar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium text-[#1F2937]">Blutzuckergehalt</span>
                  <div className="flex items-center gap-1 text-[#27AE60]">
                    <Minus size={12} strokeWidth={2} />
                    <span className="text-[10px]">Normal</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#6B7280]">
                  Ø 91 mg/dL • Min: 87 mg/dL • Max: 96 mg/dL • Optimal
                </p>
                <div className="mt-1 bg-[#27AE60]/5 rounded px-2 py-1">
                  <p className="text-[9px] text-[#1F2937]">
                    Blutzuckerwerte im optimalen Bereich. Keine Anzeichen für Hypo- oder Hyperglykämie.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trends */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-3">
            <h3 className="text-[12px] font-medium text-[#1F2937] mb-2">
              7-Tage-Trends
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6B7280]">Herzfrequenz-Variabilität</span>
                <div className="flex items-center gap-1">
                  <TrendingUp size={12} strokeWidth={2} className="text-[#27AE60]" />
                  <span className="text-[10px] text-[#27AE60]">+5%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6B7280]">Durchschnittlicher Blutdruck</span>
                <div className="flex items-center gap-1">
                  <TrendingDown size={12} strokeWidth={2} className="text-[#27AE60]" />
                  <span className="text-[10px] text-[#27AE60]">-2%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#6B7280]">Aktivitätsniveau</span>
                <div className="flex items-center gap-1">
                  <Minus size={12} strokeWidth={2} className="text-[#6B7280]" />
                  <span className="text-[10px] text-[#6B7280]">Stabil</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="w-full p-3 flex items-center justify-between hover:bg-[#F7F8FA] transition-colors"
            >
              <h3 className="text-[12px] font-medium text-[#1F2937]">
                Personalisierte Empfehlungen
              </h3>
              <ChevronRight 
                size={16} 
                strokeWidth={2} 
                className={`text-[#6B7280] transition-transform ${showRecommendations ? 'rotate-90' : ''}`}
              />
            </button>
            
            {showRecommendations && (
              <div className="px-3 pb-3 space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className="bg-[#F7F8FA] rounded-lg p-2">
                    <h4 className="text-[11px] font-medium text-[#1F2937] mb-1.5">
                      {rec.title}
                    </h4>
                    <div className="space-y-1">
                      {rec.examples.map((example, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <div className="w-1 h-1 rounded-full bg-[#2F80ED] mt-1.5" />
                          <span className="text-[10px] text-[#6B7280]">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-[#2F80ED]/5 rounded-lg p-3">
            <p className="text-[9px] text-[#1F2937]">
              <span className="font-medium">Wichtig:</span> Diese Analyse ersetzt keine ärztliche Diagnose. Bei Beschwerden oder Fragen wenden Sie sich an Ihren Arzt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}