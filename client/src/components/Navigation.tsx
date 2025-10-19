import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]
  );

  const textColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 1)", "rgba(39, 81, 95, 1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: isScrolled
            ? "rgba(255, 255, 255, 0.95)"
            : backgroundColor,
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              onClick={() => scrollToSection("#home")}
              className="text-xl font-bold"
              style={{
                color: isScrolled ? "#27515F" : textColor,
              }}
              data-testid="link-logo"
            >
              Medicoz
            </motion.button>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-sm font-medium hover:opacity-70 transition-opacity"
                  style={{
                    color: isScrolled ? "#27515F" : "white",
                  }}
                  data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => window.location.href = '/forum'}
                className="text-sm font-medium hover:opacity-70 transition-opacity"
                style={{
                  color: isScrolled ? "#27515F" : "white",
                }}
                data-testid="link-forum"
              >
                Forum
              </button>

              <button
                onClick={() => window.location.href = '/auth/signin'}
                className="text-sm font-medium px-4 py-2 rounded-md border transition-colors"
                style={{
                  color: isScrolled ? "#27515F" : "white",
                  borderColor: isScrolled ? "#27515F" : "white",
                }}
                data-testid="link-signin"
              >
                Sign In
              </button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                color: isScrolled ? "#27515F" : "white",
              }}
              data-testid="button-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-16 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b shadow-lg md:hidden"
          style={{ minHeight: '200px' }}
        >
          <div className="px-6 py-4">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Navigation Items */}
            <div className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left text-base font-medium text-gray-900 dark:text-white hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => window.location.href = '/forum'}
                className="block w-full text-left text-base font-medium text-gray-900 dark:text-white hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                data-testid="link-mobile-forum"
              >
                Forum
              </button>

              <button
                onClick={() => window.location.href = '/auth/signin'}
                className="block w-full text-left text-base font-medium text-gray-900 dark:text-white hover:text-primary transition-colors py-3 px-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                data-testid="link-mobile-signin"
              >
                Sign In
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
