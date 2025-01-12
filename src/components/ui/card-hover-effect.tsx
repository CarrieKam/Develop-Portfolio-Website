import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Calendar, GraduationCap } from 'lucide-react';

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    name: string;
    program: string;
    year: string[];
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 px-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: idx * 0.1 }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-black/[0.08] dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription>
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.year}</span>
              </div>
              <div className="flex items-center space-x-3 mt-2">
                <GraduationCap className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm text-neutral-600 dark:text-neutral-400">{item.program}</span>
              </div>
            </CardDescription>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-3xl h-full w-full p-6 overflow-hidden bg-black border border-neutral-800 relative z-20 transition-all duration-200",
        className
      )}
    >
      <div className="relative z-50">
        {children}
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-lg text-white font-semibold tracking-wide mb-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "space-y-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export default HoverEffect;