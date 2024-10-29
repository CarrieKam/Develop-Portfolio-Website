import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import girl from '../assets/girl.png'


const Profile = () => {
    const { data, theme } = usePortfolio();
    const { profile, social } = data;
  
    return (
        <div>
            <div className="flex items-center justify-between p-8">
                <div className="space-y-4">
                <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}></h1>
                <h1 className="text-xl font-bold">{profile.name}</h1>
                <p>{profile.title}</p>
                <p>{profile.school}</p>
                <p>{profile.program}</p>
                <p>{profile.description}</p>
                <div className="flex space-x-4 mt-4">
                    <button className="px-4 py-2 bg-teal-500 rounded">CV (fr)</button>
                    <button className="px-4 py-2 bg-teal-500 rounded">CV (en)</button>
                </div>
                </div>
                <div className="relative">
                <div className="w-40 h-40 bg-gray-200 rounded-full">
                    {<img src={girl} alt="Asian girl image"/>}
                </div>
                <div className="flex space-x-4 mt-4 justify-center">
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
