import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const frames = [
  { id: 1, text: "A pulse.", duration: 1000 },
  { id: 2, text: "A message.", duration: 1000 },
  { id: 3, text: "A moment of help.", duration: 1000 },
  { id: 4, text: "Across miles.", duration: 1200 },
  { id: 5, text: "Technology listens, learns, and responds.", duration: 1500 },
  { id: 6, text: "Medicoz Infosystems", duration: 1300 },
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalDuration = frames.reduce((sum, frame) => sum + frame.duration, 0);

  useEffect(() => {
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 50;
      setProgress((elapsedTime / totalDuration) * 100);

      let accumulatedTime = 0;
      for (let i = 0; i < frames.length; i++) {
        accumulatedTime += frames[i].duration;
        if (elapsedTime < accumulatedTime) {
          setCurrentFrame(i);
          break;
        }
      }

      if (elapsedTime >= totalDuration) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete, totalDuration]);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white via-[#EAF3DE]/20 to-[#CAD9C2]/30 flex items-center justify-center overflow-hidden">
      {/* Ambient gradient orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-[#74B3BC]/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 bg-[#80A586]/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Frame Text */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrame}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            {currentFrame === 5 ? (
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#27515F] via-[#74B3BC] to-[#27515F] animate-gradient">
                {frames[currentFrame].text}
              </h1>
            ) : (
              <h2 className="text-4xl md:text-6xl font-light text-transparent bg-clip-text bg-gradient-to-r from-[#27515F] to-[#74B3BC] tracking-wide">
                {frames[currentFrame].text}
              </h2>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#80A586] to-[#74B3BC]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
          <motion.p
            className="text-sm text-muted-foreground mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            technology that cares
          </motion.p>
        </div>

        {/* Visual Elements based on frame */}
        {currentFrame === 0 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg className="w-64 h-32" viewBox="0 0 400 100">
              <motion.path
                d="M 0 50 L 80 50 L 100 20 L 120 80 L 140 50 L 400 50"
                stroke="#74B3BC"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.8 }}
              />
            </svg>
          </motion.div>
        )}

        {currentFrame === 4 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            exit={{ opacity: 0 }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100">
              <motion.path
                d="M50,30 C30,30 20,45 20,55 C20,70 35,80 50,90 C65,80 80,70 80,55 C80,45 70,30 50,30 Z"
                fill="#74B3BC"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.1, 1] }}
                transition={{ duration: 0.6 }}
              />
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  );
}
