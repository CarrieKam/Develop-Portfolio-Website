import { usePortfolio } from '../context/PortfolioContext';
import React from 'react';

const LanguageSelector = () => {
  const { language, setLanguage } = usePortfolio();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
      className="bg-transparent border border-gray-600 rounded px-2"
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
    </select>
  );
};

export default LanguageSelector;