// NLX Manager - Singleton pattern with Enhanced Voice Plus support
import { analyzePageForms } from "@nlxai/touchpoint-ui";

class NLXManager {
  private static instance: NLXManager;
  private touchpoint: any = null;
  private isInitialized = false;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;
  private formElements: any = {};
  private currentRoute = '';

  private constructor() {
    // Bind to window to ensure persistence across React re-renders
    if (typeof window !== 'undefined') {
      (window as any).__nlxManager = this;
      this.currentRoute = window.location.pathname;
    }
  }

  public static getInstance(): NLXManager {
    // Check if instance exists on window first (for persistence)
    if (typeof window !== 'undefined' && (window as any).__nlxManager) {
      NLXManager.instance = (window as any).__nlxManager;
      return NLXManager.instance;
    }

    if (!NLXManager.instance) {
      NLXManager.instance = new NLXManager();
    }
    return NLXManager.instance;
  }

  public async initialize(): Promise<void> {
    // If already initialized, return immediately
    if (this.isInitialized && this.touchpoint) {
      // Check if route changed and update context
      this.checkRouteChange();
      return Promise.resolve();
    }

    // If currently initializing, return the existing promise
    if (this.isInitializing && this.initPromise) {
      return this.initPromise;
    }

    // Create new initialization promise
    this.initPromise = this._doInitialize();
    return this.initPromise;
  }

  private async _doInitialize(): Promise<void> {
    this.isInitializing = true;

    try {
      // Check if widget already exists in DOM
      const existingWidget = document.querySelector('.nlx-touchpoint-widget, .nlx-touchpoint-container');
      if (existingWidget && this.touchpoint) {
        console.log('Enhanced NLX Voice Plus Widget already exists in DOM, reusing...');
        this.isInitialized = true;
        this.sendPageContext();
        return;
      }

      console.log('Initializing Enhanced NLX Voice Plus Widget...');
      const { create } = await import("@nlxai/touchpoint-ui");

      // Create touchpoint with Enhanced Voice Plus configuration matching the template
      this.touchpoint = await create({
        config: {
          applicationUrl: "https://apps.nlx.ai/c/vwihrwikqEqKAWjVh9YCI/_mguSWCwBPq11dTtbMiDs",
          headers: {
            "nlx-api-key": "FFPPQdPzOYFx8Gad1675NUMC"
          },
          languageCode: "en-US",
          userId: "13e961de-47dc-4f0a-b02a-eb49955c92d5"
        },
        colorMode: "dark",
        input: "voiceMini", // Enable voice input with bidirectional support
        theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#AECAFF"},
        bidirectional: {
          automaticContext: false, // Disable automatic context to manually control it
          navigation: this.handleNavigation.bind(this),
          input: this.handleFormInput.bind(this),
          custom: this.handleCustomCommand.bind(this)
        }
      });

      this.isInitialized = true;
      
      // Store reference on window for persistence
      if (typeof window !== 'undefined') {
        (window as any).__nlxTouchpoint = this.touchpoint;
      }

      // Send initial page context with a delay to ensure touchpoint is fully ready
      setTimeout(() => {
        this.sendPageContext();
      }, 1000);

      // Set up route change detection
      this.setupRouteChangeDetection();

      console.log('Enhanced NLX Voice Plus Widget initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Enhanced NLX Voice Plus Widget:', error);
      this.isInitialized = false;
      throw error; // Re-throw to allow proper error handling
    } finally {
      this.isInitializing = false;
    }
  }

  private sendPageContext(): void {
    if (!this.touchpoint || !this.touchpoint.conversationHandler) {
      console.warn('Touchpoint not ready for context sending');
      return;
    }

    try {
      // Analyze forms on the current page using the same method as the template
      const { context, formElements } = analyzePageForms();
      this.formElements = formElements;

      // Define navigation destinations based on current routes (matching template pattern)
      const destinations = [
        "home", "about", "contact", "speakers", "schedule", "tickets", "blog"
      ];

      // Send context using the new sendContext method (matching template exactly)
      // Add error handling for the sendContext call
      if (this.touchpoint.conversationHandler.sendContext) {
        // Wrap sendContext in try-catch to handle fetch errors gracefully
        try {
          this.touchpoint.conversationHandler.sendContext({
            "nlx:vpContext": {
              url: window.location.origin,
              fields: context,
              destinations: destinations,
            },
          });
        } catch (contextError) {
          console.warn('Failed to send context to NLX service:', contextError);
          // Don't throw here - allow the widget to continue functioning without context
          return;
        }

        console.log('Enhanced Voice Plus page context sent to NLX:', {
          url: window.location.origin,
          path: window.location.pathname,
          fieldsCount: Object.keys(context).length,
          destinationsCount: destinations.length,
          formElementsCount: Object.keys(formElements).length
        });
      } else {
        console.warn('sendContext method not available on conversationHandler');
      }
    } catch (error) {
      console.error('Failed to send page context:', error);
      // Don't throw here, just log the error to prevent breaking the widget
    }
  }

  // Handle navigation commands (matching template implementation)
  private handleNavigation = (action: string, destination: string): void => {
    console.log('Enhanced Voice Plus navigation command:', { action, destination });

    try {
      switch (action) {
        case "page_next":
          window.history.forward();
          break;

        case "page_previous":
          window.history.back();
          break;

        case "page_custom":
          // Handle React Router navigation (matching template pattern)
          if (destination.startsWith("/")) {
            window.location.pathname = destination;
          } else {
            // Handle named destinations
            const routeMap: Record<string, string> = {
              'home': '/',
              'speakers': '/speakers',
              'schedule': '/schedule',
              'tickets': '/tickets',
              'blog': '/blog',
              'contact': '/contact',
              'about': '/about'
            };

            const route = routeMap[destination.toLowerCase()];
            if (route) {
              window.location.pathname = route;
            } else {
              // External URL
              window.location.href = destination;
            }
          }
          break;

        default:
          console.warn('Unknown navigation action:', action);
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  // Handle form input commands (matching template implementation exactly)
  private handleFormInput = (fields: Array<{ id: string; value: string }>): void => {
    console.log('Enhanced Voice Plus form input command:', fields);

    try {
      fields.forEach((field) => {
        if (this.formElements[field.id]) {
          const element = this.formElements[field.id];
          
          // Set the value
          element.value = field.value;
          element.classList.add("voice-updated");
          
          // Trigger events for frameworks that listen to them (matching template)
          element.dispatchEvent(new Event("input", { bubbles: true }));
          element.dispatchEvent(new Event("change", { bubbles: true }));
          
          // Remove highlight after 2 seconds (matching template)
          setTimeout(() => {
            element.classList.remove("voice-updated");
          }, 2000);
          
          console.log(`Enhanced Voice Plus filled field ${field.id} with value: ${field.value}`);
        } else {
          console.warn(`Field with id "${field.id}" not found in formElements`);
        }
      });
    } catch (error) {
      console.error('Form input error:', error);
    }
  };

  // Handle custom commands (matching template structure)
  private handleCustomCommand = (action: string, payload: any): void => {
    console.log('Enhanced Voice Plus custom command:', { action, payload });

    try {
      switch (action) {
        case 'search':
          this.handleSearchCommand(payload);
          break;
        
        case 'openTickets':
          window.location.pathname = '/tickets';
          break;
          
        case 'showSpeakers':
          window.location.pathname = '/speakers';
          break;
          
        case 'viewSchedule':
          window.location.pathname = '/schedule';
          break;

        case 'contactUs':
          window.location.pathname = '/contact';
          break;

        default:
          console.log('Unhandled custom command:', action, payload);
      }
    } catch (error) {
      console.error('Custom command error:', error);
    }
  };

  private handleSearchCommand(payload: any): void {
    if (payload && payload.query) {
      // Implement search functionality (matching template)
      console.log('Enhanced Voice Plus searching for:', payload.query);
      
      // You could trigger a search modal or navigate to a search page
      // For now, we'll just log it
      this.showVoiceFeedback(`Voice search: ${payload.query}`);
    }
  }

  private showVoiceFeedback(message: string): void {
    // Create visual feedback for voice commands
    const feedback = document.createElement('div');
    feedback.className = 'voice-command-feedback';
    feedback.textContent = message;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 3000);
  }

  private setupRouteChangeDetection(): void {
    // Listen for route changes
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = (...args) => {
      originalPushState.apply(window.history, args);
      this.onRouteChange();
    };

    window.history.replaceState = (...args) => {
      originalReplaceState.apply(window.history, args);
      this.onRouteChange();
    };

    window.addEventListener('popstate', () => {
      this.onRouteChange();
    });
  }

  private onRouteChange(): void {
    // Delay to ensure DOM has updated
    setTimeout(() => {
      this.checkRouteChange();
    }, 100);
  }

  private checkRouteChange(): void {
    const newRoute = window.location.pathname;
    if (newRoute !== this.currentRoute) {
      this.currentRoute = newRoute;
      console.log('Enhanced Voice Plus route changed to:', newRoute);
      
      // Re-analyze page and send new context
      setTimeout(() => {
        this.sendPageContext();
      }, 500);
    }
  }

  public updatePageContext(): void {
    // Public method to manually trigger context update
    if (this.isReady()) {
      this.sendPageContext();
    } else {
      console.warn('Cannot update page context: NLX widget not ready');
    }
  }

  public getTouchpoint() {
    // Try to get from window if not available locally
    if (!this.touchpoint && typeof window !== 'undefined') {
      this.touchpoint = (window as any).__nlxTouchpoint;
    }
    return this.touchpoint;
  }

  public isReady(): boolean {
    const touchpoint = this.getTouchpoint();
    return this.isInitialized && touchpoint !== null && touchpoint.conversationHandler;
  }

  public destroy(): void {
    if (this.touchpoint && typeof this.touchpoint.destroy === 'function') {
      this.touchpoint.destroy();
    }
    this.touchpoint = null;
    this.isInitialized = false;
    this.isInitializing = false;
    this.initPromise = null;
    this.formElements = {};
    
    // Clean up window references
    if (typeof window !== 'undefined') {
      delete (window as any).__nlxTouchpoint;
      delete (window as any).__nlxManager;
    }
  }

  // Method to check if widget exists in DOM
  public widgetExistsInDOM(): boolean {
    return !!document.querySelector('.nlx-touchpoint-widget, .nlx-touchpoint-container');
  }

  // Method to get current form elements (for debugging)
  public getFormElements() {
    return this.formElements;
  }
}

export default NLXManager;