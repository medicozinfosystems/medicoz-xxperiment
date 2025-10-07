import { motion } from "framer-motion";

export default function Frame2Message() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-[#EAF3DE]/30 to-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Circular ripple animation */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Center dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-4 h-4 -mt-2 -ml-2 rounded-full bg-[#74B3BC]"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Ripples */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 border-2 border-[#74B3BC] rounded-full"
              style={{
                width: '100%',
                height: '100%',
                marginTop: '-50%',
                marginLeft: '-50%',
              }}
              initial={{ scale: 0, opacity: 0.8 }}
              whileInView={{ 
                scale: [0, 1.5],
                opacity: [0.8, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
                repeatDelay: 0.8
              }}
            />
          ))}

          {/* Data lines moving outward */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`line-${i}`}
              className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-[#80A586] origin-left"
              style={{
                transform: `rotate(${i * 45}deg)`,
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ 
                scaleX: [0, 1, 1],
                opacity: [0, 1, 0],
                x: [0, 50]
              }}
              transition={{ 
                duration: 2,
                delay: 0.5 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ))}
        </div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-6xl font-light text-[#27515F] tracking-wide">
            A message.
          </h2>
        </motion.div>
      </div>
    </div>
  );
}
