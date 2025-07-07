import React, { useEffect, useRef } from 'react';

export const NLXWidget: React.FC = () => {
  const widgetInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (widgetInitialized.current) return;

    const initializeNLX = async () => {
      try {
        // Check if user has explicitly disabled the widget
        const isWidgetDisabled = localStorage.getItem('nlx-widget-disabled') === 'true';
        if (isWidgetDisabled) {
          console.log('NLX Widget disabled by user preference');
          return;
        }

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
          bidirectional: {}
        });

        // Mark as initialized
        widgetInitialized.current = true;

        // Store widget state as enabled
        localStorage.setItem('nlx-widget-enabled', 'true');

        console.log('NLX Widget initialized successfully');
      } catch (error) {
        console.error('Failed to initialize NLX Widget:', error);
      }
    };

    initializeNLX();

    // Cleanup function
    return () => {
      // Don't destroy the widget on unmount to maintain persistence
      // Only clean up if the component is being permanently removed
    };
  }, []);

  // Add global method to allow users to disable the widget
  useEffect(() => {
    // Expose method to disable widget globally
    (window as any).disableNLXWidget = () => {
      localStorage.setItem('nlx-widget-disabled', 'true');
      localStorage.removeItem('nlx-widget-enabled');
      
      // Remove widget from DOM if it exists
      const widgetElements = document.querySelectorAll('[data-nlx-touchpoint]');
      widgetElements.forEach(element => element.remove());
      
      console.log('NLX Widget disabled by user');
    };

    // Expose method to re-enable widget
    (window as any).enableNLXWidget = () => {
      localStorage.removeItem('nlx-widget-disabled');
      localStorage.setItem('nlx-widget-enabled', 'true');
      
      // Reload page to reinitialize widget
      window.location.reload();
    };

    // Cleanup global methods on unmount
    return () => {
      delete (window as any).disableNLXWidget;
      delete (window as any).enableNLXWidget;
    };
  }, []);

  return null;
};