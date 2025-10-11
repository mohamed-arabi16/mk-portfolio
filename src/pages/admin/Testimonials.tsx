import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, Edit, Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  client_name: string;
  client_title_en?: string;
  client_title_ar?: string;
  avatar_url?: string;
  content_en: string;
  content_ar: string;
  rating?: number;
  display_order: number;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
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

    loadTestimonials();
  };

  const loadTestimonials = async () => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('display_order');

    if (error) {
      toast({
        title: "Error loading testimonials",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setTestimonials(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const testimonialData = {
      client_name: formData.get('client_name') as string,
      client_title_en: formData.get('client_title_en') as string || null,
      client_title_ar: formData.get('client_title_ar') as string || null,
      avatar_url: formData.get('avatar_url') as string || null,
      content_en: formData.get('content_en') as string,
      content_ar: formData.get('content_ar') as string,
      rating: parseInt(formData.get('rating') as string) || 5,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      user_id: session.user.id,
    };

    if (editingTestimonial) {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonialData)
        .eq('id', editingTestimonial.id);

      if (error) {
        toast({
          title: "Error updating testimonial",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Testimonial updated successfully" });
        setIsDialogOpen(false);
        setEditingTestimonial(null);
        loadTestimonials();
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert(testimonialData);

      if (error) {
        toast({
          title: "Error creating testimonial",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Testimonial created successfully" });
        setIsDialogOpen(false);
        loadTestimonials();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting testimonial",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Testimonial deleted successfully" });
      loadTestimonials();
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
            <h1 className="text-4xl font-bold">Manage Testimonials</h1>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-liquid btn-accent" onClick={() => setEditingTestimonial(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Client Name</label>
                  <Input name="client_name" defaultValue={editingTestimonial?.client_name} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title (English)</label>
                    <Input name="client_title_en" defaultValue={editingTestimonial?.client_title_en} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title (Arabic)</label>
                    <Input name="client_title_ar" defaultValue={editingTestimonial?.client_title_ar} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Avatar URL</label>
                  <Input name="avatar_url" type="url" defaultValue={editingTestimonial?.avatar_url || ''} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Content (English)</label>
                    <Textarea name="content_en" defaultValue={editingTestimonial?.content_en} required rows={4} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Content (Arabic)</label>
                    <Textarea name="content_ar" defaultValue={editingTestimonial?.content_ar} required rows={4} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Rating (1-5)</label>
                    <Input type="number" min="1" max="5" name="rating" defaultValue={editingTestimonial?.rating || 5} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Display Order</label>
                    <Input type="number" name="display_order" defaultValue={editingTestimonial?.display_order || 0} />
                  </div>
                </div>
                <Button type="submit" className="w-full btn-liquid btn-accent">
                  {editingTestimonial ? 'Update' : 'Create'} Testimonial
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <GlassPanel key={testimonial.id} className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold">{testimonial.client_name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.client_title_en}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <p className="text-sm line-clamp-3">{testimonial.content_en}</p>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingTestimonial(testimonial);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(testimonial.id)}
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
