import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, Smartphone, Mail, Briefcase, MapPin, Phone, Linkedin, Youtube, Heart, Lock, Brain, Leaf, Calendar, Pill, MessageCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";

interface MainSiteProps {
  showButtonsImmediately?: boolean;
}

export default function MainSite({ showButtonsImmediately = false }: MainSiteProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  
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

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);

  const teamMembers = [
    {
      name: "Meera Gupta",
      role: "Chief Experience Officer",
      bio: "Designing interfaces that feel like a conversation.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera"
    },
    {
      name: "Arjun Khanna",
      role: "Head of Engineering",
      bio: "Reliability you can feel. Speed you can't notice.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
    },
    {
      name: "Veda Raman",
      role: "Clinical Partnerships",
      bio: "Care pathways that meet people where they are.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Veda"
    },
    {
      name: "Harshiv Gajjar",
      role: "Product & Platforms",
      bio: "Turning empathy into infrastructure.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harshiv"
    },
    {
      name: "Mitra Vanshita",
      role: "Strategy & Growth",
      bio: "Scaling trust across cultures.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mitra"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Empathy in every interface",
      description: "We measure success by felt relief.",
      color: "#DB2777" // pink
    },
    {
      icon: Lock,
      title: "Privacy by default",
      description: "Your data belongs to you.",
      color: "#7C3AED" // violet
    },
    {
      icon: Brain,
      title: "Intelligence that empowers",
      description: "Augmenting clinicians, not replacing them.",
      color: "#0891B2" // cyan
    },
    {
      icon: Leaf,
      title: "Sustainable innovation",
      description: "Long-term health, not hype.",
      color: "#059669" // emerald
    }
  ];

  const intents = ["Partnership", "Pilot Project", "Sponsorship", "Careers"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section - Seamless from Preloader */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50/20 to-violet-50/10 dark:from-gray-950 dark:via-cyan-950/20 dark:to-violet-950/10">
        <motion.div 
          className="absolute inset-0"
          style={{ y: heroY }}
        />

        {/* Real ECG Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
          <motion.path
            d="M 0 50 L 100 50 L 120 30 L 140 70 L 160 50 L 180 50 L 200 40 L 220 60 L 240 50 L 300 50 L 320 20 L 340 80 L 360 50 L 500 50"
            stroke="#0891B2"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

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

          {/* Handwritten Tagline */}
          <motion.p 
            className="text-4xl md:text-5xl lg:text-6xl mb-12 text-violet-600 dark:text-violet-400 font-semibold"
            style={{ 
              fontFamily: "'Caveat', cursive"
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
          >
            Technology that cares
          </motion.p>

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
                    <Badge className="bg-pink-100 text-pink-700 border-0">Podcast</Badge>
                    <div className="p-3 rounded-xl bg-pink-600">
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
                  
                  {/* Real waveform visualization */}
                  <div className="flex gap-1 items-end h-20 mb-6 bg-pink-50 dark:bg-pink-950/30 rounded-lg p-4">
                    {[...Array(30)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-pink-600 dark:bg-pink-400 rounded-full"
                        initial={{ height: "20%" }}
                        animate={{ 
                          height: `${20 + Math.sin(i * 0.5) * 40 + Math.random() * 20}%`,
                        }}
                        transition={{
                          duration: 0.8 + Math.random() * 0.4,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      />
                    ))}
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
                    <Badge className="bg-blue-100 text-blue-700 border-0">Coming Soon</Badge>
                    <div className="p-3 rounded-xl bg-cyan-600">
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

      {/* About & Team Section */}
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
              People-first. Science-backed. Design-led.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We build healthcare technology that listens, learns, and supports—without getting in the way. 
              Our team blends clinical insight, data science, and craft-level design to serve patients and professionals alike.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center hover-elevate bg-white dark:bg-gray-800 border-0 shadow-md" data-testid={`card-team-${member.name.toLowerCase().replace(' ', '-')}`}>
                  <CardContent className="pt-8">
                    <motion.div 
                      className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-cyan-100"
                      whileHover={{ scale: 1.05, borderColor: "#0891B2" }}
                    >
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                    <p className="text-sm text-violet-600 dark:text-violet-400 font-medium mb-3">{member.role}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
                      className="h-12 border-gray-300"
                      data-testid="input-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">Where can we reach you?</label>
                    <Input 
                      placeholder="Email address" 
                      type="email"
                      className="h-12 border-gray-300"
                      data-testid="input-email"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-gray-700 dark:text-gray-200">How do you want to make healthcare more human?</label>
                    <Textarea 
                      placeholder="Tell us your goals, constraints, and timeline..." 
                      rows={6}
                      className="border-gray-300"
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
                      className="h-12 border-gray-300"
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

      {/* Footer */}
      <footer className="relative bg-gray-900 dark:bg-black text-white py-16 px-6">
        {/* Subtle ECG line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Left */}
            <div>
              <h3 className="text-3xl font-bold mb-3 text-white">
                Medicoz Infosystems
              </h3>
              <p className="text-gray-400 dark:text-gray-500 text-lg mb-4">
                Technology that cares.
              </p>
            </div>
            
            {/* Middle - Links */}
            <div>
              <nav className="flex flex-wrap gap-4 text-gray-400 dark:text-gray-500">
                <a href="#about" className="hover:text-cyan-400 dark:hover:text-cyan-300 transition-colors" data-testid="link-about">About</a>
                <span>•</span>
                <a href="#services" className="hover:text-pink-400 dark:hover:text-pink-300 transition-colors" data-testid="link-services">Services</a>
                <span>•</span>
                <a href="#xxperiment" className="hover:text-violet-400 dark:hover:text-violet-300 transition-colors" data-testid="link-xxperiment">The XXperiment</a>
                <span>•</span>
                <a href="#careers" className="hover:text-emerald-400 dark:hover:text-emerald-300 transition-colors" data-testid="link-careers">Careers</a>
                <span>•</span>
                <a href="#privacy" className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors" data-testid="link-privacy">Privacy</a>
              </nav>
            </div>
            
            {/* Right - Contact */}
            <div className="space-y-3">
              <p className="text-gray-400 dark:text-gray-500">hello@medicoz.com</p>
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
          
          {/* Bottom */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 dark:text-gray-600 text-sm mb-2" style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem" }}>
              Connection begins with care.
            </p>
            <p className="text-gray-600 dark:text-gray-700 text-xs">© 2025 Medicoz Infosystems</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
