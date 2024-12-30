import React, { useEffect, useState } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import girl from '../assets/girl.png'


const Profile = () => {
    const { data, theme } = usePortfolio();
    const { profile, social } = data;
    const [greeting, setGreeting] = useState();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good morning');
        else if (hour < 18) setGreeting('Good afternoon');
        else setGreeting('Good evening');
      }, []);

    return (
        <div>
            <div className="flex items-center justify-between pt-64">
                <div className="space-y-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white"></h1>
                <h1 className="text-7xl font-bold">{greeting}!<br></br> I'm {profile.name}</h1>
                <h2 className="text-2xl">{profile.status} {profile.place} {profile.program}</h2>
                <h2 className="text-2xl">{profile.description}</h2>
                <div className="flex space-x-4 mt-4">
                    <button className="px-4 py-2 bg-teal-500 rounded">CV (fr)</button>
                    <button className="px-4 py-2 bg-teal-500 rounded">CV (en)</button>
                </div>
                </div>
                <div className="relative">
                <div className="w-60 h-60 ml-4 bg-gray-200 rounded-full">
                    {<img src={girl} alt="Asian girl image"/>}
                </div>
                <div className="flex space-x-6 mt-4 ml-4 justify-center">
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6 hover:text-teal-500" />
                    </a>
                    <a href={social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6 hover:text-teal-500" />
                    </a>
                    <a href={`mailto:${social.email}`}>
                    <Mail className="w-6 h-6 hover:text-teal-500" />
                    </a>
                </div>
            </div>
        </div>               
    </div>
    );
  };

  export default Profile;
