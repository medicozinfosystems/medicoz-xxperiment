import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StoryFrameProps {
  children: ReactNode;
  id: string;
  className?: string;
}

export default function StoryFrame({ children, id, className = "" }: StoryFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <div ref={ref} id={id} className={`min-h-screen flex items-center justify-center ${className}`}>
      <motion.div style={{ opacity, scale }} className="w-full">
        {children}
      </motion.div>
    </div>
  );
}
