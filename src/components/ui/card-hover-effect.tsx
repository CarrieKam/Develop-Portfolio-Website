import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Calendar, GraduationCap } from 'lucide-react';

export const HoverEffect = ({
  items, // Array of items to display in the grid
  className, // Optional className for custom styling
}: {
  items: {
    name: string;
    program: string; 
    year: string[]; 
  }[];
  className?: string;
}) => {
  // State to track which card is hovered
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 px-4", // Grid layout with responsive columns
        className // Additional custom styles
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx} // Unique key for each item
          className="relative group" // Wrapper for hover effects
          onMouseEnter={() => setHoveredIndex(idx)} // Set hovered index on mouse enter
          onMouseLeave={() => setHoveredIndex(null)} // Reset hovered index on mouse leave
          initial={{ opacity: 0, y: 20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation state when visible
          transition={{ duration: 0.4, delay: idx * 0.1 }} // Staggered animation for each item
        >
          <AnimatePresence>
            {hoveredIndex === idx && ( // Only render hover effect for the currently hovered item
              <motion.span
                className="absolute inset-0 h-full w-full bg-black/[0.08] dark:bg-slate-800/[0.8] block rounded-3xl" // Semi-transparent overlay
                layoutId="hoverBackground" // Shared layout animation ID
                initial={{ opacity: 0 }} // Initial opacity
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 }, // Animation duration
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2 }, // Exit animation
                }}
              />
            )}
          </AnimatePresence>
          {/* Card component to display item content */}
          <Card>
            <CardTitle>{item.name}</CardTitle> {/* Card title */}
            <CardDescription>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 flex-shrink-0" /> {/* Calendar icon */}
                <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.year}</span> {/* Year text */}
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <GraduationCap className="w-4 h-4 flex-shrink-0" /> {/* Graduation cap icon */}
                <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.program}</span> {/* Program text */}
              </div>
            </CardDescription>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// Card component to encapsulate content with styling
export const Card = ({
  className, // Optional custom className
  children, // Children components passed to the card
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl h-full w-full p-6 overflow-hidden bg-white dark:bg-black border border-neutral-800 relative z-20 transition-all duration-200", // Styling for card
        className // Additional custom styles
      )}
    >
      <div className="relative z-50">
        {children} {/* Render children inside the card */}
      </div>
    </div>
  );
};

// CardTitle component for displaying titles with styling
export const CardTitle = ({
  className, // Optional custom className
  children, // Title content
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-lg dark:text-white font-semibold tracking-wide mb-4", className)}>
      {children} {/* Render title */}
    </h4>
  );
};

// CardDescription component for additional details
export const CardDescription = ({
  className, // Optional custom className
  children, // Description content
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "space-y-2", // Spacing between description items
        className // Additional custom styles
      )}
    >
      {children} {/* Render description content */}
    </div>
  );
};

export default HoverEffect; 
