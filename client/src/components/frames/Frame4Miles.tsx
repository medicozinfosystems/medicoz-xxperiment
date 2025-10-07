import { motion } from "framer-motion";

export default function Frame4Miles() {
  const connectionPoints = [
    { x: 20, y: 30 },
    { x: 45, y: 25 },
    { x: 70, y: 35 },
    { x: 30, y: 60 },
    { x: 55, y: 65 },
    { x: 80, y: 55 },
  ];

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#CAD9C2]/30 to-[#27515F]/10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        {/* World map visualization */}
        <div className="relative w-full h-96 mb-12">
          {/* Subtle world map outline */}
          <motion.svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 100 60"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <path
              d="M 10 20 L 25 18 L 40 25 L 45 20 L 55 22 L 70 18 L 85 25 M 15 35 L 30 32 L 45 38 L 60 35 L 80 40"
              stroke="#27515F"
              strokeWidth="0.5"
              fill="none"
            />
          </motion.svg>

          {/* Connection dots */}
          {connectionPoints.map((point, i) => (
            <motion.div
              key={`dot-${i}`}
              className="absolute w-3 h-3 rounded-full bg-[#74B3BC]"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-[#74B3BC]"
                animate={{ 
                  scale: [1, 2, 1],
                  opacity: [0.8, 0, 0.8]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            </motion.div>
          ))}

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {connectionPoints.slice(0, -1).map((point, i) => {
              const nextPoint = connectionPoints[i + 1];
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={point.x}
                  y1={point.y}
                  x2={nextPoint.x}
                  y2={nextPoint.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                  viewport={{ once: true }}
                />
              );
            })}
            <defs>
              <linearGradient id="lineGradient">
                <stop offset="0%" stopColor="#80A586" />
                <stop offset="100%" stopColor="#74B3BC" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing data packets traveling */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`packet-${i}`}
              className="absolute w-2 h-2 rounded-full bg-white shadow-lg shadow-[#74B3BC]"
              style={{
                left: `${connectionPoints[0].x}%`,
                top: `${connectionPoints[0].y}%`,
              }}
              initial={{
                left: `${connectionPoints[0].x}%`,
                top: `${connectionPoints[0].y}%`,
              }}
              whileInView={{
                left: connectionPoints.map(p => `${p.x}%`),
                top: connectionPoints.map(p => `${p.y}%`),
              }}
              transition={{
                duration: 4,
                delay: i * 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
              viewport={{ once: false }}
            />
          ))}
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-[#27515F] tracking-wide">
            Across screens.
          </h2>
          <h2 className="text-4xl md:text-5xl font-light text-[#27515F] tracking-wide mt-2">
            Across miles.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
