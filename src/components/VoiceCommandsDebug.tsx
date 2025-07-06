import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Settings, X } from 'lucide-react';
import { useNLXWidget } from '../hooks/useNLXWidget';
import { voiceCommands, VoiceCommand } from '../utils/voiceCommands';

interface VoiceCommandsDebugProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

export const VoiceCommandsDebug: React.FC<VoiceCommandsDebugProps> = ({ 
  isVisible = false, 
  onToggle 
}) => {
  const { isReady, touchpoint, updatePageContext, getFormElements } = useNLXWidget();
  const [availableCommands, setAvailableCommands] = useState<VoiceCommand[]>([]);
  const [formElements, setFormElements] = useState<any>({});
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    // Update available commands when page changes
    const updateCommands = () => {
      setAvailableCommands(voiceCommands.getAvailableCommands());
      setFormElements(getFormElements());
    };

    updateCommands();

    // Listen for route changes
    const handleRouteChange = () => {
      setTimeout(updateCommands, 100);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [getFormElements]);

  const handleTestCommand = (command: string) => {
    voiceCommands.testVoiceCommand(command);
  };

  const handleUpdateContext = () => {
    updatePageContext();
    setFormElements(getFormElements());
    voiceCommands.showCommandFeedback('Page context updated');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed top-4 right-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[80vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mic className="w-5 h-5" />
            <h3 className="font-semibold">Voice Commands Debug</h3>
          </div>
          <button
            onClick={onToggle}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
          {/* Status */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${isReady ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                {isReady ? 'Voice Plus Ready' : 'Voice Plus Not Ready'}
              </span>
            </div>
            
            <button
              onClick={handleUpdateContext}
              className="w-full bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600 transition-colors"
            >
              Update Page Context
            </button>
          </div>

          {/* Form Elements */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Detected Form Fields</h4>
            <div className="bg-gray-50 rounded p-3 text-xs">
              {Object.keys(formElements).length > 0 ? (
                <ul className="space-y-1">
                  {Object.entries(formElements).map(([id, element]: [string, any]) => (
                    <li key={id} className="flex justify-between">
                      <span className="font-mono text-purple-600">{id}</span>
                      <span className="text-gray-600">{element.tagName}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No form fields detected</p>
              )}
            </div>
          </div>

          {/* Available Commands */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Available Voice Commands</h4>
            <div className="space-y-2">
              {availableCommands.map((cmd, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-purple-600">
                      "{cmd.command}"
                    </span>
                    <button
                      onClick={() => handleTestCommand(cmd.command)}
                      className="bg-purple-500 text-white px-2 py-1 rounded text-xs hover:bg-purple-600 transition-colors"
                    >
                      Test
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">{cmd.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Page Info */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Current Page</h4>
            <div className="bg-gray-50 rounded p-3 text-xs">
              <p><strong>Path:</strong> {window.location.pathname}</p>
              <p><strong>URL:</strong> {window.location.href}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTestCommand('go to home')}
                className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Go Home
              </button>
              <button
                onClick={() => handleTestCommand('show speakers')}
                className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Speakers
              </button>
              <button
                onClick={() => handleTestCommand('view schedule')}
                className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Schedule
              </button>
              <button
                onClick={() => handleTestCommand('buy tickets')}
                className="bg-gray-500 text-white px-3 py-2 rounded text-sm hover:bg-gray-600 transition-colors"
              >
                Tickets
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};