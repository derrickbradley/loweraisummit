// Voice Commands utility for Enhanced NLX Voice Plus
import NLXManager from './nlxManager';

export interface VoiceCommand {
  command: string;
  description: string;
  action: () => void;
}

export class VoiceCommandsHelper {
  private static instance: VoiceCommandsHelper;
  private nlxManager: NLXManager;

  private constructor() {
    this.nlxManager = NLXManager.getInstance();
  }

  public static getInstance(): VoiceCommandsHelper {
    if (!VoiceCommandsHelper.instance) {
      VoiceCommandsHelper.instance = new VoiceCommandsHelper();
    }
    return VoiceCommandsHelper.instance;
  }

  // Get available voice commands for the current page
  public getAvailableCommands(): VoiceCommand[] {
    const currentPath = window.location.pathname;
    const baseCommands: VoiceCommand[] = [
      {
        command: "Go to home",
        description: "Navigate to the home page",
        action: () => this.navigateTo('/')
      },
      {
        command: "Show speakers",
        description: "Navigate to the speakers page",
        action: () => this.navigateTo('/speakers')
      },
      {
        command: "View schedule",
        description: "Navigate to the schedule page",
        action: () => this.navigateTo('/schedule')
      },
      {
        command: "Buy tickets",
        description: "Navigate to the tickets page",
        action: () => this.navigateTo('/tickets')
      },
      {
        command: "Read blog",
        description: "Navigate to the blog page",
        action: () => this.navigateTo('/blog')
      },
      {
        command: "Contact us",
        description: "Navigate to the contact page",
        action: () => this.navigateTo('/contact')
      }
    ];

    // Add page-specific commands
    const pageSpecificCommands = this.getPageSpecificCommands(currentPath);
    
    return [...baseCommands, ...pageSpecificCommands];
  }

  private getPageSpecificCommands(path: string): VoiceCommand[] {
    switch (path) {
      case '/':
        return [
          {
            command: "Get tickets",
            description: "Scroll to tickets section or navigate to tickets page",
            action: () => this.scrollToSection('tickets') || this.navigateTo('/tickets')
          },
          {
            command: "See speakers",
            description: "Scroll to speakers section",
            action: () => this.scrollToSection('speakers')
          }
        ];
      
      case '/contact':
        return [
          {
            command: "Fill contact form",
            description: "Focus on the contact form",
            action: () => this.focusElement('contact-form')
          }
        ];
      
      case '/tickets':
        return [
          {
            command: "Buy early bird",
            description: "Select early bird ticket",
            action: () => this.selectTicket('early-bird')
          },
          {
            command: "Buy standard",
            description: "Select standard ticket",
            action: () => this.selectTicket('standard')
          },
          {
            command: "Buy VIP",
            description: "Select VIP ticket",
            action: () => this.selectTicket('vip')
          }
        ];
      
      default:
        return [];
    }
  }

  private navigateTo(path: string): void {
    window.history.pushState(null, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  private scrollToSection(sectionId: string): boolean {
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`[data-section="${sectionId}"]`) ||
                   document.querySelector(`.${sectionId}-section`);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  }

  private focusElement(elementId: string): void {
    const element = document.getElementById(elementId) || 
                   document.querySelector(`[name="${elementId}"]`);
    
    if (element && element instanceof HTMLElement) {
      element.focus();
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  private selectTicket(ticketType: string): void {
    // Look for ticket selection buttons
    const ticketButton = document.querySelector(`[data-ticket="${ticketType}"]`) ||
                        document.querySelector(`button:contains("${ticketType}")`) ||
                        document.querySelector(`.${ticketType}-ticket button`);
    
    if (ticketButton && ticketButton instanceof HTMLElement) {
      ticketButton.click();
    }
  }

  // Show voice command feedback
  public showCommandFeedback(command: string): void {
    const feedback = document.createElement('div');
    feedback.className = 'voice-command-feedback';
    feedback.textContent = `Voice command: ${command}`;
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 3000);
  }

  // Test voice commands (for development)
  public testVoiceCommand(command: string): void {
    const availableCommands = this.getAvailableCommands();
    const matchedCommand = availableCommands.find(cmd => 
      cmd.command.toLowerCase().includes(command.toLowerCase())
    );
    
    if (matchedCommand) {
      this.showCommandFeedback(matchedCommand.command);
      matchedCommand.action();
    } else {
      console.warn('Voice command not found:', command);
    }
  }
}

// Export singleton instance
export const voiceCommands = VoiceCommandsHelper.getInstance();