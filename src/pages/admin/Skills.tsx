import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Skill {
  id: string;
  name: string;
  category: string;
  display_order: number;
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
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

    loadSkills();
  };

  const loadSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category')
      .order('display_order');

    if (error) {
      toast({
        title: "Error loading skills",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSkills(data || []);
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const skillData = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      display_order: parseInt(formData.get('display_order') as string) || 0,
      user_id: session.user.id,
    };

    if (editingSkill) {
      const { error } = await supabase
        .from('skills')
        .update(skillData)
        .eq('id', editingSkill.id);

      if (error) {
        toast({
          title: "Error updating skill",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Skill updated successfully" });
        setIsDialogOpen(false);
        setEditingSkill(null);
        loadSkills();
      }
    } else {
      const { error } = await supabase
        .from('skills')
        .insert(skillData);

      if (error) {
        toast({
          title: "Error creating skill",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Skill created successfully" });
        setIsDialogOpen(false);
        loadSkills();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting skill",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Skill deleted successfully" });
      loadSkills();
    }
  };

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;

  const categories = [
    { value: 'Technical', label: 'Technical Skills' },
    { value: 'Creative', label: 'Creative Skills' },
    { value: 'Languages', label: 'Languages' }
  ];

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Manage Skills</h1>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="btn-liquid btn-accent" onClick={() => setEditingSkill(null)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSkill ? 'Edit Skill' : 'Add Skill'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Skill Name</label>
                  <Input name="name" defaultValue={editingSkill?.name} required />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select name="category" defaultValue={editingSkill?.category || categories[0].value} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Display Order</label>
                  <Input type="number" name="display_order" defaultValue={editingSkill?.display_order || 0} />
                </div>
                <Button type="submit" className="w-full btn-liquid btn-accent">
                  {editingSkill ? 'Update' : 'Create'} Skill
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {categories.map(category => (
          <div key={category.value} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{category.label}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.filter(s => s.category === category.value).map((skill) => (
                <GlassPanel key={skill.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">Order: {skill.display_order}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingSkill(skill);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(skill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GlassPanel>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
