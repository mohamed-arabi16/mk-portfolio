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

interface Service {
  id: string;
  icon: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  features_en: string[];
  features_ar: string[];
  price_en?: string;
  price_ar?: string;
  timeline_en?: string;
  timeline_ar?: string;
  cta_text_en?: string;
  cta_text_ar?: string;
  cta_link?: string;
  is_external: boolean;
  display_order: number;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
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

    loadServices();
  };

  const loadServices = async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order');

    if (error) {
      toast({
        title: "Error loading services",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const serviceData = {
      icon: formData.get('icon') as string,
      title_en: formData.get('title_en') as string,
      title_ar: formData.get('title_ar') as string,
      description_en: formData.get('description_en') as string,
      description_ar: formData.get('description_ar') as string,
      features_en: (formData.get('features_en') as string).split('\n').filter(Boolean),
      features_ar: (formData.get('features_ar') as string).split('\n').filter(Boolean),
      price_en: formData.get('price_en') as string || null,
      price_ar: formData.get('price_ar') as string || null,
      timeline_en: formData.get('timeline_en') as string || null,
      timeline_ar: formData.get('timeline_ar') as string || null,
      cta_text_en: formData.get('cta_text_en') as string || null,
      cta_text_ar: formData.get('cta_text_ar') as string || null,
      cta_link: formData.get('cta_link') as string || null,
      is_external: formData.get('is_external') === 'true',
      display_order: parseInt(formData.get('display_order') as string) || 0,
      user_id: session.user.id,
    };

    if (editingService) {
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingService.id);

      if (error) {
        toast({
          title: "Error updating service",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Service updated successfully" });
        setIsDialogOpen(false);
        setEditingService(null);
        loadServices();
      }
    } else {
      const { error } = await supabase
        .from('services')
        .insert(serviceData);

      if (error) {
        toast({
          title: "Error creating service",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Service created successfully" });
        setIsDialogOpen(false);
        loadServices();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting service",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Service deleted successfully" });
      loadServices();
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
            <h1 className="text-4xl font-bold">Manage Services</h1>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-liquid btn-accent" onClick={() => setEditingService(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingService ? 'Edit Service' : 'Add Service'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Icon (Lucide icon name)</label>
                  <Input name="icon" defaultValue={editingService?.icon} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title (English)</label>
                    <Input name="title_en" defaultValue={editingService?.title_en} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title (Arabic)</label>
                    <Input name="title_ar" defaultValue={editingService?.title_ar} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Description (English)</label>
                    <Textarea name="description_en" defaultValue={editingService?.description_en} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description (Arabic)</label>
                    <Textarea name="description_ar" defaultValue={editingService?.description_ar} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Features (English, one per line)</label>
                    <Textarea 
                      name="features_en" 
                      defaultValue={editingService?.features_en.join('\n')} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Features (Arabic, one per line)</label>
                    <Textarea 
                      name="features_ar" 
                      defaultValue={editingService?.features_ar.join('\n')} 
                      required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Price (English)</label>
                    <Input name="price_en" defaultValue={editingService?.price_en || ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price (Arabic)</label>
                    <Input name="price_ar" defaultValue={editingService?.price_ar || ''} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Timeline (English)</label>
                    <Input name="timeline_en" defaultValue={editingService?.timeline_en || ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Timeline (Arabic)</label>
                    <Input name="timeline_ar" defaultValue={editingService?.timeline_ar || ''} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">CTA Text (English)</label>
                    <Input name="cta_text_en" defaultValue={editingService?.cta_text_en || ''} />
                  </div>
                  <div>
                    <label className="text-sm font-medium">CTA Text (Arabic)</label>
                    <Input name="cta_text_ar" defaultValue={editingService?.cta_text_ar || ''} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">CTA Link</label>
                  <Input name="cta_link" defaultValue={editingService?.cta_link || ''} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Display Order</label>
                    <Input type="number" name="display_order" defaultValue={editingService?.display_order || 0} />
                  </div>
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      name="is_external" 
                      value="true" 
                      defaultChecked={editingService?.is_external} 
                    />
                    <label className="text-sm font-medium">External Link</label>
                  </div>
                </div>
                <Button type="submit" className="w-full btn-liquid btn-accent">
                  {editingService ? 'Update' : 'Create'} Service
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {services.map((service) => (
            <GlassPanel key={service.id} className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{service.title_en} / {service.title_ar}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{service.description_en}</p>
                  <div className="flex gap-4 text-sm">
                    <span>Icon: {service.icon}</span>
                    <span>Order: {service.display_order}</span>
                    {service.price_en && <span>Price: {service.price_en}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingService(service);
                      setIsDialogOpen(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(service.id)}
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
