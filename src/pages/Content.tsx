import { useEffect } from "react";
import { ContentSection } from "@/components/ContentSection";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Content = () => {
  useScrollAnimation();
  
  useEffect(() => {
    analytics.pageview('/content', 'Content - Mohamed Khair Portfolio');
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="pt-16">
          <ContentSection />
        </div>
      </div>
    </>
  );
};

export default Content;