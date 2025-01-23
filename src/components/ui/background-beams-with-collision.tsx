"use client";

import { cn } from "../../lib/utils"; 
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

// Component for background beams with collision detection
export const BackgroundBeamsWithCollision = ({
  children, // Children elements to render inside the component
  className, // Optional custom className for the container
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the bottom container
  const parentRef = useRef<HTMLDivElement>(null); // Ref for the parent container

  // Define the beams with animation configurations
  const beams = [
    { initialX: 10, translateX: 10, duration: 7, repeatDelay: 3, delay: 2 },
    { initialX: 600, translateX: 600, duration: 3, repeatDelay: 3, delay: 4 },
    { initialX: 100, translateX: 100, duration: 7, repeatDelay: 7, className: "h-6" },
    { initialX: 400, translateX: 400, duration: 5, repeatDelay: 14, delay: 4 },
    { initialX: 800, translateX: 800, duration: 11, repeatDelay: 2, className: "h-20" },
    { initialX: 1000, translateX: 1000, duration: 4, repeatDelay: 2, className: "h-12" },
    { initialX: 1200, translateX: 1200, duration: 6, repeatDelay: 4, delay: 2, className: "h-6" },
  ];

  return (
    <div
      ref={parentRef} // Attach parent ref
      className={cn(
        "h-96 md:h-[40rem] from-white to-neutral-100 dark:bg-[#090B10] relative flex items-center w-full justify-center overflow-hidden",
        className // Merge custom className
      )}
    >
      {/* Render beams using the CollisionMechanism component */}
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"} // Unique key for each beam
          beamOptions={beam} // Pass beam configurations
          containerRef={containerRef} // Ref for collision detection
          parentRef={parentRef} // Ref for parent container
        />
      ))}

      {children} {/* Render children elements */}

      {/* Bottom container to display shadow effect */}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

// Component for individual beam animation and collision detection
const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null); // Ref for the animated beam
  const [collision, setCollision] = useState({
    detected: false, // Flag for collision detection
    coordinates: null, // Coordinates of the collision
  });
  const [beamKey, setBeamKey] = useState(0); // Unique key to restart beam animation
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false); // Prevent duplicate collision handling

  // Effect to check for collisions at regular intervals
  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        // Get bounding rectangles for the beam and container
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        // Check if the beam collides with the container
        if (beamRect.bottom >= containerRect.top) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          // Update collision state
          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50); // Check every 50ms
    return () => clearInterval(animationInterval); // Cleanup interval
  }, [cycleCollisionDetected, containerRef]);

  // Effect to reset collision and restart beam animation
  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1); // Increment key to restart animation
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      {/* Animated beam */}
      <motion.div
        key={beamKey} // Unique key for animation
        ref={beamRef} // Ref for the beam
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px", // Initial Y position
          translateX: beamOptions.initialX || "0px", // Initial X position
          rotate: beamOptions.rotate || 0, // Initial rotation
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px", // Final Y position
            translateX: beamOptions.translateX || "0px", // Final X position
            rotate: beamOptions.rotate || 0, // Final rotation
          },
        }}
        transition={{
          duration: beamOptions.duration || 8, // Animation duration
          repeat: Infinity, // Loop animation
          ease: "linear",
          delay: beamOptions.delay || 0, // Initial delay
          repeatDelay: beamOptions.repeatDelay || 0, // Delay between loops
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-purple-500 to-transparent",
          beamOptions.className // Merge custom className
        )}
      />

      <AnimatePresence>
        {/* Render explosion effect on collision */}
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`} // Unique key for explosion
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)", // Center explosion
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism"; // Set display name for the component

// Explosion effect component
const Explosion = ({ ...props }: React.HTMLProps<HTMLDivElement>) => {
  // Create particles for explosion
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40), // Random X direction
    directionY: Math.floor(Math.random() * -50 - 10), // Random Y direction
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      {/* Core explosion animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      ></motion.div>

      {/* Particles spreading out */}
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
        />
      ))}
    </div>
  );
};
