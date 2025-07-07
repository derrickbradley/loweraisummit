import React from 'react';
import { Brain, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export const Footer: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Lower Summit 2025</span>
            </button>
            <p className="text-gray-400 mb-6">
              The premier AI conference where intelligence meets innovation. Join us for an unforgettable AI experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/')} 
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/speakers')} 
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  AI Speakers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/schedule')} 
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  AI Sessions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/tickets')} 
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Tickets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/blog')} 
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  AI Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => navigate('/contact')} 
                  className="text-gray-400 hover:text-white transition-colors text-left"
                >
                  Contact Us
                </button>
              </li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">AI Sponsorship</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Media Kit</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Code of Conduct</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Lower Summit. All rights reserved. Powered by AI innovation.</p>
        </div>
      </div>
    </footer>
  );
};