import React, { useState, useEffect } from 'react';
import { NLXWidget } from './components/NLXWidget';
import { NavigationProvider } from './contexts/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { FeaturedSpeakers } from './components/FeaturedSpeakers';
import { Gallery } from './components/Gallery';
import { Testimonials } from './components/Testimonials';
import { Sponsors } from './components/Sponsors';
import { Speakers } from './components/Speakers';
import { Schedule } from './components/Schedule';
import { SessionDetail } from './components/SessionDetail';
import { Tickets } from './components/Tickets';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { sessionDetails } from './data/sessions';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Handle URL changes and initial load
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      updatePageFromPath(path);
    };

    // Set initial page from URL
    updatePageFromPath(window.location.pathname);

    // Listen for browser back/forward
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const updatePageFromPath = (path: string) => {
    if (path === '/' || path === '') {
      setCurrentPage('home');
      setSessionId(null);
    } else if (path === '/speakers') {
      setCurrentPage('speakers');
      setSessionId(null);
    } else if (path === '/schedule') {
      setCurrentPage('schedule');
      setSessionId(null);
    } else if (path.startsWith('/session/')) {
      const id = path.split('/session/')[1];
      setCurrentPage('session');
      setSessionId(id);
    } else if (path === '/tickets') {
      setCurrentPage('tickets');
      setSessionId(null);
    } else if (path === '/blog') {
      setCurrentPage('blog');
      setSessionId(null);
    } else if (path === '/contact') {
      setCurrentPage('contact');
      setSessionId(null);
    } else {
      setCurrentPage('home');
      setSessionId(null);
    }
  };

  const navigate = (path: string, options?: { replace?: boolean }) => {
    if (options?.replace) {
      window.history.replaceState(null, '', path);
    } else {
      window.history.pushState(null, '', path);
    }
    updatePageFromPath(path);
  };

  const navigationMethods = {
    navigate,
    currentPath: window.location.pathname,
    goToHome: () => navigate('/'),
    goToSpeakers: () => navigate('/speakers'),
    goToSchedule: () => navigate('/schedule'),
    goToTickets: () => navigate('/tickets'),
    goToBlog: () => navigate('/blog'),
    goToContact: () => navigate('/contact'),
    goToSession: (sessionId: string) => navigate(`/session/${sessionId}`),
  };

  const handleGetTickets = () => {
    navigate('/tickets');
  };

  const handleBackToSchedule = () => {
    navigate('/schedule');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onGetTickets={handleGetTickets} />
            <Stats />
            <FeaturedSpeakers />
            <Gallery />
            <Testimonials />
            <Sponsors />
          </>
        );
      case 'speakers':
        return <Speakers />;
      case 'schedule':
        return <Schedule />;
      case 'session':
        if (sessionId) {
          const session = sessionDetails.find(s => s.id === sessionId);
          if (session) {
            return <SessionDetail session={session} onBack={handleBackToSchedule} />;
          }
        }
        // If session not found, redirect to schedule
        navigate('/schedule', { replace: true });
        return <Schedule />;
      case 'tickets':
        return <Tickets />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero onGetTickets={handleGetTickets} />
            <Stats />
            <FeaturedSpeakers />
            <Gallery />
            <Testimonials />
            <Sponsors />
          </>
        );
    }
  };

  return (
    <NavigationProvider value={navigationMethods}>
      <NLXWidget />
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-16">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </NavigationProvider>
  );
}

export default App;