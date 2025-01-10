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
              className="flex inset-0 border-[#A3466A] border-2 
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

/*

 <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="lg:hidden" role="dialog" aria-modal="true">
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0 z-50"></div>
      <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="">
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg class="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Product</a>
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Features</a>
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Marketplace</a>
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Company</a>
            </div>
            <div class="py-6">
              <a href="#" class="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">Log in</a>
            </div>
          </div>
        </div>
      </div>

https://tailwindui.com/components/marketing/sections/heroes
      */