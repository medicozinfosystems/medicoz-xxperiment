import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { Mic, Smartphone, Mail, Linkedin, Youtube, Heart, Lock, Brain, Leaf, Activity, Play, ArrowRight, ArrowLeft, ChevronRight, ChevronLeft, Check, Phone, Upload, Shield, Calendar, Building2, Home, Users, MessageCircle } from "lucide-react";
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
// import { LanguageToggle } from "@/components/LanguageToggle";
import { useTranslation } from "@/contexts/TranslationContext";
import { useIsMobile } from "@/hooks/use-mobile";

interface MainSiteProps {
  showButtonsImmediately?: boolean;
}

export default function MainSite({ showButtonsImmediately = false }: MainSiteProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Manual form reset function
  const resetForm = () => {
    setSelectedIntent(null);
    setFormSubmitted(false);
    setFormError(null);
    setFormLoading(false);
  };
  
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [hoveredOrbitalMember, setHoveredOrbitalMember] = useState<number | null>(null);
  const [hoveredInnerMember, setHoveredInnerMember] = useState<number | null>(null);
  const [hoveredOuterMember, setHoveredOuterMember] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showIntents, setShowIntents] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [pulsePosition, setPulsePosition] = useState(0);
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

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'home') {
      const heroElement = document.getElementById('home');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
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
      name: "Dr Mahesh Jariwala",
      role: "Founder",
      tagline: "Visionary leader",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mahesh",
      color: "#DC2626" // red
    },
    {
      name: "Vanshita Neetu",
      role: "Director",
      tagline: "Strategic excellence",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanshita",
      color: "#DB2777" // pink
    },
    {
      name: "Mitra Shah",
      role: "COO",
      tagline: "Operational mastery",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mitra",
      color: "#7C3AED" // violet
    },
    {
      name: "Bhavya Somaiya",
      role: "CFO",
      tagline: "Financial stewardship",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bhavya",
      color: "#059669" // emerald
    },
    {
      name: "Harshiv Gajjar",
      role: "CTO",
      tagline: "Technical innovation",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshiv",
      color: "#0891B2" // cyan
    },
    {
      name: "Khevna Gandhi",
      role: "Marketing Strategist",
      tagline: "Brand storyteller",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khevna",
      color: "#F59E0B" // amber
    },
    {
      name: "Kathaa Gadhvi",
      role: "HR Head, India",
      tagline: "People champion",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathaa",
      color: "#8B5CF6" // purple
    },
    {
      name: "Hitanshu Raval",
      role: "Director of Production",
      tagline: "Creative execution",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hitanshu",
      color: "#EC4899" // rose
    },
    {
      name: "Pratixa Batviya",
      role: "Sales Head, Gujarat",
      tagline: "Market expansion",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pratixa",
      color: "#F59E0B" // amber
    },
    {
      name: "Samaresh Das",
      role: "Content Director",
      tagline: "Content strategist",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samaresh",
      color: "#EF4444" // red
    },
    {
      name: "Nilkanth Sudani",
      role: "Visual Artist",
      tagline: "Visual storyteller",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nilkanth",
      color: "#10B981" // emerald
    },
    {
      name: "Het Prajapati",
      role: "Visual Artist",
      tagline: "Creative visionary",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Het",
      color: "#F97316" // orange
    },
    {
      name: "Tushar Narokar",
      role: "Visual Artist",
      tagline: "Design excellence",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tushar",
      color: "#06B6D4" // cyan
    },
    {
      name: "Naman Sejwal",
      role: "Graphic Designer",
      tagline: "Visual communicator",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Naman",
      color: "#84CC16" // lime
    },
    {
      name: "Latika Hirani",
      role: "Content Writer",
      tagline: "Wordsmith",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Latika",
      color: "#A855F7" // purple
    },
    {
      name: "Nimisha Ahuja",
      role: "Jr UI/UX Designer",
      tagline: "User experience",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nimisha",
      color: "#14B8A6" // teal
    }
  ];

  const intents = ["Careers", "Get in touch"];

  // Map display names to backend values
  const intentMap: Record<string, string> = {
    "Careers": "careers",
    "Get in touch": "general"
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const links = formData.get('links') as string;
    
    // Get the selected intent
    const intent = selectedIntent ? intentMap[selectedIntent] || 'partnership' : 'partnership';
    
    try {
      console.log('Submitting contact form with data:', { name, email, message, intent, links });
      
      // Try relative URL first, fallback to absolute
      const apiUrl = '/api/contact/submit';
      console.log('Making request to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          intent,
          links: links || undefined
        }),
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      
      const result = await response.json();
      
      if (result.success) {
    setFormSubmitted(true);
        // Reset form after animation completes (4.5 seconds)
        setTimeout(() => {
          try {
            if (e.currentTarget && typeof e.currentTarget.reset === 'function') {
              e.currentTarget.reset();
            }
          } catch (resetError) {
            console.warn('Form reset failed:', resetError);
          }
          resetForm();
        }, 4500); // Wait 4.5 seconds before resetting form
        // Hide animation after 4 seconds
    setTimeout(() => setFormSubmitted(false), 4000);
      } else {
        setFormError(result.message || 'Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setFormError('Network error. Please check your connection and try again.');
      } else if (error instanceof Error) {
        setFormError(`Error: ${error.message}`);
      } else {
        setFormError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setFormLoading(false);
    }
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
      {/* Fixed Header with Theme and Language Toggles - Hidden */}
      {/* <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <Activity className="w-6 h-6 sm:w-6 sm:h-6 text-primary" />
            <span className="text-lg sm:text-xl font-bold text-foreground">{t("header.brand")}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
              <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50/20 to-violet-50/10 dark:from-gray-950 dark:via-cyan-950/20 dark:to-violet-950/10 -mt-2 sm:-mt-8">
        
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
          className="max-w-6xl mx-auto px-6 sm:px-8 md:px-6 text-center relative z-10"
          style={{ opacity: heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <p className="text-xs sm:text-sm font-semibold text-primary tracking-[0.15em] sm:tracking-[0.2em] uppercase">
              {t("hero.eyebrow")}
            </p>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-4 sm:mb-5 text-black dark:text-white leading-tight px-2"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-10 md:mb-12 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {t("hero.subtitle")}
          </motion.p>


          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-stretch sm:items-center px-6 max-w-lg sm:max-w-none mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: showButtonsImmediately ? 0 : 1.6
            }}
          >
            <Button size="lg" className="w-full sm:w-auto text-lg sm:text-lg px-8 sm:px-8 py-6 sm:py-3 bg-cyan-600 dark:bg-cyan-500 min-h-[56px] sm:min-h-0" data-testid="button-explore-services">
              {t("hero.cta.primary")}
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg sm:text-lg px-8 sm:px-8 py-6 sm:py-3 border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400 min-h-[56px] sm:min-h-0" data-testid="button-partner">
              {t("hero.cta.secondary")}
            </Button>
          </motion.div>

        </motion.div>
      </section>

      {/* From Conversation to Care Section */}
      <section id="services" ref={servicesRef} className="relative min-h-screen py-16 sm:py-20 px-6 sm:px-8 md:px-6 bg-gradient-to-br from-muted via-background to-muted/50 overflow-hidden flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10 sm:mb-12"
            data-section="sharing-to-shaping"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground px-2">
              {t("service.title")}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {t("service.subtitle")}
            </p>
          </motion.div>

          {/* 3D Phone Showcase */}
          <div className="relative max-w-6xl mx-auto" style={{ perspective: "2000px" }}>
            {/* Left Hover Area for XXperiment */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-1/2 z-40 cursor-pointer"
              onMouseEnter={() => setPhoneRotation(0)}
              onMouseLeave={() => setPhoneRotation(0)}
            />
            
            {/* Right Hover Area for Medicoz */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-1/2 z-40 cursor-pointer"
              onMouseEnter={() => setPhoneRotation(8)}
              onMouseLeave={() => setPhoneRotation(0)}
            />
            
            <div className="relative min-h-[420px] flex flex-col md:flex-row items-center justify-center gap-6">
              
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
                className="relative md:absolute md:left-0 md:top-[40%] md:-translate-y-1/2 w-full max-w-sm md:max-w-sm md:w-72 z-20"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                data-testid="xxperiment-card"
              >
                <motion.div
                  className="bg-card rounded-2xl p-5 shadow-2xl border border-pink-200 dark:border-pink-900/50"
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
                    <a href="/xxperiment/" rel="noopener noreferrer">
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
                className="relative md:absolute md:right-0 md:top-[40%] md:-translate-y-1/2 w-full max-w-md md:max-w-sm md:w-72 z-20"
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                data-testid="medicoz-card"
              >
                <motion.div
                  className="bg-card rounded-2xl p-5 sm:p-6 md:p-5 shadow-2xl border border-cyan-200 dark:border-cyan-900/50"
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
            className="text-center mt-16 sm:mt-20 md:mt-24 px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl sm:text-3xl md:text-2xl font-semibold text-foreground mb-3">
              {t("service.closing")}
            </p>
            <p className="text-base sm:text-lg md:text-base text-muted-foreground">
              {t("service.closingSubtitle")}
            </p>
          </motion.div>
        </div>
      </section>





      {/* Organizational Hierarchy Layout Section 2 */}
      <section id="people" className="relative min-h-screen py-16 sm:py-20 px-6 sm:px-8 md:px-6 bg-gradient-to-br from-blue-50 via-background to-green-50 dark:from-blue-950/20 dark:via-background dark:to-green-950/20">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-0 sm:mb-4 md:mb-12"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-0 sm:mb-1 md:mb-5 text-foreground px-2">
              People Behind the Pulse
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-primary px-4">
              With the sole purpose of your wellbeing
            </p>
          </motion.div>

          {/* Click Hint - Desktop Only */}
            <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="hidden lg:block text-center mb-6"
          >
            <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              Click to explore
              </div>
            </motion.div>

          {/* Organizational Hierarchy System 2 - Desktop Only */}
          <div className="hidden lg:block relative w-full max-w-6xl mx-auto h-[700px]">
            {/* Close Button */}
            {hoveredOrbitalMember !== null && (
              <motion.button
                className="absolute top-4 right-4 z-[60] bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-lg w-10 h-10 flex items-center justify-center shadow-lg backdrop-blur-sm border border-gray-600/50"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={() => setHoveredOrbitalMember(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg font-bold">×</span>
              </motion.button>
            )}

            {/* Fixed Center Position */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              {hoveredOrbitalMember !== null && (
                <motion.div
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {/* Center Info Card - Moved Above */}
                  <motion.div
                    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-2xl border-2 w-80 mb-6 pointer-events-auto text-center"
                    style={{ borderColor: teamMembers[hoveredOrbitalMember].color }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{teamMembers[hoveredOrbitalMember].name}</h3>
                    <p className="text-base text-gray-600 dark:text-gray-400 mb-3">{teamMembers[hoveredOrbitalMember].role}</p>
                  </motion.div>

                  <motion.div
                    className="w-32 h-32 rounded-full overflow-hidden border-4 cursor-pointer pointer-events-auto"
                    style={{ borderColor: teamMembers[hoveredOrbitalMember].color }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <img
                      src={teamMembers[hoveredOrbitalMember].image}
                      alt={teamMembers[hoveredOrbitalMember].name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="text-center mt-4">
                    <h3 className="font-bold text-lg">{teamMembers[hoveredOrbitalMember].name}</h3>
                    <p className="text-sm text-muted-foreground">{teamMembers[hoveredOrbitalMember].role}</p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Team Members - Conditional Layout */}
            {hoveredOrbitalMember === null ? (
              // Flexbox Layout (matching Organizational Hierarchy) when no one is selected
              <div className="relative w-full h-full flex flex-col items-center justify-start pt-8">
                {/* Founder Level */}
                <div className="flex justify-center mb-8">
                  <div>
                    <motion.div
                      className="w-20 h-20 rounded-full overflow-hidden border-4 cursor-pointer mx-auto"
                      style={{ borderColor: teamMembers[0].color }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => setHoveredOrbitalMember(0)}
                      layoutId={`member-0`}
                    >
                      <img
                        src={teamMembers[0].image}
                        alt={teamMembers[0].name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="text-center mt-2">
                      <h3 className="font-bold text-sm">{teamMembers[0].name}</h3>
                      <p className="text-xs text-muted-foreground">{teamMembers[0].role}</p>
                    </div>
                  </div>
                </div>

                {/* Executive Level */}
                <div className="flex justify-center gap-12 mb-8">
                  {[1, 2].map((memberIndex) => (
                    <div key={memberIndex}>
                      <motion.div
                        className="w-16 h-16 rounded-full overflow-hidden border-4 cursor-pointer mx-auto"
                        style={{ borderColor: teamMembers[memberIndex].color }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setHoveredOrbitalMember(memberIndex)}
                        layoutId={`member-${memberIndex}`}
                      >
                        <img
                          src={teamMembers[memberIndex].image}
                          alt={teamMembers[memberIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="text-center mt-2">
                        <h3 className="font-bold text-sm">{teamMembers[memberIndex].name}</h3>
                        <p className="text-xs text-muted-foreground">{teamMembers[memberIndex].role}</p>
                      </div>
                    </div>
                ))}
              </div>

                {/* C-Level Executives */}
                <div className="flex justify-center gap-4 mb-8">
                  {[3, 4, 5, 6, 7].map((memberIndex) => (
                    <div key={memberIndex}>
                      <motion.div
                        className="w-14 h-14 rounded-full overflow-hidden border-4 cursor-pointer mx-auto"
                        style={{ borderColor: teamMembers[memberIndex].color }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setHoveredOrbitalMember(memberIndex)}
                        layoutId={`member-${memberIndex}`}
                      >
                        <img
                          src={teamMembers[memberIndex].image}
                          alt={teamMembers[memberIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="text-center mt-2">
                        <h3 className="font-bold text-xs">{teamMembers[memberIndex].name}</h3>
                        <p className="text-xs text-muted-foreground">{teamMembers[memberIndex].role}</p>
                      </div>
                    </div>
                  ))}
            </div>

                {/* Team Members */}
                <div className="grid grid-cols-4 gap-4">
                  {[8, 9, 10, 11, 12, 13, 14, 15].map((memberIndex) => (
                    <div key={memberIndex}>
                      <motion.div
                        className="w-12 h-12 rounded-full overflow-hidden border-4 cursor-pointer mx-auto"
                        style={{ borderColor: teamMembers[memberIndex].color }}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setHoveredOrbitalMember(memberIndex)}
                        layoutId={`member-${memberIndex}`}
                      >
                        <img
                          src={teamMembers[memberIndex].image}
                          alt={teamMembers[memberIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="text-center mt-2">
                        <h3 className="font-bold text-xs">{teamMembers[memberIndex].name}</h3>
                        <p className="text-xs text-muted-foreground">{teamMembers[memberIndex].role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Absolute Positioning Layout when someone is selected
              teamMembers.map((member, memberIndex) => {
                // Calculate positions for 2 vertical columns on each side
                const getPosition = () => {
                  // When someone is selected
                  if (memberIndex === hoveredOrbitalMember) {
                    return { x: '50%', y: '50%', translateX: '-50%', translateY: '-50%', opacity: 0, scale: 0 };
                  }

                  // Get remaining members (excluding the selected one)
                  const remainingMembers = teamMembers.filter((_, idx) => idx !== hoveredOrbitalMember);
                  const indexInRemaining = remainingMembers.findIndex((_, idx) => {
                    let count = 0;
                    for (let i = 0; i < memberIndex; i++) {
                      if (i !== hoveredOrbitalMember) count++;
                    }
                    return count === idx;
                  });

                  const totalRemaining = remainingMembers.length;
                  const membersPerColumn = Math.ceil(totalRemaining / 4); // 4 columns total (2 left + 2 right)
                  
                  const startY = 20;
                  const endY = 80;
                  const columnSpacing = (endY - startY) / (membersPerColumn - 1);

                  if (indexInRemaining < membersPerColumn) {
                    // Left column 1
                    const yPosition = startY + (columnSpacing * indexInRemaining);
                    return { x: '12%', y: `${yPosition}%`, translateX: '-50%', translateY: '-50%', opacity: 1, scale: 1 };
                  } else if (indexInRemaining < membersPerColumn * 2) {
                    // Left column 2
                    const columnIndex = indexInRemaining - membersPerColumn;
                    const yPosition = startY + (columnSpacing * columnIndex);
                    return { x: '22%', y: `${yPosition}%`, translateX: '-50%', translateY: '-50%', opacity: 1, scale: 1 };
                  } else if (indexInRemaining < membersPerColumn * 3) {
                    // Right column 1
                    const columnIndex = indexInRemaining - (membersPerColumn * 2);
                    const yPosition = startY + (columnSpacing * columnIndex);
                    return { x: '78%', y: `${yPosition}%`, translateX: '-50%', translateY: '-50%', opacity: 1, scale: 1 };
                  } else {
                    // Right column 2
                    const columnIndex = indexInRemaining - (membersPerColumn * 3);
                    const yPosition = startY + (columnSpacing * columnIndex);
                    return { x: '88%', y: `${yPosition}%`, translateX: '-50%', translateY: '-50%', opacity: 1, scale: 1 };
                  }
                };

                const position = getPosition();
                const isInColumn = memberIndex !== hoveredOrbitalMember;

              return (
                <motion.div
                    key={memberIndex}
                  className="absolute"
                  style={{
                      left: position.x,
                      top: position.y,
                      transform: `translate(${position.translateX}, ${position.translateY})`
                  }}
                  animate={{
                      left: position.x,
                      top: position.y,
                      opacity: position.opacity !== undefined ? position.opacity : 1,
                      scale: position.scale !== undefined ? position.scale : 1
                  }}
                  transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      opacity: { duration: 0.6 },
                      scale: { duration: 0.6 }
                    }}
                    layoutId={`member-${memberIndex}`}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full overflow-hidden border-4 cursor-pointer mx-auto"
                      style={{ borderColor: member.color }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onClick={() => setHoveredOrbitalMember(memberIndex)}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="text-center mt-2 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: isInColumn ? 1 : 0,
                        y: isInColumn ? 0 : -10
                      }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                        <h3 className="font-bold text-xs text-gray-900 dark:text-white">
                          {member.name}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300">
                          {member.role}
                        </p>
                  </div>
                    </motion.div>
                </motion.div>
              );
              })
            )}
          </div>

          {/* Click Hint - Below Team Structure - Desktop Only */}
          {hoveredOrbitalMember === null && (
              <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 2 }}
              className="hidden lg:block text-center mt-6"
            >
              <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span>Click any team member above to focus and explore</span>
              </div>
            </motion.div>
          )}

          {/* Mobile Carousel for Team Structure Section */}
          <div className="lg:hidden py-12">
            <div className="max-w-sm mx-auto">
              {/* Carousel Container */}
              <div className="relative">
                {/* Profile Card */}
                  <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border-4 border-blue-500 shadow-lg p-8 mb-6"
                >
                  {/* Avatar */}
                  <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden">
                      <img
                        src={teamMembers[currentSlide].image}
                        alt={teamMembers[currentSlide].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                  
                  {/* Name */}
                  <h3 className="text-2xl font-bold text-blue-900 text-center mb-2">
                    {teamMembers[currentSlide].name}
                  </h3>
                  
                  {/* Role */}
                  <p className="text-lg font-semibold text-blue-500 text-center mb-3">
                    {teamMembers[currentSlide].role}
                  </p>
                  
                  </motion.div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-6 mb-6">
                  {/* Left Arrow */}
                  <button
                    onClick={() => {
                      console.log('Previous clicked, current slide:', currentSlide);
                      setCurrentSlide(currentSlide === 0 ? teamMembers.length - 1 : currentSlide - 1);
                    }}
                    className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-lg border-2 border-blue-600"
                  >
                    <ChevronLeft className="w-7 h-7" />
                  </button>

                  {/* Pagination Dots - Show only 5 dots */}
                  <div className="flex gap-3">
                    {Array.from({ length: 5 }, (_, index) => {
                      // Calculate which team member this dot represents
                      const teamMemberIndex = Math.floor((index / 5) * teamMembers.length);
                      // Calculate which dot should be active based on current slide
                      const activeDotIndex = Math.floor((currentSlide / teamMembers.length) * 5);
                      
                      return (
                  <button
                    key={index}
                          onClick={() => {
                            console.log('Dot clicked, index:', index, 'teamMemberIndex:', teamMemberIndex);
                            setCurrentSlide(teamMemberIndex);
                          }}
                          className={`w-4 h-4 rounded-full transition-all ${
                            index === activeDotIndex
                              ? 'bg-blue-500 w-10' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      );
                    })}
              </div>

                  {/* Right Arrow */}
                  <button
                    onClick={() => {
                      console.log('Next clicked, current slide:', currentSlide);
                      setCurrentSlide(currentSlide === teamMembers.length - 1 ? 0 : currentSlide + 1);
                    }}
                    className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors shadow-lg border-2 border-blue-600"
                  >
                    <ChevronRight className="w-7 h-7" />
                  </button>
            </div>

                {/* Slide Counter */}
                <div className="text-center text-gray-600 text-sm mb-4">
              {currentSlide + 1} / {teamMembers.length}
          </div>

              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Contact Section - Innovated */}
      <section id="contact" className="relative py-12 sm:py-16 lg:py-20 px-6 sm:px-8 md:px-6 bg-gradient-to-br from-muted via-background to-muted/50">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-8 sm:mb-10 lg:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-foreground px-2">
              {t("contact.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {t("contact.subtitle")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left - Intent Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {/* Mobile: Collapsible Header */}
              <div className="lg:hidden">
                <button
                  onClick={() => setShowIntents(!showIntents)}
                  className="w-full flex items-center justify-between p-4 bg-card rounded-xl border-2 border-border"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">{t("contact.pathTitle")}</span>
                    {selectedIntent && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedIntent}
                      </Badge>
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: showIntents ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronRight className="w-5 h-5 rotate-90" />
                  </motion.div>
                </button>
              </div>

              {/* Desktop: Always visible title */}
              <div className="hidden lg:block">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">{t("contact.pathTitle")}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">{t("contact.pathSubtitle")}</p>
              </div>

              {/* Intent Options - Collapsible on mobile */}
              <AnimatePresence>
                {(showIntents || !isMobile) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-2 pt-2 lg:pt-0">
                      {intents.map((intent, index) => {
                        const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
                          "Careers": { bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-600 dark:border-emerald-400", text: "text-emerald-600 dark:text-emerald-400", icon: "💼" },
                          "Get in touch": { bg: "bg-pink-50 dark:bg-pink-950/30", border: "border-blue-600 dark:border-pink-400", text: "text-pink-600 dark:text-pink-400", icon: "💬" }
                        };

                        const colors = colorMap[intent] || colorMap["Get in touch"];

                        return (
                          <motion.div
                            key={intent}
                            className={`p-3 lg:p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              selectedIntent === intent
                                ? `${colors.bg} ${colors.border}`
                                : "bg-card border-border hover:border-border/80"
                            }`}
                            onClick={() => {
                              setSelectedIntent(intent);
                              if (isMobile) setShowIntents(false);
                            }}
                            whileHover={{ scale: 1.02, x: 5 }}
                            data-testid={`chip-${intent.toLowerCase().replace(" ", "-").replace("/", "")}`}
                          >
                            <div className="flex items-center gap-2 lg:gap-3">
                              <span className="text-xl lg:text-2xl">{colors.icon}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm lg:text-base font-semibold ${selectedIntent === intent ? colors.text : "text-foreground"}`}>
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
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-4 sm:p-5 lg:p-6 shadow-xl border border-border">
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-4">
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block text-foreground">{t("contact.form.name")}</label>
                    <Input
                      name="name"
                      placeholder={t("contact.form.namePlaceholder")}
                      className="h-11 text-sm sm:text-base"
                      data-testid="input-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-1.5 block text-foreground">{t("contact.form.email")}</label>
                    <Input
                      name="email"
                      placeholder={t("contact.form.emailPlaceholder")}
                      type="email"
                      className="h-11 text-sm sm:text-base"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-1.5 block text-foreground">{t("contact.form.message")}</label>
                    <Textarea
                      name="message"
                      placeholder={t("contact.form.messagePlaceholder")}
                      rows={3}
                      className="text-sm sm:text-base"
                      data-testid="textarea-message"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-1.5 block text-foreground">
                      {t("contact.form.links")}
                    </label>
                    <Input
                      name="links"
                      placeholder={t("contact.form.linksPlaceholder")}
                      type="url"
                      className="h-11 text-sm sm:text-base"
                      data-testid="input-attachment"
                    />
                  </div>


                  {formError && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-red-50 dark:bg-red-950/30 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 mb-4"
                    >
                      <p className="text-red-800 dark:text-red-300 font-semibold text-sm text-center">
                        {formError}
                      </p>
                    </motion.div>
                  )}

                  <AnimatePresence mode="wait">
                    {formSubmitted && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: -20 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 20,
                          duration: 0.6 
                        }}
                        className="bg-emerald-50 dark:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl p-6 relative overflow-hidden"
                      >
                      {/* Success Icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                        className="flex justify-center mb-4"
                      >
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                          <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </motion.svg>
                        </div>
                      </motion.div>

                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-emerald-800 dark:text-emerald-300 font-semibold text-lg mb-4 text-center"
                      >
                        {t("contact.success.message")}
                      </motion.p>
                      
                      {/* Enhanced Pulse ID Line */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="relative h-16 flex items-center justify-center mb-2"
                      >
                        <div className="absolute w-full h-px bg-emerald-300 dark:bg-emerald-700" />
                        <motion.div
                          className="absolute w-3 h-3 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                          initial={{ left: "0%" }}
                          animate={{ left: "100%" }}
                          transition={{ 
                            duration: 2, 
                            ease: "easeInOut",
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(5, 150, 105, 0.8))"
                          }}
                        />
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.6 }}
                          className="relative bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 rounded-lg border border-emerald-300 dark:border-emerald-700"
                        >
                          <p className="text-sm font-mono text-emerald-700 dark:text-emerald-300">
                            {t("contact.success.id")}: {Math.random().toString(36).substring(2, 10).toUpperCase()}
                          </p>
                    </motion.div>
                      </motion.div>

                      {/* Background Animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-emerald-600/10"
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!formSubmitted && (
                    <Button
                      type="submit"
                      size="lg"
                      disabled={formLoading}
                      className="w-full bg-cyan-600 dark:bg-cyan-500 text-white text-base sm:text-lg h-12 sm:h-14 disabled:opacity-50"
                      data-testid="button-send-message"
                    >
                      {formLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                          Sending...
                        </div>
                      ) : (
                        `${t("contact.form.submit")} →`
                      )}
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
        className="relative bg-white dark:bg-gray-950 py-24 sm:py-32 px-6 sm:px-8 md:px-6 overflow-hidden"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 mb-10">
            {/* About Column */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
                {t("footer.title")}
              </h3>
              <HandwrittenText
                text={t("footer.tagline")}
                delay={0.5}
                duration={2}
                color="cyan"
                className="text-lg sm:text-xl mb-5"
              />
              <p className="text-base sm:text-base text-muted-foreground leading-relaxed">
                {t("footer.about")}
              </p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-5 text-foreground">Quick Links</h4>
              <nav className="flex flex-col gap-4 text-base">
                <a href="#about" className="text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors" data-testid="link-about">{t("footer.links.about")}</a>
                <a href="#services" className="text-muted-foreground hover:text-pink-600 dark:hover:text-pink-400 transition-colors" data-testid="link-services">{t("footer.links.services")}</a>
                <a href="/xxperiment/" rel="noopener noreferrer" className="text-muted-foreground hover:text-violet-600 dark:hover:text-violet-400 transition-colors" data-testid="link-xxperiment">{t("footer.links.xxperiment")}</a>
                <a href="#contact" className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" data-testid="link-careers">{t("footer.links.careers")}</a>
              </nav>
            </div>

            {/* Contact & Social Column */}
            <div>
              <h4 className="text-lg sm:text-xl font-semibold mb-5 text-foreground">{t("footer.contact.title")}</h4>
              <div className="space-y-3 text-base">
                <p className="text-muted-foreground">{t("footer.contact.email")}</p>
                <p className="text-muted-foreground">{t("footer.contact.phone")}</p>
                <p className="text-muted-foreground">{t("footer.contact.address")}</p>
              </div>

            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 sm:pt-10 pb-8 sm:pb-12 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-5 text-sm sm:text-base">
              <p className="text-muted-foreground text-center sm:text-left">{t("footer.copyright")}</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Sticky Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border/50">
        <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 py-3 sm:py-4">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            <div className="flex items-center justify-between w-full gap-0 px-0.5">
              {/* Home Icon */}
              <button
                onClick={() => scrollToSection('home')}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted/50 flex-shrink-0"
                title="Home"
              >
                <Home className="w-5 h-5" />
              </button>

              {/* Services Icon */}
              <button
                onClick={() => scrollToSection('services')}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted/50 flex-shrink-0"
                title="Services"
              >
                <Activity className="w-5 h-5" />
              </button>

              {/* XXperiment Button */}
              <button
                onClick={() => window.location.href = '/xxperiment'}
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex-shrink-0"
              >
                XX
              </button>

              {/* Our Team Icon */}
              <button
                onClick={() => scrollToSection('people')}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted/50 flex-shrink-0"
                title="Our Team"
              >
                <Users className="w-5 h-5" />
              </button>

              {/* Contact Icon */}
              <button
                onClick={() => scrollToSection('contact')}
                className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-full hover:bg-muted/50 flex-shrink-0"
                title="Contact"
              >
                <MessageCircle className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <div className="flex-shrink-0">
                <ThemeToggle />
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:block">
            <div className="flex items-center justify-between">
              {/* Left Section Links */}
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </button>
                      <button
                        onClick={() => scrollToSection('people')}
                        className="text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Our Team
                      </button>
              </div>

              {/* Center XXperiment Button */}
              <div className="flex items-center">
                <button
                  onClick={() => window.location.href = '/xxperiment'}
                  className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-6 py-2 sm:px-8 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Step into The XXperiment
                </button>
            </div>

              {/* Right Section Links */}
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm sm:text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </button>
                <ThemeToggle />
          </div>
        </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
