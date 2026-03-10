import { User, Cpu, Calendar, Ruler, Weight, AlertCircle, Stethoscope, Edit2, Save, X, Phone, Droplet, Pill, Wifi, Signal, Bluetooth, Smartphone, Camera, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { ImplantStatusModal } from '../modals/ImplantStatusModal';
import { ConnectivityModal } from '../modals/ConnectivityModal';
import { AppsModal } from '../modals/AppsModal';

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

export function Profil() {
  const [isEditing, setIsEditing] = useState(false);
  const [showImplantStatus, setShowImplantStatus] = useState(false);
  const [showConnectivity, setShowConnectivity] = useState(false);
  const [connectivityType, setConnectivityType] = useState<'wifi' | '6g' | 'bluetooth'>('wifi');
  const [showApps, setShowApps] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  
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
    medications: 'Metformin 500mg, Ramipril 5mg'
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

  const handleImageUpload = () => {
    // Simulate image upload
    setProfileImage('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop');
  };

  const openConnectivity = (type: 'wifi' | '6g' | 'bluetooth') => {
    setConnectivityType(type);
    setShowConnectivity(true);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen pb-16">
        <div className="px-4 pt-2 pb-4 space-y-3">
          {/* Profilkopf */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                {profileImage ? (
                  <img src={profileImage} alt="Profil" className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-[#2F80ED]/10 rounded-full flex items-center justify-center">
                    <User size={24} strokeWidth={2} className="text-[#2F80ED]" />
                  </div>
                )}
                <button
                  onClick={handleImageUpload}
                  className="absolute -bottom-1 -right-1 p-1 bg-[#2F80ED] rounded-full hover:bg-[#2563EB] transition-colors"
                >
                  <Camera size={10} strokeWidth={2} className="text-white" />
                </button>
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="text-[13px] font-semibold text-[#1F2937] mb-0.5 w-full border border-[#E5E7EB] rounded px-2 py-1"
                  />
                ) : (
                  <h2 className="text-[13px] font-semibold text-[#1F2937] mb-0.5">
                    {profileData.name}
                  </h2>
                )}
                <p className="text-[10px] text-[#6B7280]">
                  Patient-ID: <span className="font-medium">{profileData.teamId}</span>
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="p-1.5 hover:bg-[#F7F8FA] rounded-lg transition-colors"
              >
                <Edit2 size={16} strokeWidth={2} className="text-[#2F80ED]" />
              </button>
            </div>
          </div>

          {/* Implantatinformationen */}
          <div 
            className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setShowImplantStatus(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu size={16} strokeWidth={2} className="text-[#2F80ED]" />
                <h2 className="text-[12px] font-medium text-[#1F2937]">
                  Implantatstatus
                </h2>
              </div>
              <ChevronRight size={16} strokeWidth={2} className="text-[#6B7280]" />
            </div>
            
            <div className="mt-2 flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#27AE60]" />
              <p className="text-[10px] text-[#27AE60]">
                Alle Systeme funktionieren normal
              </p>
            </div>
          </div>

          {/* Critical Data */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-[#EB5757]">
            <h2 className="text-[12px] font-medium text-[#EB5757] mb-3">
              Kritische Daten
            </h2>
            
            <div className="space-y-2">
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <Droplet size={12} strokeWidth={2} className="text-[#6B7280]" />
                  <p className="text-[10px] text-[#6B7280]">Blutgruppe</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.bloodType}
                    onChange={(e) => setEditData({ ...editData, bloodType: e.target.value })}
                    className="text-[12px] text-[#1F2937] w-full border border-[#E5E7EB] rounded px-2 py-0.5 mt-0.5"
                  />
                ) : (
                  <p className="text-[12px] text-[#1F2937] font-medium ml-5">{profileData.bloodType}</p>
                )}
              </div>
              
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <AlertCircle size={12} strokeWidth={2} className="text-[#6B7280]" />
                  <p className="text-[10px] text-[#6B7280]">Allergien</p>
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.allergies}
                    onChange={(e) => setEditData({ ...editData, allergies: e.target.value })}
                    className="text-[12px] text-[#1F2937] w-full border border-[#E5E7EB] rounded px-2 py-0.5 mt-0.5"
                  />
                ) : (
                  <p className="text-[12px] text-[#1F2937] ml-5">{profileData.allergies}</p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Pill size={12} strokeWidth={2} className="text-[#6B7280]" />
                  <p className="text-[10px] text-[#6B7280]">Medikamente</p>
                </div>
                {isEditing ? (
                  <textarea
                    value={editData.medications}
                    onChange={(e) => setEditData({ ...editData, medications: e.target.value })}
                    className="text-[11px] text-[#1F2937] w-full border border-[#E5E7EB] rounded px-2 py-1 mt-0.5"
                    rows={2}
                  />
                ) : (
                  <p className="text-[11px] text-[#1F2937] ml-5 mt-0.5">{profileData.medications}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <h2 className="text-[12px] font-medium text-[#1F2937] mb-3">
              Notfallkontakte
            </h2>
            
            <div className="space-y-2">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="flex items-start gap-2 pb-2 border-b border-[#E5E7EB] last:border-0">
                  <Phone size={14} strokeWidth={2} className="text-[#2F80ED] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[11px] text-[#1F2937] font-medium">{contact.name}</p>
                    <p className="text-[10px] text-[#6B7280]">{contact.relation}</p>
                    <p className="text-[10px] text-[#6B7280]">{contact.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Information */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <h2 className="text-[12px] font-medium text-[#1F2937] mb-3">
              Persönliche Informationen
            </h2>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
                <Calendar size={14} strokeWidth={2} className="text-[#6B7280]" />
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280]">Geburtsdatum</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.birthDate}
                      onChange={(e) => setEditData({ ...editData, birthDate: e.target.value })}
                      className="text-[12px] text-[#1F2937] w-full border border-[#E5E7EB] rounded px-2 py-0.5 mt-0.5"
                    />
                  ) : (
                    <p className="text-[12px] text-[#1F2937]">{profileData.birthDate}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
                <Ruler size={14} strokeWidth={2} className="text-[#6B7280]" />
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280]">Größe</p>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={editData.height}
                        onChange={(e) => setEditData({ ...editData, height: e.target.value })}
                        className="text-[12px] text-[#1F2937] w-20 border border-[#E5E7EB] rounded px-2 py-0.5 mt-0.5"
                      />
                      <span className="text-[12px] text-[#1F2937]">cm</span>
                    </div>
                  ) : (
                    <p className="text-[12px] text-[#1F2937]">{profileData.height} cm</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 pb-2 border-b border-[#E5E7EB]">
                <Weight size={14} strokeWidth={2} className="text-[#6B7280]" />
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280]">Gewicht</p>
                  {isEditing ? (
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={editData.weight}
                        onChange={(e) => setEditData({ ...editData, weight: e.target.value })}
                        className="text-[12px] text-[#1F2937] w-20 border border-[#E5E7EB] rounded px-2 py-0.5 mt-0.5"
                      />
                      <span className="text-[12px] text-[#1F2937]">kg</span>
                    </div>
                  ) : (
                    <p className="text-[12px] text-[#1F2937]">{profileData.weight} kg</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 pt-1">
                <Stethoscope size={14} strokeWidth={2} className="text-[#6B7280]" />
                <div className="flex-1">
                  <p className="text-[10px] text-[#6B7280]">Hausarzt</p>
                  {isEditing ? (
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={editData.doctor}
                        onChange={(e) => setEditData({ ...editData, doctor: e.target.value })}
                        className="text-[12px] text-[#1F2937] w-full border border-[#E5E7EB] rounded px-2 py-0.5 mt-0.5"
                      />
                      <input
                        type="text"
                        value={editData.doctorPractice}
                        onChange={(e) => setEditData({ ...editData, doctorPractice: e.target.value })}
                        className="text-[10px] text-[#6B7280] w-full border border-[#E5E7EB] rounded px-2 py-0.5"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="text-[12px] text-[#1F2937]">{profileData.doctor}</p>
                      <p className="text-[10px] text-[#6B7280] mt-0.5">
                        {profileData.doctorPractice}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Connectivity Section */}
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <h2 className="text-[12px] font-medium text-[#1F2937] mb-3">
              Verbindungen
            </h2>
            
            <div className="space-y-2">
              <div 
                onClick={() => openConnectivity('wifi')}
                className="flex items-center justify-between p-2 hover:bg-[#F7F8FA] rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Wifi size={16} strokeWidth={2} className="text-[#2F80ED]" />
                  <div>
                    <p className="text-[11px] text-[#1F2937]">WLAN</p>
                    <p className="text-[9px] text-[#6B7280]">Home-Network</p>
                  </div>
                </div>
                <ChevronRight size={16} strokeWidth={2} className="text-[#6B7280]" />
              </div>

              <div 
                onClick={() => openConnectivity('6g')}
                className="flex items-center justify-between p-2 hover:bg-[#F7F8FA] rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Signal size={16} strokeWidth={2} className="text-[#27AE60]" />
                  <div>
                    <p className="text-[11px] text-[#1F2937]">6G Mobilfunk</p>
                    <p className="text-[9px] text-[#6B7280]">Verbunden</p>
                  </div>
                </div>
                <ChevronRight size={16} strokeWidth={2} className="text-[#6B7280]" />
              </div>

              <div 
                onClick={() => openConnectivity('bluetooth')}
                className="flex items-center justify-between p-2 hover:bg-[#F7F8FA] rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Bluetooth size={16} strokeWidth={2} className="text-[#2F80ED]" />
                  <div>
                    <p className="text-[11px] text-[#1F2937]">Bluetooth</p>
                    <p className="text-[9px] text-[#6B7280]">Verbunden mit Chip</p>
                  </div>
                </div>
                <ChevronRight size={16} strokeWidth={2} className="text-[#6B7280]" />
              </div>
            </div>
          </div>

          {/* Apps Section */}
          <div 
            onClick={() => setShowApps(true)}
            className="bg-white rounded-xl p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone size={16} strokeWidth={2} className="text-[#2F80ED]" />
                <h2 className="text-[12px] font-medium text-[#1F2937]">
                  App-Verknüpfungen
                </h2>
              </div>
              <ChevronRight size={16} strokeWidth={2} className="text-[#6B7280]" />
            </div>
            <p className="text-[10px] text-[#6B7280] mt-1 ml-6">
              3 Apps verbunden
            </p>
          </div>

          {/* Save/Cancel Buttons */}
          {isEditing && (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-[#2F80ED] text-white py-2 px-3 rounded-lg hover:bg-[#2563EB] transition-colors"
              >
                <Save size={16} strokeWidth={2} />
                <span className="text-[12px] font-medium">Speichern</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-[#6B7280] text-[#6B7280] py-2 px-3 rounded-lg hover:bg-[#F7F8FA] transition-colors"
              >
                <X size={16} strokeWidth={2} />
                <span className="text-[12px] font-medium">Abbrechen</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ImplantStatusModal 
        isOpen={showImplantStatus}
        onClose={() => setShowImplantStatus(false)}
      />
      <ConnectivityModal 
        isOpen={showConnectivity}
        onClose={() => setShowConnectivity(false)}
        type={connectivityType}
      />
      <AppsModal 
        isOpen={showApps}
        onClose={() => setShowApps(false)}
      />
    </>
  );
}
