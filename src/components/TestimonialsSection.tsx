import { GlassPanel } from "./GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  project?: string;
}

interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
  growth?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Startup Founder",
    company: "TechFlow Solutions",
    avatar: "/api/placeholder/64/64",
    content: "Mohamed transformed our MVP from a basic prototype into a polished, lightning-fast web application. His attention to performance optimization increased our user engagement by 40%.",
    rating: 5,
    project: "MVP Development"
  },
  {
    id: "ahmad-hassan",
    name: "Ahmad Hassan",
    role: "Marketing Director",
    company: "Digital Dynamics",
    avatar: "/api/placeholder/64/64",
    content: "Working with Mohamed on our content strategy was game-changing. His Instagram reels not only went viral but actually converted into quality leads for our business.",
    rating: 5,
    project: "Content Creation"
  },
  {
    id: "fatima-al-zahra",
    name: "Fatima Al-Zahra",
    role: "International Student",
    company: "Istanbul University",
    avatar: "/api/placeholder/64/64",
    content: "Thanks to Qobouli and Mohamed's guidance, I found the perfect university program in Turkey that matched my budget and career goals. The application process was smooth and transparent.",
    rating: 5,
    project: "Qobouli Services"
  },
  {
    id: "david-kim",
    name: "David Kim",
    role: "E-commerce Manager",
    company: "Global Retail Co",
    avatar: "/api/placeholder/64/64",
    content: "The e-commerce platform Mohamed built for us handles 10K+ orders monthly without any hiccups. His code quality and documentation made future updates seamless.",
    rating: 5,
    project: "E-commerce Platform"
  }
];

const metrics: Metric[] = [
  {
    id: "client-satisfaction",
    label: "Client Satisfaction",
    value: "100%",
    description: "All clients report being highly satisfied with delivered projects",
    growth: "+5% from last year"
  },
  {
    id: "project-delivery",
    label: "On-Time Delivery",
    value: "98%",
    description: "Projects delivered on or before the agreed deadline",
    growth: "Consistent record"
  },
  {
    id: "performance-boost",
    label: "Average Performance Boost",
    value: "65%",
    description: "Average improvement in site speed after optimization",
    growth: "+15% improvement"
  },
  {
    id: "content-reach",
    label: "Total Content Reach",
    value: "500K+",
    description: "Combined reach across all content creation projects",
    growth: "+120% this year"
  },
  {
    id: "student-placements",
    label: "Student Placements",
    value: "250+",
    description: "International students successfully placed in Turkish universities",
    growth: "+80% vs last year"
  },
  {
    id: "repeat-clients",
    label: "Repeat Clients",
    value: "85%",
    description: "Clients who return for additional projects or services",
    growth: "Growing network"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-muted/10 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            Client <span className="text-accent">Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real clients who've experienced the impact of 
            ethical, transparent, and high-quality digital solutions.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {metrics.map((metric) => (
            <GlassPanel key={metric.id} className="p-4 text-center group hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform">
                {metric.value}
              </div>
              <div className="text-xs md:text-sm font-medium mb-1">
                {metric.label}
              </div>
              <div className="text-xs text-muted-foreground hidden md:block">
                {metric.description}
              </div>
              {metric.growth && (
                <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {metric.growth}
                </div>
              )}
            </GlassPanel>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <GlassPanel key={testimonial.id} interactive className="p-8 group">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-accent/20 absolute -top-2 -left-2" />
                <p className="text-muted-foreground leading-relaxed italic pl-6">
                  "{testimonial.content}"
                </p>
              </div>

              {/* Client Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-semibold group-hover:text-accent transition-colors">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                  {testimonial.project && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      {testimonial.project}
                    </Badge>
                  )}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

        {/* Call to Action */}
        <GlassPanel className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Join These Success Stories?</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Whether you need a lightning-fast web application, viral content that converts, 
            or help navigating university applications in Turkey, let's discuss how I can 
            help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-liquid btn-accent px-8 py-3"
            >
              Start Your Project
            </button>
            <button
              onClick={() => {
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-liquid px-8 py-3"
            >
              Explore Services
            </button>
          </div>
        </GlassPanel>
      </div>
    </section>
  );
}