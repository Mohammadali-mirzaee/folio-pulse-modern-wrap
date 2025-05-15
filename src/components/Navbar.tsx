import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const navbarHeight = 80; // Approximate height of the navbar
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const navigationItems = [
    { name: 'Hem', id: 'hero' },
    { name: 'Om Oss', id: 'about' },
    { name: 'Tjänster', id: 'services' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Kontakt', id: 'contact' }
  ];

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          isScrolled ? "bg-black/80 backdrop-blur-sm" : "bg-transparent"
        )}
      >
        <div className="container-wide flex justify-between items-center py-4">
          <div className="text-xl md:text-2xl font-poppins font-extrabold tracking-tight">
            ELIAS FOLIERING
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden text-white relative z-30"
            onClick={() => setIsOpen(true)}
            aria-label="Öppna meny"
          >
            <Menu size={24} />
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
      </nav>

      {/* Mobile Menu - Now using Portal */}
      <MobileMenu 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigationItems={navigationItems}
        onNavigate={scrollToSection}
      />
    </>
  );
};

export default Navbar;
