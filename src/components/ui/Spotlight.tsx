import { cn } from "../../lib/utils";

type SpotlightProps = {
  className?: string; // Optional className for custom styles
  fill?: string; // Optional fill color for the ellipse
};

export const Spotlight = ({ className, fill }: SpotlightProps) => {
  return (
    <svg
      className={cn(
        // Predefined styles for positioning, size, and animation
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] lg:w-[84%] opacity-0",
        className // Include any additional custom styles passed via props
      )}
      xmlns="http://www.w3.org/2000/svg" // SVG namespace
      viewBox="0 0 3787 2842" // Defines the viewbox size of the SVG
      fill="none" // No default fill for the SVG elements
    >
      <g filter="url(#filter)"> {/* Group with a custom filter applied */}
        <ellipse
          cx="1924.71" // X-coordinate of the center
          cy="273.501" // Y-coordinate of the center
          rx="1924.71" // Horizontal radius
          ry="273.501" // Vertical radius
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" // Transformation matrix for rotation and scaling
          fill={fill || "white"} // Fill color passed via props or default to white
          fillOpacity="0.21" // Transparency level of the fill color
        ></ellipse>
      </g>
      <defs>
        
        {/* Definitions for reusable elements or effects */}
        <filter
          id="filter" // Unique identifier for the filter
          x="0.860352" // Filter's bounding box X-coordinate
          y="0.838989" // Filter's bounding box Y-coordinate
          width="3785.16" // Width of the filter's bounding box
          height="2840.26" // Height of the filter's bounding box
          filterUnits="userSpaceOnUse" // Coordinate system for the filter
          colorInterpolationFilters="sRGB" // Specifies the color space for the filter effects
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood> {/* Creates a fully transparent layer */}
          <feBlend
            mode="normal" // Normal blend mode
            in="SourceGraphic" // Input graphic for blending
            in2="BackgroundImageFix" // Background image layer
            result="shape" // Output of the blend effect
          ></feBlend>
          <feGaussianBlur
            stdDeviation="151" // Amount of blur
            result="effect1_foregroundBlur_1065_8" // Result name for chaining
          ></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  );
};
