import { motion, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from "framer-motion";
import { Mic, Smartphone, Mail, Briefcase, MapPin, Phone, Linkedin, Youtube, Heart, Activity, Brain, Lock, Leaf, Calendar, Pill, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useMemo, useRef, useState, useEffect } from "react";

interface MainSiteProps {
  showButtonsImmediately?: boolean;
}

export default function MainSite({ showButtonsImmediately = false }: MainSiteProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasPointerMoved, setHasPointerMoved] = useState(false);
  
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: teamScrollProgress } = useScroll({
    target: teamRef,
    offset: ["start end", "end start"]
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const servicesY = useTransform(servicesScrollProgress, [0, 1], ["0%", "-20%"]);
  const teamY = useTransform(teamScrollProgress, [0, 1], ["0%", "-15%"]);

  // ECG pulse path animation
  const ecgPath = "M 0 50 L 20 50 L 25 30 L 30 70 L 35 50 L 40 50 L 45 40 L 50 60 L 55 50 L 100 50";

  const handlePointerMove = (e: React.PointerEvent) => {
    // Only show ripple on actual pointer devices (not touch)
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      setHasPointerMoved(true);
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const rippleX = useSpring(mouseX, springConfig);
  const rippleY = useSpring(mouseY, springConfig);

  const teamMembers = [
    {
      name: "Meera Gupta",
      role: "Chief Experience Officer",
      bio: "Designing interfaces that feel like a conversation.",
      angle: 0
    },
    {
      name: "Arjun Khanna",
      role: "Head of Engineering",
      bio: "Reliability you can feel. Speed you can't notice.",
      angle: 72
    },
    {
      name: "Veda Raman",
      role: "Clinical Partnerships",
      bio: "Care pathways that meet people where they are.",
      angle: 144
    },
    {
      name: "Harshiv Gajjar",
      role: "Product & Platforms",
      bio: "Turning empathy into infrastructure.",
      angle: 216
    },
    {
      name: "Mitra Vanshita",
      role: "Strategy & Growth",
      bio: "Scaling trust across cultures.",
      angle: 288
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Empathy in every interface",
      description: "We measure success by felt relief."
    },
    {
      icon: Lock,
      title: "Privacy by default",
      description: "Your data belongs to you."
    },
    {
      icon: Brain,
      title: "Intelligence that empowers",
      description: "Augmenting clinicians, not replacing them."
    },
    {
      icon: Leaf,
      title: "Sustainable innovation",
      description: "Long-term health, not hype."
    }
  ];

  const intents = ["Partnership", "Pilot Project", "Sponsorship", "Careers"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - "The Moment of Connection" */}
      <section 
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onPointerMove={handlePointerMove}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/30 to-violet-50/20"
          style={{ y: heroY }}
        />

        {/* Cursor ripple effect - only on pointer devices */}
        {hasPointerMoved && (
          <motion.div
            className="absolute w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(8, 145, 178, 0.15) 0%, transparent 70%)",
              x: rippleX,
              y: rippleY,
              translateX: "-50%",
              translateY: "-50%"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* ECG Pulse Animation */}
        <svg className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="none">
          <motion.path
            d={ecgPath}
            stroke="url(#ecgGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
        </svg>

        {/* Flowing data ribbon */}
        <motion.div
          className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.3 }}
          transition={{ delay: 2, duration: 1.5, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />

        <motion.div 
          className="max-w-6xl mx-auto px-6 text-center relative z-10"
          style={{ opacity: heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-sm font-medium text-cyan-600 tracking-wider uppercase">
              Healthcare • Platforms • AI
            </p>
          </motion.div>

          {/* Headline with soft reveal */}
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          >
            Technology that cares
          </motion.h1>

          {/* Support line */}
          <motion.p 
            className="text-2xl md:text-3xl text-blue-800 mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            Health, made human.
          </motion.p>

          {/* Micro-line */}
          <motion.p 
            className="text-sm text-muted-foreground mb-12 absolute bottom-0 right-6 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 3, duration: 1 }}
          >
            Designed with empathy. Built for scale.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: showButtonsImmediately ? 0 : 3.2 
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
      </section>

      {/* Services Section - "Two Ways We Make Care More Human" */}
      <section ref={servicesRef} className="relative py-32 px-6 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-violet-50/30 via-pink-50/20 to-white"
          style={{ y: servicesY }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-pink-600 to-cyan-600">
              Two Ways We Make Care More Human
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* The XXperiment Podcast */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full overflow-hidden hover-elevate border-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm group">
                <div className="h-2 bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500" />
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-pink-100 text-pink-700 border-0">Podcast</Badge>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500 via-violet-500 to-cyan-500">
                      <Mic className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl bg-gradient-to-r bg-clip-text text-transparent from-gray-900 to-gray-600">
                    The XXperiment — Conversations that care
                  </CardTitle>
                  <p className="text-lg font-medium text-violet-600">
                    Women's health, stories, science, and strength.
                  </p>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-pink-600 italic"
                    >
                      Where voices become change.
                    </motion.span>
                  </CardDescription>
                  
                  {/* Soundwave animation */}
                  <div className="flex gap-1 items-end h-16 mb-6">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-pink-500 to-violet-500 rounded-full"
                        initial={{ height: "20%" }}
                        animate={{ 
                          height: ["20%", `${30 + Math.random() * 70}%`, "20%"],
                        }}
                        transition={{
                          duration: 1 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    ))}
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500 text-white border-0"
                    data-testid="button-xxperiment"
                  >
                    Go to The XXperiment
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Medicoz App */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full overflow-hidden hover-elevate border-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm">
                <div className="h-2 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500" />
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-blue-100 text-blue-700 border-0">Coming Soon</Badge>
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500">
                      <Smartphone className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-3xl bg-gradient-to-r bg-clip-text text-transparent from-gray-900 to-gray-600">
                    Medicoz App — Care in your pocket
                  </CardTitle>
                  <p className="text-lg font-medium text-blue-600">
                    Appointments, insights, and support — in one place.
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Feature bullets */}
                  <div className="space-y-3 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-cyan-500" />
                      <p className="text-sm text-muted-foreground">Multilingual</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <p className="text-sm text-muted-foreground">Private by design</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <p className="text-sm text-muted-foreground">Clinical-grade UX</p>
                    </motion.div>
                  </div>

                  {/* Phone silhouette with icons */}
                  <div className="relative h-32 mb-6 flex items-center justify-center">
                    <motion.div
                      className="w-24 h-40 border-4 border-cyan-500/30 rounded-3xl relative"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(8, 145, 178, 0.3)",
                          "0 0 40px rgba(8, 145, 178, 0.5)",
                          "0 0 20px rgba(8, 145, 178, 0.3)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        {[
                          { Icon: Calendar, delay: 0.6, position: { top: "20%", left: "-20%" } },
                          { Icon: Pill, delay: 0.8, position: { top: "40%", left: "120%" } },
                          { Icon: MessageCircle, delay: 1.0, position: { top: "60%", left: "-20%" } },
                          { Icon: Heart, delay: 1.2, position: { top: "80%", left: "120%" } }
                        ].map(({ Icon, delay, position }, i) => (
                          <motion.div
                            key={i}
                            className="absolute"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay }}
                            style={position}
                          >
                            <Icon className="w-5 h-5 text-cyan-600" />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 text-white border-0"
                      data-testid="button-waitlist"
                    >
                      Join the waitlist
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="w-full"
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

      {/* About Section - "People Behind the Pulse" */}
      <section ref={teamRef} className="relative py-32 px-6 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-50/40 via-blue-50/30 to-emerald-50/20"
          style={{ y: teamY }}
        />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600">
              People Behind the Pulse
            </h2>
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              People-first. Science-backed. Design-led.
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We build healthcare technology that listens, learns, and supports—without getting in the way. 
              Our team blends clinical insight, data science, and craft-level design to serve patients and professionals alike.
            </p>
          </motion.div>

          {/* Team Orbit */}
          <div className="relative h-[600px] mb-20 flex items-center justify-center">
            {/* Central purpose core */}
            <motion.div
              className="absolute z-10 w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-violet-500 to-pink-500 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 40px rgba(8, 145, 178, 0.4)",
                  "0 0 80px rgba(124, 58, 237, 0.6)",
                  "0 0 40px rgba(8, 145, 178, 0.4)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart className="w-12 h-12 text-white" />
            </motion.div>

            {/* Orbiting team members */}
            {teamMembers.map((member, index) => {
              const radius = 250;
              const x = Math.cos((member.angle * Math.PI) / 180) * radius;
              const y = Math.sin((member.angle * Math.PI) / 180) * radius;

              return (
                <motion.div
                  key={member.name}
                  className="absolute"
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  whileInView={{ x, y, opacity: 1 }}
                  transition={{ 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 50
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, zIndex: 20 }}
                >
                  <Card className="w-48 hover-elevate bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-400 to-violet-400 flex items-center justify-center text-white text-xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-bold text-sm mb-1">{member.name}</h3>
                      <p className="text-xs text-violet-600 mb-2">{member.role}</p>
                      <p className="text-xs text-muted-foreground italic">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center hover-elevate bg-white/80 backdrop-blur-sm">
                    <CardContent className="pt-8">
                      <value.icon className="w-12 h-12 mx-auto mb-4 text-cyan-600" />
                      <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact / Hiring Section - "Join the Movement" */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-violet-50/40 to-cyan-50/30" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600">
              Let's build what care deserves
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="pt-8 space-y-8">
                {/* Intent chips */}
                <div>
                  <label className="text-sm font-medium mb-3 block">What brings you here?</label>
                  <div className="flex flex-wrap gap-3">
                    {intents.map((intent) => (
                      <Badge
                        key={intent}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all ${
                          selectedIntent === intent
                            ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                    className="bg-emerald-50 border border-emerald-200 rounded-lg p-4"
                  >
                    <p className="text-sm text-emerald-800">
                      We welcome builders from healthcare, design, and engineering. Remote-friendly. Mission-first.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Who are you?</label>
                    <Input 
                      placeholder="Full name" 
                      className="h-12"
                      data-testid="input-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Where can we reach you?</label>
                    <Input 
                      placeholder="Email address" 
                      type="email"
                      className="h-12"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">How do you want to make healthcare more human?</label>
                    <Textarea 
                      placeholder="Tell us your goals, constraints, and timeline..." 
                      rows={6}
                      data-testid="textarea-message"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Optional — Attach a deck or link to your work
                    </label>
                    <Input 
                      placeholder="https://..." 
                      type="url"
                      className="h-12"
                      data-testid="input-attachment"
                    />
                  </div>

                  {formSubmitted ? (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl mb-3"
                      >
                        ✓
                      </motion.div>
                      <p className="text-emerald-800 font-medium">
                        Thank you — you've just made healthcare a little more human.
                      </p>
                    </motion.div>
                  ) : (
                    <Button 
                      type="submit"
                      size="lg" 
                      className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white text-lg"
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
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-violet-900 text-white py-16 px-6 overflow-hidden">
        {/* ECG pulse line */}
        <svg className="absolute top-0 left-0 w-full h-1" preserveAspectRatio="none">
          <motion.line
            x1="0"
            y1="2"
            x2="100%"
            y2="2"
            stroke="url(#footerEcgGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="footerEcgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="50%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
          </defs>
        </svg>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Left */}
            <div>
              <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Medicoz Infosystems
              </h3>
              <p className="text-gray-300 text-lg">
                Technology that cares.
              </p>
            </div>
            
            {/* Middle - Links */}
            <div>
              <nav className="flex flex-wrap gap-4 text-gray-300">
                <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
                <span>•</span>
                <a href="#services" className="hover:text-violet-400 transition-colors">Services</a>
                <span>•</span>
                <a href="#xxperiment" className="hover:text-pink-400 transition-colors">The XXperiment</a>
                <span>•</span>
                <a href="#careers" className="hover:text-emerald-400 transition-colors">Careers</a>
                <span>•</span>
                <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy</a>
              </nav>
            </div>
            
            {/* Right - Contact */}
            <div className="space-y-3">
              <p className="text-gray-300">hello@medicoz.com</p>
              <div className="flex gap-4">
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:text-cyan-400"
                    data-testid="button-linkedin"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="text-white hover:text-pink-400"
                    data-testid="button-youtube"
                  >
                    <Youtube className="w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Micro-tagline */}
          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-400 text-sm mb-2">Connection begins with care.</p>
            <p className="text-gray-500 text-xs">© 2025 Medicoz Infosystems</p>
          </div>
        </div>

        {/* Pulsing dots on footer icons */}
        <motion.div
          className="absolute bottom-20 left-1/2 w-2 h-2 bg-cyan-500 rounded-full"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </footer>
    </div>
  );
}
