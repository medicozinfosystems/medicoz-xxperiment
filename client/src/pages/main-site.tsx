import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Mic, Smartphone, Mail, Linkedin, Youtube, Heart, Lock, Brain, Leaf, Activity, Play, ArrowRight, ArrowLeft, ChevronRight, Check, Phone, Upload, Shield, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [selectedConstellation, setSelectedConstellation] = useState<string | null>(null);
  const [hoveredEpisode, setHoveredEpisode] = useState<number | null>(null);
  const [phoneRotation, setPhoneRotation] = useState(0);
  
  // Conversation Curtain state
  const [curtainStep, setCurtainStep] = useState(0);
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [curtainAnswers, setCurtainAnswers] = useState<Record<string, any>>({});
  const [curtainSubmitted, setCurtainSubmitted] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  
  // Elevator state
  const [currentFloor, setCurrentFloor] = useState(0);
  const [visitedFloors, setVisitedFloors] = useState<number[]>([]);
  const [floorData, setFloorData] = useState<Record<number, any>>({});
  const [elevatorSubmitted, setElevatorSubmitted] = useState(false);
  const [elevatorMoving, setElevatorMoving] = useState(false);
  
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

  // Footer ECG pulse animation - runs every 8s
  useEffect(() => {
    const animatePulse = () => {
      setPulsePosition(0);
      
      // Animate from 0 to 100 over 3 seconds
      const duration = 3000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      for (let i = 0; i <= steps; i++) {
        setTimeout(() => {
          setPulsePosition((i / steps) * 100);
        }, i * stepDuration);
      }
    };
    
    // Run immediately, then every 8s
    animatePulse();
    const interval = setInterval(animatePulse, 8000);
    
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

      {/* From Conversation to Care Section */}
      <section ref={servicesRef} className="relative py-32 px-6 bg-gradient-to-br from-gray-50 via-white to-cyan-50/30 dark:from-gray-900 dark:via-gray-950 dark:to-cyan-950/20 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              From Conversation to Care
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Empowering women's health through stories and seamless digital care
            </p>
          </motion.div>

          {/* 3D Phone Showcase */}
          <div className="relative max-w-6xl mx-auto" style={{ perspective: "2000px" }}>
            <div className="relative min-h-[700px] flex items-center justify-center">
              
              {/* Voice Wave Connection */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 1000 600">
                  <motion.path
                    d="M 150 300 Q 350 200, 550 300 T 850 300"
                    stroke="url(#flowGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 8"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    viewport={{ once: true }}
                  />
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#DB2777" />
                      <stop offset="100%" stopColor="#0891B2" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Left - The XXperiment Card */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-80 z-20"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                data-testid="xxperiment-card"
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-pink-200 dark:border-pink-900/50"
                  whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(219, 39, 119, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">The XXperiment</h3>
                      <p className="text-sm text-pink-600 dark:text-pink-400">Podcast</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Women's health conversations that empower, educate, and inspire change through authentic stories.
                  </p>

                  {/* Voice Wave Visualization */}
                  <div className="h-24 mb-6 bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-950/20 dark:to-violet-950/20 rounded-xl p-3 flex items-center justify-center">
                    <div className="flex items-center gap-1 h-full">
                      {[...Array(20)].map((_, i) => {
                        const height = Math.abs(Math.sin((i * Math.PI) / 8) * 60 + Math.random() * 15);
                        return (
                          <motion.div
                            key={i}
                            className="w-1.5 bg-gradient-to-t from-pink-600 to-violet-500 rounded-full"
                            animate={{ height: `${height}%` }}
                            transition={{
                              duration: 0.4 + Math.random() * 0.3,
                              repeat: Infinity,
                              repeatType: "reverse",
                              ease: "easeInOut",
                              delay: i * 0.03
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-pink-600 to-violet-600 text-white"
                    asChild
                    data-testid="button-xxperiment"
                  >
                    <a href="https://thexxperiment.com" target="_blank" rel="noopener noreferrer">
                      Listen Now →
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Center - 3D Realistic Phone */}
              <motion.div
                className="relative z-30"
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, type: "spring" }}
                viewport={{ once: true }}
                onHoverStart={() => setPhoneRotation(8)}
                onHoverEnd={() => setPhoneRotation(0)}
                data-testid="realistic-phone"
              >
                <motion.div
                  className="relative"
                  animate={{ 
                    rotateY: phoneRotation,
                    rotateX: phoneRotation > 0 ? 2 : 0
                  }}
                  style={{ 
                    transformStyle: "preserve-3d",
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                >
                  {/* Phone Body with realistic depth */}
                  <div 
                    className="relative w-[320px] h-[640px] rounded-[3rem] bg-gradient-to-br from-gray-900 to-black"
                    style={{
                      boxShadow: `
                        0 50px 100px rgba(0, 0, 0, 0.5),
                        0 0 0 12px rgba(30, 30, 30, 0.9),
                        0 0 0 13px rgba(60, 60, 60, 0.5),
                        inset 0 0 40px rgba(0, 0, 0, 0.5)
                      `
                    }}
                  >
                    {/* Screen Bezel */}
                    <div className="absolute inset-[14px] rounded-[2.5rem] bg-black overflow-hidden">
                      {/* Screen Content */}
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black">
                        
                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-white text-xs">
                          <span>9:41</span>
                          <div className="flex gap-1">
                            <div className="w-4 h-4 border border-white/50 rounded-sm" />
                            <div className="w-4 h-4 border border-white/50 rounded-sm" />
                            <div className="w-4 h-4 border border-white/50 rounded-sm" />
                          </div>
                        </div>

                        {/* App Screens Toggle */}
                        <div className="absolute top-16 left-0 right-0 bottom-0 p-6">
                          {/* The XXperiment Podcast View */}
                          <motion.div
                            className="absolute inset-6 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-3xl p-6 border border-pink-500/30"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: phoneRotation > 0 ? 0 : 1, x: phoneRotation > 0 ? -20 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                                <Mic className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-semibold">The XXperiment</p>
                                <p className="text-pink-300 text-xs">Latest Episode</p>
                              </div>
                            </div>
                            
                            {/* Mini Voice Wave */}
                            <div className="h-16 bg-black/30 rounded-xl flex items-center justify-center gap-1 px-4 mb-4">
                              {[...Array(15)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="w-1 bg-pink-400 rounded-full"
                                  animate={{ height: `${Math.random() * 60 + 20}%` }}
                                  transition={{
                                    duration: 0.5 + Math.random() * 0.3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                  }}
                                />
                              ))}
                            </div>

                            <div className="space-y-2">
                              <p className="text-white text-sm">Fertility & Choice</p>
                              <p className="text-gray-400 text-xs">Your timeline is valid, always</p>
                            </div>
                          </motion.div>

                          {/* Medicoz App View */}
                          <motion.div
                            className="absolute inset-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl p-6 border border-cyan-500/30"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: phoneRotation > 0 ? 1 : 0, x: phoneRotation > 0 ? 0 : 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                                  <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                  <p className="text-white font-semibold">Medicoz App</p>
                                  <Badge className="bg-cyan-500/30 text-cyan-300 border-0 text-xs">Coming Soon</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {[
                                { icon: Activity, label: "Health Tracking", color: "cyan" },
                                { icon: Brain, label: "AI Insights", color: "blue" },
                                { icon: Lock, label: "Private & Secure", color: "violet" }
                              ].map((feature, i) => (
                                <motion.div
                                  key={i}
                                  className="flex items-center gap-3 p-3 bg-black/30 rounded-xl"
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={phoneRotation > 0 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                  transition={{ delay: i * 0.1 }}
                                >
                                  <feature.icon className="w-5 h-5 text-cyan-400" />
                                  <span className="text-white text-sm">{feature.label}</span>
                                </motion.div>
                              ))}
                            </div>

                            {/* ECG Pulse */}
                            <div className="mt-6 h-16 bg-black/30 rounded-xl flex items-center justify-center">
                              <svg viewBox="0 0 150 40" className="w-full h-full px-4">
                                <motion.path
                                  d="M 0 20 L 40 20 L 50 10 L 60 30 L 70 5 L 80 35 L 90 20 L 150 20"
                                  stroke="#06B6D4"
                                  strokeWidth="2"
                                  fill="none"
                                  initial={{ pathLength: 0 }}
                                  animate={{ pathLength: 1 }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                />
                              </svg>
                            </div>
                          </motion.div>
                        </div>

                        {/* Glass Reflection */}
                        <div 
                          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"
                          style={{ mixBlendMode: "overlay" }}
                        />
                      </div>

                      {/* Notch */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full flex items-center justify-center gap-2 z-50">
                        <div className="w-2 h-2 rounded-full bg-gray-800" />
                        <div className="w-16 h-1.5 rounded-full bg-gray-800" />
                      </div>
                    </div>

                    {/* Side Buttons */}
                    <div className="absolute right-0 top-32 w-1 h-16 bg-gray-800 rounded-l-sm" />
                    <div className="absolute left-0 top-24 w-1 h-8 bg-gray-800 rounded-r-sm" />
                    <div className="absolute left-0 top-36 w-1 h-12 bg-gray-800 rounded-r-sm" />
                  </div>
                </motion.div>

                {/* Interaction Hint */}
                <motion.p
                  className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
                  animate={{ opacity: phoneRotation > 0 ? 0 : [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Hover to switch apps
                </motion.p>
              </motion.div>

              {/* Right - Medicoz App Card */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-80 z-20"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                data-testid="medicoz-card"
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-cyan-200 dark:border-cyan-900/50"
                  whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(8, 145, 178, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Medicoz App</h3>
                      <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400 border-0">Coming Soon</Badge>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Your complete women's health companion — appointments, insights, and personalized care in one app.
                  </p>

                  {/* Feature List */}
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Activity, text: "Track your health vitals" },
                      { icon: Brain, text: "AI-powered insights" },
                      { icon: Lock, text: "Privacy-first design" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/30 flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                      data-testid="button-waitlist"
                    >
                      Join Waitlist
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400"
                      data-testid="button-notify"
                    >
                      Get Notified
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              From conversation to care, in your pocket
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Empowering women's health through knowledge and technology
            </p>
          </motion.div>
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
                    rotate: 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15
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
                      className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-6"
                    >
                      <p className="text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-4 text-center">
                        Message received. We'll reply within 48h.
                      </p>
                      
                      {/* Pulse ID Line */}
                      <div className="relative h-16 flex items-center justify-center mb-2">
                        <div className="absolute w-full h-px bg-emerald-300 dark:bg-emerald-700" />
                        <motion.div
                          className="absolute w-3 h-3 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                          initial={{ left: "0%" }}
                          animate={{ left: "100%" }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          style={{
                            filter: "drop-shadow(0 0 6px rgba(5, 150, 105, 0.6))"
                          }}
                        />
                        <div className="relative bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-lg border border-emerald-300 dark:border-emerald-700">
                          <p className="text-sm font-mono text-emerald-700 dark:text-emerald-300">
                            Pulse ID: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                          </p>
                        </div>
                      </div>
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

      {/* Contact Section V2 - Conversation Curtain */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50/30 to-violet-50/20 dark:from-gray-900 dark:via-cyan-950/20 dark:to-violet-950/10 overflow-hidden">
        {/* Neural glow effect */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-400/30 dark:bg-cyan-600/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
          {!curtainOpen ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                Let's build what care deserves
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                A guided conversation, one thoughtful question at a time
              </p>
              <Button
                size="lg"
                onClick={() => setCurtainOpen(true)}
                className="bg-cyan-600 dark:bg-cyan-500 text-white text-lg h-14 px-8"
                data-testid="button-open-curtain"
              >
                Start Conversation →
              </Button>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={curtainStep}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="w-full max-w-3xl"
              >
                <Card className="shadow-2xl border-gray-200 dark:border-gray-800">
                  <CardContent className="p-8 md:p-12">
                    {curtainStep === 0 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                            What brings you here?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">We'll tailor the next steps</p>
                        </div>
                        
                        <div className="grid gap-3">
                          {["Partnership", "Pilot project", "Sponsorship", "Careers", "Other"].map((intent) => (
                            <motion.button
                              key={intent}
                              onClick={() => {
                                setCurtainAnswers({ ...curtainAnswers, intent });
                              }}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                curtainAnswers.intent === intent
                                  ? "bg-cyan-50 dark:bg-cyan-950/30 border-cyan-600 dark:border-cyan-400"
                                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-cyan-300 dark:hover:border-cyan-700"
                              }`}
                              whileHover={{ x: 4 }}
                              data-testid={`chip-curtain-${intent.toLowerCase().replace(" ", "-")}`}
                            >
                              <span className={`font-semibold ${
                                curtainAnswers.intent === intent
                                  ? "text-cyan-600 dark:text-cyan-400"
                                  : "text-gray-900 dark:text-white"
                              }`}>
                                {intent}
                              </span>
                            </motion.button>
                          ))}
                        </div>

                        {curtainAnswers.intent && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <Button
                              onClick={() => setCurtainStep(1)}
                              className="w-full bg-cyan-600 dark:bg-cyan-500 text-white"
                              data-testid="button-curtain-next-0"
                            >
                              Next <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {curtainStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                            Who are you?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">So we can say hello properly</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">
                              Full Name
                            </label>
                            <Input
                              placeholder="Jane Doe"
                              value={curtainAnswers.name || ""}
                              onChange={(e) => setCurtainAnswers({ ...curtainAnswers, name: e.target.value })}
                              className="h-12"
                              data-testid="input-curtain-name"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">
                              Role
                            </label>
                            <Select
                              value={curtainAnswers.role}
                              onValueChange={(value) => setCurtainAnswers({ ...curtainAnswers, role: value })}
                            >
                              <SelectTrigger className="h-12" data-testid="select-curtain-role">
                                <SelectValue placeholder="Select your role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="clinician">Clinician</SelectItem>
                                <SelectItem value="executive">Executive</SelectItem>
                                <SelectItem value="developer">Developer</SelectItem>
                                <SelectItem value="researcher">Researcher</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setCurtainStep(0)}
                            data-testid="button-curtain-back-1"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                          </Button>
                          <Button
                            onClick={() => setCurtainStep(2)}
                            disabled={!curtainAnswers.name || !curtainAnswers.role}
                            className="flex-1 bg-cyan-600 dark:bg-cyan-500 text-white"
                            data-testid="button-curtain-next-1"
                          >
                            Next <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {curtainStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                            How can we help?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            Goals, audience, timelines, constraints—whatever helps us help you
                          </p>
                        </div>
                        
                        <Textarea
                          placeholder="Tell us what you're building..."
                          value={curtainAnswers.message || ""}
                          onChange={(e) => setCurtainAnswers({ ...curtainAnswers, message: e.target.value })}
                          rows={6}
                          data-testid="textarea-curtain-message"
                        />

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setCurtainStep(1)}
                            data-testid="button-curtain-back-2"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                          </Button>
                          <Button
                            onClick={() => setCurtainStep(3)}
                            disabled={!curtainAnswers.message || curtainAnswers.message.length < 10}
                            className="flex-1 bg-cyan-600 dark:bg-cyan-500 text-white"
                            data-testid="button-curtain-next-2"
                          >
                            Next <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {curtainStep === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                            How fast do you need us?
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">We'll match your pace</p>
                        </div>
                        
                        <div className="space-y-4">
                          <Slider
                            value={[curtainAnswers.urgency || 1]}
                            onValueChange={(value) => setCurtainAnswers({ ...curtainAnswers, urgency: value[0] })}
                            min={0}
                            max={2}
                            step={1}
                            className="w-full"
                            data-testid="slider-curtain-urgency"
                          />
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                            <span>Today</span>
                            <span>48 hours</span>
                            <span>Next week</span>
                          </div>
                          <p className="text-center font-medium text-cyan-600 dark:text-cyan-400">
                            {curtainAnswers.urgency === 0 && "Today"}
                            {curtainAnswers.urgency === 1 && "48 hours"}
                            {curtainAnswers.urgency === 2 && "Next week"}
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setCurtainStep(2)}
                            data-testid="button-curtain-back-3"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                          </Button>
                          <Button
                            onClick={() => setCurtainStep(4)}
                            className="flex-1 bg-cyan-600 dark:bg-cyan-500 text-white"
                            data-testid="button-curtain-next-3"
                          >
                            Next <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {curtainStep === 4 && (
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                            Where can we reach you?
                          </h3>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">
                              Email
                            </label>
                            <Input
                              type="email"
                              placeholder="jane@example.com"
                              value={curtainAnswers.email || ""}
                              onChange={(e) => setCurtainAnswers({ ...curtainAnswers, email: e.target.value })}
                              className="h-12"
                              data-testid="input-curtain-email"
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">
                              Phone (Optional)
                            </label>
                            <Input
                              type="tel"
                              placeholder="+1 (555) 000-0000"
                              value={curtainAnswers.phone || ""}
                              onChange={(e) => setCurtainAnswers({ ...curtainAnswers, phone: e.target.value })}
                              className="h-12"
                              data-testid="input-curtain-phone"
                            />
                          </div>
                          
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            <Shield className="w-3 h-3 inline mr-1" />
                            Your data stays yours. No spam, ever.
                          </p>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setCurtainStep(3)}
                            data-testid="button-curtain-back-4"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                          </Button>
                          <Button
                            onClick={() => setCurtainStep(5)}
                            disabled={!curtainAnswers.email}
                            className="flex-1 bg-cyan-600 dark:bg-cyan-500 text-white"
                            data-testid="button-curtain-next-4"
                          >
                            Review <ChevronRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {curtainStep === 5 && !curtainSubmitted && (
                      <div className="space-y-6">
                        <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                          Review your message
                        </h3>
                        
                        <div className="space-y-3 bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Intent:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{curtainAnswers.intent}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{curtainAnswers.name}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">{curtainAnswers.email}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setCurtainStep(4)}
                            data-testid="button-curtain-back-5"
                          >
                            <ArrowLeft className="mr-2 w-4 h-4" /> Back
                          </Button>
                          <Button
                            onMouseDown={() => {
                              const interval = setInterval(() => {
                                setHoldProgress(prev => {
                                  if (prev >= 100) {
                                    clearInterval(interval);
                                    setCurtainSubmitted(true);
                                    setTimeout(() => {
                                      setCurtainSubmitted(false);
                                      setCurtainOpen(false);
                                      setCurtainStep(0);
                                      setCurtainAnswers({});
                                      setHoldProgress(0);
                                    }, 4000);
                                    return 100;
                                  }
                                  return prev + 10;
                                });
                              }, 100);
                            }}
                            onMouseUp={() => setHoldProgress(0)}
                            onMouseLeave={() => setHoldProgress(0)}
                            className="flex-1 bg-cyan-600 dark:bg-cyan-500 text-white relative overflow-hidden"
                            data-testid="button-curtain-submit"
                          >
                            <motion.div
                              className="absolute inset-0 bg-cyan-700 dark:bg-cyan-600"
                              initial={{ width: "0%" }}
                              animate={{ width: `${holdProgress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                            <span className="relative z-10">
                              {holdProgress > 0 ? "Sending..." : "Hold to send with care"}
                            </span>
                          </Button>
                        </div>
                      </div>
                    )}

                    {curtainSubmitted && (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center space-y-4"
                      >
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/30 rounded-full flex items-center justify-center mx-auto">
                          <Check className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message received</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Pulse ID: #{Math.random().toString(36).substring(2, 8).toUpperCase()} • Reply within 48 hours
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>

                {/* Progress indicator */}
                {!curtainSubmitted && curtainStep < 5 && (
                  <div className="flex justify-center gap-2 mt-6">
                    {[0, 1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-1 rounded-full transition-all ${
                          step <= curtainStep
                            ? "w-8 bg-cyan-600 dark:bg-cyan-400"
                            : "w-4 bg-gray-300 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* Contact Section V3 - Elevator to Humans */}
      <section className="relative min-h-screen bg-gradient-to-br from-white via-gray-50 to-cyan-50/20 dark:from-gray-950 dark:via-gray-900 dark:to-cyan-950/10 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
              Choose Your Floor
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We'll open the right door and keep you moving
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Elevator Shaft */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="bg-gray-900 dark:bg-gray-950 rounded-2xl p-6 border-2 border-gray-800">
                  {/* Floor indicator */}
                  <div className="text-center mb-6">
                    <motion.div
                      className="text-6xl font-bold text-cyan-400"
                      key={currentFloor}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {currentFloor}
                    </motion.div>
                    <p className="text-gray-400 text-sm mt-2">
                      {currentFloor === 0 && "LOBBY"}
                      {currentFloor === 3 && "PARTNERSHIPS"}
                      {currentFloor === 4 && "CLINICAL"}
                      {currentFloor === 5 && "PRODUCT"}
                      {currentFloor === 6 && "CAREERS"}
                    </p>
                  </div>

                  {/* Floor buttons */}
                  <div className="space-y-2">
                    {[
                      { floor: 0, label: "Lobby", icon: Building2 },
                      { floor: 3, label: "Partnerships", icon: Heart },
                      { floor: 4, label: "Clinical", icon: Activity },
                      { floor: 5, label: "Product", icon: Smartphone },
                      { floor: 6, label: "Careers", icon: Mic }
                    ].map(({ floor, label, icon: Icon }) => (
                      <motion.button
                        key={floor}
                        onClick={() => {
                          setElevatorMoving(true);
                          setTimeout(() => {
                            setCurrentFloor(floor);
                            if (floor > 0 && !visitedFloors.includes(floor)) {
                              setVisitedFloors([...visitedFloors, floor]);
                            }
                            setElevatorMoving(false);
                          }, 640);
                        }}
                        className={`w-full p-4 rounded-xl border-2 flex items-center gap-3 transition-all ${
                          currentFloor === floor
                            ? "bg-cyan-600 border-cyan-600 text-white"
                            : visitedFloors.includes(floor)
                            ? "bg-emerald-950/30 border-emerald-600 text-emerald-400"
                            : "bg-gray-800 border-gray-700 text-gray-400 hover:border-gray-600"
                        }`}
                        whileHover={{ x: 4 }}
                        disabled={elevatorMoving}
                        data-testid={`button-floor-${floor}`}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="text-left flex-1">
                          <div className="font-semibold">{label}</div>
                          <div className="text-xs opacity-75">Floor {floor}</div>
                        </div>
                        {visitedFloors.includes(floor) && (
                          <Check className="w-4 h-4" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Door panels */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFloor}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.42 }}
                >
                  <Card className="shadow-xl">
                    <CardHeader>
                      <CardTitle className="text-3xl">
                        {currentFloor === 0 && "Welcome to the Lobby"}
                        {currentFloor === 3 && "Partnerships"}
                        {currentFloor === 4 && "Clinical Pilots"}
                        {currentFloor === 5 && "Product & Platform"}
                        {currentFloor === 6 && "Careers"}
                      </CardTitle>
                      <CardDescription>
                        {currentFloor === 0 && "Choose a floor to start your journey"}
                        {currentFloor === 3 && "Collabs that improve real outcomes"}
                        {currentFloor === 4 && "Pilot design that respects clinicians and patients"}
                        {currentFloor === 5 && "From idea to useful"}
                        {currentFloor === 6 && "Mission-first builders welcome"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentFloor === 0 && (
                        <div className="text-center py-12">
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Select a floor above to begin
                          </p>
                          <Building2 className="w-24 h-24 text-cyan-600 dark:text-cyan-400 mx-auto opacity-50" />
                        </div>
                      )}

                      {currentFloor === 3 && (
                        <div className="space-y-4">
                          <Input placeholder="Organization" data-testid="input-org" className="h-12" />
                          <Input placeholder="Region" data-testid="input-region" className="h-12" />
                          <Textarea placeholder="Problem statement" rows={4} data-testid="textarea-problem" />
                          <Input placeholder="Desired outcome" data-testid="input-outcome" className="h-12" />
                          <Button className="w-full bg-cyan-600 dark:bg-cyan-500 text-white" data-testid="button-partnerships-next">
                            Save & Continue
                          </Button>
                        </div>
                      )}

                      {currentFloor === 4 && (
                        <div className="space-y-4">
                          <Select>
                            <SelectTrigger className="h-12" data-testid="select-setting">
                              <SelectValue placeholder="Setting (Hospital/Clinic/Remote)" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hospital">Hospital</SelectItem>
                              <SelectItem value="clinic">Clinic</SelectItem>
                              <SelectItem value="remote">Remote</SelectItem>
                            </SelectContent>
                          </Select>
                          <Input placeholder="Population" data-testid="input-population" className="h-12" />
                          <Textarea placeholder="Measures of success" rows={4} data-testid="textarea-measures" />
                          <Button className="w-full bg-cyan-600 dark:bg-cyan-500 text-white" data-testid="button-clinical-next">
                            Save & Continue
                          </Button>
                        </div>
                      )}

                      {currentFloor === 5 && (
                        <div className="space-y-4">
                          <Input placeholder="Use case" data-testid="input-usecase" className="h-12" />
                          <Input placeholder="Required integrations" data-testid="input-integrations" className="h-12" />
                          <Input placeholder="Languages needed" data-testid="input-languages" className="h-12" />
                          <Textarea placeholder="Constraints (budget/infra)" rows={4} data-testid="textarea-constraints" />
                          <Button className="w-full bg-cyan-600 dark:bg-cyan-500 text-white" data-testid="button-product-next">
                            Save & Continue
                          </Button>
                        </div>
                      )}

                      {currentFloor === 6 && (
                        <div className="space-y-4">
                          <Input placeholder="Your name" data-testid="input-career-name" className="h-12" />
                          <Input type="email" placeholder="Email" data-testid="input-career-email" className="h-12" />
                          <Input placeholder="Portfolio/LinkedIn" data-testid="input-portfolio" className="h-12" />
                          <Select>
                            <SelectTrigger className="h-12" data-testid="select-role">
                              <SelectValue placeholder="Role you're interested in" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="engineer">Engineer</SelectItem>
                              <SelectItem value="designer">Designer</SelectItem>
                              <SelectItem value="clinical">Clinical</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <Textarea placeholder="Why Medicoz?" rows={4} data-testid="textarea-why" />
                          <Button className="w-full bg-cyan-600 dark:bg-cyan-500 text-white" data-testid="button-career-submit">
                            Send Application
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - "Living ECG Rail" */}
      <footer 
        ref={footerRef}
        className="relative bg-white dark:bg-gray-950 py-16 px-6 overflow-hidden"
      >
        {/* Living ECG Line */}
        <div className="absolute top-0 left-0 w-full h-12 overflow-hidden">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 50">
            {/* Base ECG Line */}
            <path
              d="M 0 25 L 1200 25"
              stroke="#0891B2"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            
            {/* Traveling Pulse - runs every 8s */}
            <motion.path
              d="M 0 25 L 20 25 L 25 15 L 30 35 L 35 25 L 50 25"
              stroke="#0891B2"
              strokeWidth="2"
              fill="none"
              animate={{ 
                x: pulsePosition === 100 ? [0, 1200] : 0,
                opacity: pulsePosition === 100 ? [0, 1, 1, 0.8, 0] : 0
              }}
              transition={{ 
                duration: 3,
                ease: "linear",
                times: pulsePosition === 100 ? [0, 0.1, 0.5, 0.9, 1] : [0]
              }}
              filter="url(#footerGlow)"
            />
            
            <defs>
              <filter id="footerGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            {/* Left */}
            <div>
              <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
                Medicoz Infosystems
              </h3>
              <HandwrittenText 
                text="Connection begins with care"
                delay={0.5}
                duration={2}
                color="cyan"
                className="text-lg"
              />
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
            
            {/* Right - Social Icons with Pulse Glow */}
            <div className="space-y-3">
              <p className="text-gray-600 dark:text-gray-400">hello@medicoz.com</p>
              <div className="flex gap-4">
                <motion.div
                  animate={{
                    filter: pulsePosition > 70 && pulsePosition < 100 
                      ? "drop-shadow(0 0 8px rgba(8, 145, 178, 0.8))" 
                      : "drop-shadow(0 0 0px rgba(8, 145, 178, 0))",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-gray-600 dark:text-gray-400"
                    data-testid="button-mail"
                  >
                    <Mail className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: pulsePosition > 80 && pulsePosition < 100 
                      ? "drop-shadow(0 0 8px rgba(8, 145, 178, 0.8))" 
                      : "drop-shadow(0 0 0px rgba(8, 145, 178, 0))",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-gray-600 dark:text-gray-400"
                    data-testid="button-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div
                  animate={{
                    filter: pulsePosition > 90 && pulsePosition < 100 
                      ? "drop-shadow(0 0 8px rgba(8, 145, 178, 0.8))" 
                      : "drop-shadow(0 0 0px rgba(8, 145, 178, 0))",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-gray-600 dark:text-gray-400"
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
            <p className="text-gray-500 dark:text-gray-500 text-xs">© 2025 Medicoz Infosystems</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
