import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';

interface PurchaseAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
  title: string;
  message: string;
  clickPosition?: { x: number; y: number };
}

export const PurchaseAnimation: React.FC<PurchaseAnimationProps> = ({
  isVisible,
  onComplete,
  title,
  message,
  clickPosition
}) => {
  const [showRipple, setShowRipple] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      setShowSuccess(true);
      setTimeout(onComplete, 2000);
      return;
    }

    const sequence = async () => {
      // 1. Button scale animation and ripple effect
      setShowRipple(true);

      // 2. Screen flash
      setTimeout(() => setShowFlash(true), 200);
      setTimeout(() => setShowFlash(false), 400);

      // 3. Show success message
      setTimeout(() => {
        setShowSuccess(true);
        setShowRipple(false);
      }, 600);

      // 4. Auto-dismiss after 3 seconds
      setTimeout(() => {
        onComplete();
      }, 3600);
    };

    sequence();
  }, [isVisible, clickPosition, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Screen Flash */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-white"
          />
        )}
      </AnimatePresence>

      {/* Ripple Effect */}
      <AnimatePresence>
        {showRipple && clickPosition && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-20 h-20 rounded-full border-4 border-purple-500"
            style={{
              left: clickPosition.x - 40,
              top: clickPosition.y - 40,
            }}
          />
        )}
      </AnimatePresence>

      {/* Success Message - Centered */}
      <AnimatePresence>
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-auto">
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -100, opacity: 0, scale: 0.8 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                ease: "easeInOut"
              }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                  className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ease: "easeInOut" }}
                  className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-2"
                >
                  <span>{title}</span>
                  <Sparkles className="w-6 h-6 text-yellow-500" />
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, ease: "easeInOut" }}
                  className="text-gray-600 text-lg mb-6"
                >
                  {message}
                </motion.p>
                
                {/* Progress bar for auto-dismiss */}
                <motion.div
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: 3, ease: "linear", delay: 0.6 }}
                  className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full origin-left"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};