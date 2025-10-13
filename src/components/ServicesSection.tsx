import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./LanguageProvider";
import { Code, Calendar, ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

export function ServicesSection() {
  const { t } = useLanguage();
  const { session } = useAuth();
  const { localize } = useLocalizedContent();
  
  const { data: services, isLoading } = useQuery({
    queryKey: ['services_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
    enabled: true,
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
            {t('services.myServices').split(' ')[0]} <span className="text-accent">{t('services.myServices').split(' ').slice(1).join(' ')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('services.subtitle')}
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
              const IconComponent = (LucideIcons as any)[service.icon || 'Code'] || Code;
              const { language } = useLanguage();
              const features = language === 'ar' ? service.features_ar || [] : service.features_en || [];
              
              return (
                <GlassPanel key={service.id} interactive className="p-8 group">
                  <div className="mb-6 text-start">
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
                  <div className="mb-6 space-y-2 text-start">
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
          <h3 className="text-2xl font-bold mb-4">{t('services.transparencyTitle')}</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            {t('services.transparencyDesc')}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              {t('services.transparentProcess')}
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              {t('services.regularUpdates')}
            </Badge>
            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
              {t('services.ethicalPractices')}
            </Badge>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}