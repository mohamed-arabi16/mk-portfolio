import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./LanguageProvider";
import { Code, Video, GraduationCap, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

const iconMap: Record<string, any> = {
  Code,
  Video,
  GraduationCap,
};

export function ServicesSection() {
  const { t } = useLanguage();
  const { session } = useAuth();
  const { localize } = useLocalizedContent();
  
  const { data: services, isLoading } = useQuery({
    queryKey: ['services', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', session?.user?.id || '')
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
    enabled: !!session?.user?.id,
  });
  
  const scrollToSection = (href: string) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-20 px-6 bg-gradient-to-b from-warm-gray/20 to-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            My <span className="text-accent">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From building web applications to creating viral content and helping students 
            achieve their academic dreams - I offer comprehensive digital solutions.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          ) : services && services.length > 0 ? (
            services.map((service) => {
              const IconComponent = iconMap[service.icon || 'Code'] || Code;
              const features = service.features_en || [];
              
              return (
                <GlassPanel key={service.id} interactive className="p-8 group">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {localize(service, 'title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {localize(service, 'description')}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Pricing & Timeline */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-accent">
                        {localize(service, 'price')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{localize(service, 'timeline')}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button 
                    onClick={() => scrollToSection(service.cta_link || '#contact')}
                    className="w-full btn-liquid btn-accent group-hover:scale-105"
                  >
                    {localize(service, 'cta_text')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </GlassPanel>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-muted-foreground">No services yet. Add some in the admin panel!</p>
            </div>
          )}
        </div>

        {/* Collaboration Notice */}
        <GlassPanel className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Work With Transparency</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            I believe in ethical work practices and complete transparency. Every project 
            includes regular updates, clear communication, and honest collaboration. 
            I work closely with my wife on many projects, bringing diverse perspectives to every solution.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              100% Transparent Process
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Regular Updates
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              Ethical Practices
            </Badge>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}