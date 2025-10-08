import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";

const frames = [
  { 
    id: 1, 
    text: "A pulse.", 
    subtitle: "Every heartbeat tells a story",
    duration: 2500,
    layout: "center",
    color: "#0891B2", // cyan-600
    bgGradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20"
  },
  { 
    id: 2, 
    text: "A message.", 
    subtitle: "Connecting those who heal",
    duration: 2500,
    layout: "left",
    color: "#7C3AED", // violet-600
    bgGradient: "from-violet-500/20 via-purple-500/10 to-indigo-500/20"
  },
  { 
    id: 3, 
    text: "A moment of help.", 
    subtitle: "When every second counts",
    duration: 2800,
    layout: "right",
    color: "#DB2777", // pink-600
    bgGradient: "from-pink-500/20 via-rose-500/10 to-fuchsia-500/20"
  },
  { 
    id: 4, 
    text: "Across miles.", 
    subtitle: "Healthcare without boundaries",
    duration: 2800,
    layout: "split",
    color: "#059669", // emerald-600
    bgGradient: "from-emerald-500/20 via-teal-500/10 to-green-500/20"
  },
  { 
    id: 5, 
    text: "Technology that listens.", 
    subtitle: "Intelligent care, human touch",
    duration: 3000,
    layout: "center-large",
    color: "#DC2626", // red-600
    bgGradient: "from-orange-500/20 via-red-500/10 to-rose-500/20"
  },
  { 
    id: 6, 
    text: "Medicoz Infosystems", 
    subtitle: "technology that cares",
    description: "Empowering healthcare providers with intelligent, empathetic technology solutions that put patients first. From real-time communication to global connectivity, we bridge the gap between care and technology.",
    duration: 3000,
    layout: "finale",
    color: "#06B6D4", // cyan-500 to match hero particles
    bgGradient: "from-white via-cyan-50/30 to-violet-50/20" // Match hero background
  },
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalDuration = frames.reduce((sum, frame) => sum + frame.duration, 0);

  // Pre-compute stable particle positions
  const particles = useMemo(() => 
    [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 50 - 25,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    })),
    []
  );

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
        setTimeout(() => onComplete(), 800);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete, totalDuration]);

  const currentFrameData = frames[currentFrame];

  // Render different visual based on frame
  const renderVisual = () => {
    switch (currentFrame) {
      case 0: // Pulse - ECG wave
        return (
          <svg className="w-full h-48" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="pulseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={currentFrameData.color} stopOpacity="0.2" />
                <stop offset="50%" stopColor={currentFrameData.color} stopOpacity="1" />
                <stop offset="100%" stopColor={currentFrameData.color} stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 0 100 L 200 100 L 250 50 L 280 150 L 310 100 L 800 100"
              stroke="url(#pulseGrad)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Glow effect */}
            <motion.circle
              cx="280"
              cy="100"
              r="30"
              fill={currentFrameData.color}
              opacity="0.3"
              initial={{ scale: 0 }}
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        );
      
      case 1: // Message - Network nodes
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200">
            {[...Array(6)].map((_, i) => (
              <g key={i}>
                <motion.circle
                  cx={80 + i * 60}
                  cy={100 + (i % 2 === 0 ? -30 : 30)}
                  r="8"
                  fill={currentFrameData.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                />
                {i < 5 && (
                  <motion.line
                    x1={80 + i * 60}
                    y1={100 + (i % 2 === 0 ? -30 : 30)}
                    x2={80 + (i + 1) * 60}
                    y2={100 + ((i + 1) % 2 === 0 ? -30 : 30)}
                    stroke={currentFrameData.color}
                    strokeWidth="2"
                    opacity="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                  />
                )}
              </g>
            ))}
          </svg>
        );
      
      case 2: // Help - Hands reaching
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={currentFrameData.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={currentFrameData.color} stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 80 120 Q 120 80, 160 100 Q 180 110, 200 100"
              stroke="url(#handGrad)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2 }}
            />
            <motion.path
              d="M 320 120 Q 280 80, 240 100 Q 220 110, 200 100"
              stroke="url(#handGrad)"
              strokeWidth="20"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            />
          </svg>
        );
      
      case 3: // Miles - Globe with connections
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200">
            <motion.circle
              cx="200"
              cy="100"
              r="60"
              stroke={currentFrameData.color}
              strokeWidth="2"
              fill="none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.5 }}
              transition={{ duration: 1 }}
            />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.line
                key={i}
                x1="200"
                y1="100"
                x2={200 + Math.cos((angle * Math.PI) / 180) * 80}
                y2={100 + Math.sin((angle * Math.PI) / 180) * 80}
                stroke={currentFrameData.color}
                strokeWidth="1.5"
                opacity="0.4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              />
            ))}
          </svg>
        );
      
      case 4: // Technology - Brain/Circuit
        return (
          <svg className="w-full h-48" viewBox="0 0 400 200">
            <motion.path
              d="M 150 80 Q 180 60, 200 80 Q 220 60, 250 80 L 250 120 Q 220 140, 200 120 Q 180 140, 150 120 Z"
              stroke={currentFrameData.color}
              strokeWidth="2"
              fill={currentFrameData.color}
              fillOpacity="0.1"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            {[...Array(5)].map((_, i) => (
              <motion.circle
                key={i}
                cx={170 + i * 15}
                cy={100}
                r="3"
                fill={currentFrameData.color}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ delay: i * 0.2, duration: 0.8, repeat: Infinity }}
              />
            ))}
          </svg>
        );
      
      case 5: // Finale - no visual here, orbs rendered separately to match hero structure
        return null;
      
      default:
        return null;
    }
  };

  const renderContent = () => {
    const layoutClasses = {
      center: "items-center justify-center text-center",
      left: "items-center justify-start text-left pl-12",
      right: "items-center justify-end text-right pr-12",
      split: "items-center justify-center text-center",
      "center-large": "items-center justify-center text-center",
      finale: "items-center justify-center text-center",
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFrame}
          initial={{ 
            opacity: 0, 
            y: 50,
            scale: 0.9,
            filter: "blur(10px)"
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            scale: 1,
            filter: "blur(0px)"
          }}
          exit={{ 
            opacity: 0, 
            y: -50,
            scale: 1.05,
            filter: "blur(10px)"
          }}
          transition={{ 
            duration: 0.7,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className={`flex flex-col w-full ${layoutClasses[currentFrameData.layout as keyof typeof layoutClasses]}`}
        >
          {/* Visual Element */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {renderVisual()}
          </motion.div>

          {/* Text Content */}
          <div className={currentFrame === 5 ? "space-y-6 max-w-4xl mx-auto" : "space-y-3"}>
            {currentFrame === 5 ? (
              <>
                <motion.h1
                  className="text-6xl md:text-7xl lg:text-8xl font-bold"
                  style={{
                    background: `linear-gradient(135deg, #0891B2, #7C3AED, #DB2777)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 30px rgba(8, 145, 178, 0.3))",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  {currentFrameData.text}
                </motion.h1>
                <motion.p
                  className="text-2xl md:text-3xl text-blue-800 font-light tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {currentFrameData.subtitle}
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {currentFrameData.description}
                </motion.p>
                <motion.div
                  className="flex gap-4 justify-center flex-wrap pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <Button size="lg" className="text-lg px-8" data-testid="button-preloader-get-started">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-preloader-learn-more">
                    Learn More
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.h2
                  className="text-4xl md:text-6xl font-light"
                  style={{ color: currentFrameData.color }}
                  initial={{ opacity: 0, x: currentFrameData.layout === 'left' ? -30 : currentFrameData.layout === 'right' ? 30 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentFrameData.text}
                </motion.h2>
                <motion.p
                  className="text-lg md:text-xl font-light text-foreground/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {currentFrameData.subtitle}
                </motion.p>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Hero-style particles for finale frame (exact match)
  const finaleParticles = useMemo(() => 
    [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 40 - 20,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 3,
    })),
    []
  );

  const activeParticles = currentFrame === 5 ? finaleParticles : particles;
  const particleYTravel = currentFrame === 5 ? -80 : -100;

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br ${currentFrameData.bgGradient} backdrop-blur-sm flex items-center justify-center overflow-hidden transition-all duration-1000`}>
      {/* Floating particles */}
      {activeParticles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: currentFrameData.color,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, particleYTravel, 0],
            x: [0, particle.xOffset, 0],
            opacity: [0, currentFrame === 5 ? 0.5 : 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Dynamic gradient orbs - hide on finale frame to match hero exactly */}
      {currentFrame !== 5 && (
        <>
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full blur-3xl"
            animate={{
              background: `radial-gradient(circle, ${currentFrameData.color}30, transparent)`,
              x: currentFrame % 2 === 0 ? 300 : -300,
              y: currentFrame % 3 === 0 ? -200 : 200,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          
          {/* Secondary orb for depth */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full blur-3xl"
            animate={{
              background: `radial-gradient(circle, ${currentFrameData.color}20, transparent)`,
              x: currentFrame % 2 === 0 ? -250 : 250,
              y: currentFrame % 3 === 0 ? 150 : -150,
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Finale ambient orbs - exact match to hero structure */}
      {currentFrame === 5 && (
        <div className="absolute inset-0 opacity-40">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 min-h-screen flex flex-col justify-between py-16">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          {renderContent()}
        </div>

        {/* Progress Section */}
        <div className="w-full max-w-2xl mx-auto space-y-6">
          {/* Enhanced Progress Bar */}
          <div className="relative h-3 bg-foreground/5 rounded-full overflow-hidden backdrop-blur-sm border border-foreground/10">
            <motion.div
              className="absolute inset-0 shadow-lg"
              style={{ 
                width: `${progress}%`,
                background: `linear-gradient(90deg, #0891B2, #7C3AED, #DB2777, #059669)`,
                boxShadow: `0 0 20px ${currentFrameData.color}60`,
              }}
              transition={{ duration: 0.05 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
              animate={{
                x: ["-100%", "200%"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Glow effect */}
            <motion.div
              className="absolute -top-1 -bottom-1 right-0 w-8 blur-xl"
              style={{
                background: `radial-gradient(circle, ${currentFrameData.color}, transparent)`,
                width: `${Math.min(progress + 5, 100)}%`,
              }}
              transition={{ duration: 0.05 }}
            />
          </div>
          
          {/* Frame indicators */}
          <div className="flex justify-between items-center">
            {frames.map((frame, index) => (
              <div key={frame.id} className="flex flex-col items-center gap-2">
                <motion.div
                  className={`rounded-full transition-all ${
                    index === currentFrame ? 'w-3 h-3' : 'w-2 h-2'
                  }`}
                  style={{
                    backgroundColor: index <= currentFrame ? currentFrameData.color : '#E0E0E0',
                  }}
                  animate={index === currentFrame ? {
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.7, 1]
                  } : {}}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
