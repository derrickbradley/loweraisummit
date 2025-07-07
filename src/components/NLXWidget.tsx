import React, { useEffect } from 'react';

// Global flag to ensure widget is only initialized once per browser session
let globalWidgetInitialized = false;
let globalTouchpointInstance: any = null;

export const NLXWidget: React.FC = () => {
  useEffect(() => {
    const initializeNLX = async () => {
      try {
        // Check if user has explicitly disabled the widget
        const isWidgetDisabled = localStorage.getItem('nlx-widget-disabled') === 'true';
        if (isWidgetDisabled) {
          console.log('NLX Widget disabled by user preference');
          return;
        }

        // If we already have a global instance and it's still in the DOM, don't reinitialize
        if (globalTouchpointInstance && document.querySelector('[data-nlx-touchpoint]')) {
          console.log('NLX Widget already exists and is active, skipping initialization');
          return;
        }

        // If widget exists in DOM but we lost the instance reference, don't create another
        const existingWidget = document.querySelector('[data-nlx-touchpoint]');
        if (existingWidget && !globalTouchpointInstance) {
          console.log('NLX Widget DOM element exists, preserving existing widget');
          globalWidgetInitialized = true;
          return;
        }

        // Only initialize if we haven't done so globally
        if (globalWidgetInitialized && globalTouchpointInstance) {
          return;
        }

        console.log('Initializing NLX Widget...');
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

        // Store the touchpoint instance globally
        globalTouchpointInstance = touchpoint;
        globalWidgetInitialized = true;

        // Store widget state as enabled
        localStorage.setItem('nlx-widget-enabled', 'true');

        console.log('NLX Widget initialized successfully');

        // Enhanced event handling for voice navigation
        if (touchpoint && typeof touchpoint.on === 'function') {
          // Listen for navigation events
          touchpoint.on('navigate', (event: any) => {
            console.log('NLX Widget triggered navigation:', event);
            // Ensure widget persists during navigation
            setTimeout(() => {
              const widgetElement = document.querySelector('[data-nlx-touchpoint]');
              if (widgetElement) {
                // Make sure the widget stays visible and functional
                widgetElement.setAttribute('data-persistent', 'true');
              }
            }, 100);
          });

          // Listen for any response that might trigger navigation
          touchpoint.on('response', (response: any) => {
            console.log('NLX Widget response:', response);
            // If the response contains navigation intent, preserve widget state
            if (response && (response.text?.includes('page') || response.text?.includes('navigate'))) {
              console.log('Navigation response detected, preserving widget state');
              localStorage.setItem('nlx-widget-preserve', 'true');
            }
          });
        }

        // Monitor for DOM changes that might affect the widget
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
              const widgetExists = document.querySelector('[data-nlx-touchpoint]');
              if (!widgetExists && globalTouchpointInstance) {
                console.log('Widget removed from DOM, attempting to restore...');
                // Widget was removed, try to restore it
                setTimeout(() => {
                  if (!document.querySelector('[data-nlx-touchpoint]')) {
                    console.log('Widget still missing, reinitializing...');
                    globalWidgetInitialized = false;
                    globalTouchpointInstance = null;
                    initializeNLX();
                  }
                }, 500);
              }
            }
          });
        });

        // Observe the entire document for changes
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

      } catch (error) {
        console.error('Failed to initialize NLX Widget:', error);
        globalWidgetInitialized = false;
        globalTouchpointInstance = null;
      }
    };

    // Check if we need to preserve widget state from previous navigation
    const shouldPreserve = localStorage.getItem('nlx-widget-preserve') === 'true';
    if (shouldPreserve) {
      localStorage.removeItem('nlx-widget-preserve');
      console.log('Preserving widget state after navigation');
    }

    initializeNLX();

    // Enhanced global methods for widget control
    if (!(window as any).disableNLXWidget) {
      (window as any).disableNLXWidget = () => {
        localStorage.setItem('nlx-widget-disabled', 'true');
        localStorage.removeItem('nlx-widget-enabled');
        localStorage.removeItem('nlx-widget-preserve');
        
        // Remove widget from DOM
        const widgetElements = document.querySelectorAll('[data-nlx-touchpoint]');
        widgetElements.forEach(element => element.remove());
        
        globalWidgetInitialized = false;
        globalTouchpointInstance = null;
        console.log('NLX Widget disabled by user');
      };

      (window as any).enableNLXWidget = () => {
        localStorage.removeItem('nlx-widget-disabled');
        localStorage.setItem('nlx-widget-enabled', 'true');
        globalWidgetInitialized = false;
        globalTouchpointInstance = null;
        
        // Reinitialize widget
        initializeNLX();
      };

      // Add method to check widget status
      (window as any).getNLXWidgetStatus = () => {
        return {
          initialized: globalWidgetInitialized,
          hasInstance: !!globalTouchpointInstance,
          inDOM: !!document.querySelector('[data-nlx-touchpoint]'),
          enabled: localStorage.getItem('nlx-widget-enabled') === 'true',
          disabled: localStorage.getItem('nlx-widget-disabled') === 'true'
        };
      };
    }

    // No cleanup function - let the widget persist across component unmounts
  }, []); // Empty dependency array ensures this only runs once

  return null;
};