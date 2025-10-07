import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const frames = [
  { id: "frame1", label: "The Pulse" },
  { id: "frame2", label: "The Message" },
  { id: "frame3", label: "The Help" },
  { id: "frame4", label: "The Miles" },
  { id: "frame5", label: "The Heart" },
  { id: "frame6", label: "The Closing" },
];

export default function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const frameHeight = windowHeight;
      const currentFrame = Math.floor(scrollY / frameHeight);
      setActiveIndex(Math.min(currentFrame, frames.length - 1));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFrame = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col gap-4">
        {frames.map((frame, index) => (
          <button
            key={frame.id}
            onClick={() => scrollToFrame(index)}
            className="group relative flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            aria-label={`Jump to ${frame.label}`}
            aria-current={index === activeIndex ? "true" : "false"}
            data-testid={`scroll-nav-${frame.id}`}
          >
            {/* Dot */}
            <motion.div
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeIndex
                  ? "bg-primary scale-125"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              animate={
                index === activeIndex
                  ? {
                      scale: [1.25, 1.5, 1.25],
                      opacity: [1, 0.7, 1],
                    }
                  : {}
              }
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Label tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 px-3 py-1 bg-card border border-card-border rounded-md whitespace-nowrap text-sm text-foreground shadow-lg"
            >
              {frame.label}
            </motion.div>

            {/* Connecting line */}
            {index < frames.length - 1 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-border" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
