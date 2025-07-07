import React, { useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

export const NLXWidget: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Make navigation available globally for NLX voice commands
    window.nlxNavigation = navigation;
    
    const initializeNLX = async () => {
      const { create } = await import("@nlxai/touchpoint-ui");

      // Create a navigation adapter that NLX expects
      const navigationAdapter = {
        navigate: (destination: string) => {
          console.log('NLX navigation request:', destination);
          
          // Handle different navigation patterns
          switch (destination?.toLowerCase()) {
            case 'home':
              navigation.goToHome();
              break;
            case 'speakers':
              navigation.goToSpeakers();
              break;
            case 'schedule':
              navigation.goToSchedule();
              break;
            case 'tickets':
              navigation.goToTickets();
              break;
            case 'blog':
              navigation.goToBlog();
              break;
            case 'contact':
              navigation.goToContact();
              break;
            default:
              // Try to navigate to the path directly
              if (destination?.startsWith('/')) {
                navigation.navigate(destination);
              } else if (destination) {
                // Assume it's a page name and add slash
                navigation.navigate(`/${destination}`);
              }
          }
        },
        
        // Additional methods that NLX might expect
        goBack: () => {
          window.history.back();
        },
        
        goForward: () => {
          window.history.forward();
        },
        
        getCurrentPath: () => {
          return navigation.currentPath;
        }
      };

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
        theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#AECAFF"},
        bidirectional: {
          automaticContext: false,
          navigation: navigationAdapter,
        },
      });
    };

    initializeNLX();
    
    // Cleanup
    return () => {
      delete window.nlxNavigation;
    };
  }, [navigation]);

  return null;
};