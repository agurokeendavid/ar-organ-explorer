import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { OrganId } from '../../data/content';

type ActiveOrganContextValue = {
  activeOrganId: OrganId;
  setActiveOrganId: (id: OrganId) => void;
};

const ActiveOrganContext = createContext<ActiveOrganContextValue | undefined>(undefined);

export function ActiveOrganProvider({ children }: { children: ReactNode }) {
  const [activeOrganId, setActiveOrganId] = useState<OrganId>('heart');
  const value = useMemo(() => ({ activeOrganId, setActiveOrganId }), [activeOrganId]);

  return <ActiveOrganContext.Provider value={value}>{children}</ActiveOrganContext.Provider>;
}

export function useActiveOrgan(): ActiveOrganContextValue {
  const ctx = useContext(ActiveOrganContext);
  if (!ctx) {
    throw new Error('useActiveOrgan must be used within an ActiveOrganProvider');
  }
  return ctx;
}
