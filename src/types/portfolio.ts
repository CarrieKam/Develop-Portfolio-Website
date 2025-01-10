export interface Social {
  linkedin: string;
  github: string;
  email: string;
}

export interface Profile {
  name: string;
  status: string;
  place: string;
  program: string;
  description: string;
}

export interface About {
  achievements: Array<{
    title: string;
    description: string;
  }>;
}

export interface Work {
  timeline: Array<{
    title: string;
    company: string;
    location: string;
    date: string;
    description: string[]; 
    tags: string[];
  }>;
}

export interface PortfolioData {
  profile: Profile;
  about: About;
  social: Social;
  work: Work;
}

export interface Language {
  en: PortfolioData;
  fr: PortfolioData;
}

export type ThemeType = "light" | "dark";
export type LanguageType = "en" | "fr";
