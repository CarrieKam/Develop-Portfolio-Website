import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioData, Language, ThemeType, LanguageType } from '../types/portfolio';

const portfolioData: Language = {
  en: {
    profile: {
      name: "Carrie Kam",
      status: "4th year student at",
      place: "Polytechnique Montreal University",
      program: "in Software Engineering",
      description: "I have a strong interest in innovative technology and real-world applications. Constantly building side projects and diving into new tech to expand my skills and stay on the cutting edge. Eager to bring my dedication and creativity to a forward-thinking team in the tech industry.",
    },
    about: {
      achievements: [
        {
          title: "Hackathon",
          description: "Attended 10+ Hackathons (Hack the North, PolyHX, sheHacks, etc.), mostly online and always ready to code like a storm!",
        },
        {
          title: "McHacks9 Entertainer Prize",
          description: "Awarded the Entertainer prize at McHacks9 for the project: Scanspect - because who says potatoes can't be fun?",
        },
        {
          title: "Data Visualization",
          description: "As a class option, chose a data visualization class, because numbers deserve to be dressed up in style",
        },
        {
          title: "FreeCodeCamp Certified",
          description: "Completed the FreeCodeCamp certification for Responsive Web Design for +300 hours",
        },
        {
          title: "Angular",
          description: "Mastered Front-End skills (Angular) through sheer determination and boundless curiosity.",
        }
      ]
    },
    social: {
      linkedin: "https://www.linkedin.com/in/carrie-kam-1837b3193/",
      github: "https://github.com/CarrieKam",
      email: "carriekam@protonmail.com"
    }
  },
  fr: {
    profile: {
      name: "Carrie Kam",
      status: "Étudiant en 4ème année à",
      place: "l'Université Polytechnique de Montréal",
      program: "en génie logiciel",
      description: "Aime faire des projets personnels et découvrir de nouvelles technologies",
    },
    about: {
      achievements: [
        {
          title: "Hackathon",
          description: "Attended 10+ Hackathons (Hack the North, PolyHX, sheHacks, etc.), mostly online and always ready to code like a storm!",
        },
        {
          title: "McHacks9 Entertainer Prize",
          description: "Awarded the Entertainer prize at McHacks9 for the project: Scanspect - because who says potatoes can't be fun?",
        },
        {
          title: "Data Visualization",
          description: "As a class option, chose a data visualization class, because numbers deserve to be dressed up in style",
        },
        {
          title: "FreeCodeCamp Certified",
          description: "Completed the FreeCodeCamp certification for Responsive Web Design for +300 hours",
        },
        {
          title: "Angular",
          description: "Mastered Front-End skills (Angular) through sheer determination and boundless curiosity.",
        }
      ]
    },
    social: {
      linkedin: "https://www.linkedin.com/in/carrie-kam-1837b3193/",
      github: "https://github.com/CarrieKam",
      email: "carriekam@protonmail.com"
    }
  }
};

interface PortfolioContextType {
  data: PortfolioData;                                         // Holds portfolio content
  language: LanguageType;                                      // Stores the current language (e.g., "en" for English)
  theme: ThemeType;                                            // Stores the current theme (e.g., "dark")
  isLoading: boolean;                                          // Tracks if data is loading
  setLanguage: (lang: LanguageType) => void;                   // Function to change the language
  setTheme: (theme: ThemeType) => void;                        // Function to change the theme
  updateContent: (newContent: Partial<PortfolioData>) => void; // Updates portfolio content
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageType>('en');
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<Language>(portfolioData);
  const [theme, setTheme] = useState<ThemeType>(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Simulate initial loading
  // useEffect runs a function once after the component renders
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Apply the theme to the document's root element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');

    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    localStorage.setItem('theme', theme);

  }, [theme]); // This effect runs whenever the 'theme' state changes

  // Catches in real-time if the theme changed in the browser
  useEffect(() => {
    const preferDark = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (mediaEvent: MediaQueryListEvent) => {
      setTheme(mediaEvent.matches ? 'dark' : 'light');
    };

    preferDark.addEventListener('change', handleChange);

    return () => preferDark.removeEventListener('change', handleChange);
  }, []);

  const updateContent = (newContent: Partial<PortfolioData>) => {
    setContent(prev => ({
      // copies all properties from prev (the previous content state) into a new object, ensuring other parts of content stay unchanged
      ...prev,
      // dynamically sets a property key based on the current language. For instance, if language is "en", it targets prev.en
      [language]: {
        // ensuring that any updated properties in newContent replace those in prev[language], while other existing properties are kept intact
        ...prev[language],
        ...newContent
      }
    }));
  };

  // Creates the values that PortfolioContext will give to any child components
  const value = {
    data: content[language],
    language,
    theme,
    isLoading,
    setLanguage,
    setTheme,
    updateContent
  };

  return (
    // Wrap {children} (all child components) inside PortfolioContext.Provider to make value accessible to them
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

export { PortfolioProvider, usePortfolio };