import { sessionDetails } from '../data/sessions';

// Generate SEO-friendly URL slug from session title
export const generateSessionSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

// Get session URL
export const getSessionUrl = (sessionId: string): string => {
  return `/session/${sessionId}`;
};

// Get session by ID
export const getSessionById = (sessionId: string) => {
  return sessionDetails.find(session => session.id === sessionId);
};

// Get session meta data for SEO
export const getSessionMetaData = (sessionId: string) => {
  const session = getSessionById(sessionId);
  
  if (!session) {
    return {
      title: 'Session Not Found - Lower Summit 2025',
      description: 'The requested session could not be found.',
      keywords: 'AI conference, Lower Summit 2025'
    };
  }

  return {
    title: `${session.title} - Lower Summit 2025`,
    description: session.description,
    keywords: `${session.tags.join(', ')}, AI conference, Lower Summit 2025, ${session.speaker}`
  };
};

// Check if session has detailed page
export const hasSessionDetailPage = (sessionId: string): boolean => {
  return sessionDetails.some(session => session.id === sessionId);
};