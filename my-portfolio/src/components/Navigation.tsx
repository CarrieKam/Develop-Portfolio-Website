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

  const scrollToSection = (sectionId:any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header>
      <nav className="fixed right-4 flex justify-between items-center p-4">
      <div className="flex space-x-4">
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
      </nav>
    </header>
  );
};

export default Navigation;