import { useEffect, useState } from 'react';
import NLXManager from '../utils/nlxManager';

// Custom hook to interact with the Enhanced NLX Voice Plus Widget
export const useNLXWidget = () => {
  const [isReady, setIsReady] = useState(false);
  const [touchpoint, setTouchpoint] = useState<any>(null);

  useEffect(() => {
    const nlxManager = NLXManager.getInstance();
    
    // Function to update state
    const updateState = () => {
      setIsReady(nlxManager.isReady());
      setTouchpoint(nlxManager.getTouchpoint());
    };

    // Initial state update
    updateState();

    // Set up a polling mechanism to check for widget readiness
    const checkInterval = setInterval(() => {
      if (nlxManager.isReady() && nlxManager.widgetExistsInDOM()) {
        updateState();
        clearInterval(checkInterval);
      }
    }, 100);

    // Cleanup interval after 10 seconds max
    const timeout = setTimeout(() => {
      clearInterval(checkInterval);
    }, 10000);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
    };
  }, []);

  const openWidget = () => {
    if (touchpoint && typeof touchpoint.open === 'function') {
      touchpoint.open();
    }
  };

  const closeWidget = () => {
    if (touchpoint && typeof touchpoint.close === 'function') {
      touchpoint.close();
    }
  };

  const sendMessage = (message: string) => {
    if (touchpoint && typeof touchpoint.sendMessage === 'function') {
      touchpoint.sendMessage(message);
    }
  };

  const updatePageContext = () => {
    const nlxManager = NLXManager.getInstance();
    nlxManager.updatePageContext();
  };

  const getFormElements = () => {
    const nlxManager = NLXManager.getInstance();
    return nlxManager.getFormElements();
  };

  return {
    isReady,
    touchpoint,
    openWidget,
    closeWidget,
    sendMessage,
    updatePageContext,
    getFormElements
  };
};