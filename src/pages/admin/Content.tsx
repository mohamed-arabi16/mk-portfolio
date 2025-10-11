import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentItem {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  thumbnail_url?: string;
  external_url?: string;
  platform?: string;
  content_type?: string;
  views: number;
  likes: number;
  engagement_rate: number;
  display_order: number;
}

export default function AdminContent() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);
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

    loadItems();
  };

  const loadItems = async () => {
    const { data, error } = await supabase
      .from('content_items')
      .select('*')
      .order('display_order');

    if (error) {
      toast({
        title: "Error loading content items",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const itemData = {
      title_en: formData.get('title_en') as string,
      title_ar: formData.get('title_ar') as string,
      description_en: formData.get('description_en') as string,
      description_ar: formData.get('description_ar') as string,
      thumbnail_url: formData.get('thumbnail_url') as string || null,
      external_url: formData.get('external_url') as string || null,
      platform: formData.get('platform') as string || null,
      content_type: formData.get('content_type') as string || null,
      views: parseInt(formData.get('views') as string) || 0,
      likes: parseInt(formData.get('likes') as string) || 0,
      engagement_rate: parseFloat(formData.get('engagement_rate') as string) || 0,
      display_order: parseInt(formData.get('display_order') as string) || 0,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('content_items')
        .update(itemData)
        .eq('id', editingItem.id);

      if (error) {
        toast({
          title: "Error updating content item",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Content item updated successfully" });
        setIsDialogOpen(false);
        setEditingItem(null);
        loadItems();
      }
    } else {
      const { error } = await supabase
        .from('content_items')
        .insert(itemData);

      if (error) {
        toast({
          title: "Error creating content item",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Content item created successfully" });
        setIsDialogOpen(false);
        loadItems();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content item?')) return;

    const { error } = await supabase
      .from('content_items')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting content item",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Content item deleted successfully" });
      loadItems();
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild className="btn-liquid">
              <Link to="/admin">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <h1 className="text-4xl font-bold">Manage Content</h1>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-liquid btn-accent" onClick={() => setEditingItem(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? 'Edit Content Item' : 'Add Content Item'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title (English)</label>
                    <Input name="title_en" defaultValue={editingItem?.title_en} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title (Arabic)</label>
                    <Input name="title_ar" defaultValue={editingItem?.title_ar} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Description (English)</label>
                    <Textarea name="description_en" defaultValue={editingItem?.description_en} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description (Arabic)</label>
                    <Textarea name="description_ar" defaultValue={editingItem?.description_ar} required />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Thumbnail URL</label>
                  <Input name="thumbnail_url" defaultValue={editingItem?.thumbnail_url || ''} />
                </div>
                <div>
                  <label className="text-sm font-medium">External URL</label>
                  <Input name="external_url" defaultValue={editingItem?.external_url || ''} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Platform</label>
                    <Select name="platform" defaultValue={editingItem?.platform || 'Other'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content Type</label>
                    <Select name="content_type" defaultValue={editingItem?.content_type || 'other'}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                        <SelectItem value="behind-scenes">Behind the Scenes</SelectItem>
                        <SelectItem value="tech-tips">Tech Tips</SelectItem>
                        <SelectItem value="client-showcase">Client Showcase</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Views</label>
                    <Input type="number" name="views" defaultValue={editingItem?.views || 0} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Likes</label>
                    <Input type="number" name="likes" defaultValue={editingItem?.likes || 0} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Engagement Rate %</label>
                    <Input type="number" step="0.01" name="engagement_rate" defaultValue={editingItem?.engagement_rate || 0} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Display Order</label>
                  <Input type="number" name="display_order" defaultValue={editingItem?.display_order || 0} />
                </div>
                <Button type="submit" className="w-full btn-liquid btn-accent">
                  {editingItem ? 'Update' : 'Create'} Content Item
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <GlassPanel key={item.id} className="p-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold">{item.title_en}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description_en}</p>
                <div className="flex gap-4 text-xs">
                  <span>{item.platform}</span>
                  <span>{item.views} views</span>
                  <span>{item.engagement_rate}% engagement</span>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(item);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </div>
  );
}
