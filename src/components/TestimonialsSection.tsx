import { GlassPanel } from "./GlassPanel";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";

export function TestimonialsSection() {
  const { session } = useAuth();
  const { localize } = useLocalizedContent();
  
  const { data: testimonials, isLoading: testimonialsLoading } = useQuery({
    queryKey: ['testimonials_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats_public'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('stats')
        .select('*')
        .order('display_order');
      
      if (error) throw error;
      return data;
    },
    enabled: true,
  });
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
          {statsLoading ? (
            <div className="col-span-full text-center py-6">
              <p className="text-muted-foreground">Loading stats...</p>
            </div>
          ) : stats && stats.length > 0 ? (
            stats.map((stat) => (
              <GlassPanel key={stat.id} className="p-4 text-center group hover:scale-105 transition-transform">
                <div className="text-2xl md:text-3xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium mb-1">
                  {localize(stat, 'label')}
                </div>
                {stat.description_en && (
                  <div className="text-xs text-muted-foreground hidden md:block">
                    {localize(stat, 'description')}
                  </div>
                )}
              </GlassPanel>
            ))
          ) : null}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonialsLoading ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">Loading testimonials...</p>
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <GlassPanel key={testimonial.id} interactive className="p-8 group">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-accent/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground leading-relaxed italic pl-6">
                    "{localize(testimonial, 'content')}"
                  </p>
                </div>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <img 
                      src={testimonial.avatar_url || '/api/placeholder/64/64'} 
                      alt={testimonial.client_name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold group-hover:text-accent transition-colors">
                      {testimonial.client_name}
                    </div>
                    {testimonial.client_title_en && (
                      <div className="text-sm text-muted-foreground">
                        {localize(testimonial, 'client_title')}
                      </div>
                    )}
                  </div>
                </div>
              </GlassPanel>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No testimonials yet. Add some in the admin panel!</p>
            </div>
          )}
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