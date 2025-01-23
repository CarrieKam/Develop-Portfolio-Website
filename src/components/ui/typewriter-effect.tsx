"use client"; 
import { cn } from "../../lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion"; 
import { useEffect } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string; 
  }[];
  className?: string; 
  cursorClassName?: string;
}) => {
  // Transform the `text` field of each word into an array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""), // Split text into characters
    };
  });

  const [scope, animate] = useAnimate(); // Hook to manage animations on elements
  const isInView = useInView(scope); // Check if the component is in view

  useEffect(() => {
    if (isInView) {
      // Trigger animation when the component comes into view
      animate(
        "span", // Target all span elements
        {
          display: "inline-block", // Make characters visible inline
          opacity: 1, // Fade in characters
          width: "fit-content",
        },
        {
          duration: 0.3, // Animation duration
          delay: stagger(0.1), // Stagger each character's animation
          ease: "easeInOut", // Animation easing
        }
      );
    }
  }, [isInView]);

  // Function to render the words and their characters
  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <motion.span
                initial={{}} // No initial animation state
                key={`char-${index}`}
                className={cn(
                  `dark:text-white text-black opacity-0 hidden`, // Start hidden and faded
                  word.className
                )}
              >
                {char} {/* Render each character */}
              </motion.span>
            ))}
            &nbsp; {/* Add space between words */}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      {/* Blinking cursor */}
      <motion.span
        initial={{
          opacity: 0, // Start invisible
        }}
        animate={{
          opacity: 1, // Fade in and out
        }}
        transition={{
          duration: 0.8, // Duration for fade in/out
          repeat: Infinity, // Infinite animation
          repeatType: "reverse", // Alternate between visible and invisible
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500", // Styling for the cursor
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

// TypewriterEffectSmooth Component
export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string; // Optional class for styling individual words
  }[];
  className?: string; // Optional class for the wrapper
  cursorClassName?: string; // Optional class for the cursor
}) => {
  // Transform the `text` field of each word into an array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""), // Split text into characters
    };
  });

  // Function to render the words and their characters
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => (
          <div key={`word-${idx}`} className="inline-block">
            {word.text.map((char, index) => (
              <span
                key={`char-${index}`}
                className={cn(`dark:text-white text-black`, word.className)}
              >
                {char} {/* Render each character */}
              </span>
            ))}
            &nbsp; {/* Add space between words */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      {/* Container for animated typewriter effect */}
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%", // Start with no width
        }}
        whileInView={{
          width: "fit-content", // Expand to fit content
        }}
        transition={{
          duration: 2, // Smooth animation duration
          ease: "linear", // Linear easing
          delay: 1, // Delay animation
        }}
      >
        <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-3xl text-center">
          {renderWords()} {/* Render the words */}
        </div>
      </motion.div>
      {/* Blinking cursor */}
      <motion.span
        initial={{
          opacity: 0, // Start invisible
        }}
        animate={{
          opacity: 1, // Fade in and out
        }}
        transition={{
          duration: 0.8, // Duration for fade in/out
          repeat: Infinity, // Infinite animation
          repeatType: "reverse", // Alternate between visible and invisible
        }}
        className={cn(
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500", // Styling for the cursor
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};
