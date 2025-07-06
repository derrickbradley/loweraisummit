import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { FeaturedSpeakers } from '../components/FeaturedSpeakers';
import { Gallery } from '../components/Gallery';
import { Testimonials } from '../components/Testimonials';
import { Sponsors } from '../components/Sponsors';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetTickets = () => {
    navigate('/tickets');
  };

  return (
    <>
      <Hero onGetTickets={handleGetTickets} />
      <Stats />
      <FeaturedSpeakers />
      <Gallery />
      <Testimonials />
      <Sponsors />
    </>
  );
};