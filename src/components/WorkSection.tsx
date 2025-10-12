import { useState } from "react";
import { GlassPanel } from "./GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import projectShowcaseImg from "@/assets/project-showcase.jpg";

const formatExternalUrl = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

const stackColors: Record<string, string> = {
  "Next.js": "bg-foreground text-background",
  "React": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Supabase": "bg-green-500/10 text-green-600 dark:text-green-400",
  "TypeScript": "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  "Tailwind": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
  "shadcn/ui": "bg-muted text-muted-foreground",
  "Recharts": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "Framer Motion": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "Lovable": "bg-purple-500/10 text-purple-600 dark:text-purple-400"
};

export function WorkSection() {
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const { t } = useLanguage();
  const { session } = useAuth();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });
  
  const allStacks = Array.from(new Set(projects?.flatMap(p => p.stack || []) || []));
  const filteredProjects = selectedStack 
    ? projects?.filter(p => p.stack?.includes(selectedStack))
    : projects;

  return (
    <section id="work" className="py-20 px-6 relative overflow-hidden">
      {/* Creative Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(to bottom, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-serif">
            {t('projects.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedStack === null ? "default" : "outline"}
            onClick={() => setSelectedStack(null)}
            className="btn-liquid"
          >
            {t('projects.allProjects')}
          </Button>
          {allStacks.map(stack => (
            <Button
              key={stack}
              variant={selectedStack === stack ? "default" : "outline"}
              onClick={() => setSelectedStack(selectedStack === stack ? null : stack)}
              className="btn-liquid"
            >
              {stack}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="project-grid">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          ) : filteredProjects && filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <GlassPanel key={project.id} interactive className="group overflow-hidden">
                {/* Project Preview */}
                <div className="aspect-video bg-muted rounded-t-[var(--radius-glass)] overflow-hidden">
                  <img 
                    src={project.thumbnail_url || projectShowcaseImg} 
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 card-content">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">{t('projects.role')}</p>
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      {project.role}
                    </Badge>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.stack || []).map((tech: string) => (
                      <Badge 
                        key={tech} 
                        variant="outline"
                        className={stackColors[tech] || "bg-muted text-muted-foreground"}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full btn-liquid btn-accent group-hover:scale-105"
                    onClick={() => {
                      if (project.project_url && !project.is_coming_soon) {
                        window.open(formatExternalUrl(project.project_url), '_blank');
                      }
                    }}
                    disabled={project.is_coming_soon}
                    aria-label={`View ${project.title}`}
                  >
                    {project.is_coming_soon ? t('projects.comingSoon') : t('button.viewProject')}
                  </Button>
                </div>
              </GlassPanel>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No projects yet. Add some in the admin panel!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}