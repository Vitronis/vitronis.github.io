import { X, CreditCard, IdCard, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { useState } from 'react';
import { ChipConnectionModal } from './ChipConnectionModal';

interface Card {
  id: string;
  type: string;
  number: string;
  holder: string;
  synced: boolean;
}

interface IDDocument {
  id: string;
  type: string;
  number: string;
  name: string;
  synced: boolean;
}

interface NFCModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NFCModal({ isOpen, onClose }: NFCModalProps) {
  const [activeTab, setActiveTab] = useState<'wallet' | 'ids'>('wallet');
  const [showChipConnection, setShowChipConnection] = useState(false);
  const [connectionTarget, setConnectionTarget] = useState<'wallet' | 'ids'>('wallet');
  const [walletLinked, setWalletLinked] = useState(false);
  
  const [cards, setCards] = useState<Card[]>([
    { id: '1', type: 'Visa', number: '**** 1234', holder: 'Max Mustermann', synced: false },
  ]);

  const [ids, setIds] = useState<IDDocument[]>([
    { id: '1', type: 'Personalausweis', number: 'T1234567', name: 'Max Mustermann', synced: false },
  ]);

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isAddingID, setIsAddingID] = useState(false);
  const [cardForm, setCardForm] = useState({ type: 'Visa', number: '', holder: '' });
  const [idForm, setIdForm] = useState({ type: 'Personalausweis', number: '', name: '' });

  if (!isOpen) return null;

  const handleAddCard = () => {
    if (cardForm.number && cardForm.holder) {
      const newCard: Card = {
        id: Date.now().toString(),
        ...cardForm,
        synced: false
      };
      setCards([...cards, newCard]);
      setIsAddingCard(false);
      setCardForm({ type: 'Visa', number: '', holder: '' });
    }
  };

  const handleAddID = () => {
    if (idForm.number && idForm.name) {
      const newID: IDDocument = {
        id: Date.now().toString(),
        ...idForm,
        synced: false
      };
      setIds([...ids, newID]);
      setIsAddingID(false);
      setIdForm({ type: 'Personalausweis', number: '', name: '' });
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
  };

  const handleDeleteID = (id: string) => {
    setIds(ids.filter(i => i.id !== id));
  };

  const handleStartSync = (type: 'wallet' | 'ids') => {
    setConnectionTarget(type);
    setShowChipConnection(true);
  };

  const handleSyncComplete = () => {
    if (connectionTarget === 'wallet') {
      setCards(cards.map(c => ({ ...c, synced: true })));
    } else {
      setIds(ids.map(i => ({ ...i, synced: true })));
    }
    setShowChipConnection(false);
  };

  const hasUnsyncedCards = cards.some(c => !c.synced);
  const hasUnsyncedIDs = ids.some(i => !i.synced);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[14px] font-semibold text-[#1F2937]">
                NFC Verwaltung
              </h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
              >
                <X size={20} strokeWidth={2} className="text-[#6B7280]" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 p-1 bg-[#F7F8FA] rounded-lg">
              <button
                onClick={() => setActiveTab('wallet')}
                className={`flex-1 px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
                  activeTab === 'wallet'
                    ? 'bg-white text-[#2F80ED] shadow-sm'
                    : 'text-[#6B7280]'
                }`}
              >
                Wallet
              </button>
              <button
                onClick={() => setActiveTab('ids')}
                className={`flex-1 px-3 py-1.5 text-[11px] font-medium rounded-md transition-colors ${
                  activeTab === 'ids'
                    ? 'bg-white text-[#2F80ED] shadow-sm'
                    : 'text-[#6B7280]'
                }`}
              >
                Ausweise
              </button>
            </div>
          </div>

          <div className="p-4">
            {activeTab === 'wallet' ? (
              <div className="space-y-3">
                {/* Wallet App Link */}
                <div className="bg-[#F7F8FA] rounded-xl p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-white rounded-lg">
                        <CreditCard size={18} strokeWidth={2} className="text-[#2F80ED]" />
                      </div>
                      <div>
                        <p className="text-[12px] font-medium text-[#1F2937]">Apple Wallet</p>
                        <p className="text-[10px] text-[#6B7280]">
                          {walletLinked ? 'Verknüpft' : 'Nicht verknüpft'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setWalletLinked(!walletLinked)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                        walletLinked
                          ? 'bg-[#27AE60] text-white'
                          : 'bg-[#2F80ED] text-white hover:bg-[#2563EB]'
                      }`}
                    >
                      {walletLinked ? (
                        <span className="flex items-center gap-1">
                          <Check size={14} strokeWidth={2} />
                          Verknüpft
                        </span>
                      ) : (
                        'Verknüpfen'
                      )}
                    </button>
                  </div>
                </div>

                {/* Cards List */}
                <div className="space-y-2">
                  {cards.map((card) => (
                    <div key={card.id} className="bg-white border border-[#E5E7EB] rounded-xl p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[12px] font-medium text-[#1F2937]">{card.type}</p>
                            {card.synced && (
                              <div className="flex items-center gap-1 bg-[#27AE60]/10 px-1.5 py-0.5 rounded">
                                <Check size={10} strokeWidth={2} className="text-[#27AE60]" />
                                <span className="text-[8px] text-[#27AE60]">Sync</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6B7280]">{card.number}</p>
                          <p className="text-[10px] text-[#6B7280]">{card.holder}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteCard(card.id)}
                          className="p-1.5 hover:bg-[#F7F8FA] rounded-lg transition-colors"
                        >
                          <Trash2 size={14} strokeWidth={2} className="text-[#EB5757]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Card */}
                {isAddingCard ? (
                  <div className="bg-[#F7F8FA] rounded-xl p-3 space-y-2">
                    <select
                      value={cardForm.type}
                      onChange={(e) => setCardForm({ ...cardForm, type: e.target.value })}
                      className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5 bg-white"
                    >
                      <option>Visa</option>
                      <option>Mastercard</option>
                      <option>American Express</option>
                    </select>
                    <input
                      type="text"
                      value={cardForm.number}
                      onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                      placeholder="Kartennummer (letzte 4 Ziffern)"
                      className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5"
                    />
                    <input
                      type="text"
                      value={cardForm.holder}
                      onChange={(e) => setCardForm({ ...cardForm, holder: e.target.value })}
                      placeholder="Karteninhaber"
                      className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddCard}
                        className="flex-1 bg-[#2F80ED] text-white py-1.5 px-3 rounded-lg text-[11px] font-medium"
                      >
                        Hinzufügen
                      </button>
                      <button
                        onClick={() => setIsAddingCard(false)}
                        className="flex-1 bg-white border border-[#E5E7EB] text-[#6B7280] py-1.5 px-3 rounded-lg text-[11px] font-medium"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingCard(true)}
                    className="w-full flex items-center justify-center gap-2 bg-white border-2 border-dashed border-[#2F80ED] text-[#2F80ED] py-3 px-3 rounded-xl hover:bg-[#2F80ED]/5 transition-colors"
                  >
                    <Plus size={18} strokeWidth={2} />
                    <span className="text-[12px] font-medium">Neue Karte hinzufügen</span>
                  </button>
                )}

                {/* Sync Button */}
                {hasUnsyncedCards && cards.length > 0 && (
                  <button
                    onClick={() => handleStartSync('wallet')}
                    className="w-full bg-gradient-to-r from-[#2F80ED] to-[#1E5BBD] text-white py-3 px-4 rounded-xl font-medium text-[12px] hover:shadow-lg transition-all"
                  >
                    Start - Mit Chip synchronisieren
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {/* IDs List */}
                <div className="space-y-2">
                  {ids.map((id) => (
                    <div key={id.id} className="bg-white border border-[#E5E7EB] rounded-xl p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-[12px] font-medium text-[#1F2937]">{id.type}</p>
                            {id.synced && (
                              <div className="flex items-center gap-1 bg-[#27AE60]/10 px-1.5 py-0.5 rounded">
                                <Check size={10} strokeWidth={2} className="text-[#27AE60]" />
                                <span className="text-[8px] text-[#27AE60]">Sync</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6B7280]">Nr: {id.number}</p>
                          <p className="text-[10px] text-[#6B7280]">{id.name}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteID(id.id)}
                          className="p-1.5 hover:bg-[#F7F8FA] rounded-lg transition-colors"
                        >
                          <Trash2 size={14} strokeWidth={2} className="text-[#EB5757]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add ID */}
                {isAddingID ? (
                  <div className="bg-[#F7F8FA] rounded-xl p-3 space-y-2">
                    <select
                      value={idForm.type}
                      onChange={(e) => setIdForm({ ...idForm, type: e.target.value })}
                      className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5 bg-white"
                    >
                      <option>Personalausweis</option>
                      <option>Reisepass</option>
                      <option>Führerschein</option>
                      <option>Krankenversicherungskarte</option>
                    </select>
                    <input
                      type="text"
                      value={idForm.number}
                      onChange={(e) => setIdForm({ ...idForm, number: e.target.value })}
                      placeholder="Ausweisnummer"
                      className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5"
                    />
                    <input
                      type="text"
                      value={idForm.name}
                      onChange={(e) => setIdForm({ ...idForm, name: e.target.value })}
                      placeholder="Name"
                      className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddID}
                        className="flex-1 bg-[#2F80ED] text-white py-1.5 px-3 rounded-lg text-[11px] font-medium"
                      >
                        Hinzufügen
                      </button>
                      <button
                        onClick={() => setIsAddingID(false)}
                        className="flex-1 bg-white border border-[#E5E7EB] text-[#6B7280] py-1.5 px-3 rounded-lg text-[11px] font-medium"
                      >
                        Abbrechen
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingID(true)}
                    className="w-full flex items-center justify-center gap-2 bg-white border-2 border-dashed border-[#2F80ED] text-[#2F80ED] py-3 px-3 rounded-xl hover:bg-[#2F80ED]/5 transition-colors"
                  >
                    <Plus size={18} strokeWidth={2} />
                    <span className="text-[12px] font-medium">Neuen Ausweis hinzufügen</span>
                  </button>
                )}

                {/* Sync Button */}
                {hasUnsyncedIDs && ids.length > 0 && (
                  <button
                    onClick={() => handleStartSync('ids')}
                    className="w-full bg-gradient-to-r from-[#2F80ED] to-[#1E5BBD] text-white py-3 px-4 rounded-xl font-medium text-[12px] hover:shadow-lg transition-all"
                  >
                    Start - Mit Chip synchronisieren
                  </button>
                )}
              </div>
            )}

            {/* Info */}
            <div className="mt-4 bg-[#2F80ED]/5 rounded-lg p-3">
              <p className="text-[9px] text-[#1F2937]">
                <span className="font-medium">Sicherheitshinweis:</span> Ihre Daten werden verschlüsselt auf dem NFC-Chip gespeichert. Halten Sie Ihr Handy an den Chip, um die Synchronisierung zu starten.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chip Connection Modal */}
      <ChipConnectionModal
        isOpen={showChipConnection}
        onClose={() => setShowChipConnection(false)}
        onComplete={handleSyncComplete}
        type={connectionTarget}
      />
    </>
  );
}
