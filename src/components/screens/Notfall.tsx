import { Phone, CreditCard, X } from 'lucide-react';
import { useState } from 'react';
import { IDCardModal } from '../modals/IDCardModal';

export function Notfall() {
  const [showIDCard, setShowIDCard] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen pb-16">
        <div className="px-4 pt-2 pb-4 space-y-3">
          {/* PIN Info */}
          <div className="bg-[#EB5757]/10 rounded-xl p-3">
            <p className="text-[11px] text-[#EB5757] text-center font-medium">
              Notfall-Interface
            </p>
            <p className="text-[9px] text-[#EB5757] text-center mt-1">
              Dieser Bereich enthält alle wichtigen medizinischen Daten für Notfallhelfer
            </p>
          </div>

          {/* Notfallkontakt Card */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <h2 className="text-[12px] font-medium text-[#1F2937] mb-3">
              Notfallkontakt
            </h2>
            
            <div className="space-y-3">
              <div>
                <p className="text-[10px] text-[#6B7280] mb-0.5">Name</p>
                <p className="text-[13px] text-[#1F2937]">Dr. Michael Köhler</p>
              </div>
              
              <button className="w-full flex items-center justify-center gap-2 bg-[#2F80ED] text-white py-2 px-3 rounded-lg hover:bg-[#2563EB] transition-colors">
                <Phone size={16} strokeWidth={2} />
                <span className="text-[12px] font-medium">Anrufen</span>
              </button>
            </div>
          </div>

          {/* Aktion */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <button 
              onClick={() => setShowIDCard(true)}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-[#2F80ED] text-[#2F80ED] py-2 px-3 rounded-lg hover:bg-[#2F80ED]/5 transition-colors"
            >
              <CreditCard size={16} strokeWidth={2} />
              <span className="text-[12px] font-medium">Medizinischer Ausweis</span>
            </button>
          </div>

          {/* Hinweis */}
          <div className="bg-[#EB5757]/10 rounded-xl p-3">
            <p className="text-[10px] text-[#EB5757] text-center">
              Diese Informationen sind für Notfallhelfer bestimmt. Im Notfall sofort den Rettungsdienst kontaktieren: <span className="font-semibold">112</span>
            </p>
          </div>
        </div>
      </div>

      {/* ID Card Modal */}
      <IDCardModal 
        isOpen={showIDCard}
        onClose={() => setShowIDCard(false)}
      />
    </>
  );
}