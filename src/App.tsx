import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import Auth from "./pages/Auth";
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
import Portfolio from "./pages/Portfolio";
import { CaseStudy } from "@/components/CaseStudy";
import { PerformanceObserver } from "@/components/PerformanceObserver";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AuthProvider } from "@/hooks/useAuth";
import { analytics } from "@/lib/analytics";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <NavigationBar />}
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/content" element={<Content />} />
            <Route path="/services" element={<Services />} />
            <Route path="/qobouli" element={<Qobouli />} />
            <Route path="/client-success" element={<ClientSuccess />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/case-study/:id" element={<CaseStudy />} />
            
            {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/u/:username" element={<Portfolio />} />
          <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/projects" element={<ProtectedRoute><AdminProjects /></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
            <Route path="/admin/skills" element={<ProtectedRoute><AdminSkills /></ProtectedRoute>} />
            <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
            <Route path="/admin/stats" element={<ProtectedRoute><AdminStats /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
            <Route path="/admin/config" element={<ProtectedRoute><AdminConfig /></ProtectedRoute>} />
            <Route path="/admin/translations" element={<ProtectedRoute><AdminTranslations /></ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
    </>
  );
};

const App = () => {
  useEffect(() => {
    // Initialize analytics
    analytics.init();
    
    // Prevent horizontal scroll
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);

  return (
    <PerformanceObserver>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="light" storageKey="portfolio-theme">
            <LanguageProvider defaultLanguage="en">
              <AuthProvider>
                <TooltipProvider>
                  <Toaster />
                  <Sonner />
                  <BrowserRouter>
                    <AppContent />
                  </BrowserRouter>
                </TooltipProvider>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </PerformanceObserver>
  );
};

export default App;
