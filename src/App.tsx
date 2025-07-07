import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { NLXWidget } from './components/NLXWidget';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SpeakersPage } from './pages/SpeakersPage';
import { SchedulePage } from './pages/SchedulePage';
import { SessionPage } from './pages/SessionPage';
import { TicketsPage } from './pages/TicketsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';


function App() {
  useEffect(() => {
    // Listen for popstate events (back/forward navigation)
    const handlePopState = () => {
      console.log('Navigation detected via popstate');
      // Ensure widget persists during browser navigation
      const widgetElement = document.querySelector('[data-nlx-touchpoint]');
      if (widgetElement) {
        widgetElement.setAttribute('data-persistent', 'true');
      }
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
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
        <NLXWidget />
      </div>
    </Router>
  );
}

export default App;