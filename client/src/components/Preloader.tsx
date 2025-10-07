import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Activity, MessageCircle, HandHeart, Globe2, Brain } from "lucide-react";

const frames = [
  { 
    id: 1, 
    text: "A pulse.", 
    subtitle: "Every heartbeat matters",
    duration: 1200,
    icon: Activity,
    color: "#74B3BC"
  },
  { 
    id: 2, 
    text: "A message.", 
    subtitle: "Connecting care providers",
    duration: 1200,
    icon: MessageCircle,
    color: "#80A586"
  },
  { 
    id: 3, 
    text: "A moment of help.", 
    subtitle: "When it matters most",
    duration: 1200,
    icon: HandHeart,
    color: "#74B3BC"
  },
  { 
    id: 4, 
    text: "Across miles.", 
    subtitle: "Healthcare without borders",
    duration: 1200,
    icon: Globe2,
    color: "#27515F"
  },
  { 
    id: 5, 
    text: "Technology that listens.", 
    subtitle: "Learns and responds",
    duration: 1500,
    icon: Brain,
    color: "#80A586"
  },
  { 
    id: 6, 
    text: "Medicoz Infosystems", 
    subtitle: "technology that cares",
    duration: 1500,
    icon: null,
    color: "#27515F"
  },
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
      setProgress(Math.min((elapsedTime / totalDuration) * 100, 100));

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

  const currentFrameData = frames[currentFrame];

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-white via-[#EAF3DE]/20 to-[#CAD9C2]/30 flex items-center justify-center overflow-hidden">
      {/* Dynamic gradient orbs based on current frame */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          background: currentFrameData.color + "40",
          x: currentFrame % 2 === 0 ? 200 : -200,
          y: currentFrame % 2 === 0 ? -100 : 100,
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.2, 0.3],
          background: currentFrameData.color + "30",
          x: currentFrame % 2 === 0 ? -200 : 200,
          y: currentFrame % 2 === 0 ? 100 : -100,
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Particle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${currentFrame}-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{ background: currentFrameData.color }}
          initial={{ 
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            x: Math.cos((i * Math.PI * 2) / 8) * 200,
            y: Math.sin((i * Math.PI * 2) / 8) * 200,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.05,
            ease: "easeOut"
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Frame Content with enhanced transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFrame}
            initial={{ 
              opacity: 0, 
              y: 40,
              scale: 0.8,
              rotateX: -15,
              filter: "blur(10px)"
            }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: "blur(0px)"
            }}
            exit={{ 
              opacity: 0, 
              y: -40,
              scale: 1.1,
              rotateX: 15,
              filter: "blur(10px)"
            }}
            transition={{ 
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="mb-12"
          >
            {/* Icon */}
            {currentFrameData.icon && (
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2
                }}
              >
                <motion.div
                  className="w-24 h-24 rounded-2xl flex items-center justify-center relative"
                  style={{ 
                    background: `linear-gradient(135deg, ${currentFrameData.color}40, ${currentFrameData.color}20)`,
                  }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${currentFrameData.color}40`,
                      `0 0 40px ${currentFrameData.color}60`,
                      `0 0 20px ${currentFrameData.color}40`,
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <currentFrameData.icon 
                    className="w-12 h-12" 
                    style={{ color: currentFrameData.color }}
                    strokeWidth={1.5}
                  />
                  {/* Rotating ring */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-2xl"
                    style={{ borderColor: currentFrameData.color + "40" }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </motion.div>
            )}

            {/* Text */}
            {currentFrame === 5 ? (
              <div>
                <h1 className="text-5xl md:text-7xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#27515F] via-[#74B3BC] to-[#27515F] animate-gradient">
                  {currentFrameData.text}
                </h1>
                <motion.p
                  className="text-xl md:text-2xl font-light"
                  style={{ color: currentFrameData.color }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentFrameData.subtitle}
                </motion.p>
              </div>
            ) : (
              <div>
                <h2 className="text-4xl md:text-6xl font-light mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#27515F] to-[#74B3BC] tracking-wide">
                  {currentFrameData.text}
                </h2>
                <motion.p
                  className="text-lg md:text-xl text-muted-foreground font-light"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentFrameData.subtitle}
                </motion.p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Enhanced Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="relative h-1.5 bg-muted-foreground/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#80A586] via-[#74B3BC] to-[#27515F]"
              style={{ 
                width: `${progress}%`,
                transformOrigin: "left"
              }}
              transition={{ duration: 0.05 }}
            />
            {/* Glowing effect on progress bar */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              animate={{
                x: ["-100%", "200%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>
          
          {/* Frame indicators */}
          <div className="flex justify-between mt-4">
            {frames.map((frame, index) => (
              <motion.div
                key={frame.id}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentFrame ? 'scale-150' : 'scale-100'
                }`}
                style={{
                  backgroundColor: index <= currentFrame ? currentFrameData.color : '#E0E0E0',
                }}
                animate={index === currentFrame ? {
                  scale: [1.5, 1.8, 1.5],
                  opacity: [1, 0.6, 1]
                } : {}}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
