import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, useMotionValueEvent } from "framer-motion";
import { Activity, Heart, Users, Smartphone, Mic, Mail, Briefcase, MapPin, Phone, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";

interface MainSiteProps {
  showButtonsImmediately?: boolean;
}

export default function MainSite({ showButtonsImmediately = false }: MainSiteProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [isHoveringTagline, setIsHoveringTagline] = useState(false);
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const ecgMorph = useTransform(heroScrollProgress, [0, 0.5, 1], [0, 50, 100]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);

  // ECG path generator function
  const generateECGPath = (morphValue: number) => {
    const baseY = 50;
    const amplitude = 20 - (morphValue / 100) * 15; // Reduce amplitude as it morphs
    const frequency = 1 + (morphValue / 100) * 2; // Increase frequency for wave effect
    
    let path = `M 0 ${baseY}`;
    for (let x = 0; x <= 100; x += 2) {
      if (x % 20 < 4 && morphValue < 50) {
        // ECG spike
        const spikeHeight = x % 20 === 0 ? -amplitude : amplitude / 2;
        path += ` L ${x} ${baseY + spikeHeight}`;
      } else {
        // Wave pattern
        const y = baseY + Math.sin((x / 100) * Math.PI * frequency) * (morphValue / 100) * amplitude;
        path += ` L ${x} ${y}`;
      }
    }
    return path;
  };

  // ECG path as motion value - reactive to scroll
  const ecgPath = useMotionValue(generateECGPath(0));
  
  useMotionValueEvent(ecgMorph, "change", (latest) => {
    ecgPath.set(generateECGPath(latest));
  });

  // Team data with stories
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      story: "Built telehealth dashboards for rural India",
      angle: 0
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Technology",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      story: "Former tech lead at major health platforms",
      angle: 90
    },
    {
      name: "Priya Sharma",
      role: "Product Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      story: "User-centered design advocate",
      angle: 180
    },
    {
      name: "James Wilson",
      role: "Operations Lead",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      story: "Healthcare operations specialist",
      angle: 270
    }
  ];

  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [formStage, setFormStage] = useState(0);
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [messageValue, setMessageValue] = useState("");

  const careers = ["Designer", "Engineer", "Strategist", "Healthcare Expert"];

  const handleCareerSelect = (career: string) => {
    setSelectedCareer(career);
    setMessageValue(`I'm passionate about ${career.toLowerCase()} and I would love to contribute to Medicoz Infosystems. `);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/20">
      {/* Hero Section - The Moment of Connection */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Calm gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/40 to-cyan-50/30" />
        
        {/* ECG Line that morphs into waves */}
        <motion.svg
          className="absolute inset-0 w-full h-full opacity-30"
          style={{ opacity: heroOpacity }}
        >
          <motion.path
            d={ecgPath}
            stroke="url(#ecgGradient)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Data ribbon pulse effect */}
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Signal traveling animation - connecting icons */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-4xl h-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Icons */}
            {[
              { Icon: Activity, x: "10%", label: "Doctor" },
              { Icon: Users, x: "35%", label: "Patient" },
              { Icon: Smartphone, x: "65%", label: "Device" },
              { Icon: Heart, x: "90%", label: "Heart" },
            ].map(({ Icon, x, label }, index) => (
              <motion.div
                key={label}
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: x }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
              >
                <div className="relative">
                  <Icon className="w-8 h-8 text-cyan-600" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-cyan-400/20"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  />
                </div>
                <p className="text-xs text-center mt-2 text-muted-foreground">{label}</p>
              </motion.div>
            ))}
            
            {/* Traveling signal */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-violet-500"
              animate={{
                left: ["10%", "35%", "65%", "90%"],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        {/* Cursor-reactive tagline */}
        <motion.div
          className="relative z-10 text-center max-w-6xl mx-auto px-6"
          style={{ opacity: heroOpacity }}
          onMouseEnter={() => setIsHoveringTagline(true)}
          onMouseLeave={() => setIsHoveringTagline(false)}
        >
          <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">
            {"Medicoz Infosystems".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                animate={{
                  scale: isHoveringTagline ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  delay: i * 0.03,
                  repeat: isHoveringTagline ? Infinity : 0,
                  repeatDelay: 1,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl text-blue-800 mb-8 font-light tracking-wide"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            technology that cares
          </motion.p>

          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: showButtonsImmediately ? 0 : 1.2
            }}
          >
            <Button size="lg" className="text-lg px-8" data-testid="button-get-started">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-learn-more">
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services - Bento Story Grid */}
      <section ref={servicesRef} className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Services
          </motion.h2>

          {/* Diagonal Bento Grid */}
          <div className="relative h-[800px] md:h-[600px]">
            {/* Tile 1 - The XXperiment */}
            <motion.div
              className="absolute w-full md:w-[55%] h-[380px] md:h-full left-0 top-0"
              initial={{ opacity: 0, x: -100, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, rotate: 1, zIndex: 20 }}
            >
              <Card className="h-full overflow-hidden bg-gradient-to-br from-pink-500/10 via-violet-500/10 to-cyan-500/10 border-0 shadow-2xl">
                <CardContent className="p-8 h-full flex flex-col justify-between relative">
                  {/* Animated waveform background */}
                  <div className="absolute inset-0 opacity-30">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute bg-gradient-to-r from-pink-500 to-violet-500"
                        style={{
                          left: `${i * 5}%`,
                          bottom: 0,
                          width: '4%',
                        }}
                        animate={{
                          height: [
                            `${20 + Math.sin(i * 0.5) * 30}%`,
                            `${20 + Math.sin(i * 0.5 + Math.PI) * 30}%`,
                            `${20 + Math.sin(i * 0.5) * 30}%`,
                          ],
                        }}
                        transition={{
                          duration: 1 + (i % 3) * 0.2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Mic className="w-10 h-10 text-pink-600" />
                      <Badge className="bg-emerald-500 text-white">Live Now</Badge>
                    </div>
                    <h3 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600">
                      The XXpeirment
                    </h3>
                    <p className="text-lg text-violet-600 font-medium mb-4">
                      A Podcast for All Things Women
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Empowering conversations that celebrate women's voices, stories, and experiences.
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-pink-600 to-violet-600 text-white"
                      data-testid="button-xxpeirment"
                    >
                      Listen Now
                    </Button>
                  </div>

                  {/* Floating quote on hover */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-2xl font-light italic text-pink-600">
                      "Voices that inspire, stories that empower"
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tile 2 - Medicoz App */}
            <motion.div
              className="absolute w-full md:w-[55%] h-[380px] md:h-full right-0 top-[400px] md:top-0"
              initial={{ opacity: 0, x: 100, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, rotate: -1, zIndex: 20 }}
            >
              <Card className="h-full overflow-hidden bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-emerald-500/10 border-0 shadow-2xl">
                <CardContent className="p-8 h-full flex flex-col justify-between relative">
                  {/* 3D Phone with heartbeat ripples */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <motion.div
                      className="relative"
                      animate={{
                        rotateY: [0, 360],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Smartphone className="w-32 h-32 text-cyan-600" />
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute inset-0 border-2 border-cyan-400 rounded-3xl"
                          animate={{
                            scale: [1, 2, 3],
                            opacity: [0.5, 0.2, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.7,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone className="w-10 h-10 text-cyan-600" />
                      <Badge variant="secondary">Coming Soon</Badge>
                    </div>
                    <h3 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">
                      Medicoz App
                    </h3>
                    <p className="text-lg text-cyan-600 font-medium mb-4">
                      Care. Anywhere.
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Revolutionary healthcare platform connecting patients and providers seamlessly.
                    </p>
                    <motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white relative overflow-hidden group"
                        data-testid="button-medicoz-app"
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/20"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{
                            scale: 2,
                            opacity: [0, 0.5, 0],
                          }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10">Notify Me</span>
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About - People Behind the Pulse (Circular Orbit) */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-20 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            People Behind the Pulse
          </motion.h2>

          <div className="relative w-full max-w-4xl mx-auto h-[600px] flex items-center justify-center">
            {/* Central glowing core */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: hoveredMember !== null ? 0.5 : 1,
              }}
            >
              <div className="relative">
                <motion.div
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 flex items-center justify-center"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <h3 className="text-2xl font-bold text-white text-center">
                    Our Purpose
                  </h3>
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 blur-xl opacity-50"
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Orbiting team members */}
            {team.map((member, index) => {
              const radius = 250;
              const angle = (member.angle * Math.PI) / 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={member.name}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: hoveredMember === index ? x * 1.1 : x,
                    y: hoveredMember === index ? y * 1.1 : y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                  }}
                  onMouseEnter={() => setHoveredMember(index)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <motion.div
                    className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-cyan-400 to-violet-400 p-1">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </div>
                    
                    {/* Story highlight on hover */}
                    <motion.div
                      className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 text-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{
                        opacity: hoveredMember === index ? 1 : 0,
                        y: hoveredMember === index ? 0 : -10,
                      }}
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                        <h4 className="font-bold text-gray-900 mb-1">{member.name}</h4>
                        <p className="text-sm text-violet-600 mb-2">{member.role}</p>
                        <p className="text-sm text-muted-foreground italic">"{member.story}"</p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact/Hiring - Join the Movement (Interactive Timeline) */}
      <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the Movement
          </motion.h2>

          {/* Holographic career tags */}
          <motion.div
            className="flex gap-3 justify-center mb-12 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {careers.map((career) => (
              <motion.button
                key={career}
                className={`px-6 py-3 rounded-full border-2 transition-all ${
                  selectedCareer === career
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 border-transparent text-white'
                    : 'border-cyan-400/50 text-cyan-400 hover:border-cyan-400'
                }`}
                onClick={() => handleCareerSelect(career)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {career}
              </motion.button>
            ))}
          </motion.div>

          {/* Interactive timeline form */}
          <div className="space-y-12">
            {/* Stage 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-light text-cyan-400 mb-4">Tell us who you are</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-400 h-12"
                  data-testid="input-name"
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-400 h-12"
                  data-testid="input-email"
                />
              </div>
            </motion.div>

            {/* Stage 2 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-light text-violet-400 mb-4">Tell us what drives you</h3>
              <Textarea
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                placeholder="Your story, your passion, your vision..."
                className="bg-white/5 border-violet-400/30 text-white placeholder:text-gray-400 min-h-32"
                data-testid="textarea-message"
              />
            </motion.div>

            {/* Stage 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white text-lg px-12"
                data-testid="button-send-message"
              >
                Send Message
              </Button>
              <motion.p
                className="text-cyan-400 mt-6 text-lg"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                We'll get back within 48 hours
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - A Quiet Pulse */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-violet-900 text-white py-16 px-6 overflow-hidden">
        {/* ECG line along bottom */}
        <svg className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
          <motion.path
            d="M 0 50 L 20 50 L 25 20 L 30 80 L 35 50 L 100 50"
            stroke="url(#footerEcgGradient)"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            animate={{
              pathLength: [0, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <defs>
            <linearGradient id="footerEcgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Medicoz Infosystems
              </h3>
              <motion.p
                className="text-2xl font-light text-cyan-300 mb-6 italic"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                "Connection begins with care."
              </motion.p>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:text-cyan-400 relative"
                    data-testid="button-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-cyan-400/20"
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0,
                      }}
                    />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }}>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:text-violet-400 relative"
                    data-testid="button-twitter"
                  >
                    <Twitter className="w-5 h-5" />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-violet-400/20"
                      animate={{
                        scale: [1, 1.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    />
                  </Button>
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-cyan-400">Services</h4>
              <ul className="space-y-2 text-gray-300">
                <li>The XXpeirment</li>
                <li>Medicoz App</li>
                <li>Healthcare Solutions</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-violet-400">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>© 2025 Medicoz Infosystems. Technology that cares.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
