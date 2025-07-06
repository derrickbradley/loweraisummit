export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
  website: string;
  description: string;
}

export const sponsors: Sponsor[] = [
  {
    id: '1',
    name: 'TechCorp AI',
    logo: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'platinum',
    website: 'https://techcorp.ai',
    description: 'Leading AI infrastructure provider'
  },
  {
    id: '2',
    name: 'DataFlow Systems',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'platinum',
    website: 'https://dataflow.com',
    description: 'Enterprise data solutions'
  },
  {
    id: '3',
    name: 'CloudAI Solutions',
    logo: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'gold',
    website: 'https://cloudai.com',
    description: 'Cloud-native AI platforms'
  },
  {
    id: '4',
    name: 'Neural Networks Inc',
    logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'gold',
    website: 'https://neuralnetworks.com',
    description: 'Advanced neural network research'
  },
  {
    id: '5',
    name: 'AutoML Pro',
    logo: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'gold',
    website: 'https://automlpro.com',
    description: 'Automated machine learning tools'
  },
  {
    id: '6',
    name: 'VisionTech',
    logo: 'https://images.pexels.com/photos/3184337/pexels-photo-3184337.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'silver',
    website: 'https://visiontech.ai',
    description: 'Computer vision specialists'
  },
  {
    id: '7',
    name: 'RoboMind',
    logo: 'https://images.pexels.com/photos/3184336/pexels-photo-3184336.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'silver',
    website: 'https://robomind.com',
    description: 'AI-powered robotics'
  },
  {
    id: '8',
    name: 'QuantumAI Labs',
    logo: 'https://images.pexels.com/photos/3184335/pexels-photo-3184335.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'silver',
    website: 'https://quantumai.com',
    description: 'Quantum computing research'
  },
  {
    id: '9',
    name: 'EdgeCompute',
    logo: 'https://images.pexels.com/photos/3184334/pexels-photo-3184334.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'bronze',
    website: 'https://edgecompute.io',
    description: 'Edge AI solutions'
  },
  {
    id: '10',
    name: 'NLP Dynamics',
    logo: 'https://images.pexels.com/photos/3184333/pexels-photo-3184333.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'bronze',
    website: 'https://nlpdynamics.com',
    description: 'Natural language processing'
  },
  {
    id: '11',
    name: 'AI Ethics Foundation',
    logo: 'https://images.pexels.com/photos/3184332/pexels-photo-3184332.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'bronze',
    website: 'https://aiethics.org',
    description: 'Responsible AI development'
  },
  {
    id: '12',
    name: 'StartupAI Accelerator',
    logo: 'https://images.pexels.com/photos/3184331/pexels-photo-3184331.jpeg?auto=compress&cs=tinysrgb&w=200',
    tier: 'bronze',
    website: 'https://startupai.com',
    description: 'AI startup incubator'
  }
];