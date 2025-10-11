import { useEffect } from "react";
import { ServicesSection } from "@/components/ServicesSection";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Services = () => {
  useScrollAnimation();
  
  useEffect(() => {
    analytics.pageview('/services', 'Services - Mohamed Khair Portfolio');
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="pt-16">
          <ServicesSection />
        </div>
      </div>
    </>
  );
};

export default Services;