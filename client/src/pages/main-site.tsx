import { motion, useScroll, useTransform } from "framer-motion";
import { Mic, Smartphone, Mail, Briefcase, MapPin, Phone, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useRef } from "react";

interface MainSiteProps {
  showButtonsImmediately?: boolean;
}

export default function MainSite({ showButtonsImmediately = false }: MainSiteProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
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

  // Pre-compute stable particle positions
  const heroParticles = useMemo(() => 
    [...Array(15)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      xOffset: Math.random() * 40 - 20,
      duration: 4 + Math.random() * 2,
      delay: Math.random() * 3,
    })),
    []
  );

  const services = [
    {
      id: "xxpeirment",
      icon: Mic,
      title: "The XXpeirment",
      subtitle: "A Podcast for All Things Women",
      description: "Empowering conversations that celebrate women's voices, stories, and experiences. Join us for insightful discussions on health, wellness, career, and life.",
      gradient: "from-pink-500 via-violet-500 to-cyan-500",
      status: "Live Now"
    },
    {
      id: "medicoz-app",
      icon: Smartphone,
      title: "Medicoz App",
      subtitle: "Healthcare at Your Fingertips",
      description: "Revolutionary healthcare platform connecting patients and providers seamlessly. Real-time consultations, smart health tracking, and care that follows you everywhere.",
      gradient: "from-cyan-500 via-blue-500 to-emerald-500",
      status: "Coming Soon"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      bio: "15+ years in healthcare innovation"
    },
    {
      name: "Michael Rodriguez",
      role: "Head of Technology",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      bio: "Former tech lead at major health platforms"
    },
    {
      name: "Priya Sharma",
      role: "Product Director",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      bio: "User-centered design advocate"
    },
    {
      name: "James Wilson",
      role: "Operations Lead",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      bio: "Healthcare operations specialist"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white via-cyan-50/30 to-violet-50/20"
          style={{ y: heroY }}
        />

        {/* Floating particles */}
        {heroParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cyan-500 z-10"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              y: [0, -80, 0],
              x: [0, particle.xOffset, 0],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Ambient Background */}
        <div className="absolute inset-0 opacity-40">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/15 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <motion.div 
          className="max-w-6xl mx-auto px-6 text-center relative z-10"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-600"
              style={{
                filter: "drop-shadow(0 0 30px rgba(8, 145, 178, 0.3))",
              }}
            >
              Medicoz Infosystems
            </h1>
            <p className="text-2xl md:text-3xl text-blue-800 mb-8 font-light tracking-wide">
              technology that cares
            </p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Empowering healthcare providers with intelligent, empathetic technology solutions
              that put patients first. From real-time communication to global connectivity,
              we bridge the gap between care and technology.
            </p>
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
        </motion.div>
      </section>

      {/* Services Section */}
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
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Innovative solutions designed to transform healthcare and empower communities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: index === 0 ? -50 : 50, rotateY: index === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ scale: 1.02, rotateY: index === 0 ? 2 : -2 }}
              >
                <Card className="h-full overflow-hidden hover-elevate border-0 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-sm">
                  <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${service.gradient}`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        service.status === "Live Now" 
                          ? "bg-emerald-100 text-emerald-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {service.status}
                      </span>
                    </div>
                    <CardTitle className="text-3xl bg-gradient-to-r bg-clip-text text-transparent from-gray-900 to-gray-600">
                      {service.title}
                    </CardTitle>
                    <p className="text-lg font-medium text-violet-600">
                      {service.subtitle}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                    <Button 
                      size="lg" 
                      className={`mt-6 bg-gradient-to-r ${service.gradient} text-white border-0`}
                      data-testid={`button-${service.id}`}
                    >
                      {service.status === "Live Now" ? "Listen Now" : "Learn More"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Team Section */}
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
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate healthcare innovators dedicated to making a difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center overflow-hidden hover-elevate bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-8">
                    <motion.div 
                      className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-cyan-400 to-violet-400 p-1"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover bg-white"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-violet-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Hiring Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-violet-50/40 to-cyan-50/30" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-violet-600 to-cyan-600">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join our team or connect with us to transform healthcare together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <Mail className="w-8 h-8 text-violet-600" />
                    Contact Us
                  </CardTitle>
                  <CardDescription className="text-base">
                    Have questions? We'd love to hear from you
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Input 
                      placeholder="Your Name" 
                      className="h-12"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Input 
                      placeholder="Email Address" 
                      type="email"
                      className="h-12"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Your Message" 
                      rows={5}
                      data-testid="textarea-message"
                    />
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white"
                    data-testid="button-send-message"
                  >
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Careers Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6"
            >
              <Card className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-3xl flex items-center gap-3">
                    <Briefcase className="w-8 h-8" />
                    Join Our Team
                  </CardTitle>
                  <CardDescription className="text-white/90 text-base">
                    We're always looking for talented individuals
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/90">
                    Be part of a mission-driven team transforming healthcare technology. 
                    We offer competitive benefits, flexible work arrangements, and the chance 
                    to make a real impact.
                  </p>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="w-full"
                    data-testid="button-view-openings"
                  >
                    View Open Positions
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-cyan-600 mt-1" />
                    <div>
                      <p className="font-medium">Visit Us</p>
                      <p className="text-sm text-muted-foreground">123 Healthcare Drive, Medical District</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-violet-600 mt-1" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-pink-600 mt-1" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-sm text-muted-foreground">hello@medicoz.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-violet-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
                Medicoz Infosystems
              </h3>
              <p className="text-gray-300 mb-6">
                Technology that cares. Empowering healthcare with innovation and empathy.
              </p>
              <div className="flex gap-4">
                <Button size="icon" variant="ghost" className="text-white hover:text-cyan-400" data-testid="button-linkedin">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-white hover:text-violet-400" data-testid="button-twitter">
                  <Twitter className="w-5 h-5" />
                </Button>
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
