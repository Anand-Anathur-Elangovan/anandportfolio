export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'Enterprise AI' | 'Full Stack' | 'Data Science' | 'Cloud' | 'Freelance' | 'Personal AI';
  status: 'Production' | 'In Development' | 'Completed' | 'Research';
  featured: boolean;
  heroGradient: string;
  tags: string[];
  techStack: TechItem[];
  problem: string;
  solution: string;
  challenges: string[];
  businessImpact: ImpactItem[];
  architecture?: ArchNode[];
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  metrics?: Metric[];
  company: string;
  year: string;
}

export interface TechItem {
  name: string;
  category: string;
  icon?: string;
}

export interface ImpactItem {
  metric: string;
  value: string;
  description: string;
}

export interface Metric {
  label: string;
  value: string;
  unit?: string;
}

export interface ArchNode {
  id: string;
  label: string;
  type: 'llm' | 'db' | 'api' | 'service' | 'user' | 'storage' | 'queue' | 'model';
  x: number;
  y: number;
  connections: string[];
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  logo?: string;
  role: string;
  duration: string;
  startDate: string;
  endDate: string | null;
  location: string;
  type: 'Full-time' | 'Contract' | 'Freelance';
  description: string;
  highlights: string[];
  technologies: string[];
  color: string;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number; // 0-100
  icon?: string;
  color: string;
  description?: string;
  yearsOfExperience?: number;
  projects?: string[];
}

export type SkillCategory =
  | 'AI/ML'
  | 'Cloud'
  | 'Frontend'
  | 'Backend'
  | 'Data'
  | 'DevOps'
  | 'Languages'
  | 'Frameworks';

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  badgeColor: string;
  category: string;
  icon?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  featured: boolean;
  coverImage?: string;
  category: string;
}

export interface AIDemo {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  tags: string[];
  status: 'Live' | 'Beta' | 'Coming Soon';
  features: string[];
  techStack: string[];
}

export interface HoloCubeFace {
  id: string;
  face: 'front' | 'back' | 'top' | 'bottom' | 'left' | 'right';
  label: string;
  emoji: string;
  color: string;
  glowColor: string;
  description: string;
  techItems: string[];
  linkedProjects: string[];
  archNodes?: ArchNode[];
}

export interface KnowledgeBase {
  about: AboutKnowledge;
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  faqs: FAQ[];
}

export interface AboutKnowledge {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  availability: string;
  email: string;
  linkedin: string;
  github: string;
  yearsOfExperience: number;
  specializations: string[];
}

export interface FAQ {
  question: string;
  keywords: string[];
  answer: string;
}
