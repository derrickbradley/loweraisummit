// components/NLXWidget.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

export const NLXWidget: React.FC = () => {
  const navigation = useNavigation();
  const nlxInitialized = useRef(false);

  useEffect(() => {
    // Only initialize NLX once
    if (nlxInitialized.current) {
      return;
    }

    const initializeNLX = async () => {
      try {
        // Make navigation available globally BEFORE initializing NLX
        window.nlxNavigation = navigation;
        
        // Also expose individual functions for easier access
        window.navigateToPage = navigation.navigate;
        window.goToHome = navigation.goToHome;
        window.goToSpeakers = navigation.goToSpeakers;
        window.goToSchedule = navigation.goToSchedule;
        window.goToTickets = navigation.goToTickets;
        window.goToBlog = navigation.goToBlog;
        window.goToContact = navigation.goToContact;
        window.goToSession = navigation.goToSession;

        console.log('Navigation functions exposed to window:', {
          nlxNavigation: window.nlxNavigation,
          navigateToPage: window.navigateToPage,
          goToHome: window.goToHome,
          goToSpeakers: window.goToSpeakers,
          goToSchedule: window.goToSchedule,
          goToTickets: window.goToTickets,
          goToBlog: window.goToBlog,
          goToContact: window.goToContact,
          goToSession: window.goToSession
        });

        const { create } = await import("@nlxai/touchpoint-ui");

        const touchpoint = await create({
          config: {
            applicationUrl: "https://apps.nlx.ai/c/vwihrwikqEqKAWjVh9YCI/_mguSWCwBPq11dTtbMiDs",
            headers: {
              "nlx-api-key": "FFPPQdPzOYFx8Gad1675NUMC"
            },
            languageCode: "en-US",
            userId: "13e961de-47dc-4f0a-b02a-eb49955c92d5"
          },
          colorMode: "dark",
          input: "voiceMini",
          theme: {
            "fontFamily": "\"Neue Haas Grotesk\", sans-serif",
            "accent": "#AECAFF"
          },
          bidirectional: {},
        });

        nlxInitialized.current = true;
        console.log('NLX widget initialized successfully');
        
      } catch (error) {
        console.error('Failed to initialize NLX widget:', error);
      }
    };

    initializeNLX();
    
    // Cleanup - this will run when the component unmounts
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
  }, [navigation]);

  return null;
};