import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { tickets } from '../data/tickets';
import { TicketModal } from './TicketModal';

export const Tickets: React.FC = () => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const handlePurchase = (ticketId: string) => {
    setSelectedTicket(ticketId);
  };

  const closeModal = () => {
    setSelectedTicket(null);
  };

  const selectedTicketData = tickets.find(t => t.id === selectedTicket);

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Ticket
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the ticket that best fits your needs and join us for an unforgettable experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
                ticket.popular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {ticket.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-center py-2 font-semibold">
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              
              <div className={`p-8 ${ticket.popular ? 'pt-16' : ''}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{ticket.type}</h3>
                
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-4xl font-bold text-purple-600">${ticket.price}</span>
                    {ticket.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">${ticket.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{ticket.availability} tickets remaining</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {ticket.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handlePurchase(ticket.id)}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Purchase Ticket
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Purchase Modal */}
      <AnimatePresence>
        {selectedTicket && selectedTicketData && (
          <TicketModal
            isOpen={true}
            onClose={closeModal}
            selectedTicketId={selectedTicket}
          />
        )}
      </AnimatePresence>
    </section>
  );
};