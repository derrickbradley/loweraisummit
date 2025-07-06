import { useEffect, useState } from 'react';
import NLXManager from '../utils/nlxManager';

// Custom hook to interact with the NLX Widget
export const useNLXWidget = () => {
  const [isReady, setIsReady] = useState(false);
  const [touchpoint, setTouchpoint] = useState<any>(null);

  useEffect(() => {
    const nlxManager = NLXManager.getInstance();
    
    // Check if already initialized
    if (nlxManager.isReady()) {
      setIsReady(true);
      setTouchpoint(nlxManager.getTouchpoint());
      return;
    }

    // Initialize if not ready
    nlxManager.initialize().then(() => {
      setIsReady(nlxManager.isReady());
      setTouchpoint(nlxManager.getTouchpoint());
    }).catch(error => {
      console.error('Failed to initialize NLX Widget:', error);
    });
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

  return {
    isReady,
    touchpoint,
    openWidget,
    closeWidget,
    sendMessage
  };
};