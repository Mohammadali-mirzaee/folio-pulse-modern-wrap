
import { useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

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

    // Scroll animation for text elements
    const handleScroll = () => {
      if (textRef.current && sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const offsetTop = rect.top + scrollTop;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > offsetTop - window.innerHeight / 1.5) {
          const opacity = Math.min(1, (scrollPosition - (offsetTop - window.innerHeight / 1.5)) / 400);
          textRef.current.style.opacity = opacity.toString();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      elements.forEach((el) => {
        observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section bg-charcoal py-24">
      <div className="container-wide max-w-5xl">
        <div ref={textRef} className="opacity-0 reveal space-y-12">
          {/* Strong opening statement */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-extrabold mb-6">
              <span className="relative inline-block text-accent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-accent/50 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-500 cursor-default">Perfektion</span> i Varje Detalj
            </h2>
            <p className="text-lg md:text-xl font-light text-white/80 mb-8 transition-all duration-500 hover:text-white max-w-3xl mx-auto">
              Vi förvandlar fordon genom överlägsen foliering, detaljering och styling – med hantverksskicklighet som sätter ny standard i Göteborg.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="reveal bg-black/20 p-8 rounded-lg hover:bg-black/30 transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4 text-accent">Vår Historia</h3>
            <p className="text-white/80 mb-4">
              Det började med en passion för bilar och en övertygelse om att fordon förtjänar det bästa. Grundad av entusiaster med teknisk expertis, har Elias Foliering vuxit från en liten studio till en respekterad aktör inom premiumstyling i Göteborg. Varje projekt vi åtar oss är resultatet av år av förfining av vår konst.
            </p>
          </div>
          
          {/* What We Do */}
          <div className="reveal bg-black/20 p-8 rounded-lg hover:bg-black/30 transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4 text-accent">Vad Vi Gör</h3>
            <p className="text-white/80 mb-4">
              Vi specialiserar oss på premiumtjänster inom bilstyling – från fullständig fordonsfoliering och färgbyten till exklusiv detaljering och lackskydd. Vårt arbete handlar inte bara om utseende – det är om att förhöja din bils karaktär och skydda din investering med precisionsteknik och handplockade material.
            </p>
          </div>
          
          {/* Why Us */}
          <div className="reveal bg-black/20 p-8 rounded-lg hover:bg-black/30 transition-all duration-300">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold mb-4 text-accent">Varför Välja Oss</h3>
            <p className="text-white/80 mb-4">
              Det som skiljer oss från mängden är vår kompromisslösa uppmärksamhet på detaljer och vårt engagemang för långsiktiga resultat. Vi arbetar endast med de finaste produkterna på marknaden, och varje projekt genomgår en rigorös kvalitetskontroll. Vi ser inte kunder – vi ser samarbetspartners i vår strävan efter perfektion.
            </p>
          </div>
          
          {/* Quote/Mission */}
          <div className="reveal text-center my-12 max-w-3xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-poppins italic text-white relative">
              <span className="absolute -left-4 -top-4 text-4xl text-accent opacity-50">"</span>
              Vi transformerar inte bara fordon – vi skapar konstverk på hjul, ett fordon i taget.
              <span className="absolute -right-4 bottom-0 text-4xl text-accent opacity-50">"</span>
            </blockquote>
            <p className="text-accent mt-4 font-medium">— Elias, Grundare</p>
          </div>
          
          {/* Call to Action */}
          <div className="reveal text-center mt-16">
            <Button 
              className="bg-accent hover:bg-accent/80 text-white font-medium py-3 px-8 rounded-md text-lg transition-all duration-300 group"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Låt oss samarbeta
              <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
