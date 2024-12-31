import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = usePortfolio();
  const dropdownRef = useRef<HTMLDivElement>(null); // Reference to dropdown element

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Closes dropdown when clicking outside
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageSelect = (selectedLanguage: 'en' | 'fr') => {
    setLanguage(selectedLanguage);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-20 h-12 px-3 bg-[#E3CAC6] text-black rounded-lg "
      >
        <span className="font-medium">{language.toUpperCase()}</span>
        
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-20 mt-1 bg-[#E3CAC6] rounded-md ">
          <div className="py-1">
          <button
            onClick={() => handleLanguageSelect('en')}
            className={`w-full px-3 py-2 text-left text-black hover:bg-[#d4b5b0]`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageSelect('fr')}
            className={`w-full px-3 py-2 text-left text-black hover:bg-[#d4b5b0]`}
          >
            FR
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;