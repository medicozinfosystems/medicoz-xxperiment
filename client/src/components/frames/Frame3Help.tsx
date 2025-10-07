import { motion } from "framer-motion";

export default function Frame3Help() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#CAD9C2]/30">
      <div className="max-w-4xl mx-auto px-6">
        {/* Holographic connection scene */}
        <div className="relative w-full h-80 mb-12">
          {/* Person 1 (left) */}
          <motion.div
            className="absolute left-[10%] top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
              {/* Head */}
              <circle cx="40" cy="30" r="20" fill="#80A586" opacity="0.8" />
              {/* Body */}
              <rect x="20" y="55" width="40" height="60" rx="20" fill="#80A586" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Person 2 (right) */}
          <motion.div
            className="absolute right-[10%] top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <svg width="80" height="120" viewBox="0 0 80 120" fill="none">
              {/* Head */}
              <circle cx="40" cy="30" r="20" fill="#74B3BC" opacity="0.8" />
              {/* Body */}
              <rect x="20" y="55" width="40" height="60" rx="20" fill="#74B3BC" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Connecting light beams */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 20 50 Q 50 30, 80 50"
              stroke="url(#gradient1)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.path
              d="M 20 50 Q 50 70, 80 50"
              stroke="url(#gradient2)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              viewport={{ once: true }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#80A586" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#74B3BC" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#80A586" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#74B3BC" stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating data particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#74B3BC]"
              style={{
                left: `${30 + i * 10}%`,
                top: `${40 + (i % 2) * 20}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (i % 2 ? 20 : -20)]
              }}
              transition={{ 
                duration: 2,
                delay: 1 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 1
              }}
              viewport={{ once: true }}
            />
          ))}
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-light text-[#27515F] tracking-wide">
            A moment of help.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
