"use client"; // Indicates this file is a client component in Next.js
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion"; 
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: Array<{ date: string; location: string }>; // Array of date-location pairs for the title
  content: React.ReactNode; // Content to display for the timeline entry
}

// Timeline component that renders a scrollable timeline
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null); // Ref for the main timeline container
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the scrollable container
  const [height, setHeight] = useState(0); // State to store the height of the timeline container

  // Effect to calculate the height of the timeline container when the component mounts
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height); // Update height state based on container dimensions
    }
  }, [ref]);

  // Hook to track the scroll progress relative to the container
  const { scrollYProgress } = useScroll({
    target: containerRef, // Element to observe for scroll progress
    offset: ["start 15%", "end 100%"], // Define scroll offset range
  });

  // Transform scroll progress into height for the timeline bar
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);

  // Transform scroll progress into opacity for the timeline bar
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-sans md:px-10" // Container styles
      ref={containerRef} // Attach scroll container ref
    >
      <div ref={ref} className="relative max-w-full mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index} // Unique key for each timeline entry
            className="flex justify-start pt-10 md:pt-40 md:gap-4" // Styling for timeline entries
          >
            {/* Sticky section for timeline dot and big-screen title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Timeline dot */}
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-500 dark:border-neutral-700 p-2" />
              </div>
              {/* Big-screen title */}
              <h3 className="hidden md:block font-bold md:pl-20 md:text-5xl text-neutral-500 dark:text-neutral-500">
                {item.title.map((t, i) => (
                  <div key={i} className="text-2xl">
                    <span>{t.date} <br /></span>
                    <span>{t.location}</span>
                  </div>
                ))}
              </h3>
            </div>

            {/* Small-screen content and title */}
            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              {/* Small-screen title */}
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title.map((t, i) => (
                  <div key={i}>
                    <span>{t.date} <br /></span>
                    <span>{t.location}</span>
                  </div>
                ))}
              </h3>
              {/* Timeline entry content */}
              {item.content}{" "}
            </div>
          </div>
        ))}
        {/* Timeline progress bar */}
        <div
          style={{
            height: height + "px", // Dynamic height based on container dimensions
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          {/* Animated progress bar */}
          <motion.div
            style={{
              height: heightTransform, // Dynamic height based on scroll progress
              opacity: opacityTransform, // Dynamic opacity based on scroll progress
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
