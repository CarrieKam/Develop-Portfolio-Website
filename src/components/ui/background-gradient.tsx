import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "framer-motion"; 

// BackgroundGradient component definition
export const BackgroundGradient = ({
  children, // Optional children to be rendered inside the gradient container
  className, // Optional additional classes for inner content
  containerClassName, // Optional additional classes for the container
  animate = true, // Whether to animate the gradient (default: true)
}: {
  children?: React.ReactNode; // Type for children
  className?: string; // Type for className
  containerClassName?: string; // Type for containerClassName
  animate?: boolean; // Type for animate flag
}) => {
  // Define animation variants for the gradient
  const variants = {
    initial: {
      backgroundPosition: "0 50%", // Initial background position
    },
    animate: {
      backgroundPosition: ["0 50%", "100% 50%", "0 50%"], // Positions for the animation
    },
  };

  return (
    <div className={cn("relative p-[4px] group", containerClassName)}>
      {/* Animated gradient background */}
      <motion.div
        variants={animate ? variants : undefined} // Apply animation variants if `animate` is true
        initial={animate ? "initial" : undefined} // Set initial animation state
        animate={animate ? "animate" : undefined} // Set animate state
        transition={
          animate
            ? {
                duration: 5, // Animation duration
                repeat: Infinity, // Infinite loop
                repeatType: "reverse", // Reverse direction on repeat
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined, // Set larger background size for animation
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          // Gradient layers with radial gradients
          " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      {/* Another animated layer to create depth */}
      <motion.div
        variants={animate ? variants : undefined} // Apply animation variants if `animate` is true
        initial={animate ? "initial" : undefined} // Set initial animation state
        animate={animate ? "animate" : undefined} // Set animate state
        transition={
          animate
            ? {
                duration: 5, // Animation duration
                repeat: Infinity, // Infinite loop
                repeatType: "reverse", // Reverse direction on repeat
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined, // Set larger background size for animation
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          // Same gradient but without opacity changes for layering
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      {/* Render children inside the gradient */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
