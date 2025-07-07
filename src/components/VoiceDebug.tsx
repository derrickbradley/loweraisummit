import React, { useEffect, useState } from 'react';
import { useNavigation } from '../contexts/NavigationContext';

export const VoiceDebug: React.FC = () => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show debug info for 10 seconds after page load
    const timer = setTimeout(() => setIsVisible(false), 10000);
    setIsVisible(true);

    // Test voice commands in console
    console.log('=== Voice Command Test ===');
    console.log('Available navigation functions:');
    console.log('window.goToHome:', typeof window.goToHome);
    console.log('window.goToSpeakers:', typeof window.goToSpeakers);
    console.log('window.goToSchedule:', typeof window.goToSchedule);
    console.log('window.goToTickets:', typeof window.goToTickets);
    console.log('window.goToBlog:', typeof window.goToBlog);
    console.log('window.goToContact:', typeof window.goToContact);
    console.log('window.navigateToPage:', typeof window.navigateToPage);
    
    // Test a navigation function
    console.log('Testing navigation functions...');
    if (window.goToHome) {
      console.log('✅ goToHome function is available');
    } else {
      console.log('❌ goToHome function is NOT available');
    }

    return () => clearTimeout(timer);
  }, []);

  const testNavigation = () => {
    console.log('Testing manual navigation...');
    if (window.goToSpeakers) {
      window.goToSpeakers();
    } else {
      console.error('Navigation function not available');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg z-50 max-w-sm">
      <h3 className="font-bold mb-2">Voice Commands Debug</h3>
      <p className="text-sm mb-2">
        Voice commands should be available. Check console for details.
      </p>
      <button 
        onClick={testNavigation}
        className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700"
      >
        Test Navigation
      </button>
      <button 
        onClick={() => setIsVisible(false)}
        className="ml-2 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
      >
        Close
      </button>
    </div>
  );
};