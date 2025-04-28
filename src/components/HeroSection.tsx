import { useState, useEffect } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-charcoal z-10"></div>
        <div className="absolute inset-0 bg-charcoal bg-opacity-90"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1619417602952-f8b56d608c9e?auto=format&fit=crop&w=2000&q=80')`,
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-center items-center px-4 text-center">
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-poppins font-extrabold tracking-tight mb-4 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}
        >
          Elias Foliering
        </h1>
        <p 
          className={`text-xl md:text-2xl font-light mb-8 text-white/90 ${isLoaded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-10'} transition-all duration-1000 ease-out`}
        >
          Vehicle Styling. Precision. Passion.
        </p>
        <button 
          onClick={scrollToContact}
          className={`bg-accent hover:bg-accent/80 text-white py-3 px-6 rounded-full transition-all duration-300 flex items-center font-medium ${isLoaded ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-10'}`}
        >
          Get in Touch
        </button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown size={24} className="text-white/70" />
      </div>
    </section>
  );
};

export default HeroSection;
