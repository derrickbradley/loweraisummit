import React, { createContext, useContext, ReactNode, useEffect } from 'react';
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

  const navigationMethods = {
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
  };

  // Expose navigation functions globally for voice commands
  useEffect(() => {
    window.nlxNavigation = navigationMethods;
    
    // Also expose individual functions for backwards compatibility
    window.navigateToPage = navigationMethods.navigate;
    window.goToHome = navigationMethods.goToHome;
    window.goToSpeakers = navigationMethods.goToSpeakers;
    window.goToSchedule = navigationMethods.goToSchedule;
    window.goToTickets = navigationMethods.goToTickets;
    window.goToBlog = navigationMethods.goToBlog;
    window.goToContact = navigationMethods.goToContact;
    window.goToSession = navigationMethods.goToSession;

    // Cleanup function
    return () => {
      delete window.nlxNavigation;
      delete window.navigateToPage;
      delete window.goToHome;
      delete window.goToSpeakers;
      delete window.goToSchedule;
      delete window.goToTickets;
      delete window.goToBlog;
      delete window.goToContact;
      delete window.goToSession;
    };
  }, [navigationMethods]);

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