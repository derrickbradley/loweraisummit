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
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Keynote Presentation',
    description: 'Dr. Sarah Chen delivering the opening keynote',
    category: 'speakers'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Interactive Workshop',
    description: 'Hands-on AI workshop session',
    category: 'sessions'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Networking Reception',
    description: 'Evening networking with industry leaders',
    category: 'networking'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Main Auditorium',
    description: 'State-of-the-art conference venue',
    category: 'venue'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Panel Discussion',
    description: 'Expert panel on AI ethics',
    category: 'sessions'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Innovation Showcase',
    description: 'Latest AI innovations on display',
    category: 'venue'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Workshop Session',
    description: 'Deep learning workshop in progress',
    category: 'sessions'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&auto=format&q=80',
    title: 'Networking Lunch',
    description: 'Connecting over shared interests',
    category: 'networking'
  }
];