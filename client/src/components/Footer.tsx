import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#27515F] text-white py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Medicoz Infosystems</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Technology that cares. Building digital platforms for a healthier,
              more connected world.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  data-testid="link-footer-home"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  data-testid="link-footer-services"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  data-testid="link-footer-about"
                >
                  About & Team
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                  data-testid="link-footer-contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <p className="text-white/80 text-sm mb-4">
              Stay updated on our latest innovations in healthcare technology.
            </p>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {new Date().getFullYear()} Medicoz Infosystems. All rights
              reserved.
            </p>
            <p className="flex items-center gap-2 text-white/70 text-sm">
              Made with <Heart className="h-4 w-4 text-red-400 fill-current" />{" "}
              for better healthcare
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
