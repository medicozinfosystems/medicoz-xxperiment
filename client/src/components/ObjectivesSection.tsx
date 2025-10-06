import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import { Heart, Users, Lightbulb, TrendingUp } from "lucide-react";

const objectives = [
  {
    icon: Heart,
    title: "Simplify Healthcare Access",
    description:
      "With transparent, affordable technology that connects patients and professionals.",
  },
  {
    icon: Users,
    title: "Empower Communities",
    description:
      "Through inclusive, impact-driven content that challenges stigma and sparks conversation.",
  },
  {
    icon: Lightbulb,
    title: "Bridge Technology and Empathy",
    description:
      "With user-centric design, culturally aware storytelling, and scalable innovation.",
  },
  {
    icon: TrendingUp,
    title: "Drive Sustainable Impact",
    description:
      "By building solutions rooted in accessibility, trust, and social relevance.",
  },
];

export default function ObjectivesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-32 px-6 lg:px-8 bg-[#CAD9C2]/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Objective
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe healthcare and wellness should be within reach for
            everyone. Our purpose is to:
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 50, scale: 0.95 }
                }
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="p-8 lg:p-10 h-full bg-white border-card-border shadow-lg transition-shadow hover:shadow-xl">
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
                      {objective.title}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
