import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SEOHead } from "@/components/SEOHead";
import { analytics } from "@/lib/analytics";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Home = () => {
  useScrollAnimation(); // Initialize Apple-style scroll animations
  
  useEffect(() => {
    analytics.pageview('/', 'Home - Mohamed Khair Portfolio');
  }, []);

  return (
    <>
      <SEOHead />
      <div className="min-h-screen">
        <div className="pt-16">
          <Hero />
          <AboutSection />
        </div>
      </div>
    </>
  );
};

export default Home;