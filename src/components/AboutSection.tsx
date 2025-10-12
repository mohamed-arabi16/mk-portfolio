import { GlassPanel } from "./GlassPanel";
import { Heart, Globe, Users, Lightbulb, Code, Palette, Languages } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function AboutSection() {
  const { t } = useLanguage();
  const { localize } = useLocalizedContent();
  const { user } = useAuth();

  // Fetch portfolio config (publicly accessible)
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

  // Fetch skills (publicly accessible)
  const { data: skills } = useQuery({
    queryKey: ['skills_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });

  // Group skills by category
  const technicalSkills = skills?.filter(s => s.category === 'Technical') || [];
  const creativeSkills = skills?.filter(s => s.category === 'Creative') || [];
  const languageSkills = skills?.filter(s => s.category === 'Languages') || [];

  const bio = config ? localize(config, 'bio') : t('about.bio1');
  const name = config?.name || t('about.name');

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('about.title')} <span className="text-accent">{name}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Bio */}
          <div className="lg:col-span-2">
            <GlassPanel className="p-8 h-full">
              <h3 className="text-2xl font-bold text-foreground mb-6">{t('about.myStory')}</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {bio ? (
                  <p className="whitespace-pre-line">{bio}</p>
                ) : (
                  <>
                    <p>{t('about.bio1')}</p>
                    <p>{t('about.bio2')}</p>
                    <p>{t('about.bio3')}</p>
                  </>
                )}
              </div>
            </GlassPanel>
          </div>

          {/* Quick Facts */}
          <div className="space-y-6">
            <GlassPanel className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">
                  {config ? localize(config, 'global_perspective_title') : t('about.globalPerspectiveTitle')}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {config ? localize(config, 'global_perspective_desc') : t('about.globalPerspectiveDesc')}
              </p>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">
                  {config ? localize(config, 'career_evolution_title') : t('about.careerEvolutionTitle')}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {config ? localize(config, 'career_evolution_desc') : t('about.careerEvolutionDesc')}
              </p>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">
                  {config ? localize(config, 'cooperative_approach_title') : t('about.collaborativeTitle')}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                {config ? localize(config, 'cooperative_approach_desc') : t('about.collaborativeDesc')}
              </p>
            </GlassPanel>
          </div>
        </div>

        {/* Values & Approach */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <GlassPanel className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-3">{t('about.ethicalFirstTitle')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('about.ethicalFirstDesc')}
            </p>
          </GlassPanel>

          <GlassPanel className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-3">{t('about.globalMindsetTitle')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('about.globalMindsetDesc')}
            </p>
          </GlassPanel>

          <GlassPanel className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-3">{t('about.collaborativeSpiritTitle')}</h4>
            <p className="text-sm text-muted-foreground">
              {t('about.collaborativeSpiritDesc')}
            </p>
          </GlassPanel>
        </div>

        {/* Skills & Expertise */}
        <GlassPanel className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">{t('about.skillsTitle')}</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-4 text-accent text-lg">{t('about.technicalSkills')}</h4>
              <div className="grid grid-cols-2 gap-3">
                {technicalSkills.length > 0 ? (
                  technicalSkills.map(skill => (
                    <div key={skill.id} className="glass-panel glass-panel-subtle px-3 py-2 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                      {skill.name}
                    </div>
                  ))
                ) : (
                  ["React", "Next.js", "TypeScript", "Node.js", "Supabase", "Tailwind CSS", "Git", "API Development"].map(skill => (
                    <div key={skill} className="glass-panel glass-panel-subtle px-3 py-2 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                      {skill}
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Creative Skills */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-4 text-accent text-lg">{t('about.creativeSkills')}</h4>
              <div className="grid grid-cols-2 gap-3">
                {creativeSkills.length > 0 ? (
                  creativeSkills.map(skill => (
                    <div key={skill.id} className="glass-panel glass-panel-subtle px-3 py-2 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                      {skill.name}
                    </div>
                  ))
                ) : (
                  ["Content Creation", "Instagram Reels", "Video Editing", "UI/UX Design", "Brand Strategy", "Storytelling"].map(skill => (
                    <div key={skill} className="glass-panel glass-panel-subtle px-3 py-2 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                      {skill}
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Languages */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Languages className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-4 text-accent text-lg">{t('about.languages')}</h4>
              <div className="space-y-3">
                {languageSkills.length > 0 ? (
                  languageSkills.map(skill => (
                    <div key={skill.id} className="glass-panel glass-panel-subtle px-4 py-3 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                      {skill.name}
                    </div>
                  ))
                ) : (
                  ["Arabic (Native)", "English (Fluent)", "Turkish (Conversational)"].map(lang => (
                    <div key={lang} className="glass-panel glass-panel-subtle px-4 py-3 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                      {lang}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}
