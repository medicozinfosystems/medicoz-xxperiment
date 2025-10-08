import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Mic, Smartphone, Mail, Linkedin, Youtube, Heart, Lock, Brain, Leaf, Activity, Play } from "lucide-react";
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

        {/* ECG Pulse Line at Top */}
        <div className="absolute top-0 left-0 w-full h-24 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
            <motion.path
              d="M 0 50 L 400 50 L 420 30 L 440 70 L 460 50 L 1200 50"
              stroke="#0891B2"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>

        {/* Flowing Data Ribbon - Decorative */}
        <motion.div
          className="absolute top-1/3 left-0 w-full pointer-events-none z-0"
          style={{ y: ribbonY }}
        >
          <svg 
            className="w-full h-32 opacity-20"
            viewBox="0 0 1200 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M -100 50 Q 100 20, 300 50 T 700 50 Q 900 20, 1100 50 T 1500 50"
              stroke="url(#ribbonGradient)"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, delay: 1 }}
            />
            <defs>
              <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891B2" />
                <stop offset="33%" stopColor="#7C3AED" />
                <stop offset="66%" stopColor="#DB2777" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

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
            duration={2.5}
            color="cyan"
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
            <Button size="lg" className="text-lg px-8 bg-cyan-600 dark:bg-cyan-500" data-testid="button-explore-services">
              Explore our services
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400" data-testid="button-partner">
              Partner with us
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section - Innovated */}
      <section ref={servicesRef} className="relative py-32 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Making Healthcare More Human
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Through conversations and technology, we're reshaping how care feels
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* The XXperiment Podcast - Enhanced Player */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative" data-testid="card-xxperiment">
                {/* Podcast Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-600 to-pink-500 dark:from-pink-500 dark:to-pink-400">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-950/30 dark:text-pink-400 border-0 mb-2">Podcast</Badge>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">The XXperiment</h3>
                    </div>
                  </div>
                  <p className="text-lg text-pink-600 dark:text-pink-400 font-medium mb-2">
                    Conversations That Care
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Women's health, stories, science, and strength. Where voices become change.
                  </p>
                </div>

                {/* Enhanced Audio Player */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/30 dark:to-pink-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-800">
                  {/* Episode Info */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-pink-900 dark:text-pink-300">Now Playing</p>
                    <p className="text-xs text-pink-700 dark:text-pink-400">Ep. 12: Breaking the Silence</p>
                  </div>

                  {/* Waveform Visualization - 60 bars */}
                  <div className="relative h-32 mb-4 bg-white/50 dark:bg-black/20 rounded-xl p-4 overflow-hidden">
                    <div className="flex items-end justify-center gap-0.5 h-full">
                      {[...Array(60)].map((_, i) => {
                        const height = Math.abs(Math.sin((i * Math.PI) / 15) * 80 + Math.random() * 15);
                        return (
                          <motion.div
                            key={i}
                            className="flex-1 bg-gradient-to-t from-pink-600 to-pink-400 dark:from-pink-500 dark:to-pink-300 rounded-full min-w-[1px]"
                            initial={{ height: "20%" }}
                            animate={{ 
                              height: `${height}%`,
                            }}
                            transition={{
                              duration: 0.4 + Math.random() * 0.3,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                              delay: i * 0.015
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Progress Bar - Animated */}
                  <div className="mb-4">
                    <div className="h-1.5 bg-pink-200 dark:bg-pink-900 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-pink-600 dark:bg-pink-400"
                        initial={{ width: "0%" }}
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ 
                          duration: 28,
                          ease: "linear",
                          repeat: Infinity
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-pink-700 dark:text-pink-400 mt-1">
                      <span>2:34</span>
                      <span>45:12</span>
                    </div>
                  </div>

                  {/* Play Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-pink-600 dark:text-pink-400"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 6h2v12H6zm10 0h2v12h-2z"/>
                      </svg>
                    </Button>
                    <Button 
                      size="icon"
                      className="w-14 h-14 bg-pink-600 dark:bg-pink-500 text-white rounded-full"
                      data-testid="button-play"
                    >
                      <Play className="w-6 h-6 ml-0.5" fill="currentColor" />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="text-pink-600 dark:text-pink-400"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                      </svg>
                    </Button>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full mt-6 bg-pink-600 dark:bg-pink-500 text-white"
                  data-testid="button-xxperiment"
                >
                  Listen on The XXperiment
                </Button>
              </div>
            </motion.div>

            {/* Medicoz App */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full" data-testid="card-medicoz-app">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-600 to-cyan-500 dark:from-cyan-500 dark:to-cyan-400">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border-0 mb-2">Coming Soon</Badge>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Medicoz App</h3>
                    </div>
                  </div>
                  <p className="text-lg text-cyan-600 dark:text-cyan-400 font-medium mb-2">
                    Care in Your Pocket
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    Appointments, insights, and support — seamlessly integrated in one beautiful experience.
                  </p>
                </div>

                {/* Feature Pills */}
                <div className="space-y-4 mb-8">
                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-3 rounded-lg bg-cyan-600 dark:bg-cyan-500">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Multilingual Support</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Speak your language, get heard</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30 rounded-xl border border-blue-200 dark:border-blue-800"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-3 rounded-lg bg-blue-600 dark:bg-blue-500">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Private by Design</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Your data, your control</p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/30 dark:to-pink-950/30 rounded-xl border border-violet-200 dark:border-violet-800"
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <div className="p-3 rounded-lg bg-violet-600 dark:bg-violet-500">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Clinical-Grade UX</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Designed with care, built for trust</p>
                    </div>
                  </motion.div>
                </div>

                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-cyan-600 dark:bg-cyan-500 text-white"
                    data-testid="button-waitlist"
                  >
                    Join the Waitlist
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="w-full border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400"
                    data-testid="button-notify"
                  >
                    Get Notified
                  </Button>
                </div>
              </div>
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

            {/* Orbit Rings - Static */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-96 h-96 rounded-full border border-gray-200 dark:border-gray-800" />
              <div className="absolute w-[500px] h-[500px] rounded-full border border-gray-100 dark:border-gray-900" />
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

        </div>
      </section>

      {/* Contact Section - Innovated */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-gray-50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-cyan-950/20">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Start a Conversation
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Whether it's a partnership, pilot, or joining our team—let's build healthcare that cares
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Intent Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Choose Your Path</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Select what brings you here today</p>
                
                <div className="space-y-3">
                  {intents.map((intent, index) => {
                    const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
                      "Partnership": { bg: "bg-cyan-50 dark:bg-cyan-950/30", border: "border-cyan-600 dark:border-cyan-400", text: "text-cyan-600 dark:text-cyan-400", icon: "🤝" },
                      "Pilot / Demo": { bg: "bg-violet-50 dark:bg-violet-950/30", border: "border-violet-600 dark:border-violet-400", text: "text-violet-600 dark:text-violet-400", icon: "🚀" },
                      "Careers": { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-600 dark:border-emerald-400", text: "text-emerald-600 dark:text-emerald-400", icon: "💼" },
                      "General Inquiry": { bg: "bg-pink-50 dark:bg-pink-950/30", border: "border-pink-600 dark:border-pink-400", text: "text-pink-600 dark:text-pink-400", icon: "💬" }
                    };
                    
                    const colors = colorMap[intent] || colorMap["General Inquiry"];

                    return (
                      <motion.div
                        key={intent}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedIntent === intent 
                            ? `${colors.bg} ${colors.border}` 
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600"
                        }`}
                        onClick={() => setSelectedIntent(intent)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        data-testid={`chip-${intent.toLowerCase().replace(" ", "-").replace("/", "")}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{colors.icon}</span>
                          <div>
                            <p className={`font-semibold ${selectedIntent === intent ? colors.text : "text-gray-900 dark:text-white"}`}>
                              {intent}
                            </p>
                            {selectedIntent === intent && intent === "Careers" && (
                              <motion.p 
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-sm text-emerald-700 dark:text-emerald-300 mt-1"
                              >
                                Remote-friendly. Mission-first. Healthcare experts welcome.
                              </motion.p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Your Name</label>
                    <Input 
                      placeholder="Jane Doe" 
                      className="h-12 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
                      data-testid="input-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Email Address</label>
                    <Input 
                      placeholder="jane@example.com" 
                      type="email"
                      className="h-12 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Your Message</label>
                    <Textarea 
                      placeholder="Tell us about your goals, timeline, and how we can help make care more human..." 
                      rows={6}
                      className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
                      data-testid="textarea-message"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">
                      Supporting Links (Optional)
                    </label>
                    <Input 
                      placeholder="Portfolio, deck, or relevant links..." 
                      type="url"
                      className="h-12 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900"
                      data-testid="input-attachment"
                    />
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-6 text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl mb-3"
                      >
                        ✓
                      </motion.div>
                      <p className="text-emerald-800 dark:text-emerald-300 font-semibold text-lg">
                        Message Received!
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-400 text-sm mt-2">
                        We'll respond within 2 business days
                      </p>
                    </motion.div>
                  ) : (
                    <Button 
                      type="submit"
                      size="lg" 
                      className="w-full bg-cyan-600 dark:bg-cyan-500 text-white text-lg h-14"
                      data-testid="button-send-message"
                    >
                      Send Message →
                    </Button>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
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
              animate={{ 
                x: pulsePosition === 100 ? [0, 1200] : 0,
                opacity: pulsePosition === 100 ? [0, 1, 1, 0.8, 0] : 0
              }}
              transition={{ 
                duration: ecgSpeed,
                ease: "linear",
                times: pulsePosition === 100 ? [0, 0.1, 0.5, 0.9, 1] : [0]
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
