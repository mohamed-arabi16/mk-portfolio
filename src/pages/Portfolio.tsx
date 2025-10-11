import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContentSection } from "@/components/ContentSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";
import { NavigationBar } from "@/components/NavigationBar";

export default function Portfolio() {
  const { username } = useParams<{ username: string }>();

  const { data: config, isLoading, error } = useQuery({
    queryKey: ['portfolio', username],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_config')
        .select('*')
        .eq('username', username)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!username,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The portfolio you're looking for doesn't exist.
          </p>
          <a href="/" className="btn-liquid btn-accent px-6 py-3">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavigationBar />
      <Hero />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <ContentSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
