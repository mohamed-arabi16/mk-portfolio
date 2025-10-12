import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/LanguageProvider";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Save } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminTranslations() {
  const [enTranslations, setEnTranslations] = useState('');
  const [arTranslations, setArTranslations] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { reloadTranslations } = useLanguage();

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

    loadTranslations();
  };

  const loadTranslations = async () => {
    try {
      const [enResponse, arResponse] = await Promise.all([
        fetch('/locales/en.json'),
        fetch('/locales/ar.json')
      ]);

      const enData = await enResponse.json();
      const arData = await arResponse.json();

      setEnTranslations(JSON.stringify(enData, null, 2));
      setArTranslations(JSON.stringify(arData, null, 2));
    } catch (error: any) {
      toast({
        title: "Error loading translations",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (lang: 'en' | 'ar') => {
    setSaving(true);
    try {
      const content = lang === 'en' ? enTranslations : arTranslations;
      
      // Validate JSON
      JSON.parse(content);

      // In a real implementation, you would need a backend endpoint to save files
      // For now, we'll show a message that this needs backend implementation
      toast({
        title: "Save Translations",
        description: "To enable saving translations, you need to implement a backend endpoint that writes to /public/locales/ files. For now, you can manually update the JSON files.",
      });

      // Reload translations to reflect any changes
      await reloadTranslations();
    } catch (error: any) {
      toast({
        title: "Invalid JSON",
        description: "Please check your JSON syntax",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage Translations</h1>

        <GlassPanel className="p-6">
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="ar">العربية (Arabic)</TabsTrigger>
            </TabsList>

            <TabsContent value="en" className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Edit the English translations JSON. Make sure to keep valid JSON format.
                </p>
                <Textarea
                  value={enTranslations}
                  onChange={(e) => setEnTranslations(e.target.value)}
                  className="font-mono text-sm min-h-[600px]"
                  spellCheck={false}
                />
              </div>
              <Button 
                onClick={() => handleSave('en')} 
                disabled={saving}
                className="btn-liquid btn-accent"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save English Translations'}
              </Button>
            </TabsContent>

            <TabsContent value="ar" className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Edit the Arabic translations JSON. Make sure to keep valid JSON format.
                </p>
                <Textarea
                  value={arTranslations}
                  onChange={(e) => setArTranslations(e.target.value)}
                  className="font-mono text-sm min-h-[600px]"
                  dir="ltr"
                  spellCheck={false}
                />
              </div>
              <Button 
                onClick={() => handleSave('ar')} 
                disabled={saving}
                className="btn-liquid btn-accent"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Arabic Translations'}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">💡 Note about saving translations:</h3>
            <p className="text-sm text-muted-foreground">
              Currently, translations are loaded from static JSON files. To enable real-time saving, 
              you would need to implement a backend endpoint that can write to the <code>/public/locales/</code> directory. 
              For now, you can copy the edited JSON and manually update the files, or implement an edge function with file write permissions.
            </p>
          </div>
        </GlassPanel>
      </div>
    </AdminLayout>
  );
}
