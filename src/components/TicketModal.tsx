import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CreditCard, Lock, Brain, AlertCircle } from 'lucide-react';
import { PurchaseAnimation } from './PurchaseAnimation';
import { usePurchaseAnimation } from '../hooks/usePurchaseAnimation';
import { processPurchase, PurchaseForm, ValidationResult } from '../utils/purchaseProcessing';
import { tickets } from '../data/tickets';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTicketId?: string;
}

export const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose, selectedTicketId = '1' }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [processingError, setProcessingError] = useState<string>('');
  const [confirmationNumber, setConfirmationNumber] = useState<string>('');
  const { animationState, triggerAnimation, hideAnimation } = usePurchaseAnimation();
  
  const [formData, setFormData] = useState<PurchaseForm>({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    ticketType: selectedTicketId
  });

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNextStep = () => {
    // Validate step 1 fields
    const step1Errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      step1Errors.email = 'Email is required';
    }
    if (!formData.firstName.trim()) {
      step1Errors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      step1Errors.lastName = 'Last name is required';
    }

    if (Object.keys(step1Errors).length > 0) {
      setValidationErrors(step1Errors);
      return;
    }

    setStep(2);
    setValidationErrors({});
    setProcessingError('');
  };

  const handlePrevStep = () => {
    setStep(1);
    setValidationErrors({});
    setProcessingError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    setValidationErrors({});
    setProcessingError('');

    try {
      const result = await processPurchase(formData);

      if (result.success && result.purchaseRecord) {
        // Get the submit button element for click position
        const submitButton = (e.target as HTMLFormElement).querySelector('button[type="submit"]') as HTMLButtonElement;
        const rect = submitButton?.getBoundingClientRect();
        const clickEvent = {
          clientX: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
          clientY: rect ? rect.top + rect.height / 2 : window.innerHeight / 2,
        } as MouseEvent;

        setConfirmationNumber(result.purchaseRecord.confirmationNumber);

        // Trigger purchase animation
        triggerAnimation(
          'Purchase Successful! 🎉',
          'Welcome to Lower Summit 2025! Check your email for confirmation details.',
          clickEvent
        );

        // Update state after animation
        setTimeout(() => {
          setStep(3);
        }, 1000);
      } else {
        // Handle errors
        if (result.validationErrors) {
          setValidationErrors(result.validationErrors);
        } else if (result.error) {
          setProcessingError(result.error);
        }
      }
    } catch (error) {
      setProcessingError('An unexpected error occurred. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setStep(1);
    setIsProcessing(false);
    setValidationErrors({});
    setProcessingError('');
    setConfirmationNumber('');
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      company: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      billingAddress: '',
      ticketType: selectedTicketId
    });
    onClose();
  };

  if (!selectedTicket) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={resetModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  <span>
                    {step === 1 && `${selectedTicket.type} Ticket`}
                    {step === 2 && 'Payment Details'}
                    {step === 3 && 'Welcome to AI Summit!'}
                  </span>
                </h3>
                <button
                  onClick={resetModal}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isProcessing}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Processing Error Display */}
              {processingError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{processingError}</span>
                </motion.div>
              )}

              {/* Step 1: Ticket Info & Personal Details */}
              {step === 1 && (
                <div>
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">{selectedTicket.type} Ticket</h4>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-600">${selectedTicket.price}</div>
                        {selectedTicket.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">${selectedTicket.originalPrice}</div>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {selectedTicket.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          validationErrors.email ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                      />
                      {validationErrors.email && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            validationErrors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {validationErrors.firstName && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            validationErrors.lastName ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {validationErrors.lastName && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your AI company"
                      />
                    </div>

                    <motion.button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue to Payment
                    </motion.button>
                  </form>
                </div>
              )}

              {/* Step 2: Payment Details */}
              {step === 2 && (
                <div>
                  <div className="flex items-center space-x-2 mb-6 text-green-600">
                    <Lock className="w-5 h-5" />
                    <span className="text-sm font-medium">Secure Payment Processing</span>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            validationErrors.cardNumber ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        <CreditCard className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
                      </div>
                      {validationErrors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.cardNumber}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            validationErrors.expiryDate ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {validationErrors.expiryDate && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.expiryDate}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          placeholder="123"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                            validationErrors.cvv ? 'border-red-300' : 'border-gray-300'
                          }`}
                        />
                        {validationErrors.cvv && (
                          <p className="mt-1 text-sm text-red-600">{validationErrors.cvv}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Billing Address *
                      </label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        required
                        placeholder="123 Main St, City, State, ZIP"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                          validationErrors.billingAddress ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                      {validationErrors.billingAddress && (
                        <p className="mt-1 text-sm text-red-600">{validationErrors.billingAddress}</p>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-900">Total Amount</span>
                        <span className="text-2xl font-bold text-purple-600">${selectedTicket.price}</span>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <motion.button
                        type="button"
                        onClick={handlePrevStep}
                        disabled={isProcessing}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                      >
                        Back
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                        whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                        whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <span>Complete Purchase</span>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Success */}
              {step === 3 && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    Welcome to Lower Summit 2025!
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Your AI conference ticket has been confirmed. Check your email for the confirmation and further details about the AI sessions.
                  </p>
                  {confirmationNumber && (
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <p className="text-sm text-gray-600 mb-1">Confirmation Number</p>
                      <p className="text-lg font-mono font-bold text-purple-600">{confirmationNumber}</p>
                    </div>
                  )}
                  <motion.button
                    onClick={resetModal}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Close
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
          {/* Purchase Animation */}
          <PurchaseAnimation
            isVisible={animationState.isVisible}
            onComplete={hideAnimation}
            title={animationState.title}
            message={animationState.message}
            clickPosition={animationState.clickPosition}
          />
        </>
      )}
    </AnimatePresence>
  );
};