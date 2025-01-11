import { useState, useEffect } from "react";
import { MenuIcon } from "lucide-react";
import { Menu } from '@headlessui/react';

import aboutIcon from '../assets/logos/info.svg';
import workIcon from '../assets/logos/work.svg';
import projectsIcon from '../assets/logos/project.svg';
import educationIcon from '../assets/logos/education.svg';

const Navigation = () => {
  const navigationItems = [
    { name: 'About', icon: aboutIcon, id: 'about' },
    { name: 'Work', icon: workIcon, id: 'work' },
    { name: 'Projects', icon: projectsIcon, id: 'projects' },
    { name: 'Education', icon: educationIcon, id: 'education' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Close menu after clicking (for mobile)
      setIsOpen(false);
    }
  };

  return (
    <header>
      <nav className="fixed right-8 flex justify-between items-center p-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex space-x-4">
          {navigationItems.map(({ name, icon, id }) => (
            <button
              key={name}
              onClick={() => scrollToSection(id)}
              className="flex items-center px-3 py-2 rounded-lg text-xl 
                         relative overflow-hidden cursor-pointer"
            >
              <img src={icon} alt={name} className="w-10 h-10 mr-2" />
              {name}
              <span
                className="absolute inset-0 border-[#A3466A] border-2 
                           rounded-lg opacity-0 transition-opacity duration-100 
                           hover:opacity-100"
              ></span>
            </button>
          ))}
        </div>

        {/* Small screen */}
        <div className="lg:hidden cursor-pointer">
          <Menu as="div" className="relative inline-block text-left">
            {({ open }) => {
              // Sync Menu's open state with our local state
              if (open !== isOpen) {
                setIsOpen(open);
              }
              
              return (
                <>
                  <Menu.Button 
                    className="p-2 text-black dark:text-gray-200 hover:bg-gray-300 hover:dark:bg-gray-700 rounded-lg transition-colors"
                  >
                    <MenuIcon className="size-6" />
                  </Menu.Button>

                  <Menu.Items
                    className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-gray-200 dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      {navigationItems.map(({ name, icon, id }) => (
                        <Menu.Item key={id}>
                          {({ active }) => (
                            <button
                              onClick={() => scrollToSection(id)}
                              className={`${
                                active ? "bg-gray-200 dark:bg-gray-800" : ""
                              } flex items-center w-full px-4 py-2 text-sm dark:text-gray-200 hover:bg-gray-300 hover:dark:bg-gray-700`}
                            >
                              <img src={icon} alt={name} className="mr-3 w-5 h-5" />
                              {name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </>
              );
            }}
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;