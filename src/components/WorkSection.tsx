import { useState } from "react";
import { GlassPanel } from "./GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "./LanguageProvider";
import projectShowcaseImg from "@/assets/project-showcase.jpg";
import qobouliProgramsPreview from "@/assets/qobouli-programs-preview.jpg";
import qobouliTrackingPreview from "@/assets/qobouli-tracking-preview.jpg";
import karidesciPreview from "@/assets/karidesci-preview.jpg";

interface Project {
  id: string;
  title: string;
  description: string;
  role: string;
  stack: string[];
  thumbnail: string;
  url?: string;
  isComingSoon?: boolean;
}

const projects: Project[] = [
  {
    id: "qobouli-main",
    title: "Qobouli.com",
    description: "Main platform for Qobouli - a comprehensive university registration service helping Arab students apply to Turkish universities. Built with modern web technologies to provide seamless user experience.",
    role: "Founder & Full-Stack Developer",
    stack: ["React", "TypeScript", "Tailwind"],
    thumbnail: qobouliProgramsPreview,
    url: "https://qobouli.com"
  },
  {
    id: "track-qobouli",
    title: "Qobouli Tracking System",
    description: "Created a student application tracking system that provides real-time updates on university application status. Designed the full user flow and built the frontend/backend, helping 250+ students monitor their applications efficiently.",
    role: "Product Lead & Full-Stack Developer",
    stack: ["React", "TypeScript", "Supabase"],
    thumbnail: qobouliTrackingPreview,
    url: "https://track.qobouli.com"
  },
  {
    id: "ai-qobouli",
    title: "Qobouli AI Assistant",
    description: "AI-powered chatbot to help students get instant answers about university applications, requirements, and processes. Integrated with GPT-4 to provide intelligent, context-aware responses.",
    role: "Full-Stack Developer",
    stack: ["React", "TypeScript", "Lovable"],
    thumbnail: karidesciPreview,
    url: "https://ai.qobouli.com"
  },
  {
    id: "order-whisperer",
    title: "Order Whisperer",
    description: "E-commerce order management system with real-time tracking and automated notifications. Built to streamline order processing for small to medium businesses.",
    role: "Full-Stack Developer",
    stack: ["React", "Supabase", "Tailwind"],
    thumbnail: projectShowcaseImg,
    url: "https://order-whisperer-final.lovable.app"
  },
  {
    id: "coming-soon-1",
    title: "Coming Soon",
    description: "Exciting new project currently in development. Stay tuned for updates!",
    role: "Full-Stack Developer",
    stack: ["React", "TypeScript"],
    thumbnail: projectShowcaseImg,
    isComingSoon: true
  },
  {
    id: "coming-soon-2",
    title: "Coming Soon",
    description: "Another innovative project on the way. More details to be revealed soon!",
    role: "Full-Stack Developer", 
    stack: ["Next.js", "Supabase"],
    thumbnail: projectShowcaseImg,
    isComingSoon: true
  }
];

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
  
  const allStacks = Array.from(new Set(projects.flatMap(p => p.stack)));
  const filteredProjects = selectedStack 
    ? projects.filter(p => p.stack.includes(selectedStack))
    : projects;

  return (
    <section id="work" className="py-20 px-6 relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src={projectShowcaseImg} 
          alt="Project showcase background" 
          className="w-full h-full object-cover"
        />
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
          {filteredProjects.map(project => (
            <GlassPanel key={project.id} interactive className="group overflow-hidden">
              {/* Project Preview */}
              <div className="aspect-video bg-muted rounded-t-[var(--radius-glass)] overflow-hidden">
                <img 
                  src={project.thumbnail} 
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
                  {project.stack.map(tech => (
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
                    if (project.url && !project.isComingSoon) {
                      window.open(project.url, '_blank');
                    }
                  }}
                  disabled={project.isComingSoon}
                  aria-label={`View ${project.title}`}
                >
                  {project.isComingSoon ? t('projects.comingSoon') : t('button.viewProject')}
                </Button>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
}