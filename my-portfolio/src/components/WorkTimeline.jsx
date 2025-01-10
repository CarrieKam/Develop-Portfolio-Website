import { usePortfolio } from '../context/PortfolioContext';
import workIcon from '../assets/logos/work.svg';

const WorkTimeline = () => {
  const { data } = usePortfolio();

  return (
    <section id="work" className="max-w-7xl mx-auto py-32 px-8">
      <div className="flex items-center space-x-4 mb-8">
        <img src={workIcon} alt="Work icon" className="w-12 h-12" />
        <h2 className="text-4xl font-bold">Work</h2>
      </div>
      <div className="relative">
        {/* Continuous timeline line */}
        <div className="absolute left-[7.5rem] top-0 bottom-0 w-0.5 bg-[#3DB7CA]" />
        
        <div className="space-y-8">
          {data.work.timeline.map((work, index) => (
            <div key={index} className="relative flex items-start">
              {/* Date and Location section */}
              <div className="w-32 pr-8 text-right">
                <p className="dark:text-gray-300 text-base font-bold">{work.date}</p>
                <p className="dark:text-gray-300 text-sm">{work.location}</p>
              </div>

              {/* Timeline dot */}
              <div className="relative">
                <div className="absolute -left-2 top-6 w-5 h-5 rounded-full bg-[#3DB7CA] -translate-x-2.5" />
              </div>
              
              {/* Card section */}
              <div className="flex-1 pl-8">
                <div className="p-4 bg-gray-100 dark:bg-[#1a2c34] rounded-lg shadow-md border">
                  {/* Header section */}
                  <div className="mb-2">
                    <h3 className="text-xl font-semibold text-[#3DB7CA]">{work.title}</h3>
                    <div className="text-lg font-medium">{work.company}</div>
                  </div>

                  {/* Description section */}
                  <ul className="list-disc ml-4 space-y-2">
                    {work.description.map((desc, idx) => (
                      <li key={idx} className="dark:text-gray-300 text-[#090B10]">{desc}</li>
                    ))}
                  </ul>

                  {/* Tags section */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {work.tags.map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 text-sm bg-[#53CBDD] dark:bg-[#13404F] text-[090B10] dark:text-[#CAEDFA] rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkTimeline;