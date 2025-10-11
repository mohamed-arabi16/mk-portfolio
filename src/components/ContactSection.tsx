import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "./LanguageProvider";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function ContactSection() {
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof contactFormSchema>) => {
    try {
      // Simulate form submission - replace with actual API call
      console.log('Form submitted:', values);
      
      // Show success toast
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      
      // Reset form
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again or contact me directly via WhatsApp.",
        variant: "destructive",
      });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/905380130948?text=Hello%20Mohamed%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20you.', '_blank');
  };


  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <GlassPanel className="p-8">
            <h3 className="text-2xl font-bold mb-6">{t('button.startProject')}</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.name')}</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder={t('contact.namePlaceholder')} 
                          className="bg-background/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.emailLabel')}</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder={t('contact.emailPlaceholder')} 
                          className="bg-background/50"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projectType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background/50">
                            <SelectValue placeholder="Select a project type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="app-mvp">App MVP Sprint</SelectItem>
                          <SelectItem value="content-growth">Content Growth 30-Day</SelectItem>
                          <SelectItem value="hybrid-launch">Hybrid Launch</SelectItem>
                          <SelectItem value="qobouli">Qobouli Student Registration</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('contact.messageLabel')}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('contact.messagePlaceholder')}
                          className="bg-background/50 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full btn-liquid btn-accent text-lg py-3"
                  disabled={form.formState.isSubmitting}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  {form.formState.isSubmitting ? "Sending..." : t('contact.send')}
                </Button>
              </form>
            </Form>
          </GlassPanel>

          {/* Contact Info & Alternative */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <GlassPanel className="p-8">
              <h3 className="text-2xl font-bold mb-6">{t('contact.quickContact')}</h3>
              
              <div className="space-y-4">
                <Button 
                  onClick={handleWhatsApp}
                  variant="outline" 
                  className="w-full justify-start btn-liquid text-lg py-6"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  {t('contact.whatsapp')}
                </Button>
                
                <a 
                  href="mailto:mohamed.arabi16@icloud.com?subject=Project Inquiry&body=Hello Mohamed, I would like to discuss a project with you."
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors w-full"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">{t('contact.email')}</span>
                </a>
                
                <a 
                  href="tel:+905380130948"
                  className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors w-full cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-muted-foreground">{t('contact.phone')}</span>
                </a>
              </div>
            </GlassPanel>

            {/* Response Time */}
            <GlassPanel className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">24h</div>
              <div className="text-muted-foreground">Average Response Time</div>
            </GlassPanel>

            {/* Availability */}
            <GlassPanel className="p-6">
              <h4 className="font-semibold mb-3">Current Availability</h4>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Available for new projects</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Next availability: Immediate start possible
              </p>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}