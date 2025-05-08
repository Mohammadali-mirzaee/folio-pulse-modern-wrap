
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Enhanced toggle menu function with proper body scroll locking
  const toggleMenu = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Lock/unlock body scroll when menu opens/closes
    document.body.style.overflow = newIsOpen ? 'hidden' : '';
    if (newIsOpen) {
      // Add additional class to prevent any background movements
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      // Reset body styles when component unmounts
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      // Re-enable scrolling when navigating
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    }
  };

  const navigationItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
      )}
    >
      <div className="container-wide flex justify-between items-center py-4">
        <div className="text-xl md:text-2xl font-poppins font-extrabold tracking-tight">
          ELIAS FOLIERING
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden text-white z-50 relative"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <button 
              key={item.id}
              className="text-white/80 hover:text-accent transition-colors duration-300"
              onClick={() => scrollToSection(item.id)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu - Completely redesigned */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-[100] md:hidden">
          {/* Full opaque background */}
          <div className="absolute inset-0 bg-black"></div>
          
          {/* Overlay with blur effect */}
          <div 
            className="absolute inset-0 backdrop-blur-xl"
            onClick={toggleMenu} // Close menu when clicking backdrop
          ></div>
          
          {/* Menu content */}
          <div className="relative z-[110] h-full flex flex-col items-center justify-center">
            <div 
              className="flex flex-col items-center space-y-8 animate-fade-up"
              onClick={(e) => e.stopPropagation()} // Prevent clicks from closing menu
            >
              {navigationItems.map((item) => (
                <button 
                  key={item.id}
                  className="text-2xl text-white hover:text-accent transition-colors duration-300"
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
