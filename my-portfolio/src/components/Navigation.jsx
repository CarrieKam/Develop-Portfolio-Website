import aboutIcon from '../assets/logos/info.svg';
import workIcon from '../assets/logos/work.svg';
import projectsIcon from '../assets/logos/project.svg';
import educationIcon from '../assets/logos/education.svg'; 

const Navigation = () => {
  const navigationItems = [
    { name: 'About', icon: aboutIcon },
    { name: 'Work', icon: workIcon },
    { name: 'Projects', icon: projectsIcon },
    { name: 'Education', icon: educationIcon },
  ];

  return (
    <nav className="fixed right-4 flex justify-between items-center p-4">
      <div className="flex space-x-4">
        {navigationItems.map(({ name, icon }) => (
          <button 
            key={name} 
            className="flex items-center px-3 py-2 rounded-md text-xl hover:bg-[#E3CAC6]"
          >
            <img src={icon} alt={name} className="w-10 h-10 mr-2" /> 
            {name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;