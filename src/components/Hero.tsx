import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageProvider";
import heroImage from "@/assets/hero-bg.jpg";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Development workspace" 
          className="w-full h-full object-cover blur-[2px]"
        />
        <div className="absolute inset-0 bg-background/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-6 leading-tight animate-fade-in">
            <span className="text-foreground drop-shadow-lg">
              {t('hero.title1')} {t('hero.title2')} {t('hero.title3')}
            </span>
            <br />
            <span className="text-foreground/70 text-2xl md:text-3xl">{t('hero.location')}</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {t('hero.subtitle')}
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
            
            <a href="/MohamedKH_CV.pdf" download>
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
            <GlassPanel className="hero-stat p-6 text-center animate-fade-in">
              <div className="text-3xl font-bold text-accent mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </GlassPanel>
            <GlassPanel className="hero-stat p-6 text-center animate-fade-in">
              <div className="text-3xl font-bold text-accent mb-1">150K+</div>
              <div className="text-sm text-muted-foreground">Content Views</div>
            </GlassPanel>
            <GlassPanel className="hero-stat p-6 text-center animate-fade-in">
              <div className="text-3xl font-bold text-accent mb-1">92%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </GlassPanel>
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