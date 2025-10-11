import { useEffect } from "react";
import { QobouliSection } from "@/components/QobouliSection";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Qobouli = () => {
  useScrollAnimation();
  
  useEffect(() => {
    analytics.pageview('/qobouli', 'Qobouli - Arab Student Registration Service');
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="pt-16">
          <QobouliSection />
        </div>
      </div>
    </>
  );
};

export default Qobouli;