import React from 'react';
import { NLXWidget } from './components/NLXWidget';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationProvider } from './contexts/NavigationContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { SpeakersPage } from './pages/SpeakersPage';
import { SchedulePage } from './pages/SchedulePage';
import { SessionPage } from './pages/SessionPage';
import { TicketsPage } from './pages/TicketsPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';


function App() {
  return (
    <Router>
      <NavigationProvider>
        {/* Moved NLXWidget here to ensure it mounts early within the NavigationContext */}
        <NLXWidget /> 
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
        </div>
      </NavigationProvider>
    </Router>
  );
}

export default App;
