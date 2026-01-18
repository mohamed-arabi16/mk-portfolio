import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { ArrowDown, ChevronRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageProvider";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const { t } = useLanguage();
  const { localize } = useLocalizedContent();
  const { user } = useAuth();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -150]);

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
  
  // Handle hero background - support both storage URLs and direct URLs, fallback to gradient
  const heroBgUrl = config?.hero_bg_url 
    ? (config.hero_bg_url.startsWith('http') || config.hero_bg_url.startsWith('/') 
        ? config.hero_bg_url 
        : `${supabase.storage.from('hero-images').getPublicUrl(config.hero_bg_url).data.publicUrl}`)
    : null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 }
    }
  } as const;

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: "spring" as const, stiffness: 200, damping: 20 }
    }
  } as const;

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-0 max-w-full w-full"
    >
      {/* Animated Background with Parallax Blobs */}
      <div className="absolute inset-0">
        {heroBgUrl ? (
          <motion.img 
            style={{ y: backgroundY }}
            src={heroBgUrl} 
            alt="Hero background" 
            className="w-full h-full object-cover blur-sm scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-background via-secondary to-background" />
        )}
        <div className="absolute inset-0 bg-background/60" />
        
        {/* Floating Parallax Orbs */}
        <motion.div 
          style={{ y: blob1Y }}
          className="absolute top-20 left-[10%] w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-3xl morphing-blob"
        />
        <motion.div 
          style={{ y: blob2Y }}
          className="absolute bottom-40 right-[15%] w-48 h-48 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-primary/15 to-accent/20 blur-3xl morphing-blob"
          initial={{ animationDelay: "2s" }}
        />
        <motion.div 
          style={{ y: blob3Y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-accent/5 blur-3xl"
        />
      </div>
      
      {/* Content with Scroll Fade */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center w-full overflow-x-hidden"
      >
        <motion.div 
          className="max-w-4xl mx-auto w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6 leading-tight break-words px-2"
          >
            <span className="text-foreground drop-shadow-lg glitch" data-text={`${heroTitle1} ${heroTitle2}`}>
              {heroTitle1} {heroTitle2}
            </span>
            <br />
            <span className="text-foreground/70 text-xl sm:text-2xl md:text-3xl">{location}</span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md break-words px-4"
          >
            {heroSubtitle}
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 px-4 max-w-full"
          >
            <Link to="/projects" className="w-full sm:w-auto max-w-xs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  className="btn-liquid btn-accent px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg w-full"
                >
                  {t('hero.viewWork')}
                  <ChevronRight className="ms-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </motion.div>
            </Link>
            
            <a href={config?.cv_url || "/MohamedKH_CV.pdf"} download className="w-full sm:w-auto max-w-xs">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="btn-liquid px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-lg w-full"
                >
                  <Download className="me-2 h-4 w-4 sm:h-5 sm:w-5" />
                  {t('button.downloadCV')}
                </Button>
              </motion.div>
            </a>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Link to="/contact" className="text-sm text-foreground/70 hover:text-accent transition-colors block mb-16 px-4">
              {t('hero.connect')} →
            </Link>
          </motion.div>
          
          {/* Stats with Stagger Animation */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto px-4"
            variants={containerVariants}
          >
            {stats && stats.length > 0 ? (
              stats.slice(0, 3).map((stat, index) => (
                <motion.div
                  key={stat.id}
                  variants={statsVariants}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <GlassPanel className="hero-stat p-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{localize(stat, 'label')}</div>
                  </GlassPanel>
                </motion.div>
              ))
            ) : (
              <>
                <motion.div variants={statsVariants} whileHover={{ scale: 1.05, y: -5 }}>
                  <GlassPanel className="hero-stat p-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{t('hero.statsProjectsValue')}</div>
                    <div className="text-sm text-muted-foreground">{t('hero.statsProjectsLabel')}</div>
                  </GlassPanel>
                </motion.div>
                <motion.div variants={statsVariants} whileHover={{ scale: 1.05, y: -5 }}>
                  <GlassPanel className="hero-stat p-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{t('hero.statsViewsValue')}</div>
                    <div className="text-sm text-muted-foreground">{t('hero.statsViewsLabel')}</div>
                  </GlassPanel>
                </motion.div>
                <motion.div variants={statsVariants} whileHover={{ scale: 1.05, y: -5 }}>
                  <GlassPanel className="hero-stat p-6 text-center">
                    <div className="text-3xl font-bold text-accent mb-1">{t('hero.statsSatisfactionValue')}</div>
                    <div className="text-sm text-muted-foreground">{t('hero.statsSatisfactionLabel')}</div>
                  </GlassPanel>
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-6 w-6 text-foreground/50" />
      </motion.div>
    </section>
  );
}
