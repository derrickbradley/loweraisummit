// NLX Manager - Singleton pattern to ensure widget persists across page navigation
class NLXManager {
  private static instance: NLXManager;
  private touchpoint: any = null;
  private isInitialized = false;
  private isInitializing = false;
  private initPromise: Promise<void> | null = null;

  private constructor() {
    // Bind to window to ensure persistence across React re-renders
    if (typeof window !== 'undefined') {
      (window as any).__nlxManager = this;
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
        return;
      }

      console.log('Initializing NLX Widget...');
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
        bidirectional: {}
      });

      this.isInitialized = true;
      
      // Store reference on window for persistence
      if (typeof window !== 'undefined') {
        (window as any).__nlxTouchpoint = this.touchpoint;
      }

      console.log('NLX Widget initialized successfully');
    } catch (error) {
      console.error('Failed to initialize NLX Widget:', error);
      this.isInitialized = false;
    } finally {
      this.isInitializing = false;
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
}

export default NLXManager;