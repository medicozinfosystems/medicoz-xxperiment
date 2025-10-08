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
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/TranslationContext";

interface MainSiteProps {
  showButtonsImmediately?: boolean;
}

export default function MainSite({ showButtonsImmediately = false }: MainSiteProps) {
  const { t } = useTranslation();
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
  const [isHolding, setIsHolding] = useState(false);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Elevator state
  const [currentFloor, setCurrentFloor] = useState(0);
  const [visitedFloors, setVisitedFloors] = useState<number[]>([]);
  const [floorData, setFloorData] = useState<Record<number, any>>({});
  const [elevatorSubmitted, setElevatorSubmitted] = useState(false);
  const [elevatorMoving, setElevatorMoving] = useState(false);
  const [showSummaryLobby, setShowSummaryLobby] = useState(false);
  
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
      name: t("team.member1.name"),
      role: t("team.member1.role"),
      tagline: t("team.member1.tagline"),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
      color: "#DB2777" // pink
    },
    {
      name: t("team.member2.name"),
      role: t("team.member2.role"),
      tagline: t("team.member2.tagline"),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
      color: "#0891B2" // cyan
    },
    {
      name: t("team.member3.name"),
      role: t("team.member3.role"),
      tagline: t("team.member3.tagline"),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Veda",
      color: "#7C3AED" // violet
    },
    {
      name: t("team.member4.name"),
      role: t("team.member4.role"),
      tagline: t("team.member4.tagline"),
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshiv",
      color: "#059669" // emerald
    },
    {
      name: t("team.member5.name"),
      role: t("team.member5.role"),
      tagline: t("team.member5.tagline"),
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
    <div className="min-h-screen bg-background">
      {/* Fixed Header with Theme and Language Toggles */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <span className="text-base sm:text-lg font-bold text-foreground">{t("header.brand")}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50/20 to-violet-50/10 dark:from-gray-950 dark:via-cyan-950/20 dark:to-violet-950/10 pt-20">
        
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
        <div className="absolute top-20 left-0 w-full h-24 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 100">
            <motion.path
              d="M 0 50 L 400 50 L 420 30 L 440 70 L 460 50 L 1200 50"
              stroke="#0891B2"
              strokeWidth="2"
              fill="none"
              opacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 1
              }}
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
          className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10"
          style={{ opacity: heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 sm:mb-6"
          >
            <p className="text-[0.65rem] sm:text-xs font-semibold text-primary tracking-[0.15em] sm:tracking-[0.2em] uppercase">
              {t("hero.eyebrow")}
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-3 sm:mb-4 text-foreground leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t("hero.title")}
          </motion.h1>

          {/* Handwritten Tagline with Writing Animation */}
          <HandwrittenText
            text={t("hero.tagline")}
            delay={0.8}
            duration={2.5}
            color="cyan"
            className="mb-6 sm:mb-8 md:mb-12"
          />

          {/* Support Text */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-12 leading-relaxed px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: showButtonsImmediately ? 0 : 1.6
            }}
          >
            <Button size="lg" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 bg-cyan-600 dark:bg-cyan-500" data-testid="button-explore-services">
              {t("hero.cta.primary")}
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400" data-testid="button-partner">
              {t("hero.cta.secondary")}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* From Conversation to Care Section */}
      <section ref={servicesRef} className="relative min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-br from-muted via-background to-muted/50 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-foreground px-2">
              {t("service.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
              {t("service.subtitle")}
            </p>
          </motion.div>

          {/* 3D Phone Showcase */}
          <div className="relative max-w-6xl mx-auto" style={{ perspective: "2000px" }}>
            <div className="relative min-h-[420px] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
              
              {/* Voice Wave Connection - Hidden on mobile */}
              <div className="hidden md:block absolute inset-0 flex items-center justify-center pointer-events-none">
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
                className="relative md:absolute md:left-0 md:top-[40%] md:-translate-y-1/2 w-full max-w-sm md:w-72 z-20"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                data-testid="xxperiment-card"
              >
                <motion.div
                  className="bg-card rounded-2xl p-4 sm:p-5 shadow-2xl border border-pink-200 dark:border-pink-900/50"
                  whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(219, 39, 119, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-violet-500 flex items-center justify-center">
                      <Mic className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-card-foreground">{t("service.xxperiment.title")}</h3>
                      <p className="text-xs text-pink-600 dark:text-pink-400">{t("service.xxperiment.type")}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {t("service.xxperiment.description")}
                  </p>

                  {/* Voice Wave Visualization */}
                  <div className="h-16 mb-4 bg-gradient-to-br from-pink-50 to-violet-50 dark:from-pink-950/20 dark:to-violet-950/20 rounded-xl p-2 flex items-center justify-center">
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
                      {t("service.xxperiment.cta")}
                    </a>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Center - 3D Realistic Phone - Hidden on mobile */}
              <motion.div
                className="hidden md:block relative z-30"
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
                    className="relative w-[260px] h-[520px] rounded-[2.5rem] bg-gradient-to-br from-gray-900 to-black"
                    style={{
                      boxShadow: `
                        0 40px 80px rgba(0, 0, 0, 0.5),
                        0 0 0 10px rgba(30, 30, 30, 0.9),
                        0 0 0 11px rgba(60, 60, 60, 0.5),
                        inset 0 0 30px rgba(0, 0, 0, 0.5)
                      `
                    }}
                  >
                    {/* Screen Bezel */}
                    <div className="absolute inset-[12px] rounded-[2rem] bg-black overflow-hidden">
                      {/* Screen Content */}
                      <div className="relative w-full h-full bg-gradient-to-br from-gray-900 via-gray-950 to-black">

                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-between px-6 text-white text-xs">
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
                                <p className="text-white font-semibold">{t("service.xxperiment.title")}</p>
                                <p className="text-pink-300 text-xs">{t("service.xxperiment.type")}</p>
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
                              <p className="text-white text-sm">{t("service.xxperiment.episode")}</p>
                              <p className="text-gray-400 text-xs">{t("service.xxperiment.episode.tagline")}</p>
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
                                  <p className="text-white font-semibold">{t("service.medicoz.title")}</p>
                                  <Badge className="bg-cyan-500/30 text-cyan-300 border-0 text-xs">{t("service.medicoz.badge")}</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3">
                              {[
                                { icon: Activity, label: t("service.phoneFeature1"), color: "cyan" },
                                { icon: Brain, label: t("service.phoneFeature2"), color: "blue" },
                                { icon: Lock, label: t("service.phoneFeature3"), color: "violet" }
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
                  className="text-center mt-8 text-sm text-muted-foreground"
                  animate={{ opacity: phoneRotation > 0 ? 0 : [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {t("service.phone.hint")}
                </motion.p>
              </motion.div>

              {/* Right - Medicoz App Card */}
              <motion.div
                className="relative md:absolute md:right-0 md:top-[40%] md:-translate-y-1/2 w-full max-w-sm md:w-72 z-20"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                data-testid="medicoz-card"
              >
                <motion.div
                  className="bg-card rounded-2xl p-4 sm:p-5 shadow-2xl border border-cyan-200 dark:border-cyan-900/50"
                  whileHover={{ y: -8, boxShadow: "0 30px 60px rgba(8, 145, 178, 0.3)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-card-foreground">{t("service.medicoz.title")}</h3>
                      <Badge className="bg-cyan-100 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-400 border-0 text-xs">{t("service.medicoz.badge")}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {t("service.medicoz.description")}
                  </p>

                  {/* Feature List */}
                  <div className="space-y-2 mb-4">
                    {[
                      { icon: Activity, text: t("service.medicoz.feature1") },
                      { icon: Brain, text: t("service.medicoz.feature2") },
                      { icon: Lock, text: t("service.medicoz.feature3") }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <div className="w-7 h-7 rounded-lg bg-cyan-100 dark:bg-cyan-950/30 flex items-center justify-center">
                          <item.icon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
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
                      {t("service.medicoz.cta1")}
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400"
                      data-testid="button-notify"
                    >
                      {t("service.medicoz.cta2")}
                    </Button>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

          <motion.div
            className="text-center mt-12 sm:mt-16 md:mt-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-xl sm:text-2xl font-semibold text-foreground mb-2">
              {t("service.closing")}
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              {t("service.closingSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About & Team Section - Orbit Design */}
      <section ref={teamRef} className="relative min-h-screen py-12 px-4 sm:px-6 bg-background flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground px-2">
              {t("team.title")}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-primary px-4">
              {t("team.subtitle")}
            </p>
          </motion.div>

          {/* Orbit System - Hidden on mobile, replaced with cards */}
          <div className="hidden lg:block relative w-full max-w-5xl mx-auto h-[500px]">
            {/* Center - Our Purpose */}
            <motion.div
              className="absolute z-20 w-40 h-40 rounded-full flex items-center justify-center"
              style={{
                background: "radial-gradient(circle, rgba(8, 145, 178, 0.2) 0%, rgba(8, 145, 178, 0.05) 100%)",
                boxShadow: "0 0 60px rgba(8, 145, 178, 0.3)",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)"
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
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-bold text-foreground">{t("team.center")}</p>
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

              // Members on the left side (negative x) should show card on the left
              // Harshiv (index 3) and Veda (index 2) are on the left side
              const isOnLeftSide = x < 0;
              const cardPositionClass = isOnLeftSide ? "right-32" : "left-32";
              const cardAnimationX = isOnLeftSide ? 20 : -20;

              return (
                <motion.div
                  key={member.name}
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
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
                      className={`absolute ${cardPositionClass} top-0 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-2xl border-2 w-64`}
                      style={{ borderColor: member.color }}
                      initial={{ opacity: 0, x: cardAnimationX, scale: 0.8 }}
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : cardAnimationX,
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

          {/* Mobile Team Grid */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-4 sm:p-6 shadow-lg border-2"
                style={{ borderColor: member.color }}
                data-testid={`team-card-${member.name.toLowerCase().replace(' ', '-')}`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 mb-4"
                    style={{ borderColor: member.color }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-xs sm:text-sm font-semibold mb-2" style={{ color: member.color }}>
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground italic">
                    "{member.tagline}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Contact Section - Innovated */}
      <section className="relative min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-br from-muted via-background to-muted/50 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground px-2">
              {t("contact.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {t("contact.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left - Intent Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">{t("contact.pathTitle")}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3">{t("contact.pathSubtitle")}</p>

                <div className="space-y-2">
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
                        className={`p-2 sm:p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedIntent === intent
                            ? `${colors.bg} ${colors.border}`
                            : "bg-card border-border hover:border-border/80"
                        }`}
                        onClick={() => setSelectedIntent(intent)}
                        whileHover={{ scale: 1.02, x: 5 }}
                        data-testid={`chip-${intent.toLowerCase().replace(" ", "-").replace("/", "")}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg sm:text-xl">{colors.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs sm:text-sm font-semibold ${selectedIntent === intent ? colors.text : "text-foreground"}`}>
                              {intent}
                            </p>
                            {selectedIntent === intent && intent === "Careers" && (
                              <motion.p
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="text-xs text-emerald-700 dark:text-emerald-300 mt-1"
                              >
                                {t("contact.intent.careers.note")}
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
              <div className="bg-card rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl border border-border">
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">{t("contact.form.name")}</label>
                    <Input
                      placeholder={t("contact.form.namePlaceholder")}
                      className="h-9 sm:h-10"
                      data-testid="input-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">{t("contact.form.email")}</label>
                    <Input
                      placeholder={t("contact.form.emailPlaceholder")}
                      type="email"
                      className="h-9 sm:h-10"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">{t("contact.form.message")}</label>
                    <Textarea
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={3}
                      className="text-sm sm:text-base"
                      data-testid="textarea-message"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs sm:text-sm font-semibold mb-1.5 block text-foreground">
                      {t("contact.form.links")}
                    </label>
                    <Input
                      placeholder={t("contact.form.linksPlaceholder")}
                      type="url"
                      className="h-9 sm:h-10"
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
                        {t("contact.success.message")}
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
                            {t("contact.success.id")}: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-cyan-600 dark:bg-cyan-500 text-white text-base sm:text-lg h-11 sm:h-14"
                      data-testid="button-send-message"
                    >
                      {t("contact.form.submit")} →
                    </Button>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Footer - "Living ECG Rail" */}
      <footer
        ref={footerRef}
        className="relative bg-white dark:bg-gray-950 py-12 sm:py-16 px-4 sm:px-6 overflow-hidden"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8">
            {/* About Column */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">
                {t("footer.title")}
              </h3>
              <HandwrittenText
                text={t("footer.tagline")}
                delay={0.5}
                duration={2}
                color="cyan"
                className="text-base sm:text-lg mb-4"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("footer.about")}
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">Quick Links</h4>
              <nav className="flex flex-col gap-3 text-sm">
                <a href="#about" className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" data-testid="link-about">{t("footer.links.about")}</a>
                <a href="#services" className="text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors" data-testid="link-services">{t("footer.links.services")}</a>
                <a href="https://thexxperiment.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-xxperiment">{t("footer.links.xxperiment")}</a>
                <a href="#careers" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" data-testid="link-careers">{t("footer.links.careers")}</a>
              </nav>
            </div>

            {/* Contact & Social Column */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4 text-foreground">{t("footer.contact.title")}</h4>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">{t("footer.contact.email")}</p>
                <p className="text-muted-foreground">{t("footer.contact.phone")}</p>
                <p className="text-muted-foreground">{t("footer.contact.address")}</p>
              </div>

              <h5 className="text-sm font-semibold mt-6 mb-3 text-foreground">{t("footer.social")}</h5>
              <div className="flex gap-3">
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
                    className="text-muted-foreground"
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
                    className="text-muted-foreground"
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
                    className="text-muted-foreground"
                    data-testid="button-youtube"
                  >
                    <Youtube className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm">
              <p className="text-muted-foreground text-center sm:text-left">{t("footer.copyright")}</p>
              <div className="flex gap-4 text-muted-foreground">
                <a href="#privacy" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t("footer.links.privacy")}</a>
                <span>•</span>
                <a href="#terms" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">{t("footer.links.terms")}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
