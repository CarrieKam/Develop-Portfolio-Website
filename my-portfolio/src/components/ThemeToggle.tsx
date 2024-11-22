import { Sun, Moon } from 'lucide-react';
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const ThemeToggle = () => {
  const { theme, setTheme } = usePortfolio();

  return (
    <button 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`
        relative w-24 h-14 rounded-full transition-colors duration-300 
        ${theme === 'dark' ? 'bg-[#A3466A]' : 'bg-[#3DB7CA]'}
        hover:opacity-90
      `}
      aria-label="Toggle theme"
    >
      {/* Eye Container - White Circle */}
      <div 
        className={`
          absolute top-1 h-12 w-12 rounded-full bg-[#E3CAC6]
          transition-all duration-300 flex items-center justify-center
          ${theme === 'dark' ? 'left-2' : 'left-10'}
        `}
      >
        {/* Sun and Moon Icons */}
        {theme === 'dark' ? (
          <Moon className="w-6 h-6 text-black" />
        ) : (
          <Sun className="w-6 h-6 text-black" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;