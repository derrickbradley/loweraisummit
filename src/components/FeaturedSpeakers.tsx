import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Linkedin, Brain } from 'lucide-react';
import { speakers } from '../data/speakers';
import { sessionDetails } from '../data/sessions';

export const FeaturedSpeakers: React.FC = () => {
  const { navigate, goToSpeakers, goToSession } = useNavigation();

  // Get first 6 speakers as featured
  const featuredSpeakers = speakers.slice(0, 6);

  const getSpeakerSession = (speakerName: string) => {
    return sessionDetails.find(session => session.speaker === speakerName);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <span>World-Class AI Speakers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from the brightest minds in artificial intelligence, machine learning, and AI innovation from around the globe, gathering in Paris.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredSpeakers.map((speaker, index) => {
            const speakerSession = getSpeakerSession(speaker.name);
            return (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group ${
                  speakerSession ? 'cursor-pointer' : ''
                }`}
                onClick={() => speakerSession && goToSession(speakerSession.id)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      {speakerSession && (
                        <div className="mb-3">
                          <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            View Session
                          </span>
                        </div>
                      )}
                      <div className="flex space-x-3">
                        {speaker.social.twitter && (
                          <a
                            href={`https://twitter.com/${speaker.social.twitter}`}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {speaker.social.linkedin && (
                          <a
                            href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h3>
                  <p className="text-purple-600 font-semibold mb-1">{speaker.title}</p>
                  <p className="text-gray-600 mb-4">{speaker.company}</p>
                  {speakerSession && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-purple-600 font-medium">
                        Speaking: {speakerSession.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {speakerSession.date} at {speakerSession.time}
                      </p>
                    </div>
                  )}
                  <p className="text-gray-700 text-sm leading-relaxed">{speaker.bio}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All AI Speakers CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            onClick={goToSpeakers}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All AI Speakers</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};