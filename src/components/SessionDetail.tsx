import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle, Tag } from 'lucide-react';
import { SessionDetail as SessionDetailType } from '../types';
import { SessionRegistrationButton } from './SessionRegistrationButton';

interface SessionDetailProps {
  session: SessionDetailType;
  onBack?: () => void;
}

export const SessionDetail: React.FC<SessionDetailProps> = ({ session, onBack }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/schedule');
    }
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.button
          onClick={handleBack}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-8 transition-colors"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Schedule</span>
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-8">
            <div className="flex items-center space-x-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20`}>
                {session.type}
              </span>
              <span className="text-purple-100">{session.duration}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{session.title}</h1>
            
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 text-purple-100">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(session.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{session.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{session.location}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Speaker Info */}
            <div className="flex items-start space-x-6 mb-8 p-6 bg-gray-50 rounded-xl">
              <img
                src={session.speakerImage}
                alt={session.speaker}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{session.speaker}</h3>
                <p className="text-gray-600">{session.speakerBio}</p>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Session</h3>
              <p className="text-gray-700 text-lg leading-relaxed">{session.fullDescription}</p>
            </div>

            {/* Prerequisites */}
            {session.prerequisites && session.prerequisites.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Prerequisites</h3>
                <ul className="space-y-2">
                  {session.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Learning Outcomes */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
              <ul className="space-y-3">
                {session.learningOutcomes.map((outcome, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {session.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ready to Join?</h3>
              <p className="text-gray-600 mb-4">
                Don't miss this opportunity to learn from industry experts.
              </p>
              <div className="flex justify-center">
                <SessionRegistrationButton
                  sessionId={session.id}
                  sessionTitle={session.title}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};