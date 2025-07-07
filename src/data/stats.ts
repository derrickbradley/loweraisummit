export interface ConferenceStat {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export const conferenceStats: ConferenceStat[] = [
  {
    id: '1',
    value: '5000+',
    label: 'AI Professionals',
    icon: 'users'
  },
  {
    id: '2',
    value: '50+',
    label: 'AI Experts',
    icon: 'mic'
  },
  {
    id: '3',
    value: '24',
    label: 'AI Sessions',
    icon: 'calendar'
  },
  {
    id: '4',
    value: '2',
    label: 'Days of AI',
    icon: 'clock'
  },
  {
    id: '5',
    value: '15+',
    label: 'Countries',
    icon: 'globe'
  },
  {
    id: '6',
    value: '98%',
    label: 'AI Satisfaction',
    icon: 'star'
  }
];