import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, Activity, Globe, Radio } from "lucide-react";
import HandwrittenText from "./HandwrittenText";
import { useTranslation } from "@/contexts/TranslationContext";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { t } = useTranslation();

  const frames = [
    {
      id: 1,
      text: t("preloader.frame1.text"),
      subtitle: t("preloader.frame1.subtitle"),
      duration: 2500,
      layout: "center",
      color: "#0891B2",
      icon: Heart
    },
    {
      id: 2,
      text: t("preloader.frame2.text"),
      subtitle: t("preloader.frame2.subtitle"),
      duration: 2500,
      layout: "left",
      color: "#7C3AED",
      icon: MessageSquare
    },
    {
      id: 3,
      text: t("preloader.frame3.text"),
      subtitle: t("preloader.frame3.subtitle"),
      duration: 2800,
      layout: "right",
      color: "#DB2777",
      icon: Activity
    },
    {
      id: 4,
      text: t("preloader.frame4.text"),
      subtitle: t("preloader.frame4.subtitle"),
      duration: 2800,
      layout: "split",
      color: "#059669",
      icon: Globe
    },
    {
      id: 5,
      text: t("preloader.frame5.text"),
      subtitle: t("preloader.frame5.subtitle"),
      duration: 3000,
      layout: "center-large",
      color: "#3B82F6",
      icon: Radio
    },
  ];
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = frames.reduce((sum, frame) => sum + frame.duration, 0);

  const handleSkip = () => {
    if (isCompleted) return;
    setIsCompleted(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    onComplete();
  };

  useEffect(() => {
    let elapsedTime = 0;
    const interval = setInterval(() => {
      elapsedTime += 50;

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
        if (!isCompleted) {
          setIsCompleted(true);
          setTimeout(() => onComplete(), 400);
        }
      }
    }, 50);

    intervalRef.current = interval;

    return () => clearInterval(interval);
  }, [onComplete, totalDuration, isCompleted]);

  const currentFrameData = frames[currentFrame];

  // Render different visual based on frame
  const renderVisual = () => {
    switch (currentFrame) {
      case 0: // Pulse - Real ECG wave
        return (
          <div className="relative w-full h-48 flex items-center justify-center">
            <svg className="w-full h-full absolute" viewBox="0 0 800 200">
              <motion.path
                d="M 0 100 L 200 100 L 250 50 L 280 150 L 310 100 L 800 100"
                stroke={currentFrameData.color}
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </svg>
            <motion.div 
              className="absolute z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: `${currentFrameData.color}30` }}>
                <Heart 
                  className="w-10 h-10" 
                  style={{ color: currentFrameData.color }}
                />
              </div>
            </motion.div>
          </div>
        );
      
      case 1: // Message - Network visualization
        return (
          <div className="relative w-full h-48 flex items-center justify-center">
            <svg className="w-full h-full absolute" viewBox="0 0 400 200">
              {[...Array(6)].map((_, i) => (
                <g key={i}>
                  <motion.circle
                    cx={80 + i * 60}
                    cy={100 + (i % 2 === 0 ? -30 : 30)}
                    r="6"
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
            <motion.div 
              className="absolute z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "backOut" }}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: `${currentFrameData.color}20` }}>
                <MessageSquare 
                  className="w-12 h-12" 
                  style={{ color: currentFrameData.color }}
                />
              </div>
            </motion.div>
          </div>
        );
      
      case 2: // Help - Medical cross
        return (
          <div className="relative w-full h-48 flex items-center justify-center">
            <motion.div 
              className="absolute"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: `${currentFrameData.color}20` }}>
                <Activity 
                  className="w-16 h-16" 
                  style={{ color: currentFrameData.color }}
                  strokeWidth={2}
                />
              </div>
            </motion.div>
          </div>
        );
      
      case 3: // Miles - Globe
        return (
          <div className="relative w-full h-48 flex items-center justify-center">
            <svg className="w-full h-full absolute" viewBox="0 0 400 200">
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
            <motion.div 
              className="absolute z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: `${currentFrameData.color}20` }}>
                <Globe 
                  className="w-12 h-12" 
                  style={{ color: currentFrameData.color }}
                />
              </div>
            </motion.div>
          </div>
        );
      
      case 4: // Technology
        return (
          <div className="relative w-full h-48 flex items-center justify-center">
            <div className="flex items-end gap-1 h-20">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-8 rounded-t-md"
                  style={{ backgroundColor: currentFrameData.color }}
                  initial={{ height: "20%" }}
                  animate={{ height: `${30 + (i % 3) * 25}%` }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                />
              ))}
            </div>
            <motion.div 
              className="absolute z-10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center bg-white shadow-lg">
                <Radio 
                  className="w-12 h-12" 
                  style={{ color: currentFrameData.color }}
                />
              </div>
            </motion.div>
          </div>
        );
      
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
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={currentFrame}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex flex-col w-full ${layoutClasses[currentFrameData.layout as keyof typeof layoutClasses]}`}
        >
          {/* Visual Element */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {renderVisual()}
          </motion.div>

          {/* Text Content */}
          <div className="space-y-3">
            <motion.h2
              className="text-4xl md:text-6xl font-light"
              style={{ color: currentFrameData.color }}
              initial={{ opacity: 0, x: currentFrameData.layout === 'left' ? -30 : currentFrameData.layout === 'right' ? 30 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              {currentFrameData.text}
            </motion.h2>
            <motion.p
              className="text-lg md:text-xl font-light text-gray-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {currentFrameData.subtitle}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white"
    >

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10 min-h-screen flex flex-col justify-between py-16">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          {renderContent()}
        </div>

        {/* Skip Button */}
        <motion.div
          className="w-full flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-900"
            data-testid="button-skip-preloader"
          >
            {t("preloader.skip")}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
