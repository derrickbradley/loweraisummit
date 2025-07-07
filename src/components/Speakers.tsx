import React from 'react';
import { useNavigation } from '../contexts/NavigationContext';
import { motion } from 'framer-motion';
import { ExternalLink, Twitter, Linkedin, Github } from 'lucide-react';
import { speakers } from '../data/speakers';
import { sessionDetails } from '../data/sessions';

export const Speakers: React.FC = () => {
  const { goToSession } = useNavigation();

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Speakers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from industry experts and thought leaders who are shaping the future of technology and business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {speakers.map((speaker, index) => {
            const speakerSession = getSpeakerSession(speaker.name);
            return (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                  speakerSession ? 'cursor-pointer group' : ''
                }`}
                onClick={() => speakerSession && goToSession(speakerSession.id)}
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{speaker.name}</h3>
                    <p className="text-purple-600 font-semibold mb-1">{speaker.title}</p>
                    <p className="text-gray-600 mb-4">{speaker.company}</p>
                    <p className="text-gray-700 mb-6">{speaker.bio}</p>
                    
                    {speakerSession && (
                      <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">Speaking Session:</h4>
                        <p className="text-purple-800 font-medium">{speakerSession.title}</p>
                        <p className="text-purple-600 text-sm mt-1">
                          {speakerSession.date} at {speakerSession.time} • {speakerSession.location}
                        </p>
                        <button className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center space-x-1">
                          <span>View Session Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center space-x-4">
                      {speaker.social.twitter && (
                        <a
                          href={`https://twitter.com/${speaker.social.twitter}`}
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {speaker.social.linkedin && (
                        <a
                          href={`https://linkedin.com/in/${speaker.social.linkedin}`}
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {speaker.social.github && (
                        <a
                          href={`https://github.com/${speaker.social.github}`}
                          className="text-gray-400 hover:text-gray-900 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};