import React, { useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

export const VoiceNavigationHandler: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Expose navigation functions globally for voice commands
    window.navigateToPage = navigation.navigate;
    window.goToHome = navigation.goToHome;
    window.goToSpeakers = navigation.goToSpeakers;
    window.goToSchedule = navigation.goToSchedule;
    window.goToTickets = navigation.goToTickets;
    window.goToBlog = navigation.goToBlog;
    window.goToContact = navigation.goToContact;
    window.goToSession = navigation.goToSession;

    // Cleanup function
    return () => {
      delete window.navigateToPage;
      delete window.goToHome;
      delete window.goToSpeakers;
      delete window.goToSchedule;
      delete window.goToTickets;
      delete window.goToBlog;
      delete window.goToContact;
      delete window.goToSession;
    };
  }, [navigation]);

  return null; // This component doesn't render anything
};