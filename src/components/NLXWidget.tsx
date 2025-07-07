import React, { useEffect } from 'react';

// Global flag to ensure widget is only initialized once per browser session
let globalWidgetInitialized = false;

export const NLXWidget: React.FC = () => {
  useEffect(() => {
    // Only initialize if not already done globally
    if (globalWidgetInitialized) {
      return;
    }

    const initializeNLX = async () => {
      try {
        // Check if user has explicitly disabled the widget
        const isWidgetDisabled = localStorage.getItem('nlx-widget-disabled') === 'true';
        if (isWidgetDisabled) {
          console.log('NLX Widget disabled by user preference');
          return;
        }

        // Check if widget already exists in DOM (from previous navigation)
        const existingWidget = document.querySelector('[data-nlx-touchpoint]');
        if (existingWidget) {
          console.log('NLX Widget already exists in DOM, skipping initialization');
          globalWidgetInitialized = true;
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

        // Mark as initialized globally
        globalWidgetInitialized = true;

        // Store widget state as enabled
        localStorage.setItem('nlx-widget-enabled', 'true');

        console.log('NLX Widget initialized successfully');

        // Add event listener to detect when widget processes navigation commands
        // This helps maintain widget state during voice-triggered navigation
        if (touchpoint && typeof touchpoint.on === 'function') {
          touchpoint.on('navigate', (event: any) => {
            console.log('NLX Widget triggered navigation:', event);
            // Widget should remain active during navigation
          });
        }

      } catch (error) {
        console.error('Failed to initialize NLX Widget:', error);
        globalWidgetInitialized = false; // Reset on error to allow retry
      }
    };

    initializeNLX();

    // Global methods for widget control
    if (!(window as any).disableNLXWidget) {
      (window as any).disableNLXWidget = () => {
        localStorage.setItem('nlx-widget-disabled', 'true');
        localStorage.removeItem('nlx-widget-enabled');
        
        // Remove widget from DOM
        const widgetElements = document.querySelectorAll('[data-nlx-touchpoint]');
        widgetElements.forEach(element => element.remove());
        
        globalWidgetInitialized = false;
        console.log('NLX Widget disabled by user');
      };

      (window as any).enableNLXWidget = () => {
        localStorage.removeItem('nlx-widget-disabled');
        localStorage.setItem('nlx-widget-enabled', 'true');
        globalWidgetInitialized = false; // Reset to allow reinitialization
        
        // Reload page to reinitialize widget
        window.location.reload();
      };
    }

    // No cleanup function - let the widget persist across component unmounts
  }, []); // Empty dependency array ensures this only runs once

  return null;
};