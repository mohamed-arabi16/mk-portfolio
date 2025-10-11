import { GlassPanel } from "./GlassPanel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./LanguageProvider";
import { Code, Video, GraduationCap, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import qobouliIcon from "@/assets/qobouli-icon.jpg";
import contentCreationImg from "@/assets/content-creation.jpg";

const services = [
  {
    id: "fullstack-dev",
    icon: Code,
    title: "Full-Stack Development",
    description: "Modern web applications built with React, Node.js, and cutting-edge technologies.",
    features: ["MVP Development", "API Integration", "Database Design", "Performance Optimization"],
    price: "Starting at $2,500",
    timeline: "2-6 weeks",
    cta: "Book a Consultation",
    href: "#contact"
  },
  {
    id: "content-creation",
    icon: Video,
    title: "Content Creation",
    description: "Engaging Instagram Reels and social media content that drives real engagement.",
    features: ["Instagram Reels", "Tech Tutorials", "Brand Campaigns", "Growth Strategy"],
    price: "Starting at $500/month",
    timeline: "Ongoing",
    cta: "View Content",
    href: "#content"
  },
  {
    id: "qobouli",
    icon: GraduationCap,
    title: "Qobouli Student Registration",
    description: "Comprehensive university application service for international students in Turkey.",
    features: ["University Selection", "Application Process", "Visa Support", "Tuition Guidance"],
    price: "Starting at $299",
    timeline: "1-3 months",
    cta: "Learn About Qobouli",
    href: "https://qobouli.com",
    external: true
  }
];

export function ServicesSection() {
  const { t } = useLanguage();
  
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
          {services.map((service) => (
            <GlassPanel key={service.id} interactive className="p-8 group">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Pricing & Timeline */}
                <div className="mb-6 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold text-accent">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{service.timeline}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button 
                  onClick={() => scrollToSection(service.href)}
                  className="w-full btn-liquid btn-accent group-hover:scale-105"
                >
                  {service.cta}
                  {service.external ? (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  ) : (
                    <ArrowRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </GlassPanel>
            ))}
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