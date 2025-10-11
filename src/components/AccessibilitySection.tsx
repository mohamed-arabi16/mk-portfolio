import { GlassPanel } from "./GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Keyboard, 
  Zap, 
  Eye, 
  Users, 
  Heart,
  Accessibility,
  Volume2,
  MousePointer
} from "lucide-react";

const accessibilityFeatures = [
  {
    icon: Keyboard,
    title: "Keyboard Navigation",
    description: "Full keyboard accessibility with proper focus management and skip links",
    implementation: "Tab navigation, arrow keys, escape handling"
  },
  {
    icon: Eye,
    title: "Screen Reader Support", 
    description: "Semantic HTML with proper ARIA labels and live regions",
    implementation: "Alt text, ARIA descriptions, heading structure"
  },
  {
    icon: Zap,
    title: "High Contrast Mode",
    description: "Enhanced color contrast ratios meeting WCAG 2.1 AA standards",
    implementation: "4.5:1 text contrast, 3:1 UI component contrast"
  },
  {
    icon: Users,
    title: "Reduced Motion",
    description: "Respects user preferences for reduced motion and animations",
    implementation: "prefers-reduced-motion media queries"
  }
];

export function AccessibilitySection() {
  const handleLearnMore = () => {
    window.open('https://www.w3.org/WAI/WCAG21/quickref/', '_blank');
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-secondary/20 to-background" 
             role="region" 
             aria-labelledby="accessibility-heading">
      <div className="max-w-4xl mx-auto">
        {/* Skip to content link */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-accent text-white px-4 py-2 rounded-lg z-50"
        >
          Skip to main content
        </a>

        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 glass-panel">
            <Accessibility className="w-4 h-4 mr-2" aria-hidden="true" />
            Accessibility First
          </Badge>
          <h2 id="accessibility-heading" className="text-4xl md:text-5xl font-bold mb-6">
            Built for <span className="text-accent">Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every project I build follows WCAG 2.1 AA standards, ensuring 
            inclusive experiences for users of all abilities.
          </p>
        </div>

        {/* Accessibility Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {accessibilityFeatures.map((feature, index) => (
            <GlassPanel 
              key={index} 
              className="p-6 focus-within:ring-2 focus-within:ring-accent"
              tabIndex={0}
              role="article"
              aria-labelledby={`feature-${index}-title`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <h3 id={`feature-${index}-title`} className="font-bold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <div className="text-sm text-accent bg-accent/5 px-3 py-1 rounded-md">
                    {feature.implementation}
                  </div>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>


        {/* Commitment Statement */}
        <div className="text-center">
          <GlassPanel className="p-8 bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-500/20">
            <Heart className="w-12 h-12 mx-auto mb-4 text-accent" aria-hidden="true" />
            <h3 className="text-2xl font-bold mb-4">My Accessibility Commitment</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I believe the web should be accessible to everyone. Every project I deliver 
              includes comprehensive accessibility testing and meets international standards 
              for inclusive design.
            </p>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}