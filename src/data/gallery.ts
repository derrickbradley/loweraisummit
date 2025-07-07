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
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=keynote&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Keynote Presentation',
    description: 'Dr. Sarah Chen delivering the opening keynote',
    category: 'speakers'
  },
  {
    id: '2',
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=workshop&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Interactive Workshop',
    description: 'Hands-on AI workshop session',
    category: 'sessions'
  },
  {
    id: '3',
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=networking&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Networking Reception',
    description: 'Evening networking with industry leaders',
    category: 'networking'
  },
  {
    id: '4',
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=auditorium&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Main Auditorium',
    description: 'State-of-the-art conference venue',
    category: 'venue'
  },
  {
    id: '5',
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=panel&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Panel Discussion',
    description: 'Expert panel on AI ethics',
    category: 'sessions'
  },
  {
    id: '6',
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=innovation&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Innovation Showcase',
    description: 'Latest AI innovations on display',
    category: 'venue'
  },
  {
    id: '7',
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=deeplearning&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Workshop Session',
    description: 'Deep learning workshop in progress',
    category: 'sessions'
  },
  {
    id: '8',
    url: 'https://api.dicebear.com/7.x/illustrations/svg?seed=lunch&backgroundColor=b6e3f4,c0aede,d1d4f9',
    title: 'Networking Lunch',
    description: 'Connecting over shared interests',
    category: 'networking'
  }
];