import React, { useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, User, ExternalLink } from 'lucide-react';
import { schedule } from '../data/schedule';
import { sessionDetails } from '../data/sessions';
import { SessionDetail } from './SessionDetail';
import { SessionRegistrationButton } from './SessionRegistrationButton';
import { format } from 'date-fns';

export const Schedule: React.FC = () => {
  const { goToSession } = useNavigation();
  const [selectedDay, setSelectedDay] = useState('2025-07-08');
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

  const days = [
    { date: '2025-07-08', label: 'Day 1' },
    { date: '2025-07-09', label: 'Day 2' }
  ];

  const filteredSchedule = schedule.filter(item => item.date === selectedDay);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'keynote':
        return 'bg-purple-100 text-purple-800';
      case 'workshop':
        return 'bg-blue-100 text-blue-800';
      case 'panel':
        return 'bg-green-100 text-green-800';
      case 'networking':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSessionClick = (sessionId: string) => {
    // Check if session has detailed page
    const hasDetailPage = sessionDetails.find(session => session.id === sessionId);
    if (hasDetailPage) {
      goToSession(sessionId);
    } else {
      setSelectedSession(sessionId);
    }
  };

  const handleBackToSchedule = () => {
    setSelectedSession(null);
  };

  // Find the selected session detail
  const selectedSessionDetail = sessionDetails.find(session => session.id === selectedSession);

  if (selectedSessionDetail) {
    return <SessionDetail session={selectedSessionDetail} onBack={handleBackToSchedule} />;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Conference Schedule
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two days packed with insightful sessions, workshops, and networking opportunities.
          </p>
        </motion.div>

        {/* Day Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {days.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(day.date)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  selectedDay === day.date
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Items */}
        <div className="space-y-6">
          {filteredSchedule.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer"
              onClick={() => handleSessionClick(item.id)}
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{item.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-purple-600">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{item.speaker}</span>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        {item.type !== 'networking' && (
                          <SessionRegistrationButton
                            sessionId={item.id}
                            sessionTitle={item.title}
                          />
                        )}
                        
                        {sessionDetails.find(session => session.id === item.id) && (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              goToSession(item.id);
                            }}
                            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
                          >
                            <span className="text-sm font-medium">View Details</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};