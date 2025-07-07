import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { create, analyzePageForms } from '@nlxai/touchpoint-ui';

interface VoicePlusContextType {
  isInitialized: boolean;
  isListening: boolean;
  conversationId: string;
  updatePageContext: () => void;
}

const VoicePlusContext = createContext<VoicePlusContextType | undefined>(undefined);

export const NLXWidget: React.FC = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [conversationId] = useState(() => crypto.randomUUID());
  const [userId] = useState(() => crypto.randomUUID());
  const [touchpoint, setTouchpoint] = useState<any>(null);
  const [formElements, setFormElements] = useState<any>(null);
  const formElementsRef = useRef<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize Voice Plus touchpoint
  useEffect(() => {
    // Prevent multiple initializations
    if (isInitialized || touchpoint) return;
    
    // Check if touchpoint already exists in DOM
    const existingTouchpoints = document.querySelectorAll('nlx-touchpoint');
    if (existingTouchpoints.length > 0) {
      console.log('Touchpoint already exists, skipping initialization');
      return;
    }

    const initializeVoicePlus = async () => {
      try {
        const touchpoint = await create({
          config: {
            applicationUrl: "https://apps.nlx.ai/c/vwihrwikqEqKAWjVh9YCI/_mguSWCwBPq11dTtbMiDs",
            headers: {
              "nlx-api-key": "FFPPQdPzOYFx8Gad1675NUMC"
            },
            bidirectional: true,
            languageCode: "en-US",
            userId,
            conversationId
          },
          input: "voiceMini",
          colorMode: "dark",
          theme: {
            "fontFamily": "\"Neue Haas Grotesk\", sans-serif",
            "accent": "#AECAFF"
          },
        });

        setTouchpoint(touchpoint);
        setIsInitialized(true);

        // Handle voice plus commands
        touchpoint.conversationHandler.addEventListener("voicePlusCommand", (command: any) => {
          console.log('Voice Plus Command:', command);
          handleVoicePlusCommand(command);
        });

        // Send initial page context
        updatePageContext();

      } catch (error) {
        console.error('Failed to initialize Voice Plus:', error);
      }
    };

    initializeVoicePlus();
    
    // Cleanup function to prevent multiple instances
    return () => {
      if (touchpoint) {
        try {
          // Remove event listeners and cleanup
          // touchpoint.conversationHandler?.removeEventListener?.('voicePlusCommand');
        } catch (error) {
          console.error('Error during touchpoint cleanup:', error);
        }
      }
    };
  }, [conversationId, userId]);

  // Keep formElementsRef in sync with formElements state
  useEffect(() => {
    formElementsRef.current = formElements;
  }, [formElements]);

  // Update page context when location changes
  useEffect(() => {
    if (isInitialized && touchpoint) {
      // Add a delay to ensure the new page's DOM is fully rendered
      const timer = setTimeout(() => {
        updatePageContext();
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [location, isInitialized, touchpoint]);

  const updatePageContext = () => {
    if (!touchpoint) return;

    try {
      // Analyze page forms and extract context
      const formContext = analyzePageForms();
      setFormElements(formContext.formElements);
      const destinations = ['home', 'speakers', 'schedule', 'tickets', 'blog', 'contact'];
      const newObject = {
        url: window.location.origin,//base url
        fields: formContext.context,
        // destinations: destinations,
      }
      console.log('Analyzed form context:');
      console.log(JSON.stringify(newObject, null, 2));
      // console.log(JSON.stringify(formContext.context, null, 2));
      touchpoint.conversationHandler.sendContext({
        "nlx:vpContext": {
          url: window.location.origin,
          fields: formContext.context,
          destinations: destinations
        }
      });
      // touchpoint.conversationHandler.sendContext(formContext.context);
    } catch (error) {
      console.error('Failed to update page context:', error);
    }
  };

  const handleVoicePlusCommand = (command: any) => {
    try {
      const { classification, action, data } = command;

      switch (classification) {
        case 'navigation':
          handleNavigationCommand(action, command);
          break;
        case 'input':
          // Pass the entire command for input classification
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
  };

  const handleNavigationCommand = (action: string, command: any) => {
    console.log('Navigation Action:', action);
    console.log('Full Command:', command);
    
    // Get destination from various possible fields
    let destination = command?.destination || command?.page || command?.url || command?.data?.destination;
    
    console.log('Raw Destination:', destination);

    // Clean up destination
    if (destination) {
      // Remove 'page' suffix from destination if it exists
      destination = destination.replace(/page$/i, '');
      // Remove leading/trailing whitespace
      destination = destination.trim();
      // Convert to lowercase for consistency
      destination = destination.toLowerCase();
    }

    console.log('Cleaned Destination:', destination);

    switch (action) {
      case 'page_next':
        // Use browser's forward navigation
        window.history.forward();
        break;
      case 'page_previous':
        // Use browser's back navigation
        window.history.back();
        break;
      case 'page_custom':
      case 'page_unknown':
        // Navigate to specific page using destination field
        if (destination) {
          let route = mapDestinationToRoute(destination);
          console.log('Mapped route:', route);
          navigate(route);
        } else {
          console.warn('No destination provided for navigation command');
        }
        break;
      default:
        console.log('Unknown navigation action:', action);
    }
  };

  // Map destination strings to actual routes
  const mapDestinationToRoute = (destination: string): string => {
    const destinationMap: { [key: string]: string } = {
      'home': '/',
      'homepage': '/',
      'main': '/',
      'index': '/',
      'speakers': '/speakers',
      'speaker': '/speakers',
      'schedule': '/schedule',
      'sessions': '/schedule',
      'session': '/schedule',
      'agenda': '/schedule',
      'tickets': '/tickets',
      'ticket': '/tickets',
      'pricing': '/tickets',
      'blog': '/blog',
      'news': '/blog',
      'articles': '/blog',
      'contact': '/contact',
      'contactus': '/contact',
      'about': '/contact',
      'info': '/contact'
    };

    // Direct mapping
    if (destinationMap[destination]) {
      return destinationMap[destination];
    }

    // Check if it's already a valid route
    if (destination.startsWith('/')) {
      return destination;
    }

    // Try to find partial matches
    for (const [key, value] of Object.entries(destinationMap)) {
      if (destination.includes(key) || key.includes(destination)) {
        return value;
      }
    }

    // Default fallback - if we can't map it, try adding a slash
    return `/${destination}`;
  };

  const handleInputCommand = (action: string, command: any) => {
    // Handle new structure with fields array at command level
    console.log('Input command:', command);
    console.log('formElementsRef.current:', formElementsRef.current);
    
    // Use the ref to get the latest formElements
    const currentFormElements = formElementsRef.current;
    if (!currentFormElements) {
      console.error('Form elements not available');
      return;
    }
    
    if (command.fields) {
      command.fields.forEach((field: any) => {
        if (currentFormElements[field.id]) {
          console.log(`Setting value for field ${field.id}:`, field.value);
          const element = currentFormElements[field.id];
          
          // Simply set the value directly
          element.value = field.value;
        } else {
          console.warn(`Form element with id ${field.id} not found`);
        }
      });
    }
  };

  const handleCustomCommand = (action: string, data: any) => {
    // Handle custom commands specific to the conference website
    console.log('Custom command:', action, data);
  };

  return null;
};

export const useVoicePlus = () => {
  const context = useContext(VoicePlusContext);
  if (!context) {
    throw new Error('useVoicePlus must be used within a VoicePlusProvider');
  }
  return context;
};