import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageProvider";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-bg.jpg";

export function Hero() {
  const { t } = useLanguage();
  const { localize } = useLocalizedContent();
  const { user } = useAuth();

  // Fetch portfolio config (publicly accessible - first user)
  const { data: config } = useQuery({
    queryKey: ['portfolio_config_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_config')
        .select('*')
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });

  // Fetch stats (publicly accessible)
  const { data: stats } = useQuery({
    queryKey: ['stats_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('display_order', { ascending: true })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });

  // Fallback to translation keys if no database data
  const heroTitle1 = config ? localize(config, 'hero_title_1') : t('hero.title1');
  const heroTitle2 = config ? localize(config, 'hero_title_2') : t('hero.title2');
  const heroSubtitle = config ? localize(config, 'hero_subtitle') : t('hero.subtitle');
  const location = config?.location || t('hero.location');
  
  // Handle hero background - support both storage URLs and direct URLs
  const heroBgUrl = config?.hero_bg_url 
    ? (config.hero_bg_url.startsWith('http') || config.hero_bg_url.startsWith('/') 
        ? config.hero_bg_url 
        : `${supabase.storage.from('hero-images').getPublicUrl(config.hero_bg_url).data.publicUrl}`)
    : heroImage;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroBgUrl} 
          alt="Hero background" 
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight animate-fade-in">
            <span className="text-foreground drop-shadow-lg">
              {heroTitle1} {heroTitle2}
            </span>
            <br />
            <span className="text-foreground/70 text-2xl md:text-3xl">{location}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {heroSubtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link to="/projects">
              <Button 
                size="lg" 
                className="btn-liquid btn-accent px-8 py-4 text-lg shadow-lg"
              >
                {t('hero.viewWork')}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <a href={config?.cv_url || "/MohamedKH_CV.pdf"} download>
              <Button 
                size="lg" 
                variant="outline"
                className="btn-liquid px-8 py-4 text-lg shadow-lg"
              >
                <Download className="mr-2 h-5 w-5" />
                {t('button.downloadCV')}
              </Button>
            </a>
          </div>
          
          <Link to="/contact" className="text-sm text-foreground/70 hover:text-accent transition-colors block mb-16">
            {t('hero.connect')} →
          </Link>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats && stats.length > 0 ? (
              stats.slice(0, 3).map((stat) => (
                <GlassPanel key={stat.id} className="hero-stat p-6 text-center animate-fade-in">
                  <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{localize(stat, 'label')}</div>
                </GlassPanel>
              ))
            ) : (
              <>
                <GlassPanel className="hero-stat p-6 text-center animate-fade-in">
                  <div className="text-3xl font-bold text-accent mb-1">{t('hero.statsProjectsValue')}</div>
                  <div className="text-sm text-muted-foreground">{t('hero.statsProjectsLabel')}</div>
                </GlassPanel>
                <GlassPanel className="hero-stat p-6 text-center animate-fade-in">
                  <div className="text-3xl font-bold text-accent mb-1">{t('hero.statsViewsValue')}</div>
                  <div className="text-sm text-muted-foreground">{t('hero.statsViewsLabel')}</div>
                </GlassPanel>
                <GlassPanel className="hero-stat p-6 text-center animate-fade-in">
                  <div className="text-3xl font-bold text-accent mb-1">{t('hero.statsSatisfactionValue')}</div>
                  <div className="text-sm text-muted-foreground">{t('hero.statsSatisfactionLabel')}</div>
                </GlassPanel>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-foreground/50" />
      </div>
    </section>
  );
}
