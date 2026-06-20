import { Phone, CreditCard, ShieldAlert, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { IDCardModal } from '../modals/IDCardModal';

export function Notfall() {
  const [showIDCard, setShowIDCard] = useState(false);

  return (
    <>
      <div className="v-screen">
        {/* Hero */}
        <section
          className="v-card"
          style={{ padding: 18, background: 'linear-gradient(135deg, #FF6E8A, #FF4D6D)', color: '#fff', border: 'none' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              className="v-chip"
              style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', width: 44, height: 44, borderRadius: 15 }}
            >
              <ShieldAlert size={22} strokeWidth={2.2} />
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700 }}>Notfall-Interface</p>
              <p style={{ fontSize: 11, opacity: 0.9, marginTop: 2, lineHeight: 1.35 }}>
                Wichtige medizinische Daten für Ersthelfer
              </p>
            </div>
          </div>
        </section>

        {/* Emergency contact */}
        <section className="v-card-soft" style={{ padding: 16 }}>
          <p className="v-eyebrow" style={{ marginBottom: 12 }}>Notfallkontakt</p>
          <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>Name</p>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', marginTop: 2, marginBottom: 14 }}>
            Dr. Michael Köhler
          </p>
          <button
            className="v-pressable"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: 13,
              borderRadius: 14,
              border: 'none',
              cursor: 'pointer',
              color: '#fff',
              fontSize: 13,
              fontWeight: 700,
              background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
            }}
          >
            <Phone size={16} strokeWidth={2.4} />
            Anrufen
          </button>
        </section>

        {/* Medical ID */}
        <button
          className="v-card-soft v-pressable"
          onClick={() => setShowIDCard(true)}
          style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left' }}
        >
          <div className="v-chip" style={{ background: 'color-mix(in srgb, var(--brand) 16%, transparent)', color: 'var(--brand)' }}>
            <CreditCard size={18} strokeWidth={2.2} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Medizinischer Ausweis</p>
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Blutgruppe, Allergien, Medikamente</p>
          </div>
          <ChevronRight size={18} className="v-faint" />
        </button>

        {/* 112 notice */}
        <div
          style={{
            padding: 14,
            borderRadius: 16,
            background: 'color-mix(in srgb, var(--bad) 12%, transparent)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 11, color: 'var(--text)', lineHeight: 1.5 }}>
            Im Notfall sofort den Rettungsdienst kontaktieren:{' '}
            <span style={{ fontWeight: 800, color: 'var(--bad)' }}>112</span>
          </p>
        </div>
      </div>

      <IDCardModal isOpen={showIDCard} onClose={() => setShowIDCard(false)} />
    </>
  );
}
