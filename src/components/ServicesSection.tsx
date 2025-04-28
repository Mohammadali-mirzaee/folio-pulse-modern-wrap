
import { useRef, useEffect } from 'react';
import { PaintRoller, Droplet, Film, Wrench, Palette, Sun } from 'lucide-react';

type Service = {
  icon: React.ElementType;
  title: string;
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const services: Service[] = [
    { icon: Wrench, title: "Car Wrapping (Foliering)" },
    { icon: PaintRoller, title: "Chrome Delete" },
    { icon: Droplet, title: "Solfilm (Window Tinting)" },
    { icon: Film, title: "PPF (Paint Protection Film)" },
    { icon: Sun, title: "Light Tinting" },
    { icon: Palette, title: "Styling" },
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-up');
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px' 
      }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => {
      observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padded bg-black">
      <div className="container-wide">
        <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16 opacity-0 reveal">
          Services
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center opacity-0 reveal"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-accent/10 p-6 rounded-full mb-6">
                <service.icon size={36} className="text-accent" />
              </div>
              <h3 className="text-xl md:text-2xl font-poppins font-semibold text-center">
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
