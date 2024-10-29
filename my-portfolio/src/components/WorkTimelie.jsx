const WorkTimeline = () => {
    return (
      <section className="p-8">
        <h2 className="text-xl font-bold mb-4">Work</h2>
        <div className="relative">
          <div className="absolute left-2 h-full w-0.5 bg-gray-300"></div>
          <div className="ml-6">
            <div className="mb-4">
              <span className="text-teal-500">2024</span>
              {/* Add work experiences here */}
            </div>
            <div>
              <span className="text-teal-500">2023</span>
              {/* Add work experiences here */}
            </div>
          </div>
        </div>
      </section>
    );
  };

export default WorkTimeline;
