import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Frame6Closing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div id="frame6" ref={ref} className="relative w-full h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#EAF3DE]/50 to-[#CAD9C2]/40 overflow-hidden">
      {/* Elevated background */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,#80A586_0%,transparent_50%)] opacity-20" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,#74B3BC_0%,transparent_50%)] opacity-20" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Heart to logo transition */}
        <motion.div
          className="mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Medicoz logo/text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#27515F] via-[#74B3BC] to-[#27515F] animate-gradient">
                Medicoz Infosystems
              </span>
            </h1>
          </motion.div>
        </motion.div>

        {/* Tagline sequence */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <p className="text-3xl md:text-4xl font-light text-[#27515F] italic">
              Not just smart. Human.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
            transition={{ delay: 3, duration: 2 }}
            className="h-8"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 4, duration: 1 }}
          >
            <p className="text-3xl md:text-4xl font-serif italic text-primary">
              Technology that cares.
            </p>
          </motion.div>
        </div>

        {/* Subtle background glow */}
        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#74B3BC] rounded-full blur-3xl opacity-10" />
        </motion.div>
      </div>
    </div>
  );
}
