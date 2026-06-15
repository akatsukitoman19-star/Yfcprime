export interface Trainer {
  id: string;
  name: string;
  role: string;
  experience: string;
  imageUrl: string;
  specialties: string[];
  bio: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: 'Cardio' | 'Strength' | 'Power' | 'Free Weights' | 'Functional';
  imageUrl: string;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  price: number;
  period: string;
  features: string[];
  color: string;
  featured?: boolean;
}

export interface Transformation {
  id: string;
  title: string;
  type: string;
  beforeImg: string;
  afterImg: string;
  beforeStats: string;
  afterStats: string;
  description: string;
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatarUrl: string;
  meta: string;
}

export interface ClassSchedule {
  id: string;
  className: string;
  time: string;
  trainer: string;
  day: string;
  intensity: 'Medium' | 'High' | 'Extreme';
}
