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
      name: "Meera Gupta",
      role: "Chief Experience Officer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
      story: "Designing interfaces that feel like a conversation.",
      angle: 0
    },
    {
      name: "Arjun Khanna",
      role: "Head of Engineering",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      story: "Reliability you can feel. Speed you can't notice.",
      angle: 72
    },
    {
      name: "Veda Raman",
      role: "Clinical Partnerships",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Veda",
      story: "Care pathways that meet people where they are.",
      angle: 144
    },
    {
      name: "Harshiv Gajjar",
      role: "Product & Platforms",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshiv",
      story: "Turning empathy into infrastructure.",
      angle: 216
    },
    {
      name: "Mitra Vanshita",
      role: "Strategy & Growth",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mitra",
      story: "Scaling trust across cultures.",
      angle: 288
    }
  ];

  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [formStage, setFormStage] = useState(0);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [messageValue, setMessageValue] = useState("");

  const intents = ["Partnership", "Pilot Project", "Sponsorship", "Careers"];

  const handleIntentSelect = (intent: string) => {
    setSelectedIntent(intent);
    if (intent === "Careers") {
      setMessageValue("I'm excited to explore career opportunities with Medicoz Infosystems. ");
    } else {
      setMessageValue(`I'm interested in exploring a ${intent.toLowerCase()} with Medicoz Infosystems. `);
    }
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
          {/* Eyebrow */}
          <motion.p
            className="text-sm md:text-base text-muted-foreground mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            data-testid="text-eyebrow"
          >
            Healthcare • Platforms • AI
          </motion.p>

          {/* Headline with type-in effect */}
          <motion.h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-violet-600">
            {"Technology that cares".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.1,
                  delay: 0.5 + i * 0.05,
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Support line */}
          <motion.p
            className="text-xl md:text-3xl text-foreground/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            data-testid="text-support-line"
          >
            Health, made human.
          </motion.p>
          
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: showButtonsImmediately ? 0 : 3.5
            }}
          >
            <Button size="lg" className="text-lg px-8" data-testid="button-explore-services">
              Explore our services
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-partner">
              Partner with us
            </Button>
          </motion.div>
        </motion.div>

        {/* Micro-line bottom-right */}
        <motion.p
          className="absolute bottom-8 right-8 text-sm text-muted-foreground/60 max-w-xs text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
          data-testid="text-micro-line"
        >
          Designed with empathy. Built for scale.
        </motion.p>
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
            Two Ways We Make Care More Human
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
                      <Badge className="bg-pink-500 text-white">Podcast</Badge>
                    </div>
                    <h3 className="text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-violet-600">
                      The XXperiment — Conversations that care
                    </h3>
                    <p className="text-lg text-violet-600 font-medium mb-4">
                      Women's health, stories, science, and strength.
                    </p>
                    <motion.p
                      className="text-muted-foreground mb-6 italic"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      data-testid="text-xxperiment-hover"
                    >
                      Where voices become change.
                    </motion.p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-pink-600 to-violet-600 text-white"
                      data-testid="button-xxperiment"
                    >
                      Go to The XXperiment
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
                      Medicoz App — Care in your pocket
                    </h3>
                    <p className="text-lg text-cyan-600 font-medium mb-4">
                      Appointments, insights, and support — in one place.
                    </p>
                    
                    {/* Auto-cycling feature bullets */}
                    <motion.div className="mb-6 h-8">
                      {["Multilingual", "Private by design", "Clinical-grade UX"].map((feature, i) => (
                        <motion.p
                          key={feature}
                          className="text-muted-foreground absolute"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{
                            opacity: [0, 1, 1, 0],
                            y: [10, 0, 0, -10],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: i * 3,
                            times: [0, 0.1, 0.9, 1],
                          }}
                        >
                          {feature}
                        </motion.p>
                      ))}
                    </motion.div>

                    <div className="flex gap-3 flex-wrap">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-cyan-600 to-emerald-600 text-white"
                        data-testid="button-join-waitlist"
                      >
                        Join the waitlist
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        data-testid="button-notify-me"
                      >
                        Notify me
                      </Button>
                    </div>
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
            className="text-5xl md:text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            People-first. Science-backed. Design-led.
          </motion.h2>
          
          <motion.p
            className="text-lg md:text-xl text-center text-muted-foreground max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            We build healthcare technology that listens, learns, and supports—without getting in the way. 
            Our team blends clinical insight, data science, and craft-level design to serve patients and professionals alike.
          </motion.p>

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

          {/* Values Section */}
          <motion.div
            className="mt-32 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🤍</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Empathy in every interface</h4>
                  <p className="text-muted-foreground">We measure success by felt relief.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔒</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Privacy by default</h4>
                  <p className="text-muted-foreground">Your data belongs to you.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🧠</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Intelligence that empowers</h4>
                  <p className="text-muted-foreground">Augmenting clinicians, not replacing them.</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🌱</div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Sustainable innovation</h4>
                  <p className="text-muted-foreground">Long-term health, not hype.</p>
                </div>
              </div>
            </Card>
          </motion.div>
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
            className="text-5xl md:text-6xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-400 to-cyan-400"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Let's build what care deserves
          </motion.h2>

          <motion.p
            className="text-lg text-center text-gray-300 max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Have a partnership, pilot, or talent to bring? Tell us how you want to make healthcare more human. 
            We'll reply within 2 business days.
          </motion.p>

          {/* Intent chips */}
          <motion.div
            className="flex gap-3 justify-center mb-12 flex-wrap"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {intents.map((intent) => (
              <motion.button
                key={intent}
                className={`px-6 py-3 rounded-full border-2 transition-all ${
                  selectedIntent === intent
                    ? 'bg-gradient-to-r from-cyan-500 to-violet-500 border-transparent text-white'
                    : 'border-cyan-400/50 text-cyan-400 hover:border-cyan-400'
                }`}
                onClick={() => handleIntentSelect(intent)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-testid={`chip-${intent.toLowerCase().replace(' ', '-')}`}
              >
                {intent}
              </motion.button>
            ))}
          </motion.div>

          {/* Hiring micro-copy when Careers selected */}
          {selectedIntent === "Careers" && (
            <motion.p
              className="text-center text-cyan-400/80 mb-8 italic"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              data-testid="text-careers-info"
            >
              We welcome builders from healthcare, design, and engineering. Remote-friendly. Mission-first.
            </motion.p>
          )}

          {/* Interactive timeline form */}
          <div className="space-y-12">
            {/* Stage 1 - Who are you? */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-light text-cyan-400 mb-4">Who are you?</h3>
              <Input
                placeholder="Full name"
                className="bg-white/5 border-cyan-400/30 text-white placeholder:text-gray-400 h-12"
                data-testid="input-name"
              />
            </motion.div>

            {/* Stage 2 - Where can we reach you? */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-2xl font-light text-violet-400 mb-4">Where can we reach you?</h3>
              <Input
                placeholder="Email"
                type="email"
                className="bg-white/5 border-violet-400/30 text-white placeholder:text-gray-400 h-12"
                data-testid="input-email"
              />
            </motion.div>

            {/* Stage 3 - How do you want to make healthcare more human? */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-light text-pink-400 mb-4">How do you want to make healthcare more human?</h3>
              <Textarea
                value={messageValue}
                onChange={(e) => setMessageValue(e.target.value)}
                placeholder="Tell us your goals, constraints, and timeline."
                className="bg-white/5 border-pink-400/30 text-white placeholder:text-gray-400 min-h-32"
                data-testid="textarea-message"
              />
            </motion.div>

            {/* Stage 4 - Optional attachment note */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-gray-400 italic">
                Optional — Attach a deck or link to your work.
              </p>
            </motion.div>

            {/* Submit */}
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
                Send message
              </Button>
              <motion.p
                className="text-cyan-400/80 mt-6 text-lg italic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Thank you — you've just made healthcare a little more human.
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
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Left: Company */}
            <div>
              <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Medicoz Infosystems
              </h3>
              <p className="text-gray-300">Technology that cares.</p>
            </div>

            {/* Middle: Links */}
            <div>
              <nav className="flex flex-wrap gap-4 text-gray-300">
                <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
                <span>•</span>
                <a href="#services" className="hover:text-cyan-400 transition-colors">Services</a>
                <span>•</span>
                <a href="#" className="hover:text-cyan-400 transition-colors">The XXperiment</a>
                <span>•</span>
                <a href="#careers" className="hover:text-cyan-400 transition-colors">Careers</a>
                <span>•</span>
                <a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy</a>
              </nav>
            </div>

            {/* Right: Contact */}
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@medicoz.com" className="text-gray-300 hover:text-cyan-400 transition-colors">
                hello@medicoz.com
              </a>
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
                    data-testid="button-youtube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
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
          </div>

          {/* Bottom micro-tagline */}
          <div className="pt-8 border-t border-gray-700 text-center">
            <motion.p
              className="text-gray-400 italic"
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              Connection begins with care.
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  );
}
