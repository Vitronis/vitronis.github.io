import { X, Plus, Trash2, Edit2, Save } from 'lucide-react';
import { useState } from 'react';

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

interface EmergencyContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
  onUpdateContacts: (contacts: EmergencyContact[]) => void;
}

export function EmergencyContactModal({ isOpen, onClose, contacts, onUpdateContacts }: EmergencyContactModalProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', relation: '', phone: '' });

  if (!isOpen) return null;

  const handleStartEdit = (contact: EmergencyContact) => {
    setEditingId(contact.id);
    setEditForm({ name: contact.name, relation: contact.relation, phone: contact.phone });
  };

  const handleSaveEdit = (id: string) => {
    const updatedContacts = contacts.map(c =>
      c.id === id ? { ...c, ...editForm } : c
    );
    onUpdateContacts(updatedContacts);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    onUpdateContacts(contacts.filter(c => c.id !== id));
  };

  const handleAdd = () => {
    if (editForm.name && editForm.relation && editForm.phone) {
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        ...editForm
      };
      onUpdateContacts([...contacts, newContact]);
      setIsAdding(false);
      setEditForm({ name: '', relation: '', phone: '' });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-[390px] w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E5E7EB] p-4 flex items-center justify-between">
          <h2 className="text-[14px] font-semibold text-[#1F2937]">
            Notfallkontakte verwalten
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <X size={20} strokeWidth={2} className="text-[#6B7280]" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {/* Existing Contacts */}
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-[#F7F8FA] rounded-xl p-3">
              {editingId === contact.id ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Name"
                    className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5"
                  />
                  <input
                    type="text"
                    value={editForm.relation}
                    onChange={(e) => setEditForm({ ...editForm, relation: e.target.value })}
                    placeholder="Beziehung"
                    className="w-full text-[11px] border border-[#E5E7EB] rounded px-2 py-1.5"
                  />
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="Telefonnummer"
                    className="w-full text-[11px] border border-[#E5E7EB] rounded px-2 py-1.5"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(contact.id)}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-[#2F80ED] text-white py-1.5 px-3 rounded-lg text-[11px] font-medium"
                    >
                      <Save size={14} strokeWidth={2} />
                      Speichern
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-white border border-[#E5E7EB] text-[#6B7280] py-1.5 px-3 rounded-lg text-[11px] font-medium"
                    >
                      Abbrechen
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-[12px] font-medium text-[#1F2937]">{contact.name}</p>
                      <p className="text-[10px] text-[#6B7280]">{contact.relation}</p>
                      <p className="text-[11px] text-[#1F2937] mt-1">{contact.phone}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleStartEdit(contact)}
                        className="p-1.5 hover:bg-white rounded-lg transition-colors"
                      >
                        <Edit2 size={14} strokeWidth={2} className="text-[#2F80ED]" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-1.5 hover:bg-white rounded-lg transition-colors"
                      >
                        <Trash2 size={14} strokeWidth={2} className="text-[#EB5757]" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Add New Contact */}
          {isAdding ? (
            <div className="bg-[#F7F8FA] rounded-xl p-3 space-y-2">
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Name"
                className="w-full text-[12px] border border-[#E5E7EB] rounded px-2 py-1.5"
              />
              <input
                type="text"
                value={editForm.relation}
                onChange={(e) => setEditForm({ ...editForm, relation: e.target.value })}
                placeholder="Beziehung (z.B. Ehefrau, Arzt)"
                className="w-full text-[11px] border border-[#E5E7EB] rounded px-2 py-1.5"
              />
              <input
                type="tel"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="Telefonnummer"
                className="w-full text-[11px] border border-[#E5E7EB] rounded px-2 py-1.5"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#2F80ED] text-white py-1.5 px-3 rounded-lg text-[11px] font-medium"
                >
                  <Plus size={14} strokeWidth={2} />
                  Hinzufügen
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditForm({ name: '', relation: '', phone: '' });
                  }}
                  className="flex-1 bg-white border border-[#E5E7EB] text-[#6B7280] py-1.5 px-3 rounded-lg text-[11px] font-medium"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-dashed border-[#2F80ED] text-[#2F80ED] py-3 px-3 rounded-xl hover:bg-[#2F80ED]/5 transition-colors"
            >
              <Plus size={18} strokeWidth={2} />
              <span className="text-[12px] font-medium">Neuen Kontakt hinzufügen</span>
            </button>
          )}

          {/* Info */}
          <div className="bg-[#2F80ED]/5 rounded-lg p-3">
            <p className="text-[9px] text-[#1F2937]">
              <span className="font-medium">Hinweis:</span> Diese Kontakte werden im Notfall automatisch benachrichtigt und haben Zugriff auf Ihre medizinischen Daten.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
