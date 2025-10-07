import { motion } from "framer-motion";
import { Heart, MessageSquare, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MainSite() {
  const features = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "Technology designed with empathy and understanding at its core",
    },
    {
      icon: MessageSquare,
      title: "Real-Time Communication",
      description: "Seamless messaging and alerts that connect healthcare providers instantly",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Healthcare solutions that work across miles and time zones",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "Enterprise-grade security meeting all healthcare data standards",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-violet-50/20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Ambient Background */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-600">
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
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="text-lg px-8" data-testid="button-get-started">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-learn-more">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
              Healthcare Technology That Understands
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our solutions combine cutting-edge technology with human-centered design
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover-elevate" data-testid={`card-feature-${index}`}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl text-blue-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <Card className="bg-gradient-to-br from-cyan-600 to-violet-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Ready to Transform Healthcare Delivery?
              </CardTitle>
              <CardDescription className="text-white/90 text-lg">
                Join leading healthcare providers who trust Medicoz Infosystems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                size="lg" 
                variant="secondary" 
                className="text-lg px-8"
                data-testid="button-contact-us"
              >
                Contact Us Today
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Medicoz Infosystems. Technology that cares.
          </p>
        </div>
      </footer>
    </div>
  );
}
