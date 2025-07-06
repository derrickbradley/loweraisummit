import { ScheduleItem } from '../types';
import { schedule } from '../data/schedule';

// Email-based session registration interface
interface EmailSessionRegistration {
  id: string;
  email: string;
  sessionId: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
  sessionLocation: string;
  registeredAt: string;
}

// Mock database for email-based session registrations
const emailSessionRegistrations: EmailSessionRegistration[] = [];

// Register email for a session
export const registerForSessionByEmail = (
  email: string,
  sessionId: string,
  sessionTitle: string
): { success: boolean; message: string; registration?: EmailSessionRegistration } => {
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Please enter a valid email address' };
  }

  // Check if session exists
  const session = schedule.find(s => s.id === sessionId);
  if (!session) {
    return { success: false, message: 'Session not found' };
  }
  
  // Check if email is already registered for this session
  const existingRegistration = emailSessionRegistrations.find(
    reg => reg.email.toLowerCase() === email.toLowerCase() && reg.sessionId === sessionId
  );
  
  if (existingRegistration) {
    return { success: false, message: 'This email is already registered for this session' };
  }
  
  // Create new registration
  const registration: EmailSessionRegistration = {
    id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    email: email.toLowerCase(),
    sessionId,
    sessionTitle,
    sessionDate: session.date,
    sessionTime: session.time,
    sessionLocation: session.location,
    registeredAt: new Date().toISOString()
  };
  
  emailSessionRegistrations.push(registration);
  
  return {
    success: true,
    message: 'Successfully registered for session',
    registration
  };
};

// Cancel session registration by email
export const cancelSessionRegistrationByEmail = (
  email: string,
  sessionId: string
): { success: boolean; message: string } => {
  const registrationIndex = emailSessionRegistrations.findIndex(
    reg => reg.email.toLowerCase() === email.toLowerCase() && reg.sessionId === sessionId
  );
  
  if (registrationIndex === -1) {
    return { success: false, message: 'Registration not found for this email' };
  }
  
  emailSessionRegistrations.splice(registrationIndex, 1);
  
  return { success: true, message: 'Registration cancelled successfully' };
};

// Get session registrations by email
export const getSessionRegistrationsByEmail = (email: string): EmailSessionRegistration[] => {
  return emailSessionRegistrations.filter(
    reg => reg.email.toLowerCase() === email.toLowerCase()
  );
};

// Check if email is registered for a session
export const isEmailRegisteredForSession = (email: string, sessionId: string): boolean => {
  return emailSessionRegistrations.some(
    reg => reg.email.toLowerCase() === email.toLowerCase() && reg.sessionId === sessionId
  );
};

// Get registration count for a session
export const getSessionRegistrationCount = (sessionId: string): number => {
  return emailSessionRegistrations.filter(reg => reg.sessionId === sessionId).length;
};

// Get all registrations for a session (admin function)
export const getSessionRegistrations = (sessionId: string): EmailSessionRegistration[] => {
  return emailSessionRegistrations.filter(reg => reg.sessionId === sessionId);
};

// Validate email format
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};