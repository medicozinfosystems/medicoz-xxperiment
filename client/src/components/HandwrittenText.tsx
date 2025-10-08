import { useEffect, useState } from "react";

interface HandwrittenTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export default function HandwrittenText({ text, delay = 0, duration = 3, className = "" }: HandwrittenTextProps) {
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  const strokeDashLength = 1000;
  
  return (
    <div className={`relative ${className}`}>
      <svg 
        viewBox="0 0 800 100" 
        className="w-full max-w-4xl h-20 md:h-24"
        style={{ fontFamily: "'Caveat', cursive" }}
      >
        {/* Stroke animation layer */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-4xl md:text-5xl lg:text-6xl fill-none stroke-violet-600 dark:stroke-violet-400"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: strokeDashLength,
            strokeDashoffset: startAnimation ? 0 : strokeDashLength,
            transition: `stroke-dashoffset ${duration}s linear`
          }}
        >
          {text}
        </text>
        
        {/* Fill layer that appears after stroke */}
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-4xl md:text-5xl lg:text-6xl fill-violet-600 dark:fill-violet-400"
          style={{
            opacity: startAnimation ? 1 : 0,
            transition: `opacity 0.3s ease-in ${duration}s`
          }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
