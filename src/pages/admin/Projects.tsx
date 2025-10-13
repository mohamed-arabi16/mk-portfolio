import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GlassPanel } from "@/components/GlassPanel";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Plus, Edit, Trash, Upload, Loader2, Image as ImageIcon } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description_en: string;
  description_ar: string;
  role: string;
  stack: string[];
  thumbnail_url: string;
  project_url?: string;
  is_coming_soon: boolean;
  display_order: number;
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    description_en: '',
    description_ar: '',
    role: '',
    stack: '',
    thumbnail_url: '',
    project_url: '',
    is_coming_soon: false,
    display_order: 0,
  });
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

    loadProjects();
  };

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: "Error loading projects",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadingImage(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('project-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(fileName);

      setFormData({ ...formData, thumbnail_url: publicUrl });
      setThumbnailPreview(publicUrl);
      
      toast({ title: "Image uploaded successfully" });
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const projectData = {
      ...formData,
      stack: formData.stack.split(',').map(s => s.trim()),
      user_id: session.user.id,
    };

    if (editing) {
      const { error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', editing.id);

      if (error) {
        toast({
          title: "Error updating project",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Project updated successfully" });
        resetForm();
        loadProjects();
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([projectData]);

      if (error) {
        toast({
          title: "Error creating project",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({ title: "Project created successfully" });
        resetForm();
        loadProjects();
      }
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project);
    setFormData({
      title: project.title,
      description_en: project.description_en,
      description_ar: project.description_ar,
      role: project.role,
      stack: project.stack.join(', '),
      thumbnail_url: project.thumbnail_url,
      project_url: project.project_url || '',
      is_coming_soon: project.is_coming_soon,
      display_order: project.display_order,
    });
    setThumbnailPreview(project.thumbnail_url);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error deleting project",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Project deleted successfully" });
      loadProjects();
    }
  };

  const resetForm = () => {
    setEditing(null);
    setFormData({
      title: '',
      description_en: '',
      description_ar: '',
      role: '',
      stack: '',
      thumbnail_url: '',
      project_url: '',
      is_coming_soon: false,
      display_order: 0,
    });
    setThumbnailPreview('');
  };

  if (loading) return <AdminLayout><div className="p-6">Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage Projects</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <GlassPanel className="p-6">
            <h2 className="text-2xl font-bold mb-6">
              {editing ? 'Edit Project' : 'Add New Project'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Description (English)</Label>
                <Textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  required
                  rows={3}
                  placeholder="Project description in English"
                />
              </div>
              <div>
                <Label>Description (Arabic)</Label>
                <Textarea
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  required
                  rows={3}
                  placeholder="وصف المشروع بالعربية"
                  dir="rtl"
                />
              </div>
              <div>
                <Label>Role</Label>
                <Input
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label>Tech Stack (comma-separated)</Label>
                <Input
                  value={formData.stack}
                  onChange={(e) => setFormData({ ...formData, stack: e.target.value })}
                  placeholder="React, TypeScript, Tailwind"
                  required
                />
              </div>
              <div>
                <Label>Project Thumbnail</Label>
                <div className="space-y-4">
                  {thumbnailPreview && (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={uploadingImage}
                      onClick={() => document.getElementById('thumbnail-upload')?.click()}
                      className="flex-1"
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          {thumbnailPreview ? 'Replace Image' : 'Upload Image'}
                        </>
                      )}
                    </Button>
                  </div>
                  <input
                    id="thumbnail-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    Max 5MB. Supported: JPG, PNG, WebP
                  </p>
                </div>
              </div>
              <div>
                <Label>Project URL (optional)</Label>
                <Input
                  value={formData.project_url}
                  onChange={(e) => setFormData({ ...formData, project_url: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_coming_soon"
                  checked={formData.is_coming_soon}
                  onChange={(e) => setFormData({ ...formData, is_coming_soon: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_coming_soon">Coming Soon</Label>
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="btn-liquid btn-accent">
                  {editing ? 'Update' : 'Create'}
                </Button>
                {editing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </GlassPanel>

          {/* Projects List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Existing Projects</h2>
            {projects.map((project) => (
              <GlassPanel key={project.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{project.role}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span key={tech} className="text-xs bg-accent/10 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(project.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
