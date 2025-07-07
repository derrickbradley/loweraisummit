import React, { useEffect } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

export const NLXWidget: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Make navigation available globally for NLX voice commands
    window.nlxNavigation = navigation;
    
    const initializeNLX = async () => {
      const { create } = await import("@nlxai/touchpoint-ui");

      const touchpoint = await create({
        config: {
          applicationUrl: "wss://us-east-1-ws.apps.nlx.ai?apiKey=FFPPQdPzOYFx8Gad1675NUMC&deploymentKey=vwihrwikqEqKAWjVh9YCI&channelKey=_mguSWCwBPq11dTtbMiDs",
          headers: {
            "nlx-api-key": "FFPPQdPzOYFx8Gad1675NUMC"
          },
          languageCode: "en-US",
          userId: "13e961de-47dc-4f0a-b02a-eb49955c92d5"
        },
        colorMode: "dark",
        input: "voiceMini",
        theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#AECAFF"},
        bidirectional: {}
        bidirectional: {
          automaticContext: false,
          navigation: navigation,
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