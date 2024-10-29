import { Sun, Moon } from 'lucide-react';
import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';

const ThemeToggle = () => {
  const { theme, setTheme } = usePortfolio();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-700"
    >
      {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
};

export default ThemeToggle;