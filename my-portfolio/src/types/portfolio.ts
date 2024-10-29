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
    skills: string[];
    operatingSystems: string[];
    learning: string[];
  }
  
  export interface PortfolioData {
    profile: Profile;
    about: About;
    social: Social;
  }
  
  export interface Language {
    en: PortfolioData;
    fr: PortfolioData;
  }
  
  export type ThemeType = 'light' | 'dark';
  export type LanguageType = 'en' | 'fr';