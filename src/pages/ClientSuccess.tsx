import { useEffect } from "react";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AccessibilitySection } from "@/components/AccessibilitySection";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ClientSuccess = () => {
  useScrollAnimation();
  
  useEffect(() => {
    analytics.pageview('/client-success', 'Client Success Stories - Mohamed Khair Portfolio');
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="pt-16">
          <TestimonialsSection />
          <AccessibilitySection />
        </div>
      </div>
    </>
  );
};

export default ClientSuccess;