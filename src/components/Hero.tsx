import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Ticket, Play, ArrowDown, Brain, Cpu, Zap } from 'lucide-react';
import { TicketModal } from './TicketModal';

interface HeroProps {
  onGetTickets: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Hero: React.FC<HeroProps> = ({ onGetTickets }) => {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Conference date: April 15, 2025
  const conferenceDate = new Date('2025-07-08T09:00:00-07:00'); // 9 AM PST

  // Calculate time remaining
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = conferenceDate.getTime() - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Listen for hash changes to show ticket modal
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#early-bird-ticket') {
        setShowTicketModal(true);
      }
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleCloseModal = () => {
    setShowTicketModal(false);
    // Remove hash from URL
    if (window.location.hash === '#early-bird-ticket') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          {showVideo ? (
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            >
              <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
            </video>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900" />
          )}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* AI-themed Animated Background Elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              {i % 3 === 0 ? (
                <Brain className="w-4 h-4 text-white/20" />
              ) : i % 3 === 1 ? (
                <Cpu className="w-4 h-4 text-white/20" />
              ) : (
                <Zap className="w-4 h-4 text-white/20" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Conference Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-white font-medium">Early Bird AI Tickets Available</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              <span className="block">Lower Summit</span>
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                2025
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The premier AI conference where intelligence meets innovation. Join leading AI researchers, engineers, and visionaries for three days of transformative artificial intelligence insights.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <div className="flex items-center space-x-2 text-gray-300">
                <Calendar className="w-5 h-5" />
                <span>July 8-9, 2025</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="w-5 h-5" />
                <span>500+ AI Professionals</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <motion.button
                onClick={onGetTickets}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Your AI Tickets
              </motion.button>
              
              <motion.button
                onClick={() => setShowVideo(!showVideo)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-900 transition-all duration-200 flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                <span>Watch AI Highlights</span>
              </motion.button>
            </div>

            {/* AI Conference Countdown Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto mb-12"
            >
              <h3 className="text-white font-semibold mb-4 flex items-center justify-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI Summit Starts In</span>
              </h3>
              <div className="grid grid-cols-4 gap-4 text-center">
                {[
                  { value: timeLeft.days.toString().padStart(2, '0'), label: 'Days' },
                  { value: timeLeft.hours.toString().padStart(2, '0'), label: 'Hours' },
                  { value: timeLeft.minutes.toString().padStart(2, '0'), label: 'Minutes' },
                  { value: timeLeft.seconds.toString().padStart(2, '0'), label: 'Seconds' }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white/20 rounded-lg p-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-xs text-gray-300">{item.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>

      </section>

      <TicketModal isOpen={showTicketModal} onClose={handleCloseModal} />
    </>
  );
};