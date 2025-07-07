import React, { createContext, useContext, ReactNode, useEffect } from 'react';

interface NavigationContextType {
  navigate: (path: string, options?: { replace?: boolean }) => void;
  currentPath: string;
  goToHome: () => void;
  goToSpeakers: () => void;
  goToSchedule: () => void;
  goToTickets: () => void;
  goToBlog: () => void;
  goToContact: () => void;
  goToSession: (sessionId: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
  value: NavigationContextType;
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children, value }) => {
  // Expose navigation functions globally for voice commands
  useEffect(() => {
    // Simple global navigation function
    window.navigate = value.navigate;
    window.goToHome = value.goToHome;
    window.goToSpeakers = value.goToSpeakers;
    window.goToSchedule = value.goToSchedule;
    window.goToTickets = value.goToTickets;
    window.goToBlog = value.goToBlog;
    window.goToContact = value.goToContact;
    window.goToSession = value.goToSession;

    // Cleanup
    return () => {
      delete window.navigate;
      delete window.goToHome;
      delete window.goToSpeakers;
      delete window.goToSchedule;
      delete window.goToTickets;
      delete window.goToBlog;
      delete window.goToContact;
      delete window.goToSession;
    };
  }, [value]);

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

// Global navigation functions for voice commands
declare global {
  interface Window {
    navigate: (path: string) => void;
    goToHome: () => void;
    goToSpeakers: () => void;
    goToSchedule: () => void;
    goToTickets: () => void;
    goToBlog: () => void;
    goToContact: () => void;
    goToSession: (sessionId: string) => void;
  }
}