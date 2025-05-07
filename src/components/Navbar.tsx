
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scrolling when menu is open
    document.body.style.overflow = !isOpen ? 'hidden' : '';
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
      // Reset body overflow when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  // Clean up body overflow when menu closes
  useEffect(() => {
    return () => {
      if (isOpen) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      // Re-enable scrolling when navigating
      document.body.style.overflow = '';
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
          className="block md:hidden text-white"
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

      {/* Mobile Menu - Refactored */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center md:hidden animate-fade-in"
          onClick={() => toggleMenu()} // Close menu when background is clicked
        >
          <div 
            className="flex flex-col items-center space-y-8 animate-fade-up"
            onClick={(e) => e.stopPropagation()} // Prevent clicks on menu items from closing the menu
          >
            {navigationItems.map((item) => (
              <button 
                key={item.id}
                className="text-2xl text-white/90 hover:text-accent transition-colors duration-300"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
