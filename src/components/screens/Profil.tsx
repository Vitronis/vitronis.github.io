import {
  User, Cpu, Calendar, Ruler, Weight, AlertCircle, Stethoscope, Edit2, Save, X,
  Phone, Droplet, Pill, Settings, ChevronRight, Nfc, Wifi, Signal, Bluetooth,
} from 'lucide-react';
import { useState, CSSProperties } from 'react';
import { ImplantStatusModal } from '../modals/ImplantStatusModal';
import { EmergencyContactModal } from '../modals/EmergencyContactModal';
import { SettingsModal } from '../modals/SettingsModal';
import { NFCModal } from '../modals/NFCModal';
import { ConnectivityModal } from '../modals/ConnectivityModal';

interface ProfileData {
  name: string;
  teamId: string;
  birthDate: string;
  height: string;
  weight: string;
  allergies: string;
  doctor: string;
  doctorPractice: string;
  bloodType: string;
  medications: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

const inputStyle: CSSProperties = {
  width: '100%',
  marginTop: 4,
  padding: '6px 10px',
  borderRadius: 10,
  border: '1px solid var(--border-strong)',
  background: 'var(--surface-2)',
  color: 'var(--text)',
  fontSize: 13,
};

export function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [showImplantStatus, setShowImplantStatus] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNFC, setShowNFC] = useState(false);
  const [showConnectivity, setShowConnectivity] = useState(false);
  const [connectivityType, setConnectivityType] = useState<'wifi' | '5g' | 'bluetooth'>('wifi');

  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Max Mustermann',
    teamId: 'VM-2024-0042',
    birthDate: '15. März 1985',
    height: '178',
    weight: '82',
    allergies: 'Penicillin',
    doctor: 'Dr. Anna Schmidt',
    doctorPractice: 'Praxis am Marktplatz, Berlin',
    bloodType: 'A+',
    medications: 'Metformin 500mg, Ramipril 5mg',
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Dr. Michael Köhler', relation: 'Kardiologe', phone: '+49 30 1234567' },
    { id: '2', name: 'Maria Mustermann', relation: 'Ehefrau', phone: '+49 170 1234567' },
  ]);

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };
  const openConnectivity = (type: 'wifi' | '5g' | 'bluetooth') => {
    setConnectivityType(type);
    setShowConnectivity(true);
  };

  return (
    <>
      <div className="v-screen">
        {/* Profile header */}
        <section className="v-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              background: 'linear-gradient(135deg, var(--brand), var(--brand-2))',
              flexShrink: 0,
            }}
          >
            <User size={26} strokeWidth={2.2} />
          </div>
          <div style={{ flex: 1 }}>
            {isEditing ? (
              <input style={inputStyle} value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
            ) : (
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{profileData.name}</p>
            )}
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              Patient-ID: <span style={{ fontWeight: 600 }}>{profileData.teamId}</span>
            </p>
          </div>
          <button className="v-icon-btn" onClick={() => setIsEditing(!isEditing)} aria-label="Bearbeiten">
            <Edit2 size={16} strokeWidth={2.2} style={{ color: 'var(--brand)' }} />
          </button>
        </section>

        {/* Implant status */}
        <NavCard icon={Cpu} accent="var(--brand)" title="Implantatstatus" onClick={() => setShowImplantStatus(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <span className="v-dot" style={{ background: 'var(--good)' }} />
            <span style={{ fontSize: 11, color: 'var(--good)', fontWeight: 600 }}>Alle Systeme funktionieren normal</span>
          </div>
        </NavCard>

        {/* Critical data */}
        <section
          className="v-card-soft"
          style={{ padding: 16, border: '1px solid color-mix(in srgb, var(--bad) 40%, transparent)' }}
        >
          <p className="v-eyebrow" style={{ color: 'var(--bad)', marginBottom: 12 }}>Kritische Daten</p>
          <Field icon={Droplet} label="Blutgruppe" editing={isEditing}
            value={profileData.bloodType} edit={editData.bloodType}
            onChange={(v) => setEditData({ ...editData, bloodType: v })} />
          <Field icon={AlertCircle} label="Allergien" editing={isEditing}
            value={profileData.allergies} edit={editData.allergies}
            onChange={(v) => setEditData({ ...editData, allergies: v })} />
          <Field icon={Pill} label="Medikamente" editing={isEditing} last
            value={profileData.medications} edit={editData.medications}
            onChange={(v) => setEditData({ ...editData, medications: v })} />
        </section>

        {/* Emergency contacts */}
        <NavCard title="Notfallkontakte" onClick={() => setShowEmergencyContacts(true)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            {emergencyContacts.slice(0, 2).map((c) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="v-chip" style={{ width: 30, height: 30, borderRadius: 10, background: 'color-mix(in srgb, var(--brand) 16%, transparent)', color: 'var(--brand)' }}>
                  <Phone size={14} strokeWidth={2.2} />
                </div>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{c.name}</p>
                  <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{c.relation}</p>
                </div>
              </div>
            ))}
          </div>
        </NavCard>

        {/* Personal info */}
        <section className="v-card-soft" style={{ padding: 16 }}>
          <p className="v-eyebrow" style={{ marginBottom: 12 }}>Persönliche Informationen</p>
          <Field icon={Calendar} label="Geburtsdatum" editing={isEditing}
            value={profileData.birthDate} edit={editData.birthDate}
            onChange={(v) => setEditData({ ...editData, birthDate: v })} />
          <Field icon={Ruler} label="Größe" editing={isEditing}
            value={`${profileData.height} cm`} edit={editData.height}
            onChange={(v) => setEditData({ ...editData, height: v })} />
          <Field icon={Weight} label="Gewicht" editing={isEditing}
            value={`${profileData.weight} kg`} edit={editData.weight}
            onChange={(v) => setEditData({ ...editData, weight: v })} />
          <Field icon={Stethoscope} label="Hausarzt" editing={isEditing} last
            value={`${profileData.doctor} · ${profileData.doctorPractice}`} edit={editData.doctor}
            onChange={(v) => setEditData({ ...editData, doctor: v })} />
        </section>

        {/* Connectivity */}
        <section className="v-card-soft" style={{ padding: 16 }}>
          <p className="v-eyebrow" style={{ marginBottom: 10 }}>Verbindungen</p>
          <ConnRow icon={Wifi} accent="var(--brand)" title="WLAN" sub="Home-Network" onClick={() => openConnectivity('wifi')} />
          <ConnRow icon={Signal} accent="var(--good)" title="5G Mobilfunk" sub="Verbunden" onClick={() => openConnectivity('5g')} />
          <ConnRow icon={Bluetooth} accent="var(--brand)" title="Bluetooth" sub="Verbunden mit Chip" last onClick={() => openConnectivity('bluetooth')} />
        </section>

        {/* Settings + NFC */}
        <NavCard icon={Settings} accent="var(--brand)" title="Einstellungen" subtitle="Verbindungen & Sprache" onClick={() => setShowSettings(true)} />
        <NavCard icon={Nfc} accent="var(--brand)" title="NFC" subtitle="Wallet & Ausweise verwalten" onClick={() => setShowNFC(true)} />

        {/* Save / cancel */}
        {isEditing && (
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handleSave}
              className="v-pressable"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, borderRadius: 14, border: 'none', cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 700, background: 'linear-gradient(135deg, var(--brand), var(--brand-2))' }}
            >
              <Save size={16} strokeWidth={2.2} /> Speichern
            </button>
            <button
              onClick={handleCancel}
              className="v-pressable"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 13, borderRadius: 14, border: '1px solid var(--border-strong)', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 13, fontWeight: 700, background: 'var(--surface)' }}
            >
              <X size={16} strokeWidth={2.2} /> Abbrechen
            </button>
          </div>
        )}
      </div>

      <ImplantStatusModal isOpen={showImplantStatus} onClose={() => setShowImplantStatus(false)} />
      <EmergencyContactModal isOpen={showEmergencyContacts} onClose={() => setShowEmergencyContacts(false)} contacts={emergencyContacts} onUpdateContacts={setEmergencyContacts} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <NFCModal isOpen={showNFC} onClose={() => setShowNFC(false)} />
      <ConnectivityModal isOpen={showConnectivity} onClose={() => setShowConnectivity(false)} type={connectivityType} />
    </>
  );
}

function NavCard({
  icon: Icon,
  accent,
  title,
  subtitle,
  onClick,
  children,
}: {
  icon?: typeof Cpu;
  accent?: string;
  title: string;
  subtitle?: string;
  onClick: () => void;
  children?: React.ReactNode;
}) {
  return (
    <button className="v-card-soft v-pressable" onClick={onClick} style={{ padding: 14, width: '100%', textAlign: 'left' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {Icon && (
          <div className="v-chip" style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}>
            <Icon size={18} strokeWidth={2.2} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{title}</p>
          {subtitle && <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{subtitle}</p>}
        </div>
        <ChevronRight size={18} className="v-faint" />
      </div>
      {children}
    </button>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  edit,
  editing,
  onChange,
  last,
}: {
  icon: typeof Droplet;
  label: string;
  value: string;
  edit: string;
  editing: boolean;
  onChange: (v: string) => void;
  last?: boolean;
}) {
  return (
    <div style={{ paddingBottom: last ? 0 : 10, marginBottom: last ? 0 : 10, borderBottom: last ? 'none' : '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon size={13} strokeWidth={2.2} style={{ color: 'var(--text-muted)' }} />
        <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{label}</p>
      </div>
      {editing ? (
        <input style={inputStyle} value={edit} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <p style={{ fontSize: 13, color: 'var(--text)', marginTop: 3, marginLeft: 19 }}>{value}</p>
      )}
    </div>
  );
}

function ConnRow({
  icon: Icon,
  accent,
  title,
  sub,
  onClick,
  last,
}: {
  icon: typeof Wifi;
  accent: string;
  title: string;
  sub: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className="v-pressable"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 0',
        borderBottom: last ? 'none' : '1px solid var(--border)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div className="v-chip" style={{ width: 30, height: 30, borderRadius: 10, background: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}>
          <Icon size={15} strokeWidth={2.2} />
        </div>
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)' }}>{title}</p>
          <p style={{ fontSize: 10, color: 'var(--text-muted)' }}>{sub}</p>
        </div>
      </div>
      <ChevronRight size={16} className="v-faint" />
    </div>
  );
}
