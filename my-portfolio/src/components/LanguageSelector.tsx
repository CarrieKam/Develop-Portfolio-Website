import { usePortfolio } from '../context/PortfolioContext';
import React from 'react';

const LanguageSelector = () => {
  const { language, setLanguage } = usePortfolio();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as 'en' | 'fr')}
      className="bg-[#E3CAC6] border rounded px-3 text-black h-14 mt-1"
    >
      <option value="en">EN</option>
      <option value="fr">FR</option>
    </select>
  );
};

export default LanguageSelector;