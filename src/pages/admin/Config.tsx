import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Save, Upload, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast as sonnerToast } from "sonner";

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
  hero_subtitle_en?: string;
  hero_subtitle_ar?: string;
  hero_bg_url?: string;
  global_perspective_title_en?: string;
  global_perspective_title_ar?: string;
  global_perspective_desc_en?: string;
  global_perspective_desc_ar?: string;
  career_evolution_title_en?: string;
  career_evolution_title_ar?: string;
  career_evolution_desc_en?: string;
  career_evolution_desc_ar?: string;
  cooperative_approach_title_en?: string;
  cooperative_approach_title_ar?: string;
  cooperative_approach_desc_en?: string;
  cooperative_approach_desc_ar?: string;
}

export default function AdminConfig() {
  const [config, setConfig] = useState<PortfolioConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formState, setFormState] = useState<Partial<PortfolioConfig>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [heroImagePreview, setHeroImagePreview] = useState<string>('');
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
      setFormState(data || {});
      
      // Set preview for existing hero background
      if (data?.hero_bg_url) {
        const bgUrl = data.hero_bg_url.startsWith('http') || data.hero_bg_url.startsWith('/') 
          ? data.hero_bg_url 
          : supabase.storage.from('hero-images').getPublicUrl(data.hero_bg_url).data.publicUrl;
        setHeroImagePreview(bgUrl);
      }
    }
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      sonnerToast.error('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      sonnerToast.error('Image size should be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Create unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('hero-images')
        .getPublicUrl(fileName);

      // Update form state with the storage path (not full URL)
      setFormState(prev => ({ ...prev, hero_bg_url: fileName }));
      setHeroImagePreview(publicUrl);

      sonnerToast.success('Hero image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      sonnerToast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setSaving(false);
      return;
    }

    const configData = {
      ...formState,
      user_id: session.user.id,
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

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Portfolio Configuration</h1>

        <GlassPanel className="p-6">
          <form onSubmit={handleSave}>
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="hero">Hero Section</TabsTrigger>
                <TabsTrigger value="about">About Content</TabsTrigger>
                <TabsTrigger value="links">Links & Social</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    value={formState.name || ''} 
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Bio (English)</label>
                    <Textarea 
                      value={formState.bio_en || ''} 
                      onChange={(e) => handleInputChange('bio_en', e.target.value)}
                      rows={4} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Bio (Arabic)</label>
                    <Textarea 
                      value={formState.bio_ar || ''} 
                      onChange={(e) => handleInputChange('bio_ar', e.target.value)}
                      rows={4} 
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    value={formState.location || ''} 
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input 
                      type="email" 
                      value={formState.email || ''} 
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input 
                      value={formState.phone || ''} 
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      required 
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="hero" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Title 1 (English)</label>
                    <Input 
                      value={formState.hero_title_1_en || ''} 
                      onChange={(e) => handleInputChange('hero_title_1_en', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Title 1 (Arabic)</label>
                    <Input 
                      value={formState.hero_title_1_ar || ''} 
                      onChange={(e) => handleInputChange('hero_title_1_ar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Title 2 (English)</label>
                    <Input 
                      value={formState.hero_title_2_en || ''} 
                      onChange={(e) => handleInputChange('hero_title_2_en', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Title 2 (Arabic)</label>
                    <Input 
                      value={formState.hero_title_2_ar || ''} 
                      onChange={(e) => handleInputChange('hero_title_2_ar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Hero Subtitle (English)</label>
                    <Textarea 
                      value={formState.hero_subtitle_en || ''} 
                      onChange={(e) => handleInputChange('hero_subtitle_en', e.target.value)}
                      rows={3} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Hero Subtitle (Arabic)</label>
                    <Textarea 
                      value={formState.hero_subtitle_ar || ''} 
                      onChange={(e) => handleInputChange('hero_subtitle_ar', e.target.value)}
                      rows={3} 
                    />
                  </div>
                </div>
              <div className="space-y-3">
                <label className="text-sm font-medium">Hero Background Image</label>
                
                {/* Image Preview */}
                {heroImagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <img 
                      src={heroImagePreview} 
                      alt="Hero background preview" 
                      className="w-full h-full object-cover blur-sm"
                    />
                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                      <p className="text-xs text-foreground">Current Background</p>
                    </div>
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isUploading}
                    onClick={() => document.getElementById('hero-image-upload')?.click()}
                    className="w-full"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Upload New Background
                      </>
                    )}
                  </Button>
                  <input
                    id="hero-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleHeroImageUpload}
                  />
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Upload a background image (max 5MB). Recommended size: 1920x1080px or larger.
                </p>
              </div>
              </TabsContent>

              <TabsContent value="about" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Global Perspective Title (English)</label>
                    <Input 
                      value={formState.global_perspective_title_en || ''} 
                      onChange={(e) => handleInputChange('global_perspective_title_en', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Global Perspective Title (Arabic)</label>
                    <Input 
                      value={formState.global_perspective_title_ar || ''} 
                      onChange={(e) => handleInputChange('global_perspective_title_ar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Global Perspective Description (English)</label>
                    <Textarea 
                      value={formState.global_perspective_desc_en || ''} 
                      onChange={(e) => handleInputChange('global_perspective_desc_en', e.target.value)}
                      rows={3} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Global Perspective Description (Arabic)</label>
                    <Textarea 
                      value={formState.global_perspective_desc_ar || ''} 
                      onChange={(e) => handleInputChange('global_perspective_desc_ar', e.target.value)}
                      rows={3} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Career Evolution Title (English)</label>
                    <Input 
                      value={formState.career_evolution_title_en || ''} 
                      onChange={(e) => handleInputChange('career_evolution_title_en', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Career Evolution Title (Arabic)</label>
                    <Input 
                      value={formState.career_evolution_title_ar || ''} 
                      onChange={(e) => handleInputChange('career_evolution_title_ar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Career Evolution Description (English)</label>
                    <Textarea 
                      value={formState.career_evolution_desc_en || ''} 
                      onChange={(e) => handleInputChange('career_evolution_desc_en', e.target.value)}
                      rows={3} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Career Evolution Description (Arabic)</label>
                    <Textarea 
                      value={formState.career_evolution_desc_ar || ''} 
                      onChange={(e) => handleInputChange('career_evolution_desc_ar', e.target.value)}
                      rows={3} 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Cooperative Approach Title (English)</label>
                    <Input 
                      value={formState.cooperative_approach_title_en || ''} 
                      onChange={(e) => handleInputChange('cooperative_approach_title_en', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cooperative Approach Title (Arabic)</label>
                    <Input 
                      value={formState.cooperative_approach_title_ar || ''} 
                      onChange={(e) => handleInputChange('cooperative_approach_title_ar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Cooperative Approach Description (English)</label>
                    <Textarea 
                      value={formState.cooperative_approach_desc_en || ''} 
                      onChange={(e) => handleInputChange('cooperative_approach_desc_en', e.target.value)}
                      rows={3} 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Cooperative Approach Description (Arabic)</label>
                    <Textarea 
                      value={formState.cooperative_approach_desc_ar || ''} 
                      onChange={(e) => handleInputChange('cooperative_approach_desc_ar', e.target.value)}
                      rows={3} 
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="links" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">WhatsApp Link</label>
                  <Input 
                    value={formState.whatsapp_link || ''} 
                    onChange={(e) => handleInputChange('whatsapp_link', e.target.value)}
                    placeholder="https://wa.me/..." 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">CV URL</label>
                  <Input 
                    value={formState.cv_url || ''} 
                    onChange={(e) => handleInputChange('cv_url', e.target.value)}
                    placeholder="/MohamedKH_CV.pdf" 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">GitHub URL</label>
                  <Input 
                    value={formState.github_url || ''} 
                    onChange={(e) => handleInputChange('github_url', e.target.value)}
                    placeholder="https://github.com/..." 
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input 
                    value={formState.linkedin_url || ''} 
                    onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                    placeholder="https://linkedin.com/in/..." 
                  />
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
    </AdminLayout>
  );
}
