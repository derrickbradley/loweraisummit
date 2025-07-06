import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SpeakersPage } from './pages/SpeakersPage';
import { SchedulePage } from './pages/SchedulePage';
import { SessionPage } from './pages/SessionPage';
import { TicketsPage } from './pages/TicketsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { NLXWidget } from './components/NLXWidget';
import NLXManager from './utils/nlxManager';

function App() {
  // Initialize NLX Widget at the app level to ensure it persists
  useEffect(() => {
    const nlxManager = NLXManager.getInstance();
    
    // Initialize immediately when app starts
    nlxManager.initialize().catch(error => {
      console.error('Failed to initialize NLX Widget at app level:', error);
    });

    // Cleanup only when the entire app unmounts
    return () => {
      // Only destroy if the page is actually being unloaded
      const handleBeforeUnload = () => {
        nlxManager.destroy();
      };
      
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* NLX Widget - Render once at app level for persistence */}
        <NLXWidget />
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/speakers" element={<SpeakersPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/session/:sessionId" element={<SessionPage />} />
            <Route path="/tickets" element={<TicketsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;