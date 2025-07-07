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
    // Assign individual methods to window.nlxNavigation
    if (!window.nlxNavigation) {
      window.nlxNavigation = {} as NavigationContextType;
    }
    
    // Assign each method individually
    window.nlxNavigation.navigate = value.navigate;
    window.nlxNavigation.currentPath = value.currentPath;
    window.nlxNavigation.goToHome = value.goToHome;
    window.nlxNavigation.goToSpeakers = value.goToSpeakers;
    window.nlxNavigation.goToSchedule = value.goToSchedule;
    window.nlxNavigation.goToTickets = value.goToTickets;
    window.nlxNavigation.goToBlog = value.goToBlog;
    window.nlxNavigation.goToContact = value.goToContact;
    window.nlxNavigation.goToSession = value.goToSession;

    // Also expose top-level functions for convenience
    window.navigateToPage = value.navigate;
    window.goToHome = value.goToHome;
    window.goToSpeakers = value.goToSpeakers;
    window.goToSchedule = value.goToSchedule;
    window.goToTickets = value.goToTickets;
    window.goToBlog = value.goToBlog;
    window.goToContact = value.goToContact;
    window.goToSession = value.goToSession;

    // Cleanup
    return () => {
      if (window.nlxNavigation) {
        delete window.nlxNavigation.navigate;
        delete window.nlxNavigation.currentPath;
        delete window.nlxNavigation.goToHome;
        delete window.nlxNavigation.goToSpeakers;
        delete window.nlxNavigation.goToSchedule;
        delete window.nlxNavigation.goToTickets;
        delete window.nlxNavigation.goToBlog;
        delete window.nlxNavigation.goToContact;
        delete window.nlxNavigation.goToSession;
      }
      delete window.navigateToPage;
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
    nlxNavigation?: NavigationContextType;
    navigateToPage: (path: string) => void;
    goToHome: () => void;
    goToSpeakers: () => void;
    goToSchedule: () => void;
    goToTickets: () => void;
    goToBlog: () => void;
    goToContact: () => void;
    goToSession: (sessionId: string) => void;
  }
}