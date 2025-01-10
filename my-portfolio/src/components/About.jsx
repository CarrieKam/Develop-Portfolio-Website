import { usePortfolio } from '../context/PortfolioContext';
import { Trophy, FileCode2, BarChart, CheckCircle, Code } from 'lucide-react';
import aboutIcon from '../assets/logos/info.svg';

const About = () => {
  const { data } = usePortfolio();
  const achievements = data.about.achievements || [];

  const iconMap = {
    'Hackathon': <FileCode2 className="text-white w-8 h-8" />,
    'McHacks9 Entertainer Prize': <Trophy className="text-white w-8 h-8" />,
    'Data Visualization': <BarChart className="text-white w-8 h-8" />,
    'FreeCodeCamp Certified': <CheckCircle className="text-white w-8 h-8" />,
    'Angular': <Code className="text-white w-8 h-8" />,
  };

  return (
    <section id="about">
      <div className="flex items-center space-x-4 mb-8 mx-8">
        <img src={aboutIcon} alt="About icon" className="w-12 h-12" />
        <h2 className="text-4xl font-bold">About</h2>
      </div>
      <div className="space-y-4 relative">
        {achievements.map((achievement, index) => (
          <div key={index} className="relative">
            {/* Arrow connecting Hackathon to McHacks9 */}
            {achievement.title === 'Hackathon' && (
              <div className="absolute left-12 top-full w-px h-24 bg-[#203d49] dark:bg-[#3DB7CA] p-2 z-10" />
            )}

            <div
              className={`p-8 rounded-lg transition-colors duration-200 relative mx-8 ${
                achievement.title === 'McHacks9 Entertainer Prize'
                  ? 'ml-20 bg-[#3DB7CA] dark:bg-[#1a2c34]'
                  : 'bg-[#3DB7CA] dark:bg-[#1a2c34]'
              }`}
            >
              {/* Connection line for McHacks9 */}
              {achievement.title === 'McHacks9 Entertainer Prize' && (
                <div className="absolute -left-8 top-1/2 w-8 bg-[#203d49] dark:bg-[#3DB7CA] p-2" />
              )}

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-[#253D5B] dark:bg-[#3DB7CA] rounded-lg flex items-center justify-center flex-shrink-0">
                  {iconMap[achievement.title] || <Code className="text-white w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {achievement.title}
                  </h3>
                  <p className="text-white dark:text-gray-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;