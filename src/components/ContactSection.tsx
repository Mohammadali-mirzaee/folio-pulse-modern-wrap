import { useState, FormEvent } from 'react';
import { Instagram, Send, MessageSquare, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Namn måste vara minst 2 tecken.' }),
  email: z.string().email({ message: 'Ange en giltig e-postadress.' }),
  message: z.string().min(10, { message: 'Meddelande måste vara minst 10 tecken.' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Replace these values with your actual EmailJS credentials
      const serviceId = 'YOUR_EMAILJS_SERVICE_ID'; // User needs to enter their EmailJS Service ID
      const templateId = 'YOUR_EMAILJS_TEMPLATE_ID'; // User needs to enter their EmailJS Template ID
      const userId = 'YOUR_EMAILJS_USER_ID'; // User needs to enter their EmailJS User ID
      
      const templateParams = {
        from_name: values.name,
        from_email: values.email,
        message: values.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, userId);
      
      toast.success('Tack för ditt meddelande! Vi återkommer så snart som möjligt.');
      form.reset();
    } catch (error) {
      console.error('Failed to send email:', error);
      toast.error('Det gick inte att skicka meddelandet. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padded bg-black">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16">
            Kontakta Oss
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-charcoal/50 p-8 rounded-lg">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/80">Namn</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-black/50 px-4 py-3 rounded border border-white/10 focus:outline-none focus:border-accent text-white"
                            placeholder="Ditt namn"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/80">E-post</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="bg-black/50 px-4 py-3 rounded border border-white/10 focus:outline-none focus:border-accent text-white"
                            placeholder="din@epost.se"
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white/80">Meddelande</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            rows={5}
                            className="bg-black/50 px-4 py-3 rounded border border-white/10 focus:outline-none focus:border-accent text-white resize-none"
                            placeholder="Ditt meddelande..."
                            disabled={isSubmitting}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="bg-white text-charcoal py-3 px-6 w-full rounded-[4px] transition-all duration-300 flex items-center justify-center font-medium hover:bg-white/90 h-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="mr-2 animate-spin" /> Skickar...
                      </>
                    ) : (
                      <>
                        <Send size={18} className="mr-2" /> Skicka Meddelande
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <div className="space-y-8">
                <h3 className="text-2xl font-poppins font-semibold mb-4">
                  Följ Oss
                </h3>
                
                <div className="flex items-center space-x-6">
                  <a 
                    href="https://instagram.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 group"
                  >
                    <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                      <Instagram size={24} className="text-accent" />
                    </div>
                    <span className="text-white/80 group-hover:text-accent transition-colors">@eliasfoliering</span>
                  </a>
                </div>
                
                <div className="flex items-center space-x-6">
                  <a 
                    href="https://tiktok.com/@eliasfoliering" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 group"
                  >
                    <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="text-accent"
                      >
                        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                      </svg>
                    </div>
                    <span className="text-white/80 group-hover:text-accent transition-colors">@eliasfoliering</span>
                  </a>
                </div>
                
                <div className="flex items-center space-x-6">
                  <a 
                    href="https://wa.me/46123456789" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 group"
                  >
                    <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                      <MessageSquare size={24} className="text-accent" />
                    </div>
                    <span className="text-white/80 group-hover:text-accent transition-colors">WhatsApp Oss</span>
                  </a>
                </div>
                
                <p className="text-white/60 mt-8">
                  Baserad i Göteborg, Sverige. Vi servar fordon i hela regionen och erbjuder premium stylinglösningar direkt till din plats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
