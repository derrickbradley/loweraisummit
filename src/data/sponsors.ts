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
    logo: 'https://via.placeholder.com/200x100/6366f1/ffffff?text=TechCorp+AI',
    tier: 'platinum',
    website: 'https://techcorp.ai',
    description: 'Leading AI infrastructure provider'
  },
  {
    id: '2',
    name: 'DataFlow Systems',
    logo: 'https://via.placeholder.com/200x100/8b5cf6/ffffff?text=DataFlow',
    tier: 'platinum',
    website: 'https://dataflow.com',
    description: 'Enterprise data solutions'
  },
  {
    id: '3',
    name: 'CloudAI Solutions',
    logo: 'https://via.placeholder.com/200x100/3b82f6/ffffff?text=CloudAI',
    tier: 'gold',
    website: 'https://cloudai.com',
    description: 'Cloud-native AI platforms'
  },
  {
    id: '4',
    name: 'Neural Networks Inc',
    logo: 'https://via.placeholder.com/200x100/06b6d4/ffffff?text=Neural+Net',
    tier: 'gold',
    website: 'https://neuralnetworks.com',
    description: 'Advanced neural network research'
  },
  {
    id: '5',
    name: 'AutoML Pro',
    logo: 'https://via.placeholder.com/200x100/10b981/ffffff?text=AutoML+Pro',
    tier: 'gold',
    website: 'https://automlpro.com',
    description: 'Automated machine learning tools'
  },
  {
    id: '6',
    name: 'VisionTech',
    logo: 'https://via.placeholder.com/200x100/f59e0b/ffffff?text=VisionTech',
    tier: 'silver',
    website: 'https://visiontech.ai',
    description: 'Computer vision specialists'
  },
  {
    id: '7',
    name: 'RoboMind',
    logo: 'https://via.placeholder.com/200x100/ef4444/ffffff?text=RoboMind',
    tier: 'silver',
    website: 'https://robomind.com',
    description: 'AI-powered robotics'
  },
  {
    id: '8',
    name: 'QuantumAI Labs',
    logo: 'https://via.placeholder.com/200x100/8b5cf6/ffffff?text=QuantumAI',
    tier: 'silver',
    website: 'https://quantumai.com',
    description: 'Quantum computing research'
  },
  {
    id: '9',
    name: 'EdgeCompute',
    logo: 'https://via.placeholder.com/200x100/6b7280/ffffff?text=EdgeCompute',
    tier: 'bronze',
    website: 'https://edgecompute.io',
    description: 'Edge AI solutions'
  },
  {
    id: '10',
    name: 'NLP Dynamics',
    logo: 'https://via.placeholder.com/200x100/374151/ffffff?text=NLP+Dynamics',
    tier: 'bronze',
    website: 'https://nlpdynamics.com',
    description: 'Natural language processing'
  },
  {
    id: '11',
    name: 'AI Ethics Foundation',
    logo: 'https://via.placeholder.com/200x100/059669/ffffff?text=AI+Ethics',
    tier: 'bronze',
    website: 'https://aiethics.org',
    description: 'Responsible AI development'
  },
  {
    id: '12',
    name: 'StartupAI Accelerator',
    logo: 'https://via.placeholder.com/200x100/dc2626/ffffff?text=StartupAI',
    tier: 'bronze',
    website: 'https://startupai.com',
    description: 'AI startup incubator'
  }
];