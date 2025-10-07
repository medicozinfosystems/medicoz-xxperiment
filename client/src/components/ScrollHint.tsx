import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollHint() {
  const [showHint, setShowHint] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && !hasScrolled) {
        setHasScrolled(true);
        setShowHint(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <AnimatePresence>
      {showHint && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
        >
          <motion.p
            className="text-sm font-medium text-muted-foreground"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to continue
          </motion.p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
