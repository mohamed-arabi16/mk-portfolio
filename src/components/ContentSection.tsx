import { useState } from "react";
import { GlassPanel } from "./GlassPanel";
import { VideoModal } from "./VideoModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "./LanguageProvider";
import { Play, ExternalLink, TrendingUp, Users, Eye } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  externalUrl?: string;
  platform: "TikTok" | "Instagram" | "YouTube" | "LinkedIn";
  type: "tutorial" | "behind-scenes" | "tech-tips" | "client-showcase";
  metrics?: {
    views?: string;
    likes?: string;
    engagement_rate?: string;
  };
}

const contentItems: ContentItem[] = [
  {
    id: "1",
    title: "Building a React App in 60 Seconds",
    description: "Quick tutorial showing the power of modern React development with instant deployment.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
    externalUrl: "https://www.tiktok.com/@example",
    platform: "TikTok",
    type: "tutorial",
    metrics: { views: "45.2K", likes: "3.1K", engagement_rate: "6.8%" }
  },
  {
    id: "2", 
    title: "Behind the Scenes: Building Qobouli",
    description: "Inside look at developing the student registration platform that's helped 250+ students.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=350&fit=crop",
    externalUrl: "https://instagram.com/p/example",
    platform: "Instagram",
    type: "behind-scenes",
    metrics: { views: "28.7K", likes: "2.4K", engagement_rate: "8.3%" }
  },
  {
    id: "3",
    title: "Top 5 VS Code Extensions for Developers",
    description: "Essential tools that can boost your productivity by 200%. Must-have extensions for 2024.",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=280&fit=crop",
    externalUrl: "https://youtube.com/watch?v=example",
    platform: "YouTube",
    type: "tech-tips",
    metrics: { views: "67.1K", likes: "4.2K", engagement_rate: "6.2%" }
  }
];

const typeColors = {
  tutorial: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "behind-scenes": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "tech-tips": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "client-showcase": "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
};

const platformColors = {
  TikTok: "bg-black text-white",
  Instagram: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  YouTube: "bg-red-600 text-white",
  LinkedIn: "bg-blue-600 text-white"
};

export function ContentSection() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const { t } = useLanguage();

  const handleContentClick = (item: ContentItem) => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank');
    }
  };

  return (
    <section id="content" className="py-20 px-6 section-tinted">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 glass-panel">
            <TrendingUp className="w-4 h-4 mr-2" />
            Viral Content Creator
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('content.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('content.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassPanel className="p-6 text-center backdrop-blur-xl bg-accent/5 border-accent/20">
            <div className="text-3xl font-bold text-accent mb-1">150K+</div>
            <div className="text-muted-foreground">{t('content.totalViews')}</div>
          </GlassPanel>
          <GlassPanel className="p-6 text-center backdrop-blur-xl bg-green-500/5 border-green-500/20">
            <div className="text-3xl font-bold text-green-600 mb-1">7.2%</div>
            <div className="text-muted-foreground">{t('content.engagementRate')}</div>
          </GlassPanel>
          <GlassPanel className="p-6 text-center backdrop-blur-xl bg-orange-500/5 border-orange-500/20">
            <div className="text-3xl font-bold text-orange-600 mb-1">50+</div>
            <div className="text-muted-foreground">{t('content.viralPosts')}</div>
          </GlassPanel>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {contentItems.map((item) => (
            <GlassPanel
              key={item.id}
              className="content-card group"
              interactive
              onClick={() => handleContentClick(item)}
            >
              <div className="relative overflow-hidden rounded-t-[var(--radius-glass)]">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="content-thumbnail w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-foreground drop-shadow-lg" />
                </div>
                
                <div className={`absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium ${platformColors[item.platform]}`}>
                  {item.platform}
                </div>
                
                <div className={`absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-medium ${typeColors[item.type]}`}>
                  {item.type.replace('-', ' ')}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col card-content">
                <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-1">
                  {item.description}
                </p>
                
                {item.metrics && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border/50 pt-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {item.metrics.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {item.metrics.engagement_rate}
                    </div>
                  </div>
                )}
              </div>
            </GlassPanel>
          ))}
        </div>

        <div className="text-center">
          <GlassPanel className="p-8 backdrop-blur-xl bg-gradient-to-r from-accent/5 to-orange-500/5 border-accent/20">
            <h3 className="text-2xl font-bold mb-4">{t('content.readyCreate')}</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('content.collabText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="btn-liquid btn-accent px-8 py-4 text-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Users className="w-5 h-5 mr-2" />
                {t('content.startCollab')}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-liquid px-8 py-4 text-lg"
                onClick={() => window.open('https://www.tiktok.com/@example', '_blank')}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                {t('content.viewPortfolio')}
              </Button>
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}