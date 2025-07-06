import React, { useEffect, useRef } from 'react';
import NLXManager from '../utils/nlxManager';

export const NLXWidget: React.FC = () => {
  const initializationRef = useRef(false);
  const managerRef = useRef<NLXManager | null>(null);

  useEffect(() => {
    // Get the singleton instance
    const nlxManager = NLXManager.getInstance();
    managerRef.current = nlxManager;

    // Check if widget is already initialized and exists in DOM
    if (nlxManager.isReady() && nlxManager.widgetExistsInDOM()) {
      console.log('NLX Widget already ready and in DOM, skipping initialization');
      return;
    }

    // Prevent multiple initializations from the same component
    if (initializationRef.current) {
      return;
    }

    initializationRef.current = true;

    // Initialize the widget
    nlxManager.initialize().catch(error => {
      console.error('NLX Widget initialization failed:', error);
      initializationRef.current = false; // Reset on failure
    });

    // Cleanup function - only runs when component unmounts
    return () => {
      // Don't destroy the widget on route changes
      // Only reset the initialization flag for this component instance
      initializationRef.current = false;
    };
  }, []); // Empty dependency array ensures this runs only once per component mount

  // Additional effect to handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const nlxManager = NLXManager.getInstance();
        // Check if widget still exists in DOM, if not, reinitialize
        if (nlxManager.isReady() && !nlxManager.widgetExistsInDOM()) {
          console.log('Widget missing from DOM, reinitializing...');
          nlxManager.initialize();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
};