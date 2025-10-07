import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Frame1Pulse() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div id="frame1" ref={ref} className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#EAF3DE]/20 to-[#CAD9C2]/30 overflow-hidden">
      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-[#74B3BC]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-[#80A586]/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
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
            <>
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
              {/* Spark particles */}
              {[...Array(6)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx="250"
                  cy="50"
                  r="2"
                  fill="#74B3BC"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    cx: 250 + Math.cos((i * Math.PI) / 3) * 30,
                    cy: 50 + Math.sin((i * Math.PI) / 3) * 30,
                  }}
                  transition={{
                    duration: 1,
                    delay: 2.5 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </>
          )}
        </svg>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#27515F] to-[#74B3BC] tracking-wide">
            A pulse.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
