import { GlassPanel } from "./GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Heart, Globe, Users, Lightbulb, Code, Palette, Languages } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About <span className="text-accent">Mohamed</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey from computer engineering to digital media, driven by passion, 
            ethics, and the pursuit of meaningful technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Main Bio */}
          <div className="lg:col-span-2">
            <GlassPanel className="p-8 h-full">
              <h3 className="text-2xl font-bold text-foreground mb-6">My Story</h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Syrian-born with Sudanese nationality, based in Istanbul. I'm a Computer Engineering graduate who evolved from technical work into digital media, now combining both worlds to create impactful web applications and content.
                </p>
                <p>
                  Co-founder of <span className="text-accent font-medium">Qobouli</span> with my wife—a free service helping Arab students navigate Turkish university applications. We bring diverse perspectives to every project, believing the best solutions emerge from collaboration.
                </p>
                <p>
                  I'm committed to <span className="text-foreground font-medium">ethical practices</span> and <span className="text-foreground font-medium">complete transparency</span>, delivering solutions with honest communication and regular updates that truly serve client needs.
                </p>
              </div>
            </GlassPanel>
          </div>

          {/* Quick Facts */}
          <div className="space-y-6">
            <GlassPanel className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">Global Perspective</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Syria-born, Sudanese national, Istanbul-based. Bringing multicultural 
                insights to every project.
              </p>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">Career Evolution</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Computer Engineering graduate turned digital media specialist, 
                combining technical skills with creative vision.
              </p>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">Collaborative Approach</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Working in partnership with my wife, bringing diverse perspectives 
                and shared values to every project.
              </p>
            </GlassPanel>

            <GlassPanel className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-5 h-5 text-accent" />
                <h4 className="font-semibold text-foreground">Core Values</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Ethical practices, transparency, and meaningful technology that 
                creates positive impact.
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
            <h4 className="font-semibold text-foreground mb-3">Ethical First</h4>
            <p className="text-sm text-muted-foreground">
              Every project is built on a foundation of honest communication, 
              fair practices, and mutual respect.
            </p>
          </GlassPanel>

          <GlassPanel className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-3">Global Mindset</h4>
            <p className="text-sm text-muted-foreground">
              Drawing from multicultural experiences to create solutions 
              that work across different contexts and communities.
            </p>
          </GlassPanel>

          <GlassPanel className="p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h4 className="font-semibold text-foreground mb-3">Collaborative Spirit</h4>
            <p className="text-sm text-muted-foreground">
              Believing that the best solutions emerge from combining 
              different perspectives and working together.
            </p>
          </GlassPanel>
        </div>

        {/* Skills & Expertise - Improved Layout */}
        <GlassPanel className="p-8">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Skills & Expertise</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Technical Skills */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-4 text-accent text-lg">Technical Skills</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "React", "Next.js", "TypeScript", "Node.js", "Supabase", 
                  "Tailwind CSS", "Git", "API Development"
                ].map(skill => (
                  <div key={skill} className="glass-panel glass-panel-subtle px-3 py-2 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Creative Skills */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-4 text-accent text-lg">Creative Skills</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Content Creation", "Instagram Reels", "Video Editing", 
                  "UI/UX Design", "Brand Strategy", "Storytelling"
                ].map(skill => (
                  <div key={skill} className="glass-panel glass-panel-subtle px-3 py-2 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Languages */}
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Languages className="w-8 h-8 text-accent" />
              </div>
              <h4 className="font-semibold mb-4 text-accent text-lg">Languages</h4>
              <div className="space-y-3">
                {[
                  "Arabic (Native)", "English (Fluent)", "Turkish (Conversational)"
                ].map(lang => (
                  <div key={lang} className="glass-panel glass-panel-subtle px-4 py-3 text-sm font-medium text-foreground bg-accent/5 border-accent/20">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}