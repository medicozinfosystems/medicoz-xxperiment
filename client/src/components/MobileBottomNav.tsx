import { motion } from "framer-motion";
import { Home, Heart, Users, MessageSquare, Radio } from "lucide-react";

const mobileNavItems = [
  { 
    label: "Home", 
    href: "#home", 
    icon: Home,
    color: "text-red-500"
  },
  { 
    label: "Services", 
    href: "#services", 
    icon: Heart,
    color: "text-pink-500"
  },
  { 
    label: "Team", 
    href: "#about", 
    icon: Users,
    color: "text-violet-500"
  },
  { 
    label: "Contact", 
    href: "#contact", 
    icon: MessageSquare,
    color: "text-cyan-500"
  },
  { 
    label: "XXperiment", 
    href: "/xxperiment", 
    icon: Radio,
    color: "text-red-600"
  },
];

export default function MobileBottomNav() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("/")) {
      // External link
      window.location.href = href;
      return;
    }
    
    const id = href.replace("#", "");
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 border-t border-red-500/20 shadow-2xl md:hidden"
      style={{
        background: 'linear-gradient(180deg, #1a1a1a 0%, #2a2a2a 50%, #1f1f1f 100%)',
        boxShadow: '0 -4px 20px rgba(220, 38, 38, 0.3)'
      }}
    >
      {/* Retro border accent */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-pink-500 to-violet-500"></div>
      
      <div className="flex items-center justify-around px-2 py-3">
        {mobileNavItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-300 hover:bg-red-500/10 active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
            >
              {/* Icon with retro styling */}
              <div className="relative mb-1">
                <IconComponent 
                  className={`w-6 h-6 ${item.color} transition-colors duration-300`}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(220, 38, 38, 0.3))'
                  }}
                />
                {/* Retro glow effect */}
                <div 
                  className="absolute inset-0 w-6 h-6 rounded-full opacity-20 animate-pulse"
                  style={{
                    background: `radial-gradient(circle, ${item.color.replace('text-', '#')} 0%, transparent 70%)`
                  }}
                ></div>
              </div>
              
              {/* Label with retro font */}
              <span 
                className="text-xs font-bold text-white/90 tracking-wide"
                style={{
                  fontFamily: 'Alfa Slab One, serif',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
                  fontSize: '10px',
                  letterSpacing: '0.5px'
                }}
              >
                {item.label}
              </span>
              
              {/* Retro indicator dot */}
              <motion.div
                className="w-1 h-1 rounded-full bg-red-500 mt-1"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.3 }}
                style={{
                  boxShadow: '0 0 4px rgba(220, 38, 38, 0.6)'
                }}
              />
            </motion.button>
          );
        })}
      </div>
      
      {/* Bottom accent line */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
    </motion.div>
  );
}
