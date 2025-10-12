import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GlassPanel } from "@/components/GlassPanel";
import { useLanguage } from "@/components/LanguageProvider";
import { AdminLayout } from "@/components/admin/AdminLayout";
import {
  Briefcase,
  Settings,
  Award,
  BarChart3,
  MessageSquare,
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
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <p>Loading...</p>
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t('admin.dashboard')}</h1>
          <p className="text-muted-foreground">Manage your portfolio content</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
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
      </div>
    </AdminLayout>
  );
}
