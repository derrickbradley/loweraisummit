import React, { createContext, useContext, ReactNode, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
}

export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Memoize navigationMethods to prevent unnecessary re-creations
  const navigationMethods = useMemo(() => ({
    navigate: (path: string, options?: { replace?: boolean }) => {
      navigate(path, options);
    },
    currentPath: location.pathname,
    goToHome: () => navigate('/'),
    goToSpeakers: () => navigate('/speakers'),
    goToSchedule: () => navigate('/schedule'),
    goToTickets: () => navigate('/tickets'),
    goToBlog: () => navigate('/blog'),
    goToContact: () => navigate('/contact'),
    goToSession: (sessionId: string) => navigate(`/session/${sessionId}`),
  }), [navigate, location.pathname]); // Dependencies for useMemo

  // Expose navigation functions globally for voice commands
  // This useEffect ensures the global functions are always up-to-date
  useEffect(() => {
    // Assign individual methods to window.nlxNavigation
    if (!window.nlxNavigation) {
      window.nlxNavigation = {} as NavigationContextType; // Initialize if not present
    }
    
    // Assign each method individually
    window.nlxNavigation.navigate = navigationMethods.navigate;
    window.nlxNavigation.currentPath = navigationMethods.currentPath;
    window.nlxNavigation.goToHome = navigationMethods.goToHome;
    window.nlxNavigation.goToSpeakers = navigationMethods.goToSpeakers;
    window.nlxNavigation.goToSchedule = navigationMethods.goToSchedule;
    window.nlxNavigation.goToTickets = navigationMethods.goToTickets;
    window.nlxNavigation.goToBlog = navigationMethods.goToBlog;
    window.nlxNavigation.goToContact = navigationMethods.goToContact;
    window.nlxNavigation.goToSession = navigationMethods.goToSession;

    // Also expose top-level functions for convenience if NLX expects them directly
    window.navigateToPage = navigationMethods.navigate;
    window.goToHome = navigationMethods.goToHome;
    window.goToSpeakers = navigationMethods.goToSpeakers;
    window.goToSchedule = navigationMethods.goToSchedule;
    window.goToTickets = navigationMethods.goToTickets;
    window.goToBlog = navigationMethods.goToBlog;
    window.goToContact = navigationMethods.goToContact;
    window.goToSession = navigationMethods.goToSession;

    // Cleanup: remove global functions when component unmounts (though unlikely for a top-level provider)
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
  }, [navigationMethods]); // Dependency on the memoized object

  return (
    <NavigationContext.Provider value={navigationMethods}>
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
