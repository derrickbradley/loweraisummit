import { Ticket } from '../types';

export const tickets: Ticket[] = [
  {
    id: '1',
    type: 'Early Bird',
    price: 299,
    originalPrice: 399,
    benefits: [
      'Access to all sessions',
      'Networking reception',
      'Digital conference materials',
      'Breakfast and lunch included'
    ],
    availability: 50
  },
  {
    id: '2',
    type: 'Standard',
    price: 399,
    benefits: [
      'Access to all sessions',
      'Networking reception',
      'Digital conference materials',
      'Breakfast and lunch included'
    ],
    availability: 200,
    popular: true
  },
  {
    id: '3',
    type: 'VIP',
    price: 799,
    benefits: [
      'Access to all sessions',
      'VIP networking reception',
      'Physical conference materials',
      'All meals included',
      'Meet & greet with speakers',
      'Priority seating'
    ],
    availability: 25
  }
];