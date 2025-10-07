import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Frame1Pulse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#EAF3DE]/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* ECG Line */}
        <svg
          className="w-full h-32 mb-12"
          viewBox="0 0 800 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M0 50 L200 50 L220 50 L240 20 L250 80 L260 50 L280 50 L800 50"
            stroke="#74B3BC"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Pulse glow effect */}
          {isInView && (
            <motion.circle
              cx="250"
              cy="50"
              r="20"
              fill="#74B3BC"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 2]
              }}
              transition={{ 
                duration: 1.5,
                delay: 2,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          )}
        </svg>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-light text-[#27515F] tracking-wide">
            A pulse.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
