import { useEffect, useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import girl from '../assets/images/girl.png';
import { Spotlight } from './ui/Spotlight';

const Profile = () => {
  const { data } = usePortfolio();
  const { profile, social } = data;
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <section id="profile">
      <Spotlight className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="white"/>
      <Spotlight className="top-10 left-90 h-[80vh] w-[50vw]" fill="purple"/>
      <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue"/>
      <div className="flex items-center justify-between h-screen mx-8 mb-20">
        <div className="space-y-7">
          <h1 className="text-7xl mt-20 font-bold leading-30">
            {greeting}!<br /> I'm <span className="underline decoration-sky-500">{profile.name}</span>
          </h1>
          <h2 className="text-2xl leading-10">
            {profile.status} {profile.place} {profile.program}
          </h2>
          <h2 className="text-2xl leading-10">{profile.description}</h2>
          <div className="flex space-x-4 mt-4">
            <button className="px-6 py-3 bg-[#3DB7CA] text-2xl text-white rounded-lg shadow transition-all duration-200 hover:shadow-[inset_0_6px_10px_0_rgba(0,0,0,0.6)]">
              CV (fr)
            </button>
            <button className="px-6 py-3 bg-[#3DB7CA] text-2xl text-white rounded-lg shadow transition-all duration-200 hover:shadow-[inset_0_6px_10px_0_rgba(0,0,0,0.6)]">
              CV (en)
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="w-60 h-60 ml-4 bg-gray-200 rounded-full">
            <img src={girl} alt="Asian girl image" />
          </div>
          <div className="flex space-x-6 mt-4 ml-4 justify-center">
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-8 h-8 text-[#3DB7CA] hover:text-[#A3466A]" />
            </a>
            <a href={social.github} target="_blank" rel="noopener noreferrer">
              <Github className="w-8 h-8 text-[#3DB7CA] hover:text-[#A3466A]" />
            </a>
            <a href={`mailto:${social.email}`}>
              <Mail className="w-8 h-8 text-[#3DB7CA] hover:text-[#A3466A]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;