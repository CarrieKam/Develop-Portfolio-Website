import React from 'react';

const Navigation = () => {
    return (
      <nav className="flex justify-between items-center p-4">
        <div className="flex space-x-4">
          {['About', 'Work', 'Projects', 'Education'].map((item) => (
            <button key={item} className="px-3 py-2 rounded-md text-sm hover:bg-gray-700">
              {item}
            </button>
          ))}
        </div>
      </nav>
    );
  };
  export default Navigation;
