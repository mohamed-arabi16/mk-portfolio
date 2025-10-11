import { useEffect } from "react";
import { WorkSection } from "@/components/WorkSection";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Projects = () => {
  useScrollAnimation();
  
  useEffect(() => {
    analytics.pageview('/projects', 'Projects - Mohamed Khair Portfolio');
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="pt-16">
          <WorkSection />
        </div>
      </div>
    </>
  );
};

export default Projects;