// components/NLXWidget.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

export const NLXWidget: React.FC = () => {
  const navigation = useNavigation();
  const nlxInitialized = useRef(false); // Use a ref to track initialization

  useEffect(() => {
    // Only initialize NLX once
    if (nlxInitialized.current) {
      return;
    }

    // Make navigation available globally for NLX voice commands
    window.nlxNavigation = navigation;

    const initializeNLX = async () => {
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
        theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#AECAFF"},
        bidirectional: {
        },
      });
      nlxInitialized.current = true; // Mark as initialized
    };

    initializeNLX();
    
    // Cleanup - this will run when the component unmounts
    return () => {
      delete window.nlxNavigation;
    };
  }, [navigation]); // Dependency on 'navigation' is still needed for `window.nlxNavigation` assignment

  return null;
};