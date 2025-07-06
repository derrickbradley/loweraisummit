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
        console.log('NLX Widget already exists in DOM, reusing...');
        this.isInitialized = true;
        this.sendPageContext();
        return;
      }

      console.log('Initializing Enhanced NLX Voice Plus Widget...');
      const { create } = await import("@nlxai/touchpoint-ui");

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
        input: "voiceMini",
        theme: {"fontFamily":"\"Neue Haas Grotesk\", sans-serif","accent":"#AECAFF"},
        bidirectional: {
          automaticContext: false,
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

      // Send initial page context
      this.sendPageContext();

      // Set up route change detection
      this.setupRouteChangeDetection();

      console.log('Enhanced NLX Voice Plus Widget initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Enhanced NLX Voice Plus Widget:', error);
      this.isInitialized = false;
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
      // Analyze forms on the current page
      const { context, formElements } = analyzePageForms();
      this.formElements = formElements;

      // Define navigation destinations based on current routes
      const destinations = [
        "home", "/", 
        "speakers", "/speakers",
        "schedule", "/schedule", 
        "tickets", "/tickets",
        "blog", "/blog",
        "contact", "/contact",
        "about", "/about"
      ];

      // Send context to NLX
      this.touchpoint.conversationHandler.sendContext({
        "nlx:vpContext": {
          url: window.location.origin,
          path: window.location.pathname,
          fields: context,
          destinations: destinations,
        },
      });

      console.log('Page context sent to NLX Voice Plus:', {
        url: window.location.origin,
        path: window.location.pathname,
        fieldsCount: Object.keys(context).length,
        destinationsCount: destinations.length
      });
    } catch (error) {
      console.error('Failed to send page context:', error);
    }
  }

  private handleNavigation = (action: string, destination: string): void => {
    console.log('Voice navigation command:', { action, destination });

    try {
      switch (action) {
        case "page_next":
          window.history.forward();
          break;

        case "page_previous":
          window.history.back();
          break;

        case "page_custom":
          // Handle React Router navigation
          if (destination.startsWith("/")) {
            // Use React Router for internal navigation
            window.history.pushState(null, '', destination);
            // Trigger a popstate event to notify React Router
            window.dispatchEvent(new PopStateEvent('popstate'));
          } else {
            // Handle named destinations
            const routeMap: Record<string, string> = {
              'home': '/',
              'speakers': '/speakers',
              'schedule': '/schedule',
              'tickets': '/tickets',
              'blog': '/blog',
              'contact': '/contact'
            };

            const route = routeMap[destination.toLowerCase()];
            if (route) {
              window.history.pushState(null, '', route);
              window.dispatchEvent(new PopStateEvent('popstate'));
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

  private handleFormInput = (fields: Array<{ id: string; value: string }>): void => {
    console.log('Voice form input command:', fields);

    try {
      fields.forEach((field) => {
        if (this.formElements[field.id]) {
          const element = this.formElements[field.id];
          
          // Set the value
          element.value = field.value;
          
          // Add visual feedback
          element.style.backgroundColor = '#ffeb3b';
          element.style.transition = 'background-color 0.3s ease';
          
          // Trigger events for React and other frameworks
          element.dispatchEvent(new Event('input', { bubbles: true }));
          element.dispatchEvent(new Event('change', { bubbles: true }));
          
          // Remove highlight after 2 seconds
          setTimeout(() => {
            element.style.backgroundColor = '';
          }, 2000);
          
          console.log(`Filled field ${field.id} with value: ${field.value}`);
        } else {
          console.warn(`Field with id "${field.id}" not found in formElements`);
        }
      });
    } catch (error) {
      console.error('Form input error:', error);
    }
  };

  private handleCustomCommand = (action: string, payload: any): void => {
    console.log('Voice custom command:', { action, payload });

    try {
      switch (action) {
        case 'search':
          this.handleSearchCommand(payload);
          break;
        
        case 'openTickets':
          window.history.pushState(null, '', '/tickets');
          window.dispatchEvent(new PopStateEvent('popstate'));
          break;
          
        case 'showSpeakers':
          window.history.pushState(null, '', '/speakers');
          window.dispatchEvent(new PopStateEvent('popstate'));
          break;
          
        case 'viewSchedule':
          window.history.pushState(null, '', '/schedule');
          window.dispatchEvent(new PopStateEvent('popstate'));
          break;

        case 'contactUs':
          window.history.pushState(null, '', '/contact');
          window.dispatchEvent(new PopStateEvent('popstate'));
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
      // Implement search functionality
      console.log('Searching for:', payload.query);
      
      // You could trigger a search modal or navigate to a search page
      // For now, we'll just log it
      alert(`Voice search: ${payload.query}`);
    }
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
      console.log('Route changed to:', newRoute);
      
      // Re-analyze page and send new context
      this.sendPageContext();
    }
  }

  public updatePageContext(): void {
    // Public method to manually trigger context update
    this.sendPageContext();
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
    return this.isInitialized && touchpoint !== null;
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