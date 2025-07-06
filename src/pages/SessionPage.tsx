import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { SessionDetail } from '../components/SessionDetail';
import { sessionDetails } from '../data/sessions';

export const SessionPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  
  if (!sessionId) {
    return <Navigate to="/schedule" replace />;
  }

  const session = sessionDetails.find(s => s.id === sessionId);
  
  if (!session) {
    return <Navigate to="/schedule" replace />;
  }

  const handleBackToSchedule = () => {
    window.history.back();
  };

  return <SessionDetail session={session} onBack={handleBackToSchedule} />;
};