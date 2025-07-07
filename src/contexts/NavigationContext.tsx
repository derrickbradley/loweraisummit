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
      console.log('Navigating to:', path);
      navigate(path, options);
    },
    currentPath: location.pathname,
    goToHome: () => {
      console.log('Navigating to home');
      navigate('/');
    },
    goToSpeakers: () => {
      console.log('Navigating to speakers');
      navigate('/speakers');
    },
    goToSchedule: () => {
      console.log('Navigating to schedule');
      navigate('/schedule');
    },
    goToTickets: () => {
      console.log('Navigating to tickets');
      navigate('/tickets');
    },
    goToBlog: () => {
      console.log('Navigating to blog');
      navigate('/blog');
    },
    goToContact: () => {
      console.log('Navigating to contact');
      navigate('/contact');
    },
    goToSession: (sessionId: string) => {
      console.log('Navigating to session:', sessionId);
      navigate(`/session/${sessionId}`);
    },
  }), [navigate, location.pathname]);

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