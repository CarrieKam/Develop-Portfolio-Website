import { usePortfolio } from '../context/PortfolioContext';
import workIcon from '../assets/logos/work.svg';
import { Timeline } from './ui/timeline';

const WorkTimeline = () => {
  const { data } = usePortfolio();

  return (
    <section id="work" className="max-w-7xl mx-auto px-8 mb-20">
      <div className="flex items-center space-x-4 mb-8">
        <img src={workIcon} alt="Work icon" className="w-12 h-12" />
        <h2 className="text-4xl font-bold">Work</h2>
      </div>
      
      <div className="w-full">
        <Timeline 
          data={data.work.timeline.map(entry => ({
            title: [{ date: entry.date, location: entry.location }],
            content: (
              <div className="p-4 bg-gray-100 dark:bg-[#1a2c34] rounded-lg shadow-md border">
                <p className="text-lg font-medium">{entry.company}</p>
                <ul className="list-disc ml-4 space-y-2">
                  {entry.description.map((desc, index) => (
                    <li key={index} className="dark:text-gray-300 text-[#090B10] text-base">{desc}</li>
                  ))}
                </ul>

                {/* Tags section */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 text-sm bg-[#53CBDD] dark:bg-[#13404F] text-[090B10] dark:text-[#CAEDFA] rounded-full">#{tag}</span>
                  ))}
                </div>
              </div>
            )
          }))} 
        />
      </div>
    </section>
  );
};

export default WorkTimeline;