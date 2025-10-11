import { useEffect } from "react";
import { ContactSection } from "@/components/ContactSection";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Contact = () => {
  useScrollAnimation();
  
  useEffect(() => {
    analytics.pageview('/contact', 'Contact - Mohamed Khair Portfolio');
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="pt-16">
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default Contact;