import { tickets } from '../data/tickets';

// Purchase form interface
export interface PurchaseForm {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
  ticketType: string;
}

// Purchase record interface
export interface PurchaseRecord {
  id: string;
  confirmationNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  ticketType: string;
  amount: number;
  purchaseDate: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'credit_card';
  billingAddress: string;
}

// Payment processing result
export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  confirmationNumber?: string;
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Mock database for purchases
const purchaseRecords: PurchaseRecord[] = [];
const inventoryDatabase = new Map<string, number>([
  ['1', 50], // Early Bird
  ['2', 200], // Standard
  ['3', 25], // VIP
]);

// Validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  // Remove spaces and check if it's 16 digits
  const cleanCard = cardNumber.replace(/\s/g, '');
  return /^\d{16}$/.test(cleanCard);
};

export const validateExpiryDate = (expiryDate: string): boolean => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!expiryRegex.test(expiryDate)) return false;
  
  const [month, year] = expiryDate.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;
  
  const expYear = parseInt(year);
  const expMonth = parseInt(month);
  
  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;
  
  return true;
};

export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateBillingAddress = (address: string): boolean => {
  return address.trim().length >= 10;
};

// Comprehensive form validation
export const validatePurchaseForm = (formData: PurchaseForm): ValidationResult => {
  const errors: Record<string, string> = {};

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Name validation
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  // Payment validation
  if (!formData.cardNumber.trim()) {
    errors.cardNumber = 'Card number is required';
  } else if (!validateCardNumber(formData.cardNumber)) {
    errors.cardNumber = 'Please enter a valid 16-digit card number';
  }

  if (!formData.expiryDate.trim()) {
    errors.expiryDate = 'Expiry date is required';
  } else if (!validateExpiryDate(formData.expiryDate)) {
    errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
  }

  if (!formData.cvv.trim()) {
    errors.cvv = 'CVV is required';
  } else if (!validateCVV(formData.cvv)) {
    errors.cvv = 'Please enter a valid 3-4 digit CVV';
  }

  if (!formData.billingAddress.trim()) {
    errors.billingAddress = 'Billing address is required';
  } else if (!validateBillingAddress(formData.billingAddress)) {
    errors.billingAddress = 'Please enter a complete billing address';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Generate confirmation number
export const generateConfirmationNumber = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `LS25-${timestamp}-${random}`.toUpperCase();
};

// Mock payment processing
export const processPayment = async (
  formData: PurchaseForm,
  amount: number
): Promise<PaymentResult> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Simulate payment processing
  const isSuccessful = Math.random() > 0.1; // 90% success rate

  if (!isSuccessful) {
    return {
      success: false,
      error: 'Payment processing failed. Please check your card details and try again.'
    };
  }

  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const confirmationNumber = generateConfirmationNumber();

  return {
    success: true,
    transactionId,
    confirmationNumber
  };
};

// Check inventory availability
export const checkInventoryAvailability = (ticketId: string): boolean => {
  const available = inventoryDatabase.get(ticketId) || 0;
  return available > 0;
};

// Update inventory
export const updateInventory = (ticketId: string): boolean => {
  const current = inventoryDatabase.get(ticketId) || 0;
  if (current > 0) {
    inventoryDatabase.set(ticketId, current - 1);
    return true;
  }
  return false;
};

// Create purchase record
export const createPurchaseRecord = (
  formData: PurchaseForm,
  paymentResult: PaymentResult,
  amount: number
): PurchaseRecord => {
  const record: PurchaseRecord = {
    id: `purchase_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    confirmationNumber: paymentResult.confirmationNumber!,
    email: formData.email.toLowerCase(),
    firstName: formData.firstName.trim(),
    lastName: formData.lastName.trim(),
    company: formData.company?.trim(),
    ticketType: formData.ticketType,
    amount,
    purchaseDate: new Date().toISOString(),
    status: 'completed',
    paymentMethod: 'credit_card',
    billingAddress: formData.billingAddress.trim()
  };

  purchaseRecords.push(record);
  return record;
};

// Send confirmation email (mock)
export const sendConfirmationEmail = async (
  purchaseRecord: PurchaseRecord
): Promise<boolean> => {
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // In a real application, this would integrate with an email service
  console.log('Sending confirmation email to:', purchaseRecord.email);
  console.log('Confirmation details:', {
    confirmationNumber: purchaseRecord.confirmationNumber,
    ticketType: purchaseRecord.ticketType,
    amount: purchaseRecord.amount
  });

  // Simulate 95% success rate for email sending
  return Math.random() > 0.05;
};

// Main purchase processing function
export const processPurchase = async (
  formData: PurchaseForm
): Promise<{
  success: boolean;
  purchaseRecord?: PurchaseRecord;
  error?: string;
  validationErrors?: Record<string, string>;
}> => {
  try {
    // Step 1: Validate form data
    const validation = validatePurchaseForm(formData);
    if (!validation.isValid) {
      return {
        success: false,
        validationErrors: validation.errors
      };
    }

    // Step 2: Check inventory availability
    if (!checkInventoryAvailability(formData.ticketType)) {
      return {
        success: false,
        error: 'Sorry, this ticket type is no longer available. Please select a different option.'
      };
    }

    // Step 3: Get ticket details and amount
    const ticket = tickets.find(t => t.id === formData.ticketType);
    if (!ticket) {
      return {
        success: false,
        error: 'Invalid ticket type selected.'
      };
    }

    // Step 4: Process payment
    const paymentResult = await processPayment(formData, ticket.price);
    if (!paymentResult.success) {
      return {
        success: false,
        error: paymentResult.error
      };
    }

    // Step 5: Update inventory
    const inventoryUpdated = updateInventory(formData.ticketType);
    if (!inventoryUpdated) {
      return {
        success: false,
        error: 'Ticket is no longer available. Your payment has not been processed.'
      };
    }

    // Step 6: Create purchase record
    const purchaseRecord = createPurchaseRecord(formData, paymentResult, ticket.price);

    // Step 7: Send confirmation email
    const emailSent = await sendConfirmationEmail(purchaseRecord);
    if (!emailSent) {
      console.warn('Failed to send confirmation email for purchase:', purchaseRecord.id);
      // Don't fail the purchase if email fails, just log it
    }

    return {
      success: true,
      purchaseRecord
    };

  } catch (error) {
    console.error('Purchase processing error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again or contact support.'
    };
  }
};

// Get purchase by confirmation number
export const getPurchaseByConfirmation = (confirmationNumber: string): PurchaseRecord | null => {
  return purchaseRecords.find(record => record.confirmationNumber === confirmationNumber) || null;
};

// Get purchases by email
export const getPurchasesByEmail = (email: string): PurchaseRecord[] => {
  return purchaseRecords.filter(record => record.email.toLowerCase() === email.toLowerCase());
};

// Get inventory count
export const getInventoryCount = (ticketId: string): number => {
  return inventoryDatabase.get(ticketId) || 0;
};