import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { NavigationBar } from "@/components/NavigationBar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Content from "./pages/Content";
import Services from "./pages/Services";
import Qobouli from "./pages/Qobouli";
import ClientSuccess from "./pages/ClientSuccess";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProjects from "./pages/admin/Projects";
import AdminServices from "./pages/admin/Services";
import AdminSkills from "./pages/admin/Skills";
import AdminContent from "./pages/admin/Content";
import AdminStats from "./pages/admin/Stats";
import AdminTestimonials from "./pages/admin/Testimonials";
import AdminConfig from "./pages/admin/Config";
import AdminTranslations from "./pages/admin/Translations";
import { CaseStudy } from "@/components/CaseStudy";
import { PerformanceObserver } from "@/components/PerformanceObserver";
import { analytics } from "@/lib/analytics";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize analytics
    analytics.init();
  }, []);

  return (
  <PerformanceObserver>
    <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
      <LanguageProvider defaultLanguage="en">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/content" element={<Content />} />
            <Route path="/services" element={<Services />} />
            <Route path="/qobouli" element={<Qobouli />} />
            <Route path="/client-success" element={<ClientSuccess />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/projects" element={<AdminProjects />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/skills" element={<AdminSkills />} />
            <Route path="/admin/content" element={<AdminContent />} />
            <Route path="/admin/stats" element={<AdminStats />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/config" element={<AdminConfig />} />
            <Route path="/admin/translations" element={<AdminTranslations />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
  </PerformanceObserver>
);
};

export default App;
