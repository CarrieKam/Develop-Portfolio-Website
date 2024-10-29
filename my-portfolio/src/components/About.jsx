import { usePortfolio } from '../context/PortfolioContext';

const About = () => {
    const { data } = usePortfolio();
    const { about } = data;
  
    return (
      <section className="p-8">
        <h2 className="text-xl font-bold mb-4">About</h2>
        <ul className="space-y-4">
          {about.skills.map((skill, index) => (
            <li key={index}>• {skill}</li>
          ))}
          <li>
            • Operating system:
            <ul className="ml-4">
              {about.operatingSystems.map((os, index) => (
                <li key={index}>• {os}</li>
              ))}
            </ul>
          </li>
          <li>
            • How I learn:
            <ul className="ml-4">
              {about.learning.map((method, index) => (
                <li key={index}>• {method}</li>
              ))}
            </ul>
          </li>
        </ul>
      </section>
    );
  };

export default About;
