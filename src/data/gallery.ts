export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: 'speakers' | 'venue' | 'networking' | 'sessions';
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Keynote Presentation',
    description: 'Dr. Sarah Chen delivering the opening keynote',
    category: 'speakers'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Interactive Workshop',
    description: 'Hands-on AI workshop session',
    category: 'sessions'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Networking Reception',
    description: 'Evening networking with industry leaders',
    category: 'networking'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Main Auditorium',
    description: 'State-of-the-art conference venue',
    category: 'venue'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Panel Discussion',
    description: 'Expert panel on AI ethics',
    category: 'sessions'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/2608516/pexels-photo-2608516.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Innovation Showcase',
    description: 'Latest AI innovations on display',
    category: 'venue'
  },
  {
    id: '7',
    url: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Workshop Session',
    description: 'Deep learning workshop in progress',
    category: 'sessions'
  },
  {
    id: '8',
    url: 'https://images.pexels.com/photos/2608515/pexels-photo-2608515.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Networking Lunch',
    description: 'Connecting over shared interests',
    category: 'networking'
  }
];