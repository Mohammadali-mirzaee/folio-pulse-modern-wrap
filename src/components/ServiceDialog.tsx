
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Clock, Shield, CheckCircle, ArrowRight, Calendar, MessageCircle } from "lucide-react";

export type ServicePackage = {
  name: string;
  price: string;
  duration: string;
  features: string[];
  popular?: boolean;
};

export type ServiceData = {
  icon: React.ElementType;
  title: string;
  description: string;
  detailedDescription: string;
  images: string[];
  packages: ServicePackage[];
  processSteps: string[];
  warranty: string;
  rating: number;
  completedJobs: number;
  materials: string[];
  highlights: string[];
};

type ServiceDialogProps = {
  service: ServiceData | null;
  isOpen: boolean;
  onClose: () => void;
};

const ServiceDialog = ({ service, isOpen, onClose }: ServiceDialogProps) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-black border-white/10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-white flex items-center gap-3">
            <service.icon className="text-cyan-400" size={32} />
            {service.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-8">
          {/* Hero Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="text-yellow-400" size={16} />
                  <span className="text-white font-bold">{service.rating}</span>
                </div>
                <p className="text-white/60 text-sm">Kundbetyg</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-cyan-400 font-bold text-lg mb-2">{service.completedJobs}+</div>
                <p className="text-white/60 text-sm">Slutförda projekt</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Shield className="text-green-400" size={16} />
                  <span className="text-white font-bold">{service.warranty}</span>
                </div>
                <p className="text-white/60 text-sm">Garanti</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Om tjänsten</h3>
            <p className="text-white/80 leading-relaxed">{service.detailedDescription}</p>
          </div>

          {/* Image Gallery */}
          {service.images.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Tidigare arbeten</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {service.images.map((image, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card className="bg-white/5 border-white/10 overflow-hidden">
                          <CardContent className="p-0">
                            <img 
                              src={image} 
                              alt={`${service.title} exempel ${index + 1}`}
                              className="w-full h-48 object-cover"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>
          )}

          {/* Service Packages */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Paket & Priser</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {service.packages.map((pkg, index) => (
                <Card key={index} className={`relative ${pkg.popular ? 'border-cyan-500 bg-cyan-500/10' : 'bg-white/5 border-white/10'}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-2 left-4 bg-cyan-500 text-white">
                      Populärast
                    </Badge>
                  )}
                  <CardContent className="p-6">
                    <h4 className="text-lg font-bold text-white mb-2">{pkg.name}</h4>
                    <div className="text-2xl font-bold text-cyan-400 mb-2">{pkg.price}</div>
                    <div className="flex items-center gap-2 text-white/60 mb-4">
                      <Clock size={16} />
                      <span>{pkg.duration}</span>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm text-white/80">
                          <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Steps */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Vår process</h3>
            <div className="space-y-3">
              {service.processSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-white/80">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Materials & Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Material & Märken</h3>
              <div className="flex flex-wrap gap-2">
                {service.materials.map((material, index) => (
                  <Badge key={index} variant="outline" className="border-cyan-500/50 text-cyan-400">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-3">Fördelar</h3>
              <ul className="space-y-1">
                {service.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/80">
                    <CheckCircle size={16} className="text-green-400" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-white/10">
            <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Calendar className="mr-2" size={16} />
              Boka tid
            </Button>
            <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
              <MessageCircle className="mr-2" size={16} />
              Få offert
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
