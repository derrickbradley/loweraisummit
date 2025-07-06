import React, { useEffect, useRef } from 'react';
import NLXManager from '../utils/nlxManager';

export const NLXWidget: React.FC = () => {
  const initializationRef = useRef(false);

  useEffect(() => {
    // Ensure we only initialize once per session
    if (initializationRef.current) {
      return;
    }

    initializationRef.current = true;
    const nlxManager = NLXManager.getInstance();

    // Initialize the widget if not already done
    if (!nlxManager.isReady()) {
      nlxManager.initialize().catch(error => {
        console.error('NLX Widget initialization failed:', error);
      });
    }

    // Cleanup function - only destroy on app unmount, not on route changes
    return () => {
      // Don't destroy on route changes, only on actual app unmount
      // The widget should persist across all pages
    };
  }, []); // Empty dependency array ensures this runs only once

  return null;
};