
import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  openChatbot: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openChatbot }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-8 h-8 text-primary"
          >
            <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
            <path d="M12 12v10" />
            <path d="M12 12H2" />
          </svg>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Aigenyx
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="about"
            smooth={true}
            duration={500}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            About
          </Link>
          <Link
            to="services"
            smooth={true}
            duration={500}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Work
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="text-foreground hover:text-primary transition-colors cursor-pointer"
          >
            Contact
          </Link>
          <Button onClick={openChatbot} variant="default">
            Talk to Our AI
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link
              to="about"
              smooth={true}
              duration={500}
              className="text-foreground hover:text-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="services"
              smooth={true}
              duration={500}
              className="text-foreground hover:text-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Work
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="text-foreground hover:text-primary py-2 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button onClick={openChatbot} variant="default" className="w-full">
              Talk to Our AI
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
