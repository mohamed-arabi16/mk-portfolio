import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/GlassPanel";
import { useLanguage } from "@/components/LanguageProvider";
import {
  Briefcase,
  Settings,
  FileText,
  Award,
  BarChart3,
  MessageSquare,
  LogOut,
  Languages,
  Image
} from "lucide-react";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({ projects: 0, services: 0, skills: 0, content: 0 });
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/admin/login');
        return;
      }

      // Check if user is admin
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .eq('role', 'admin')
        .single();

      if (!roles) {
        navigate('/admin/login');
        return;
      }

      setIsAdmin(true);
      
      // Load stats
      const [projects, services, skills, content] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id),
        supabase.from('services').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id),
        supabase.from('skills').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id),
        supabase.from('content_items').select('id', { count: 'exact', head: true }).eq('user_id', session.user.id),
      ]);
      
      setStats({
        projects: projects.count || 0,
        services: services.count || 0,
        skills: skills.count || 0,
        content: content.count || 0,
      });
      
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    { title: t('admin.projects'), icon: Briefcase, href: '/admin/projects', color: 'text-blue-500' },
    { title: t('admin.services'), icon: Settings, href: '/admin/services', color: 'text-green-500' },
    { title: t('admin.skills'), icon: Award, href: '/admin/skills', color: 'text-purple-500' },
    { title: 'Stats', icon: BarChart3, href: '/admin/stats', color: 'text-orange-500' },
    { title: t('admin.content'), icon: Image, href: '/admin/content', color: 'text-pink-500' },
    { title: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials', color: 'text-cyan-500' },
    { title: t('admin.config'), icon: FileText, href: '/admin/config', color: 'text-yellow-500' },
    { title: t('admin.translations'), icon: Languages, href: '/admin/translations', color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{t('admin.dashboard')}</h1>
            <p className="text-muted-foreground">Manage your portfolio content</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild className="btn-liquid">
              <Link to="/">View Site</Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="btn-liquid">
              <LogOut className="h-4 w-4 mr-2" />
              {t('admin.logout')}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Projects</p>
                <p className="text-3xl font-bold text-accent">{stats.projects}</p>
              </div>
              <Briefcase className="h-12 w-12 text-blue-500 opacity-20" />
            </div>
          </GlassPanel>
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Services</p>
                <p className="text-3xl font-bold text-accent">{stats.services}</p>
              </div>
              <Settings className="h-12 w-12 text-green-500 opacity-20" />
            </div>
          </GlassPanel>
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Skills</p>
                <p className="text-3xl font-bold text-accent">{stats.skills}</p>
              </div>
              <Award className="h-12 w-12 text-purple-500 opacity-20" />
            </div>
          </GlassPanel>
          <GlassPanel className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">Content</p>
                <p className="text-3xl font-bold text-accent">{stats.content}</p>
              </div>
              <Image className="h-12 w-12 text-pink-500 opacity-20" />
            </div>
          </GlassPanel>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Link key={item.href} to={item.href}>
              <GlassPanel interactive className="p-6 h-full hover:scale-105 transition-transform">
                <item.icon className={`h-12 w-12 ${item.color} mb-4`} />
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
