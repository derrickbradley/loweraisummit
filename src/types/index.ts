export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  sessions: string[];
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface ScheduleItem {
  id: string;
  date: string;
  time: string;
  title: string;
  speaker: string;
  location: string;
  description: string;
  type: 'keynote' | 'workshop' | 'panel' | 'networking';
}

export interface SessionDetail {
  id: string;
  title: string;
  speaker: string;
  speakerBio: string;
  speakerImage: string;
  date: string;
  time: string;
  location: string;
  description: string;
  fullDescription: string;
  type: 'keynote' | 'workshop' | 'panel' | 'networking';
  duration: string;
  prerequisites?: string[];
  learningOutcomes: string[];
  tags: string[];
}

export interface Ticket {
  id: string;
  type: string;
  price: number;
  originalPrice?: number;
  benefits: string[];
  availability: number;
  popular?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface SessionRegistration {
  id: string;
  userId: string;
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
  sessionLocation: string;
  registeredAt: string;
}

// Global type declarations for voice navigation
declare global {
  interface Window {
    nlxNavigation?: {
      navigate: (path: string, options?: { replace?: boolean }) => void;
      goToHome: () => void;
      goToSpeakers: () => void;
      goToSchedule: () => void;
      goToTickets: () => void;
      goToBlog: () => void;
      goToContact: () => void;
      goToSession: (sessionId: string) => void;
    };
  }
}