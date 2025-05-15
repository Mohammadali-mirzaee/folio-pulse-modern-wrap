import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { throttle } from "lodash";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        // Use transform3d for hardware acceleration
        parallaxRef.current.style.transform = `translate3d(0, ${scrollPosition * 0.3}px, 0)`;
      }
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    setIsLoaded(true);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel(); // Clean up throttled function
    };
  }, [handleScroll]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const navbarHeight = 80; // Approximate height of the navbar
      const elementPosition = contactSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden will-change-transform"
    >
      {/* Background Image with Parallax */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="/lovable-uploads/hero.jpg"
          alt="Stilfull bilsilhuett"
          className="w-full h-full object-cover object-center animate-fade-in"
          style={{ 
            zIndex: 0,
            transform: 'translate3d(0, 0, 0)', // Force hardware acceleration
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-charcoal z-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full justify-center items-center px-4 text-center">
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-poppins font-extrabold tracking-tight mb-4 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          Elias Foliering
        </h1>
        <p
          className={`text-xl md:text-2xl font-light mb-8 text-white/90 ${
            isLoaded
              ? "opacity-100 translate-y-0 delay-300"
              : "opacity-0 translate-y-10"
          } transition-all duration-1000 ease-out`}
        >
          Bilstyling. Precision. Passion.
        </p>

        <Button 
          onClick={scrollToContact}
          size="lg"
          className="bg-white text-black hover:bg-white/90 transition-all duration-300 text-base font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          Kontakta Oss
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <ArrowDown size={24} className="text-white/70" />
      </div>
    </section>
  );
};

export default HeroSection;
