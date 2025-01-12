import { usePortfolio } from '../context/PortfolioContext';
import educationIcon from '../assets/logos/education.svg';

const Education = () => {
  const { data } = usePortfolio();

  return (
    <section id="education" className="max-w-7xl mx-auto px-8 mb-20">
      <div className="flex items-center space-x-4 mb-8">
        <img src={educationIcon} alt="Work icon" className="w-12 h-12" />
        <h2 className="text-4xl font-bold">Education</h2>
      </div>
    </section>
  )
}

export default Education;