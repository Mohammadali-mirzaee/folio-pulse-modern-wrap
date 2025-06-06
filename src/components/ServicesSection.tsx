
import { useRef, useEffect, useState } from "react";
import { PaintRoller, Droplet, Film, Wrench, Palette, Sun, ArrowRight } from "lucide-react";

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  highlight?: string;
};

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services: Service[] = [
    {
      icon: Wrench,
      title: "Bilfoliering",
      description: "Premium vinylfoliering för att förnya din bils utseende med professionell kvalitet.",
      features: ["3M & Avery Dennison material", "5-7 års garanti", "Professionell applicering"],
      highlight: "Populärast"
    },
    {
      icon: PaintRoller,
      title: "Chrome Delete",
      description: "Omvandla blanka kromdetaljer till elegant matt eller svart finish för ett modernt utseende.",
      features: ["Matt svart finish", "Satin finish tillgänglig", "Reversibel process"],
    },
    {
      icon: Droplet,
      title: "Solfilm",
      description: "UV-skydd och värmereducering med högkvalitativ fönsterfilm för komfort och stil.",
      features: ["99% UV-skydd", "Värmereducering", "Olika tintgrader"],
    },
    {
      icon: Film,
      title: "PPF (Skyddsfilm)",
      description: "Osynligt skydd mot stenslag, repor och vägsmuts med självläkande teknologi.",
      features: ["Självläkande film", "10 års garanti", "Kristallklar finish"],
      highlight: "Premium"
    },
    {
      icon: Sun,
      title: "Ljustoning",
      description: "Anpassad toning av strålkastare för ett unikt och aggressivt utseende.",
      features: ["Anpassade färger", "Laglig toning", "Professionell applicering"],
    },
    {
      icon: Palette,
      title: "Styling",
      description: "Skräddarsydda designlösningar för att framhäva din bils unika karaktär.",
      features: ["Unik design", "Konsultation inkluderad", "Totalpaket tillgängligt"],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal-service");
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
    <section id="services" ref={sectionRef} className="section-padded bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center mb-20 opacity-0 reveal-service">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            VÅRA TJÄNSTER
          </div>
          <h2 className="text-5xl md:text-6xl font-poppins font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Premium Bilstyling
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Professionella stylingtjänster som förvandlar din bil till ett unikt konstverk
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative opacity-0 reveal-service"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {/* Highlight Badge */}
              {service.highlight && (
                <div className="absolute -top-3 -right-3 z-20 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {service.highlight}
                </div>
              )}
              
              {/* Card */}
              <div className="relative h-full bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 group-hover:border-cyan-500/50 group-hover:shadow-2xl group-hover:shadow-cyan-500/10 group-hover:-translate-y-2">
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <service.icon 
                        size={32} 
                        className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" 
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-poppins font-bold text-white mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-sm">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></div>
                        <span className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <button className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors duration-300">
                      <span>Läs mer</span>
                      <ArrowRight 
                        size={16} 
                        className="group-hover:translate-x-1 transition-transform duration-300" 
                      />
                    </button>
                    
                    <div className="text-xs text-white/40 group-hover:text-white/60 transition-colors duration-300">
                      Kontakta oss
                    </div>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 opacity-0 reveal-service" style={{ animationDelay: "800ms" }}>
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full px-8 py-4">
            <span className="text-white font-medium">Behöver du rådgivning?</span>
            <button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2">
              Kontakta oss
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
