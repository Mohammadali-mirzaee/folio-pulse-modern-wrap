import { useRef, useEffect, useState } from "react";
import { PaintRoller, Droplet, Film, Wrench, Palette, Sun, ArrowRight, Star, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ServiceDialog, { ServiceData } from "./ServiceDialog";

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
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const services: ServiceData[] = [
    {
      icon: Wrench,
      title: "Bilfoliering",
      description: "Premium vinylfoliering för att förnya din bils utseende med professionell kvalitet.",
      detailedDescription: "Vår bilfoliering är den ultimata lösningen för att ge din bil ett helt nytt utseende utan att skada originallacken. Vi använder endast högkvalitativa material från ledande tillverkare som 3M och Avery Dennison. Processen är fullständigt reversibel och skyddar samtidigt din bils lack från stenar, repor och UV-strålning.",
      images: ["/lovable-uploads/hero.jpg", "/lovable-uploads/hero2.png"],
      processSteps: [
        "Konsultation och designförslag",
        "Bil förberedelse och rengöring",
        "Precisionsmätning och mall-skapande",
        "Professionell applicering",
        "Kvalitetskontroll och finish",
        "Slutlig inspektion och leverans"
      ],
      warranty: "5-7 år",
      rating: 4.9,
      completedJobs: 450,
      materials: ["3M 1080", "Avery Supreme", "KPMF", "Hexis"],
      highlights: ["Reversibel process", "Skyddar originallacken", "UV-beständigt", "Professionell garanti"]
    },
    {
      icon: PaintRoller,
      title: "Chrome Delete",
      description: "Omvandla blanka kromdetaljer till elegant matt eller svart finish för ett modernt utseende.",
      detailedDescription: "Chrome Delete är den perfekta tjänsten för att modernisera din bils utseende. Vi täcker alla blanka kromdetaljer med högkvalitativ vinylfolie i matt svart, satin eller andra finish. Detta ger din bil ett mer sammanhängande och modernt utseende samtidigt som de ursprungliga delarna skyddas.",
      images: ["/lovable-uploads/hero.jpg"],
      processSteps: [
        "Identifiering av alla kromdetaljer",
        "Noggrann rengöring och avfettning",
        "Precisionsskärning av material",
        "Expertapplicering",
        "Kantförsegling",
        "Kvalitetskontroll"
      ],
      warranty: "3-5 år",
      rating: 4.8,
      completedJobs: 320,
      materials: ["3M 2080", "Avery Matte", "KPMF Satin"],
      highlights: ["Moderniserar utseendet", "Skyddar kromdetaljer", "Flera finish-alternativ", "Snabb installation"]
    },
    {
      icon: Droplet,
      title: "Solfilm",
      description: "UV-skydd och värmereducering med högkvalitativ fönsterfilm för komfort och stil.",
      detailedDescription: "Vår professionella solfilm ger dig både komfort och stil. Med upp till 99% UV-skydd och betydande värmereducering förbättras både körkomforten och bilens energieffektivitet. Vi erbjuder olika tintgrader för att matcha dina preferenser och lokala regleringar.",
      images: ["/lovable-uploads/hero2.png"],
      processSteps: [
        "Mätning och materialval",
        "Noggrann rutordning",
        "Precisionsskärning",
        "Våtapplicering",
        "Luftborttagning",
        "Torknings- och härdningsprocess"
      ],
      warranty: "5-10 år",
      rating: 4.7,
      completedJobs: 280,
      materials: ["3M Ceramic", "LLumar CTX", "SunTek CXP"],
      highlights: ["99% UV-skydd", "Värmereducering", "Ökad integritet", "Energibesparing"]
    },
    {
      icon: Film,
      title: "PPF (Skyddsfilm)",
      description: "Osynligt skydd mot stenslag, repor och vägsmuts med självläkande teknologi.",
      detailedDescription: "Paint Protection Film (PPF) är den ultimata lösningen för att skydda din bils lack. Vår självläkande film är praktiskt taget osynlig och skyddar mot stenslag, repor, fågelspillning och andra miljöpåverkan. Filmen har självläkande egenskaper som gör att mindre repor försvinner med värme.",
      images: ["/lovable-uploads/hero.jpg", "/lovable-uploads/hero2.png"],
      processSteps: [
        "Detaljerad bilpreparation",
        "Datorstyrd skärning",
        "Professionell applicering",
        "Kantförsegling",
        "Härdningsprocess",
        "Slutlig kvalitetskontroll"
      ],
      warranty: "7-12 år",
      rating: 4.9,
      completedJobs: 180,
      materials: ["XPEL Ultimate Plus", "3M Pro Series", "SunTek Ultra"],
      highlights: ["Självläkande teknologi", "Osynligt skydd", "Bevarar återförsäljningsvärde", "Hydrofobisk yta"]
    },
    {
      icon: Sun,
      title: "Ljustoning",
      description: "Anpassad toning av strålkastare för ett unikt och aggressivt utseende.",
      detailedDescription: "Vår ljustoning ger din bil en unik och aggressiv look samtidigt som ljusutgången bibehålls inom lagliga gränser. Vi använder specialfilm som tåler värme och väder. Tjänsten inkluderar både fram- och bakljus enligt dina önskemål.",
      images: ["/lovable-uploads/hero.jpg"],
      processSteps: [
        "Demontage av ljusenheter",
        "Grundlig rengöring",
        "Materialval och skärning",
        "Precisionapplicering",
        "Monterig och test",
        "Ljuskontroll"
      ],
      warranty: "2-5 år",
      rating: 4.6,
      completedJobs: 220,
      materials: ["3M Scotchcal", "Avery Supreme", "ORACAL 970"],
      highlights: ["Laglig toning", "Värmbeständigt", "Unik look", "Professionell applicering"]
    },
    {
      icon: Palette,
      title: "Styling",
      description: "Skräddarsydda designlösningar för att framhäva din bils unika karaktär.",
      detailedDescription: "Vårt stylingteam skapar skräddarsydda lösningar för att göra din bil helt unik. Från subtila accenter till dramatiska transformationer - vi arbetar med dig för att skapa något som verkligen speglar din personlighet och stil.",
      images: ["/lovable-uploads/hero2.png"],
      processSteps: [
        "Designkonsultation",
        "Konceptutveckling",
        "Materialval",
        "Prototyping",
        "Implementering",
        "Finalizing och leverans"
      ],
      warranty: "3-7 år",
      rating: 4.8,
      completedJobs: 95,
      materials: ["Alla premium märken", "Specialmaterial", "Anpassade lösningar"],
      highlights: ["Helt anpassat", "Unik design", "Professionell konsultation", "Show-quality results"]
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

  const handleServiceClick = (service: ServiceData) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  return (
    <>
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
                className="group relative opacity-0 reveal-service cursor-pointer"
                style={{
                  animationDelay: `${index * 150}ms`,
                }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => handleServiceClick(service)}
              >
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

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="text-yellow-400" size={14} />
                        <span className="text-white/80 text-sm">{service.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="text-green-400" size={14} />
                        <span className="text-white/80 text-sm">{service.warranty}</span>
                      </div>
                      <div className="text-cyan-400 text-sm font-medium">{service.completedJobs}+ projekt</div>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                      {service.description}
                    </p>

                    {/* Action Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 hover:from-cyan-500 hover:to-blue-500 hover:text-white transition-all duration-300"
                      variant="outline"
                    >
                      <span>Läs mer & boka</span>
                      <ArrowRight 
                        size={16} 
                        className="group-hover:translate-x-1 transition-transform duration-300" 
                      />
                    </Button>
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
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 flex items-center gap-2">
                Kontakta oss
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Dialog */}
      <ServiceDialog 
        service={selectedService}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default ServicesSection;
