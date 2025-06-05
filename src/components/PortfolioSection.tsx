import { useRef, useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import type { CarouselApi } from "@/components/ui/carousel";

const portfolioItems = [
  {
    id: 1,
    title: "Matt Svart Foliering",
    description: "Elegant matt svart vinyl som ger bilen ett sofistikerat utseende.",
    imageUrl:
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
    detailedImages: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1200&q=80"
    ],
    detailedDescription: "Komplett transformation med premium matt svart vinyl. Projektet inkluderade full wrapping av karossen, chrome delete på alla detaljer och PPF-skydd på utsatta områden. Resultatet är en elegant och tidlös look som framhäver bilens linjer perfekt.",
    specifications: "Material: 3M 1080 Matt Svart, Skydd: PPF på framkant, Finish: Satin Matt"
  },
  {
    id: 2,
    title: "Blank Vit Transformation",
    description: "Skimrande vit premium vinyl med högglansig finish.",
    imageUrl:
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    detailedImages: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1621991857185-c7e1dd4537a0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588453251771-cd3210b8331e?auto=format&fit=crop&w=1200&q=80"
    ],
    detailedDescription: "Professionell högglans vit wrapping som ger bilen en ren och modern look. Detaljerat arbete kring alla kurvor och kanter för perfekt finish. Inklusive fönstertoning och detaljarbete på interiör.",
    specifications: "Material: Avery Dennison Gloss White, Toning: 35% fram, 20% bak, Garanti: 7 år"
  },
  {
    id: 3,
    title: "Chrome Delete Paket",
    description: "Komplett omvandling av kromlister till elegant matt svart.",
    imageUrl:
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
    detailedImages: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567449303078-57ad995bd4c7?auto=format&fit=crop&w=1200&q=80"
    ],
    detailedDescription: "Selektiv wrapping av alla kromdetaljer för en modern och sammanhållen look. Arbetet inkluderar grill, fönsterramar, dörrhandtag och alla exteriöra kromacenter.",
    specifications: "Material: 3M Matt Svart, Områden: Grill, ramar, handtag, Tid: 1 dag"
  },
  {
    id: 4,
    title: "Högpresterande Fönsterfilm",
    description: "Värme- och UV-avvisande solfilm med modern estetik.",
    imageUrl:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    detailedImages: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1572306091533-230fd2350269?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1596843671751-dcf75c6ddaa1?auto=format&fit=crop&w=1200&q=80"
    ],
    detailedDescription: "Premium keramisk fönsterfilm som blockerar 99% av UV-strålning och reducerar värme med upp till 60%. Perfekt klarhet och ingen signalinterferens med elektroniska enheter.",
    specifications: "Film: 3M Ceramic IR, UV-skydd: 99%, Värmereflektion: 60%, Garanti: Livstid"
  },
  {
    id: 5,
    title: "Satin PPF Installation",
    description: "Transparent skyddsfilm med självläkande egenskaper.",
    imageUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    detailedImages: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1200&q=80"
    ],
    detailedDescription: "Full front PPF-installation med självläkande topcoat. Skyddar mot stenslag, repor och miljöpåverkan medan den behåller originalfärgens utseende. Osynlig när den är applicerad.",
    specifications: "Film: XPEL Ultimate Plus, Täckning: Full front, Självläkning: Ja, Garanti: 10 år"
  },
  {
    id: 6,
    title: "Anpassad Design",
    description: "Skräddarsydda designlösningar för att framhäva din bils personlighet.",
    imageUrl:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    detailedImages: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80"
    ],
    detailedDescription: "Unik designlösning med kombinerade material och färger. Projektet inkluderade custom graphics, selektiv wrapping och specialbeställda detaljer för en helt personlig touch.",
    specifications: "Design: Custom, Material: Flera typer, Komplexitet: Hög, Tid: 3-5 dagar"
  },
];

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [dialogImageIndex, setDialogImageIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const openDialog = (item: typeof portfolioItems[0]) => {
    setSelectedItem(item);
    setDialogImageIndex(0);
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setDialogImageIndex(0);
  };

  const nextDialogImage = () => {
    if (selectedItem && dialogImageIndex < selectedItem.detailedImages.length - 1) {
      setDialogImageIndex(dialogImageIndex + 1);
    }
  };

  const prevDialogImage = () => {
    if (dialogImageIndex > 0) {
      setDialogImageIndex(dialogImageIndex - 1);
    }
  };

  const renderPortfolioItem = (item: typeof portfolioItems[0], index: number) => (
    <div
      className={`group relative overflow-hidden rounded-lg cursor-pointer h-80 sm:h-96 transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => openDialog(item)}
    >
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/80 group-hover:from-black/30 group-hover:via-black/40 group-hover:to-black/90 transition-colors duration-500 z-10"></div>
      
      {/* Portfolio Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          hoveredItem === item.id ? 'scale-110 filter brightness-90' : 'scale-100'
        }`}
      />
      
      {/* Content */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-500 ${
        hoveredItem === item.id ? 'translate-y-0' : 'translate-y-2'
      }`}>
        <h3 className="text-lg font-poppins font-semibold mb-1">
          {item.title}
        </h3>
        <p className={`text-sm text-white/70 transition-all duration-500 ${
          hoveredItem === item.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          {item.description}
        </p>
        <p className="text-xs text-accent mt-2 opacity-80">Klicka för detaljer</p>
      </div>
      
      {/* Hover Effect Accent Line */}
      <div className={`absolute bottom-0 left-0 w-0 h-1 bg-accent z-20 transition-all duration-300 ${
        hoveredItem === item.id ? 'w-full' : 'w-0'
      }`}></div>
    </div>
  );

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="section-padded bg-black py-32"
      >
        <div className="container-wide">
          <h2 className={`text-4xl md:text-5xl font-poppins font-bold text-center mb-20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Våra Projekt
          </h2>

          {isMobile ? (
            <div className="space-y-6">
              <Carousel className="w-full" setApi={setApi}>
                <CarouselContent className="-ml-2 md:-ml-4">
                  {portfolioItems.map((item, index) => (
                    <CarouselItem key={item.id} className="pl-2 md:pl-4">
                      {renderPortfolioItem(item, index)}
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              {/* Dots Navigation */}
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: count }, (_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index + 1 === current ? 'bg-accent' : 'bg-white/30'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item, index) => (
                <div key={item.id}>
                  {renderPortfolioItem(item, index)}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Detail Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={closeDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-gray-800">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-poppins font-bold text-white mb-4">
                  {selectedItem.title}
                </DialogTitle>
              </DialogHeader>
              
              {/* Image Gallery */}
              <div className="relative mb-6">
                <img
                  src={selectedItem.detailedImages[dialogImageIndex]}
                  alt={`${selectedItem.title} - Image ${dialogImageIndex + 1}`}
                  className="w-full h-64 sm:h-96 object-cover rounded-lg"
                />
                
                {/* Image Navigation */}
                {selectedItem.detailedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevDialogImage}
                      disabled={dialogImageIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextDialogImage}
                      disabled={dialogImageIndex === selectedItem.detailedImages.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all"
                    >
                      →
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {dialogImageIndex + 1} / {selectedItem.detailedImages.length}
                </div>
              </div>
              
              {/* Project Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Projektbeskrivning</h3>
                  <p className="text-white/80 leading-relaxed">{selectedItem.detailedDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Specifikationer</h3>
                  <p className="text-white/70">{selectedItem.specifications}</p>
                </div>
              </div>
              
              {/* Image Thumbnails */}
              {selectedItem.detailedImages.length > 1 && (
                <div className="flex gap-2 mt-6 overflow-x-auto">
                  {selectedItem.detailedImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setDialogImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        index === dialogImageIndex ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PortfolioSection;
