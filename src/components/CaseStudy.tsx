import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassPanel } from "./GlassPanel";
import { SEOHead } from "./SEOHead";
import { analytics } from "@/lib/analytics";

interface CaseStudyData {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  stack: string[];
  results: { metric: string; value: string; description: string }[];
  images: { url: string; caption: string }[];
  liveUrl?: string;
  githubUrl?: string;
  timeline: string;
  role: string[];
}

const caseStudies: Record<string, CaseStudyData> = {
  "qobouli-programs": {
    id: "qobouli-programs",
    title: "Qobouli Programs Browser",
    summary: "Advanced filtering system for Turkish university programs with real-time tuition calculations",
    problem: "International students struggled to find affordable university programs in Turkey, often spending weeks manually researching tuition fees across hundreds of programs. The existing solutions lacked proper filtering by net tuition costs and didn't account for scholarship opportunities.",
    solution: "Built a comprehensive filtering system that allows students to search by net tuition (after scholarships), location, language, and program type. Integrated real-time data from Turkish universities with automated scholarship calculations to show accurate costs.",
    stack: ["Next.js", "Supabase", "shadcn/ui", "TypeScript", "Tailwind CSS"],
    results: [
      { metric: "Search Speed", value: "180ms", description: "Average time to first byte for search results" },
      { metric: "Lead Generation", value: "+32%", description: "Increase in qualified student inquiries" },
      { metric: "User Retention", value: "89%", description: "Students returning to refine searches" },
      { metric: "Conversion Rate", value: "24%", description: "Visitors who contacted Qobouli" }
    ],
    images: [
      { url: "/api/placeholder/800/500", caption: "Advanced filtering interface with real-time results" },
      { url: "/api/placeholder/800/500", caption: "Program details page showing tuition breakdown" },
      { url: "/api/placeholder/800/500", caption: "Mobile-responsive design for on-the-go searches" }
    ],
    liveUrl: "https://qobouli.com/programs",
    timeline: "6 weeks",
    role: ["Product Designer", "Full-stack Developer", "Data Engineer"]
  },
  "content-dashboard": {
    id: "content-dashboard",
    title: "Creator Analytics Dashboard",
    summary: "Real-time analytics platform for content creators to track engagement across platforms",
    problem: "Content creators needed to manually check multiple platforms (Instagram, TikTok, YouTube) to understand their performance. There was no unified view of engagement metrics, making it difficult to optimize content strategy.",
    solution: "Developed a centralized dashboard that aggregates data from multiple social media APIs, providing real-time insights into engagement patterns, optimal posting times, and content performance predictions using machine learning.",
    stack: ["React", "TypeScript", "Recharts", "Node.js", "PostgreSQL", "Redis"],
    results: [
      { metric: "Time Saved", value: "15hrs/week", description: "Reduced time spent on manual analytics" },
      { metric: "Engagement Increase", value: "+45%", description: "Average improvement in post engagement" },
      { metric: "Load Time", value: "1.2s", description: "Dashboard load time with real-time data" },
      { metric: "User Satisfaction", value: "4.8/5", description: "Average rating from beta users" }
    ],
    images: [
      { url: "/api/placeholder/800/500", caption: "Main dashboard with unified metrics from all platforms" },
      { url: "/api/placeholder/800/500", caption: "Detailed analytics showing engagement patterns" },
      { url: "/api/placeholder/800/500", caption: "AI-powered content recommendations" }
    ],
    timeline: "8 weeks",
    role: ["Frontend Developer", "UI/UX Designer", "API Integration"]
  },
  "portfolio-site": {
    id: "portfolio-site",
    title: "Interactive Portfolio",
    summary: "Modern portfolio website featuring liquid glass morphism and smooth micro-interactions",
    problem: "Needed a portfolio that would stand out in a crowded market while showcasing technical skills and maintaining fast performance. Traditional portfolio designs felt outdated and didn't reflect modern web capabilities.",
    solution: "Created an interactive portfolio using liquid glass morphism design principles, implemented smooth scroll animations, and optimized for performance. The design emphasizes storytelling through visual hierarchy and subtle animations that guide user attention.",
    stack: ["React", "Tailwind CSS", "Framer Motion", "Vite", "TypeScript"],
    results: [
      { metric: "Lighthouse Score", value: "98/100", description: "Performance, accessibility, and SEO scores" },
      { metric: "Bounce Rate", value: "-40%", description: "Reduction compared to previous portfolio" },
      { metric: "Session Duration", value: "3.2min", description: "Average time visitors spend exploring" },
      { metric: "Conversion Rate", value: "12%", description: "Visitors who initiated contact" }
    ],
    images: [
      { url: "/api/placeholder/800/500", caption: "Hero section with liquid glass morphism effects" },
      { url: "/api/placeholder/800/500", caption: "Interactive project showcase with hover animations" },
      { url: "/api/placeholder/800/500", caption: "Responsive design across all device sizes" }
    ],
    liveUrl: "https://mohamedkhair.dev",
    githubUrl: "https://github.com/mohamedkhair/portfolio",
    timeline: "4 weeks",
    role: ["UI/UX Designer", "Frontend Developer", "Performance Engineer"]
  }
};

export function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const caseStudy = id ? caseStudies[id] : null;

  useEffect(() => {
    if (caseStudy) {
      analytics.pageview(`/case-study/${id}`, `Case Study: ${caseStudy.title}`);
      analytics.trackCaseStudyView(id!);
    }
  }, [id, caseStudy]);

  if (!caseStudy) {
    return (
      <>
        <SEOHead 
          title="Case Study Not Found"
          description="The requested case study could not be found."
        />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Case Study Not Found</h1>
            <Button onClick={() => navigate('/')}>Back to Home</Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title={`Case Study: ${caseStudy.title}`}
        description={caseStudy.summary}
        type="article"
        keywords={`${caseStudy.stack.join(', ')}, case study, web development, ${caseStudy.title}`}
      />
      <div className="min-h-screen pt-20 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-8 btn-liquid"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portfolio
        </Button>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{caseStudy.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">{caseStudy.summary}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            {caseStudy.liveUrl && (
              <Button variant="default" className="btn-liquid btn-accent" asChild>
                <a href={caseStudy.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Globe className="w-4 h-4 mr-2" />
                  View Live Site
                </a>
              </Button>
            )}
            {caseStudy.githubUrl && (
              <Button variant="outline" className="btn-liquid" asChild>
                <a href={caseStudy.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {caseStudy.stack.map(tech => (
              <Badge key={tech} variant="outline">{tech}</Badge>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-semibold mb-2">Timeline</h3>
            <p className="text-muted-foreground">{caseStudy.timeline}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">My Role</h3>
            <p className="text-muted-foreground">{caseStudy.role.join(", ")}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Technologies</h3>
            <p className="text-muted-foreground">{caseStudy.stack.slice(0, 3).join(", ")}</p>
          </div>
        </div>

        {/* Problem Statement */}
        <GlassPanel className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <p className="text-muted-foreground leading-relaxed">{caseStudy.problem}</p>
        </GlassPanel>

        {/* Solution */}
        <GlassPanel className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">The Solution</h2>
          <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
        </GlassPanel>

        {/* Images */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Project Showcase</h2>
          <div className="grid gap-6">
            {caseStudy.images.map((image, index) => (
              <GlassPanel key={index} className="overflow-hidden">
                <img 
                  src={image.url} 
                  alt={image.caption}
                  className="w-full h-auto rounded-[var(--radius-glass)]"
                />
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">{image.caption}</p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Results & Impact</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudy.results.map((result, index) => (
              <GlassPanel key={index} className="p-6 text-center">
                <div className="text-3xl font-bold text-accent mb-2">{result.value}</div>
                <div className="font-semibold mb-2">{result.metric}</div>
                <div className="text-sm text-muted-foreground">{result.description}</div>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* CTA */}
        <GlassPanel className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Interested in working together?</h3>
          <p className="text-muted-foreground mb-6">
            Let's discuss how I can help bring your ideas to life with modern web technologies.
          </p>
          <Button 
            className="btn-liquid btn-accent"
            onClick={() => {
              navigate('/');
              setTimeout(() => {
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
          >
            Get in Touch
          </Button>
        </GlassPanel>
      </div>
      </div>
    </>
  );
}