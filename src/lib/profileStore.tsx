import { createContext, useContext, useState, ReactNode } from 'react';

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phone: string;
}

interface ProfileStore {
  contacts: EmergencyContact[];
  setContacts: (c: EmergencyContact[]) => void;
}

const Ctx = createContext<ProfileStore | null>(null);

/**
 * Emergency contacts are shared between the Profil preview card and the
 * full-page editor, which renders inside the global page host (outside the
 * Profil subtree). Lifting the state here keeps both in sync as a page edits.
 */
export function useEmergencyContacts(): ProfileStore {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useEmergencyContacts must be used within <ProfileProvider>');
  return ctx;
}

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    { id: '1', name: 'Dr. Michael Köhler', relation: 'Kardiologe', phone: '+49 30 1234567' },
    { id: '2', name: 'Maria Mustermann', relation: 'Ehefrau', phone: '+49 170 1234567' },
  ]);
  return <Ctx.Provider value={{ contacts, setContacts }}>{children}</Ctx.Provider>;
}
