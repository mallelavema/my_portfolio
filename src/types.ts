export interface Project {
  id: string;
  title: string;
  date: string;
  tools: string[];
  category: 'Machine Learning' | 'Data Visualization' | 'Generative AI' | 'Data Analytics';
  description: string;
  bullets: string[];
  metrics?: { label: string; value: string }[];
  accentColor: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  companyOrInstitution: string;
  location: string;
  date: string;
  type: 'experience' | 'education';
  bullets?: string[];
  iconName: 'work' | 'education' | 'certification';
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number }[]; // level out of 100
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}
