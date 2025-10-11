import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortfolioConfig {
  id: string;
  name: string;
  bio_en?: string;
  bio_ar?: string;
  location: string;
  email: string;
  phone: string;
  whatsapp_link?: string;
  cv_url?: string;
  github_url?: string;
  linkedin_url?: string;
  hero_title_1_en?: string;
  hero_title_1_ar?: string;
  hero_title_2_en?: string;
  hero_title_2_ar?: string;
  hero_title_3_en?: string;
  hero_title_3_ar?: string;
  hero_subtitle_en?: string;
  hero_subtitle_ar?: string;
}

export default function AdminConfig() {
  const [config, setConfig] = useState<PortfolioConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
      return;
    }

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

    loadConfig();
  };

  const loadConfig = async () => {
    const { data, error } = await supabase
      .from('portfolio_config')
      .select('*')
      .single();

    if (error && error.code !== 'PGRST116') {
      toast({
        title: "Error loading config",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setConfig(data || null);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    const formData = new FormData(e.currentTarget);
    
    const configData = {
      name: formData.get('name') as string,
      bio_en: formData.get('bio_en') as string || null,
      bio_ar: formData.get('bio_ar') as string || null,
      location: formData.get('location') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      whatsapp_link: formData.get('whatsapp_link') as string || null,
      cv_url: formData.get('cv_url') as string || null,
      github_url: formData.get('github_url') as string || null,
      linkedin_url: formData.get('linkedin_url') as string || null,
      hero_title_1_en: formData.get('hero_title_1_en') as string || null,
      hero_title_1_ar: formData.get('hero_title_1_ar') as string || null,
      hero_title_2_en: formData.get('hero_title_2_en') as string || null,
      hero_title_2_ar: formData.get('hero_title_2_ar') as string || null,
      hero_title_3_en: formData.get('hero_title_3_en') as string || null,
      hero_title_3_ar: formData.get('hero_title_3_ar') as string || null,
      hero_subtitle_en: formData.get('hero_subtitle_en') as string || null,
      hero_subtitle_ar: formData.get('hero_subtitle_ar') as string || null,
    };

    if (config) {
      const { error } = await supabase
        .from('portfolio_config')
        .update(configData)
        .eq('id', config.id);

      if (error) {
        toast({
          title: "Error updating config",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Configuration updated successfully" });
        loadConfig();
      }
    } else {
      const { error } = await supabase
        .from('portfolio_config')
        .insert(configData);

      if (error) {
        toast({
          title: "Error creating config",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Configuration created successfully" });
        loadConfig();
      }
    }
    setSaving(false);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" asChild className="btn-liquid">
            <Link to="/admin">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
          <h1 className="text-4xl font-bold">Portfolio Configuration</h1>
        </div>

        <GlassPanel className="p-6">
          <form onSubmit={handleSave}>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                <TabsTrigger value="links">Links & Social</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input name="name" defaultValue={config?.name} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Bio (English)</label>
                    <Textarea name="bio_en" defaultValue={config?.bio_en || ''} rows={4} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bio (Arabic)</label>
                    <Textarea name="bio_ar" defaultValue={config?.bio_ar || ''} rows={4} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input name="location" defaultValue={config?.location} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" name="email" defaultValue={config?.email} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input name="phone" defaultValue={config?.phone} required />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hero" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Title 1 (English)</label>
                    <Input name="hero_title_1_en" defaultValue={config?.hero_title_1_en || ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Title 1 (Arabic)</label>
                    <Input name="hero_title_1_ar" defaultValue={config?.hero_title_1_ar || ''} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Title 2 (English)</label>
                    <Input name="hero_title_2_en" defaultValue={config?.hero_title_2_en || ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Title 2 (Arabic)</label>
                    <Input name="hero_title_2_ar" defaultValue={config?.hero_title_2_ar || ''} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Title 3 (English)</label>
                    <Input name="hero_title_3_en" defaultValue={config?.hero_title_3_en || ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Title 3 (Arabic)</label>
                    <Input name="hero_title_3_ar" defaultValue={config?.hero_title_3_ar || ''} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Subtitle (English)</label>
                    <Textarea name="hero_subtitle_en" defaultValue={config?.hero_subtitle_en || ''} rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Subtitle (Arabic)</label>
                    <Textarea name="hero_subtitle_ar" defaultValue={config?.hero_subtitle_ar || ''} rows={3} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="links" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">WhatsApp Link</label>
                  <Input name="whatsapp_link" defaultValue={config?.whatsapp_link || ''} placeholder="https://wa.me/..." />
                </div>
                <div>
                  <label className="text-sm font-medium">CV URL</label>
                  <Input name="cv_url" defaultValue={config?.cv_url || ''} placeholder="/MohamedKH_CV.pdf" />
                </div>
                <div>
                  <label className="text-sm font-medium">GitHub URL</label>
                  <Input name="github_url" defaultValue={config?.github_url || ''} placeholder="https://github.com/..." />
                </div>
                <div>
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input name="linkedin_url" defaultValue={config?.linkedin_url || ''} placeholder="https://linkedin.com/in/..." />
                </div>
              </TabsContent>
            </Tabs>

            <Button type="submit" disabled={saving} className="w-full mt-6 btn-liquid btn-accent">
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Configuration'}
            </Button>
          </form>
        </GlassPanel>
      </div>
    </div>
  );
}
