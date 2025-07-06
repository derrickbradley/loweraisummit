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
      console.log('Enhanced NLX Voice Plus Widget already ready and in DOM, updating context...');
      // Update page context for current route
      nlxManager.updatePageContext();
      return;
    }

    // Prevent multiple initializations from the same component
    if (initializationRef.current) {
      return;
    }

    initializationRef.current = true;

    // Initialize the Enhanced Voice Plus widget
    nlxManager.initialize().catch(error => {
      console.error('Enhanced NLX Voice Plus Widget initialization failed:', error);
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
          console.log('Enhanced Voice Plus Widget missing from DOM, reinitializing...');
          nlxManager.initialize();
        } else if (nlxManager.isReady()) {
          // Update context when page becomes visible
          nlxManager.updatePageContext();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Effect to handle dynamic form changes
  useEffect(() => {
    const nlxManager = NLXManager.getInstance();
    
    // Set up a mutation observer to detect form changes
    const observer = new MutationObserver((mutations) => {
      let shouldUpdateContext = false;
      
      mutations.forEach((mutation) => {
        // Check if forms were added or removed
        if (mutation.type === 'childList') {
          const addedNodes = Array.from(mutation.addedNodes);
          const removedNodes = Array.from(mutation.removedNodes);
          
          const hasFormChanges = [...addedNodes, ...removedNodes].some(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              return element.tagName === 'FORM' || 
                     element.querySelector('form') ||
                     element.tagName === 'INPUT' ||
                     element.tagName === 'TEXTAREA' ||
                     element.tagName === 'SELECT';
            }
            return false;
          });
          
          if (hasFormChanges) {
            shouldUpdateContext = true;
          }
        }
      });
      
      if (shouldUpdateContext && nlxManager.isReady()) {
        // Debounce context updates
        setTimeout(() => {
          nlxManager.updatePageContext();
        }, 500);
      }
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
};