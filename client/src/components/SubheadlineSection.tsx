import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function SubheadlineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="subheadline"
      className="py-20 lg:py-32 px-6 lg:px-8 bg-gradient-to-b from-white to-[#EAF3DE]/30"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-8 leading-tight">
            At Medicoz Infosystems, we design digital platforms that make
            healthcare more accessible, conversations more meaningful, and
            technology more human.
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
