import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HandwrittenTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
  color?: string;
}

export default function HandwrittenText({ text, delay = 0, duration = 3, className = "", color = "cyan" }: HandwrittenTextProps) {
  const [startAnimation, setStartAnimation] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Color mapping from palette
  const colorMap: Record<string, string> = {
    cyan: "#0891B2",
    violet: "#7C3AED", 
    pink: "#DB2777",
    emerald: "#059669",
    blue: "#3B82F6"
  };

  const selectedColor = colorMap[color] || colorMap.cyan;

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [delay]);

  // Character-by-character reveal for handwriting effect
  useEffect(() => {
    if (!startAnimation) return;
    
    const charDelay = (duration * 1000) / text.length;
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, charDelay);

    return () => clearInterval(interval);
  }, [startAnimation, text.length, duration]);
  
  return (
    <div className={`relative ${className}`} style={{ fontFamily: "'Caveat', cursive" }}>
      <motion.div
        className="text-4xl md:text-5xl lg:text-6xl font-semibold"
        style={{ color: selectedColor }}
      >
        {startAnimation ? (
          <>
            {text.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: i < currentIndex ? 1 : 0 }}
                transition={{ duration: 0.05 }}
              >
                {char}
              </motion.span>
            ))}
          </>
        ) : (
          <span className="opacity-0">{text}</span>
        )}
      </motion.div>
    </div>
  );
}
