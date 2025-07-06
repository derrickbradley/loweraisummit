// NLX Manager - Singleton pattern to ensure widget persists across page navigation
class NLXManager {
  private static instance: NLXManager;
  private touchpoint: any = null;
  private isInitialized = false;
  private isInitializing = false;

  private constructor() {}

  public static getInstance(): NLXManager {
    if (!NLXManager.instance) {
      NLXManager.instance = new NLXManager();
    }
    return NLXManager.instance;
  }

  public async initialize(): Promise<void> {
    // Prevent multiple initializations
    if (this.isInitialized || this.isInitializing) {
      return;
    }

    this.isInitializing = true;

    try {
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
      console.log('NLX Widget initialized successfully');
    } catch (error) {
      console.error('Failed to initialize NLX Widget:', error);
    } finally {
      this.isInitializing = false;
    }
  }

  public getTouchpoint() {
    return this.touchpoint;
  }

  public isReady(): boolean {
    return this.isInitialized && this.touchpoint !== null;
  }

  public destroy(): void {
    if (this.touchpoint && typeof this.touchpoint.destroy === 'function') {
      this.touchpoint.destroy();
    }
    this.touchpoint = null;
    this.isInitialized = false;
    this.isInitializing = false;
  }
}

export default NLXManager;