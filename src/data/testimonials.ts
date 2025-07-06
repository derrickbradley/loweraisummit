export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Jennifer Martinez',
    title: 'CTO',
    company: 'InnovateAI Corp',
    content: 'Raise Summit 2024 was transformative for our AI strategy. The insights from industry leaders helped us accelerate our product development by months.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '2',
    name: 'David Chen',
    title: 'Head of Machine Learning',
    company: 'TechFlow Solutions',
    content: 'The networking opportunities were incredible. I connected with potential partners and learned about cutting-edge research that directly impacts our work.',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '3',
    name: 'Dr. Sarah Kim',
    title: 'AI Research Director',
    company: 'FutureTech Labs',
    content: 'Outstanding speaker lineup and well-organized sessions. The deep learning workshops provided practical insights I could immediately apply to our projects.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '4',
    name: 'Michael Rodriguez',
    title: 'Founder & CEO',
    company: 'AI Startup Hub',
    content: 'As a startup founder, the insights on scaling AI products were invaluable. The conference exceeded my expectations in every way.',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    title: 'VP of Engineering',
    company: 'DataMind Technologies',
    content: 'The quality of content and speakers was exceptional. I left with actionable strategies for implementing AI ethics in our development process.',
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  },
  {
    id: '6',
    name: 'Robert Park',
    title: 'Senior Data Scientist',
    company: 'CloudScale AI',
    content: 'The hands-on workshops were fantastic. I learned new techniques that I\'m already implementing in my current projects. Can\'t wait for 2025!',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5
  }
];