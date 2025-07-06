import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Check, X, AlertCircle, Mail } from 'lucide-react';
import { registerForSessionByEmail, cancelSessionRegistrationByEmail, isEmailRegisteredForSession } from '../utils/sessionRegistration';
import { PurchaseAnimation } from './PurchaseAnimation';
import { usePurchaseAnimation } from '../hooks/usePurchaseAnimation';

interface SessionRegistrationButtonProps {
  sessionId: string;
  sessionTitle: string;
}

export const SessionRegistrationButton: React.FC<SessionRegistrationButtonProps> = ({
  sessionId,
  sessionTitle
}) => {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const { animationState, triggerAnimation, hideAnimation } = usePurchaseAnimation();

  const checkRegistrationStatus = (emailToCheck: string) => {
    setIsRegistered(isEmailRegisteredForSession(emailToCheck, sessionId));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Get the submit button for click position
    const submitButton = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
    const rect = submitButton?.getBoundingClientRect();
    const clickEvent = {
      clientX: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
      clientY: rect ? rect.top + rect.height / 2 : window.innerHeight / 2,
    } as MouseEvent;
    setIsLoading(true);
    setMessage(null);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setMessage({ type: 'error', text: 'Please enter a valid email address' });
        setIsLoading(false);
        return;
      }

      const currentlyRegistered = isEmailRegisteredForSession(email, sessionId);

      if (currentlyRegistered) {
        const result = cancelSessionRegistrationByEmail(email, sessionId);
        if (result.success) {
          triggerAnimation(
            'Registration Cancelled',
            'You have been successfully removed from this session.',
            clickEvent
          );
          setIsRegistered(false);
          setShowEmailForm(false);
          setEmail('');
          setTimeout(() => {
            setMessage({ type: 'success', text: 'Registration cancelled successfully' });
          }, 1000);
        } else {
          setMessage({ type: 'error', text: result.message });
        }
      } else {
        const result = registerForSessionByEmail(email, sessionId, sessionTitle);
        if (result.success) {
          triggerAnimation(
            'Registration Successful! 🎉',
            'You\'re all set for this session! Check your email for confirmation.',
            clickEvent
          );
          setIsRegistered(true);
          setShowEmailForm(false);
          setEmail('');
          setTimeout(() => {
            setMessage({ type: 'success', text: 'Successfully registered! Check your email for confirmation.' });
          }, 1000);
        } else {
          setMessage({ type: 'error', text: result.message });
        }
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
      
      // Clear message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    }
  };

  const handleButtonClick = () => {
    setShowEmailForm(true);
    setMessage(null);
  };

  return (
    <div className="space-y-4">
      {!showEmailForm ? (
        <motion.button
          onClick={handleButtonClick}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="w-5 h-5" />
          <span>Register for Session</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-xl p-6 border border-gray-200"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Register for Session</h4>
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (e.target.value) {
                      checkRegistrationStatus(e.target.value);
                    }
                  }}
                  required
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
              </div>
              {email && (
                <p className="text-sm text-gray-600 mt-2">
                  {isRegistered ? (
                    <span className="text-orange-600">You are currently registered for this session. Submitting will cancel your registration.</span>
                  ) : (
                    <span className="text-green-600">You are not registered for this session yet.</span>
                  )}
                </p>
              )}
            </div>

            <div className="flex space-x-3">
              <motion.button
                type="submit"
                disabled={isLoading || !email.trim()}
                onClick={(e) => {
                  // Store click position for animation
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.dataset.clickX = String(rect.left + rect.width / 2);
                  e.currentTarget.dataset.clickY = String(rect.top + rect.height / 2);
                }}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 ${
                  isRegistered
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                animate={animationState.isVisible ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isRegistered ? (
                  <>
                    <X className="w-5 h-5" />
                    <span>Cancel Registration</span>
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Register</span>
                  </>
                )}
              </motion.button>
              
              <button
                type="button"
                onClick={() => {
                  setShowEmailForm(false);
                  setEmail('');
                  setMessage(null);
                }}
                className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-center space-x-2 text-sm px-4 py-3 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message.type === 'success' ? (
              <Check className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span>{message.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Animation */}
      <PurchaseAnimation
        isVisible={animationState.isVisible}
        onComplete={hideAnimation}
        title={animationState.title}
        message={animationState.message}
        clickPosition={animationState.clickPosition}
      />
    </div>
  );
};