import { motion } from "framer-motion";

export default function Frame5Heart() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#27515F]/10 to-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Heart animation */}
        <div className="relative w-64 h-64 mx-auto mb-16">
          {/* Connection lines merging into heart */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
            {/* Lines from corners converging */}
            {[
              { x1: 0, y1: 0, x2: 100, y2: 100 },
              { x1: 200, y1: 0, x2: 100, y2: 100 },
              { x1: 0, y1: 200, x2: 100, y2: 100 },
              { x1: 200, y1: 200, x2: 100, y2: 100 },
            ].map((line, i) => (
              <motion.line
                key={i}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#80A586"
                strokeWidth="2"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            ))}

            {/* Heart shape */}
            <motion.path
              d="M100,150 C80,120 30,120 30,90 C30,70 45,60 60,60 C75,60 85,70 100,85 C115,70 125,60 140,60 C155,60 170,70 170,90 C170,120 120,120 100,150 Z"
              fill="none"
              stroke="#74B3BC"
              strokeWidth="3"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.8 }}
              viewport={{ once: true }}
            />

            {/* Heart fill */}
            <motion.path
              d="M100,150 C80,120 30,120 30,90 C30,70 45,60 60,60 C75,60 85,70 100,85 C115,70 125,60 140,60 C155,60 170,70 170,90 C170,120 120,120 100,150 Z"
              fill="#74B3BC"
              opacity="0.3"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 1, delay: 1.5 }}
              viewport={{ once: true }}
            />
          </svg>

          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 blur-2xl bg-[#74B3BC] rounded-full opacity-20"
            initial={{ scale: 1, opacity: 0 }}
            whileInView={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 2,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            viewport={{ once: false }}
          />
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-light text-[#27515F] tracking-wide leading-relaxed">
            Technology listens,
            <br />
            learns, and responds.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
