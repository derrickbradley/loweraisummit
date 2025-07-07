import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { create, analyzePageForms } from '@nlxai/touchpoint-ui';

interface VoicePlusContextType {
  isInitialized: boolean;
  isListening: boolean;
  conversationId: string;
  updatePageContext: () => void;
}

const VoicePlusContext = createContext<VoicePlusContextType | undefined>(undefined);

interface VoicePlusProviderProps {
  children: React.ReactNode;
}

export const VoicePlusProvider: React.FC<VoicePlusProviderProps> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const [userId] = useState(() => crypto.randomUUID());
  const [touchpoint, setTouchpoint] = useState<any>(null);
  const [formElements, setFormElements] = useState<any>(null);
  
  // Use refs to maintain stable references across re-renders
  const touchpointRef = useRef<any>(null);
  const formElementsRef = useRef<any>(null);
  const isInitializedRef = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Stable callback for updating page context
  const updatePageContext = useCallback(() => {
    const currentTouchpoint = touchpointRef.current;
    if (!currentTouchpoint) return;

    try {
      // Analyze page forms and extract context
      const formContext = analyzePageForms();
      setFormElements(formContext.formElements);
      formElementsRef.current = formContext.formElements;
      
      const destinations = ['home', 'speakers', 'schedule', 'tickets', 'blog', 'contact'];
      const contextData = {
        url: window.location.href, // Use full URL instead of just origin
        path: location.pathname,
        fields: formContext.context,
        destinations: destinations,
        timestamp: Date.now() // Add timestamp for debugging
      };
      
      console.log('Sending page context:', JSON.stringify(contextData, null, 2));
      
      currentTouchpoint.conversationHandler.sendContext({
        "nlx:vpContext": contextData
      });
    } catch (error) {
      console.error('Failed to update page context:', error);
    }
  }, [location.pathname]);

  // Stable callback for handling voice commands
  const handleVoicePlusCommand = useCallback((command: any) => {
    try {
      console.log('Received voice command:', command);
      const { classification, action, data } = command;

      switch (classification) {
        case 'navigation':
          handleNavigationCommand(action, command);
          break;
        case 'input':
          handleInputCommand(action, command);
          break;
        case 'custom':
          handleCustomCommand(action, data);
          break;
        default:
          console.log('Unknown command classification:', classification);
      }
    } catch (error) {
      console.error('Error handling voice command:', error);
    }
  }, [navigate]);

  const handleNavigationCommand = useCallback((action: string, command: any) => {
    console.log('Navigation action:', action);
    console.log('Destination:', command?.destination);
    
    if (!command.destination) {
      command.destination = command.page || command.url;
    }

    // Clean up destination
    if (command?.destination) {
      command.destination = command.destination.replace(/page$/, '').toLowerCase();
    }

    switch (action) {
      case 'page_next':
        window.history.forward();
        break;
      case 'page_previous':
        window.history.back();
        break;
      case 'page_custom':
        if (command?.destination) {
          const path = command.destination === 'home' ? '/' : `/${command.destination}`;
          navigate(path);
        }
        break;
      default:
        console.log('Unknown navigation action:', action);
    }
  }, [navigate]);

  const handleInputCommand = useCallback((action: string, command: any) => {
    console.log('Input command:', command);
    console.log('Current form elements:', formElementsRef.current);
    
    const currentFormElements = formElementsRef.current;
    if (!currentFormElements || !command.fields) {
      console.error('Form elements or fields not available');
      return;
    }
    
    command.fields.forEach((field: any) => {
      if (currentFormElements[field.id]) {
        console.log(`Setting value for field ${field.id}:`, field.value);
        const element = currentFormElements[field.id];
        
        // Set value and trigger events
        element.value = field.value;
        
        // Trigger input and change events to ensure React state updates
        const inputEvent = new Event('input', { bubbles: true });
        const changeEvent = new Event('change', { bubbles: true });
        element.dispatchEvent(inputEvent);
        element.dispatchEvent(changeEvent);
      } else {
        console.warn(`Form element with id ${field.id} not found`);
      }
    });
  }, []);

  const handleCustomCommand = useCallback((action: string, data: any) => {
    console.log('Custom command:', action, data);
  }, []);

  // Initialize Voice Plus touchpoint
  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializedRef.current || touchpointRef.current) {
      console.log('Touchpoint already initialized, skipping');
      return;
    }
    
    // Check if touchpoint already exists in DOM
    const existingTouchpoints = document.querySelectorAll('nlx-touchpoint');
    if (existingTouchpoints.length > 0) {
      console.log('Touchpoint already exists in DOM, skipping initialization');
      return;
    }

    const initializeVoicePlus = async () => {
      try {
        console.log('Initializing Voice Plus touchpoint...');
        
        const touchpointInstance = await create({
          config: {
            applicationUrl: "https://bots.dev.studio.nlx.ai/c/uo0vwoORZF5n90TpnQnVN/2_dLZ5YPn8HxGadU_Ik04",
            headers: {
              "nlx-api-key": "aoPSM58eSfKXDkdjqYjcwbj9"
            },
            bidirectional: true,
            languageCode: "en-US",
            userId,
            conversationId
          },
          input: "voiceMini",
        });

        // Store in both state and ref
        setTouchpoint(touchpointInstance);
        touchpointRef.current = touchpointInstance;
        setIsInitialized(true);
        isInitializedRef.current = true;

        console.log('Voice Plus touchpoint initialized successfully');

        // Handle voice plus commands with stable callback
        touchpointInstance.conversationHandler.addEventListener("voicePlusCommand", handleVoicePlusCommand);

        // Send initial page context after a short delay
        setTimeout(() => {
          updatePageContext();
        }, 500);

      } catch (error) {
        console.error('Failed to initialize Voice Plus:', error);
      }
    };

    initializeVoicePlus();
    
    // Cleanup function
    return () => {
      const currentTouchpoint = touchpointRef.current;
      if (currentTouchpoint) {
        try {
          currentTouchpoint.conversationHandler?.removeEventListener?.('voicePlusCommand', handleVoicePlusCommand);
        } catch (error) {
          console.error('Error during touchpoint cleanup:', error);
        }
      }
    };
  }, [conversationId, userId, handleVoicePlusCommand, updatePageContext]);

  // Update page context when location changes
  useEffect(() => {
    if (isInitializedRef.current && touchpointRef.current) {
      console.log('Location changed, updating page context...');
      // Add a delay to ensure the new page's DOM is fully rendered
      const timer = setTimeout(() => {
        updatePageContext();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, updatePageContext]);

  // Keep formElementsRef in sync with formElements state
  useEffect(() => {
    formElementsRef.current = formElements;
  }, [formElements]);

  return (
    <VoicePlusContext.Provider value={{
      isInitialized,
      isListening,
      conversationId,
      updatePageContext
    }}>
      {children}
    </VoicePlusContext.Provider>
  );
};

export const useVoicePlus = () => {
  const context = useContext(VoicePlusContext);
  if (!context) {
    throw new Error('useVoicePlus must be used within a VoicePlusProvider');
  }
  return context;
};