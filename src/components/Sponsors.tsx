import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { sponsors } from '../data/sponsors';

export const Sponsors: React.FC = () => {
  const sponsorsByTier = {
    platinum: sponsors.filter(s => s.tier === 'platinum'),
    gold: sponsors.filter(s => s.tier === 'gold'),
    silver: sponsors.filter(s => s.tier === 'silver'),
    bronze: sponsors.filter(s => s.tier === 'bronze')
  };

  const getTierConfig = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return { title: 'Platinum Sponsors', size: 'w-48 h-24', gradient: 'from-gray-300 to-gray-500' };
      case 'gold':
        return { title: 'Gold Sponsors', size: 'w-40 h-20', gradient: 'from-yellow-300 to-yellow-600' };
      case 'silver':
        return { title: 'Silver Sponsors', size: 'w-32 h-16', gradient: 'from-gray-200 to-gray-400' };
      case 'bronze':
        return { title: 'Bronze Sponsors', size: 'w-28 h-14', gradient: 'from-orange-300 to-orange-600' };
      default:
        return { title: '', size: 'w-32 h-16', gradient: 'from-gray-200 to-gray-400' };
    }
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
            Our Sponsors
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're grateful to our sponsors who make this conference possible and support the AI community.
          </p>
        </motion.div>

        {Object.entries(sponsorsByTier).map(([tier, tierSponsors], tierIndex) => {
          if (tierSponsors.length === 0) return null;
          
          const config = getTierConfig(tier);
          
          return (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: tierIndex * 0.2 }}
              className="mb-16"
            >
              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-2`}>
                  {config.title}
                </h3>
              </div>
              
              <div className="flex flex-wrap justify-center items-center gap-8">
                {tierSponsors.map((sponsor, index) => (
                  <motion.a
                    key={sponsor.id}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative"
                  >
                    <div className={`${config.size} bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 flex items-center justify-center border border-gray-200 group-hover:border-purple-300`}>
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-purple-500 bg-opacity-0 group-hover:bg-opacity-10 rounded-xl transition-all duration-300 flex items-center justify-center">
                        <ExternalLink className="w-6 h-6 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                      {sponsor.description}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Become a Sponsor CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Become a Sponsor
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join our community of forward-thinking companies and showcase your brand to 500+ AI professionals, researchers, and industry leaders.
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Sponsorship Packages
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};