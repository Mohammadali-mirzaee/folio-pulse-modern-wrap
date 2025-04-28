
import { useState, FormEvent } from 'react';
import { Instagram, Send, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.');
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="section-padded bg-black">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-center mb-16">
            Get in Touch
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-charcoal/50 p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-black/50 w-full px-4 py-3 rounded border border-white/10 focus:outline-none focus:border-accent text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-black/50 w-full px-4 py-3 rounded border border-white/10 focus:outline-none focus:border-accent text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-black/50 w-full px-4 py-3 rounded border border-white/10 focus:outline-none focus:border-accent text-white resize-none"
                  ></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="bg-accent hover:bg-accent/80 text-white py-3 px-6 w-full rounded transition-all duration-300 flex items-center justify-center font-medium"
                >
                  <Send size={18} className="mr-2" /> Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="flex flex-col justify-center">
              <div className="space-y-8">
                <h3 className="text-2xl font-poppins font-semibold mb-4">
                  Connect With Us
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
                    href="https://wa.me/46123456789" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 group"
                  >
                    <div className="bg-accent/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                      <MessageSquare size={24} className="text-accent" />
                    </div>
                    <span className="text-white/80 group-hover:text-accent transition-colors">WhatsApp Us</span>
                  </a>
                </div>
                
                <p className="text-white/60 mt-8">
                  Based in Gothenburg, Sweden. We service vehicles throughout the region, bringing premium styling solutions to your location.
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
