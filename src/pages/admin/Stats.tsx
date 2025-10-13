import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Stat {
  id: string;
  stat_key: string;
  label_en: string;
  label_ar: string;
  value: string;
  description_en?: string;
  description_ar?: string;
  display_order: number;
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStat, setEditingStat] = useState<Stat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    loadStats();
  };

  const loadStats = async () => {
    const { data, error } = await supabase
      .from('stats')
      .select('*')
      .order('display_order');

    if (error) {
      toast({
        title: "Error loading stats",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setStats(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const statKey = formData.get('stat_key') as string;
    
    // Validate required fields
    if (!statKey || !statKey.trim()) {
      toast({
        title: "Validation Error",
        description: "Stat Key is required",
        variant: "destructive",
      });
      return;
    }

    const statData = {
      stat_key: statKey.trim(),
      label_en: formData.get('label_en') as string,
      label_ar: formData.get('label_ar') as string,
      value: formData.get('value') as string,
      description_en: formData.get('description_en') as string || null,
      description_ar: formData.get('description_ar') as string || null,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      user_id: session.user.id,
    };

    if (editingStat) {
      const { error } = await supabase
        .from('stats')
        .update(statData)
        .eq('id', editingStat.id);

      if (error) {
        toast({
          title: "Error updating stat",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Stat updated successfully" });
        setIsDialogOpen(false);
        setEditingStat(null);
        loadStats();
      }
    } else {
      const { error } = await supabase
        .from('stats')
        .insert(statData);

      if (error) {
        toast({
          title: "Error creating stat",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Stat created successfully" });
        setIsDialogOpen(false);
        loadStats();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this stat?')) return;

    const { error } = await supabase
      .from('stats')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting stat",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Stat deleted successfully" });
      loadStats();
    }
  };

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Manage Stats</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-liquid btn-accent" onClick={() => setEditingStat(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Stat
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingStat ? 'Edit Stat' : 'Add Stat'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Stat Key (unique identifier)</label>
                  <Input 
                    name="stat_key" 
                    defaultValue={editingStat?.stat_key} 
                    required 
                    disabled={!!editingStat}
                    placeholder="e.g., hero_projects_completed"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Label (English)</label>
                    <Input name="label_en" defaultValue={editingStat?.label_en} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Label (Arabic)</label>
                    <Input name="label_ar" defaultValue={editingStat?.label_ar} required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Value</label>
                  <Input name="value" defaultValue={editingStat?.value} required placeholder="e.g., 50+, 92%, etc." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Description (English)</label>
                    <Textarea name="description_en" defaultValue={editingStat?.description_en || ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description (Arabic)</label>
                    <Textarea name="description_ar" defaultValue={editingStat?.description_ar || ''} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Display Order</label>
                  <Input type="number" name="display_order" defaultValue={editingStat?.display_order || 0} />
                </div>
                <Button type="submit" className="w-full btn-liquid btn-accent">
                  {editingStat ? 'Update' : 'Create'} Stat
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <GlassPanel key={stat.id} className="p-6">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-accent">{stat.value}</div>
                <h3 className="font-semibold">{stat.label_en} / {stat.label_ar}</h3>
                <p className="text-sm text-muted-foreground">Key: {stat.stat_key}</p>
                {stat.description_en && (
                  <p className="text-xs text-muted-foreground line-clamp-2">{stat.description_en}</p>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingStat(stat);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(stat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
