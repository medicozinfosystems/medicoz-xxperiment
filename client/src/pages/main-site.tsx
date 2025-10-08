import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Mic, Smartphone, Mail, Linkedin, Youtube, Heart, Lock, Brain, Leaf, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useRef, useState, useEffect } from "react";
import HandwrittenText from "@/components/HandwrittenText";

interface MainSiteProps {
  showButtonsImmediately?: boolean;
}

export default function MainSite({ showButtonsImmediately = false }: MainSiteProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [pulsePosition, setPulsePosition] = useState(0);
  const [ecgSpeed, setEcgSpeed] = useState(3);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const ribbonY = useTransform(heroScrollProgress, [0, 1], [0, 200]);

  const teamMembers = [
    {
      name: "Meera Gupta",
      role: "Chief Experience Officer",
      tagline: "Engineer of empathy",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
      color: "#DB2777" // pink
    },
    {
      name: "Arjun Khanna",
      role: "Head of Engineering",
      tagline: "Building care into code",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      color: "#0891B2" // cyan
    },
    {
      name: "Veda Raman",
      role: "Clinical Partnerships",
      tagline: "Bridging health and tech",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Veda",
      color: "#7C3AED" // violet
    },
    {
      name: "Harshiv Gajjar",
      role: "Product & Platforms",
      tagline: "Designing technology that feels human",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshiv",
      color: "#059669" // emerald
    },
    {
      name: "Mitra Vanshita",
      role: "Strategy & Growth",
      tagline: "Scaling trust globally",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mitra",
      color: "#3B82F6" // blue
    }
  ];

  const intents = ["Partnership", "Pilot Project", "Sponsorship", "Careers"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  // Cursor ripple effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
        setCursorPosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Footer ECG pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePosition(0);
      setTimeout(() => setPulsePosition(100), 50);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50/20 to-violet-50/10 dark:from-gray-950 dark:via-cyan-950/20 dark:to-violet-950/10">
        
        {/* Cursor Ripple Effect */}
        <motion.div
          className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(8, 145, 178, 0.15) 0%, transparent 70%)`,
            left: springX,
            top: springY,
            x: "-50%",
            y: "-50%"
          }}
        />

        {/* ECG Pulse → Data Ribbon */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <motion.path
            d="M 0 50 L 100 50 L 120 30 L 140 70 L 160 50 L 180 50 L 200 40 L 220 60 L 240 50 L 400 50"
            stroke="#0891B2"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Flowing Data Ribbon */}
        <motion.svg 
          className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
          style={{ y: ribbonY }}
        >
          <motion.path
            d="M 0 100 Q 200 80, 400 100 T 800 100 T 1200 100"
            stroke="url(#ribbonGradient)"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          />
          <defs>
            <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
        </motion.svg>

        <motion.div 
          className="max-w-6xl mx-auto px-6 text-center relative z-10"
          style={{ opacity: heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <p className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 tracking-[0.2em] uppercase">
              Healthcare • Platforms • AI
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Medicoz Infosystems
          </motion.h1>

          {/* Handwritten Tagline with Writing Animation */}
          <HandwrittenText 
            text="Technology that cares"
            delay={0.8}
            duration={3}
            className="mb-12"
          />

          {/* Support Text */}
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Empowering healthcare providers with intelligent, empathetic technology solutions
            that put patients first. From real-time communication to global connectivity,
            we bridge the gap between care and technology.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: showButtonsImmediately ? 0 : 1.6 
            }}
          >
            <Button size="lg" className="text-lg px-8 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600" data-testid="button-explore-services">
              Explore our services
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-950" data-testid="button-partner">
              Partner with us
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative py-32 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Two Ways We Make Care More Human
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* The XXperiment Podcast */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-l-4 border-l-pink-600 hover-elevate bg-white dark:bg-gray-800 dark:border-l-pink-400" data-testid="card-xxperiment">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400 border-0">Podcast</Badge>
                    <div className="p-3 rounded-xl bg-pink-600 dark:bg-pink-500">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl text-gray-900 dark:text-white">
                    The XXperiment
                  </CardTitle>
                  <p className="text-lg font-medium text-pink-600 dark:text-pink-400">
                    Conversations that care
                  </p>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
                    Women's health, stories, science, and strength. Where voices become change.
                  </CardDescription>
                  
                  {/* Realistic Audio Waveform */}
                  <div className="relative h-24 mb-6 bg-pink-50 dark:bg-pink-950/30 rounded-lg p-4 overflow-hidden">
                    <div className="flex items-end justify-center gap-1 h-full">
                      {[...Array(50)].map((_, i) => {
                        const height = Math.abs(Math.sin((i * Math.PI) / 12) * 70 + Math.random() * 20);
                        return (
                          <motion.div
                            key={i}
                            className="flex-1 bg-pink-600 dark:bg-pink-400 rounded-full"
                            initial={{ height: "10%" }}
                            animate={{ 
                              height: `${height}%`,
                            }}
                            transition={{
                              duration: 0.3 + Math.random() * 0.2,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                              delay: i * 0.02
                            }}
                          />
                        );
                      })}
                    </div>
                    {/* Playing indicator */}
                    <motion.div 
                      className="absolute top-2 left-2 flex gap-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[0, 0.1, 0.2].map((delay, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-pink-600 dark:bg-pink-400 rounded-full"
                          animate={{ 
                            height: ["8px", "16px", "8px"],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 text-white"
                    data-testid="button-xxperiment"
                  >
                    Go to The XXperiment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Medicoz App */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border-l-4 border-l-cyan-600 hover-elevate bg-white dark:bg-gray-800 dark:border-l-cyan-400" data-testid="card-medicoz-app">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-0">Coming Soon</Badge>
                    <div className="p-3 rounded-xl bg-cyan-600 dark:bg-cyan-500">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl text-gray-900 dark:text-white">
                    Medicoz App
                  </CardTitle>
                  <p className="text-lg font-medium text-cyan-600 dark:text-cyan-400">
                    Care in your pocket
                  </p>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
                    Appointments, insights, and support — in one place.
                  </CardDescription>
                  
                  {/* Feature highlights */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-cyan-50 dark:bg-cyan-950/30 rounded-lg">
                      <Activity className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Multilingual support</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                      <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Private by design</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-violet-50 dark:bg-violet-950/30 rounded-lg">
                      <Heart className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Clinical-grade UX</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white"
                      data-testid="button-waitlist"
                    >
                      Join the waitlist
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-600 hover:bg-cyan-50 dark:border-cyan-400 dark:text-cyan-400 dark:hover:bg-cyan-950"
                      data-testid="button-notify"
                    >
                      Notify me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About & Team Section - Orbit Design */}
      <section ref={teamRef} className="relative py-32 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              People Behind the Pulse
            </h2>
            <p className="text-2xl font-semibold text-cyan-600 dark:text-cyan-400 mb-4">
              Everyone revolves around the same purpose: care
            </p>
          </motion.div>

          {/* Orbit System */}
          <div className="relative w-full max-w-5xl mx-auto h-[600px] flex items-center justify-center">
            {/* Center - Our Purpose */}
            <motion.div
              className="absolute z-20 w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(8, 145, 178, 0.2) 0%, rgba(8, 145, 178, 0.05) 100%)",
                boxShadow: "0 0 60px rgba(8, 145, 178, 0.3)"
              }}
              animate={{
                boxShadow: [
                  "0 0 60px rgba(8, 145, 178, 0.3)",
                  "0 0 80px rgba(8, 145, 178, 0.5)",
                  "0 0 60px rgba(8, 145, 178, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <Heart className="w-8 h-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-gray-900 dark:text-white">Our Purpose</p>
              </div>
            </motion.div>

            {/* Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="absolute w-96 h-96 rounded-full border border-gray-200 dark:border-gray-800"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute w-[500px] h-[500px] rounded-full border border-gray-100 dark:border-gray-900"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Team Members Orbiting */}
            {teamMembers.map((member, index) => {
              const angle = (index * 360) / teamMembers.length;
              const radius = 220;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const isHovered = hoveredMember === index;

              return (
                <motion.div
                  key={member.name}
                  className="absolute"
                  initial={{ x, y }}
                  animate={{
                    x: isHovered ? x * 0.9 : x,
                    y: isHovered ? y * 0.9 : y,
                    rotate: isHovered ? 0 : -angle
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15,
                    rotate: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredMember(index)}
                  onHoverEnd={() => setHoveredMember(null)}
                  data-testid={`orbit-member-${member.name.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="relative">
                    {/* Profile Image */}
                    <motion.div
                      className="w-24 h-24 rounded-full overflow-hidden border-4 cursor-pointer"
                      style={{ 
                        borderColor: isHovered ? member.color : "#e5e7eb",
                        boxShadow: isHovered ? `0 0 30px ${member.color}50` : "none"
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Info Card */}
                    <motion.div
                      className="absolute left-32 top-0 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-2xl border-2 w-64"
                      style={{ borderColor: member.color }}
                      initial={{ opacity: 0, x: -20, scale: 0.8 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -20,
                        scale: isHovered ? 1 : 0.8,
                        pointerEvents: isHovered ? "auto" : "none"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{member.role}</p>
                      <p 
                        className="text-sm font-medium italic"
                        style={{ color: member.color }}
                      >
                        "{member.tagline}"
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Heart,
                  title: "Empathy in every interface",
                  description: "We measure success by felt relief.",
                  color: "#DB2777"
                },
                {
                  icon: Lock,
                  title: "Privacy by default",
                  description: "Your data belongs to you.",
                  color: "#7C3AED"
                },
                {
                  icon: Brain,
                  title: "Intelligence that empowers",
                  description: "Augmenting clinicians, not replacing them.",
                  color: "#0891B2"
                },
                {
                  icon: Leaf,
                  title: "Sustainable innovation",
                  description: "Long-term health, not hype.",
                  color: "#059669"
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover-elevate bg-white dark:bg-gray-800 border-0 shadow-md" data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="pt-8">
                      <div 
                        className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${value.color}20` }}
                      >
                        <value.icon className="w-8 h-8" style={{ color: value.color }} />
                      </div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{value.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact / Hiring Section */}
      <section className="relative py-32 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Let's build what care deserves
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Have a partnership, pilot, or talent to bring? Tell us how you want to make healthcare more human. 
              We'll reply within 2 business days.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white dark:bg-gray-800 border-0 shadow-lg">
              <CardContent className="pt-8 space-y-8">
                {/* Intent chips */}
                <div>
                  <label className="text-sm font-semibold mb-3 block text-gray-700 dark:text-gray-200">What brings you here?</label>
                  <div className="flex flex-wrap gap-3">
                    {intents.map((intent) => (
                      <Badge
                        key={intent}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all border-2 ${
                          selectedIntent === intent
                            ? "bg-violet-600 text-white border-violet-600 dark:bg-violet-500 dark:border-violet-500"
                            : "bg-white text-gray-700 border-gray-300 hover:border-violet-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:border-violet-500"
                        }`}
                        onClick={() => setSelectedIntent(intent)}
                        data-testid={`chip-${intent.toLowerCase().replace(" ", "-")}`}
                      >
                        {intent}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedIntent === "Careers" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg p-4"
                  >
                    <p className="text-sm text-emerald-800 dark:text-emerald-300">
                      We welcome builders from healthcare, design, and engineering. Remote-friendly. Mission-first.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Who are you?</label>
                    <Input 
                      placeholder="Full name" 
                      className="h-12 border-gray-300 dark:border-gray-600"
                      data-testid="input-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Where can we reach you?</label>
                    <Input 
                      placeholder="Email address" 
                      type="email"
                      className="h-12 border-gray-300 dark:border-gray-600"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">How do you want to make healthcare more human?</label>
                    <Textarea 
                      placeholder="Tell us your goals, constraints, and timeline..." 
                      rows={6}
                      className="border-gray-300 dark:border-gray-600"
                      data-testid="textarea-message"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">
                      Optional — Attach a deck or link to your work
                    </label>
                    <Input 
                      placeholder="https://..." 
                      type="url"
                      className="h-12 border-gray-300 dark:border-gray-600"
                      data-testid="input-attachment"
                    />
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-lg p-6 text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl mb-3 text-emerald-600 dark:text-emerald-400"
                      >
                        ✓
                      </motion.div>
                      <p className="text-emerald-800 dark:text-emerald-300 font-medium">
                        Thank you — you've just made healthcare a little more human.
                      </p>
                    </motion.div>
                  ) : (
                    <Button 
                      type="submit"
                      size="lg" 
                      className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white text-lg"
                      data-testid="button-send-message"
                    >
                      Send message
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer - "A Quiet Pulse" */}
      <footer 
        ref={footerRef}
        className="relative bg-white dark:bg-gray-950 py-16 px-6 overflow-hidden"
        onMouseEnter={() => setEcgSpeed(1.5)}
        onMouseLeave={() => setEcgSpeed(3)}
      >
        {/* Animated ECG Line */}
        <div className="absolute top-0 left-0 w-full h-px overflow-hidden">
          <svg className="w-full h-8" preserveAspectRatio="none" viewBox="0 0 1200 30">
            {/* Base ECG Line */}
            <path
              d="M 0 15 L 300 15 L 320 5 L 340 25 L 360 15 L 1200 15"
              stroke="#0891B2"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            
            {/* Traveling Pulse */}
            <motion.path
              d="M 0 15 L 20 15 L 25 5 L 30 25 L 35 15 L 50 15"
              stroke="#0891B2"
              strokeWidth="3"
              fill="none"
              initial={{ x: -50, opacity: 0 }}
              animate={{ 
                x: pulsePosition === 100 ? 1200 : -50,
                opacity: pulsePosition === 100 ? [0, 1, 1, 0] : 0
              }}
              transition={{ 
                duration: ecgSpeed,
                ease: "linear"
              }}
              filter="url(#glow)"
            />
            
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Left */}
            <div>
              <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                Medicoz Infosystems
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                Technology that cares.
              </p>
            </div>
            
            {/* Middle - Links */}
            <div>
              <nav className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
                <a href="#about" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" data-testid="link-about">About</a>
                <span>•</span>
                <a href="#services" className="hover:text-pink-600 dark:hover:text-pink-400 transition-colors" data-testid="link-services">Services</a>
                <span>•</span>
                <a href="#xxperiment" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-xxperiment">The XXperiment</a>
                <span>•</span>
                <a href="#careers" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" data-testid="link-careers">Careers</a>
                <span>•</span>
                <a href="#privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" data-testid="link-privacy">Privacy</a>
              </nav>
            </div>
            
            {/* Right - Social Icons with Pulse Interaction */}
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">hello@medicoz.com</p>
              <div className="flex gap-4">
                <motion.div
                  animate={{
                    scale: pulsePosition > 80 && pulsePosition < 100 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-gray-600 dark:text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                    data-testid="button-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    scale: pulsePosition > 85 && pulsePosition < 100 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400"
                    data-testid="button-mail"
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    scale: pulsePosition > 90 && pulsePosition < 100 ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-gray-600 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400"
                    data-testid="button-youtube"
                  >
                    <Youtube className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem" }}>
              Connection begins with care.
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">© 2025 Medicoz Infosystems</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
